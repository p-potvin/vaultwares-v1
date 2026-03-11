import express from 'express';
import { createServer as createViteServer } from 'vite';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import { MOCK_PRODUCTS, MOCK_ORDERS } from './src/store/mockData';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json());

// Database connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Helper to check DB connection
const isDbConnected = () => !!process.env.DATABASE_URL;

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dbConnected: isDbConnected() });
});

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

app.get('/api/orders', async (req, res) => {
  if (!isDbConnected()) {
    return res.json(MOCK_ORDERS);
  }
  try {
    // In a real app, filter by authenticated user ID
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
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  if (!isDbConnected()) {
    return res.json({ success: true, orderId: 'mock-order-' + Date.now() });
  }
  try {
    const { items, total_amount, user_id } = req.body;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const orderRes = await client.query(
        'INSERT INTO orders (id, user_id, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING id',
        [`ord-${Date.now()}`, user_id || 'u-12345', total_amount, 'pending']
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
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
