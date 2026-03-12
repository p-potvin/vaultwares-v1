import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { MOCK_PRODUCTS, MOCK_ORDERS } from './src/store/mockData';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-vaultwares-key';

app.use(cors());
app.use(express.json());

// Database connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Helper to check DB connection
const isDbConnected = () => !!process.env.DATABASE_URL;

// Authentication Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dbConnected: isDbConnected() });
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  if (!isDbConnected()) {
    // Mock registration
    const user = { id: 'u-' + Date.now(), email, first_name: firstName, last_name: lastName };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, user });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (id, email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name',
      [`u-${Date.now()}`, email, hashedPassword, firstName, lastName]
    );
    const user = result.rows[0];
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!isDbConnected()) {
    // Mock login
    const user = { id: 'u-12345', email, first_name: 'Admin', last_name: 'User' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, user });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

    const { password_hash, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  if (!isDbConnected()) {
    return res.json(MOCK_PRODUCTS);
  }
  try {
    const result = await pool.query('SELECT * FROM products WHERE is_active = true');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  if (!isDbConnected()) {
    const product = MOCK_PRODUCTS.find(p => p.id === req.params.id);
    return product ? res.json(product) : res.status(404).json({ error: 'Not found' });
  }
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Order Routes
app.get('/api/orders', authenticateToken, async (req: any, res) => {
  if (!isDbConnected()) {
    return res.json(MOCK_ORDERS);
  }
  try {
    const result = await pool.query(`
      SELECT o.*, 
             json_agg(json_build_object(
               'product_id', oi.product_id,
               'quantity', oi.quantity,
               'price_at_purchase', oi.price_at_purchase,
               'product', json_build_object(
                 'id', p.id,
                 'name', p.name,
                 'image_url', p.image_url
               )
             )) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', authenticateToken, async (req: any, res) => {
  if (!isDbConnected()) {
    return res.json({ success: true, orderId: 'mock-order-' + Date.now() });
  }
  try {
    const { items, total_amount } = req.body;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const orderRes = await client.query(
        'INSERT INTO orders (id, user_id, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING id',
        [`ord-${Date.now()}`, req.user.id, total_amount, 'pending']
      );
      const orderId = orderRes.rows[0].id;
      
      for (const item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
          [orderId, item.product.id, item.quantity, item.product.price]
        );
      }
      await client.query('COMMIT');
      res.json({ success: true, orderId });
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Order Error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Tracking Route (Mock Delivery API)
app.get('/api/track/:number', (req, res) => {
  const { number } = req.params;
  
  // Simulate a realistic tracking response
  const trackingData = {
    trackingNumber: number,
    carrier: 'SecureLogistics Global',
    status: 'in_transit',
    estimatedDelivery: new Date(Date.now() + 86400000 * 2).toISOString(),
    events: [
      {
        status: 'In Transit',
        location: 'Sort Facility, Chicago, IL',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        description: 'Package has left the sorting facility and is in transit to destination.'
      },
      {
        status: 'Arrived at Facility',
        location: 'Sort Facility, Chicago, IL',
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
        description: 'Package arrived at regional sorting facility.'
      },
      {
        status: 'Picked Up',
        location: 'Origin Facility, San Jose, CA',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        description: 'Package picked up by carrier.'
      },
      {
        status: 'Label Created',
        location: 'Warehouse, San Jose, CA',
        timestamp: new Date(Date.now() - 3600000 * 52).toISOString(),
        description: 'Shipping label created, awaiting carrier pickup.'
      }
    ]
  };

  // Simulate network delay
  setTimeout(() => {
    res.json(trackingData);
  }, 1000);
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    // Catch-all route to serve the SPA index.html for unknown routes
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
