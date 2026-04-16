import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { pathToFileURL } from 'url';
import rateLimit from 'express-rate-limit';
import { MOCK_PRODUCTS, MOCK_ORDERS } from './src/store/mockData.ts';
import { createOrderSchema } from './src/lib/schemas.ts';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: UserJwtPayload;
    }
  }
}

interface UserJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

dotenv.config();

export const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
let JWT_SECRET = process.env.JWT_SECRET;

// Security: Fail fast if JWT_SECRET is not set in production
if (!JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    console.error('[FATAL] JWT_SECRET environment variable is required in production');
    process.exit(1);
  }
  // In development, use a default insecure secret to simplify setup
  JWT_SECRET = 'insecure_default_secret_for_dev_only';
  console.warn('[WARNING] Using insecure default JWT_SECRET. Set JWT_SECRET env var for production.');
}

app.use(cors());
app.use(express.json());

// Rate limiting for auth endpoints (prevent brute-force attacks)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const isProduction = process.env.NODE_ENV === 'production';

// Database connection configuration
// Support DATABASE_URL (Vercel Postgres / standard connection string) or individual vars
let pool: pg.Pool;
if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : undefined,
  });
} else {
  const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: isProduction
      ? `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
      : process.env.DB_HOST,
    port: isProduction ? undefined : Number(process.env.DB_PORT || 5432),
  };
  pool = new pg.Pool(dbConfig);
}

// Helper to check DB connection
const isDbConnected = () =>
  !!(process.env.DATABASE_URL || (process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME));

// Authentication Middleware
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user as UserJwtPayload;
    next();
  });
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dbConnected: isDbConnected() });
});

// Auth Routes
app.post('/api/auth/register', authLimiter, async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!isDbConnected()) {
    // Mock registration
    const user = { id: uuidv4(), email, first_name: firstName, last_name: lastName };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, user });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (id, email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name',
      [uuidv4(), email, hashedPassword, firstName, lastName]
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

app.post('/api/auth/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!isDbConnected()) {
    // Mock login
    const user = { id: 'u-12345', email, first_name: 'Admin', last_name: 'User' }; // Keep mock ID stable for consistency
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
    const result = await pool.query(
      'SELECT id, name, name_fr, description, description_fr, sku, price, inventory_count, image_url, is_active, category FROM products WHERE is_active = true'
    );
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
    const result = await pool.query(
      'SELECT id, name, name_fr, description, description_fr, sku, price, inventory_count, image_url, is_active, category FROM products WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Order Routes
app.get('/api/orders', authenticateToken, async (req, res) => {
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
                 'name_fr', p.name_fr,
                 'image_url', p.image_url
               )
             )) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [(req.user as JwtPayload).id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', authenticateToken, async (req, res) => {
  if (!isDbConnected()) {
    return res.json({ success: true, orderId: `mock-order-${uuidv4()}` });
  }

  // 1. Validate incoming data with Zod
  const validation = createOrderSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: 'Invalid order data', details: validation.error.issues });
  }

  const { items } = validation.data;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    let calculatedTotal = 0;
    const orderItemsData = [];

    // 2. Verify each item, lock rows, check inventory, and calculate total on the server
    for (const item of items) {
      const productRes = await client.query(
        'SELECT price, inventory_count, name FROM products WHERE id = $1 AND is_active = true FOR UPDATE',
        [item.product.id]
      );

      if (productRes.rows.length === 0) {
        throw new Error(`Product with ID ${item.product.id} not found or is inactive.`);
      }

      const product = productRes.rows[0];

      if (product.inventory_count < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}. Requested: ${item.quantity}, Available: ${product.inventory_count}`);
      }

      calculatedTotal += product.price * item.quantity;
      orderItemsData.push({ ...item, price_at_purchase: product.price });

      // 3. Decrement inventory
      await client.query(
        'UPDATE products SET inventory_count = inventory_count - $1 WHERE id = $2',
        [item.quantity, item.product.id]
      );
    }

    // 4. Create the order with the server-calculated total
    const orderRes = await client.query(
      'INSERT INTO orders (id, user_id, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING id',
      [uuidv4(), (req.user as UserJwtPayload).id, calculatedTotal, 'paid']
    );
    const orderId = orderRes.rows[0].id;

    // 5. Insert order items with the verified price
    for (const orderItem of orderItemsData) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
        [orderId, orderItem.product.id, orderItem.quantity, orderItem.price_at_purchase]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ success: true, orderId });

  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error('Order Error:', err.message);
    // Provide a more specific error message to the client
    res.status(400).json({ error: err.message || 'Failed to create order' });
  } finally {
    client.release();
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
export async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    // SPA fallback for client-side routing
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Only start server when running directly (not imported by serverless handler)
const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  startServer();
}
