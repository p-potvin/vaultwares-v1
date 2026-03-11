-- PostgreSQL Schema for VaultWares

CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sku VARCHAR(100) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    inventory_count INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(50) REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL
);

-- Insert Mock Data
-- Password for admin is 'password123'
INSERT INTO users (id, email, password_hash, first_name, last_name) VALUES 
('u-12345', 'admin@vaultwares.com', '$2a$10$X7.mY.7H1wY6Z5.9Y.7H1.Y6Z5.9Y.7H1wY6Z5.9Y.7H1wY6Z5.9', 'Admin', 'User');

INSERT INTO products (id, name, description, sku, price, inventory_count, image_url, is_active, category) VALUES 
('p-sentry-ids', 'Aegis Network Sentry (IDS)', 'A drop-in Intrusion Detection System (IDS) gateway that analyzes network packets in real-time. Powered by a high-performance quad-core processor, 8GB RAM, and a 128GB NVMe SSD, it handles gigabit speeds (1Gbps) effortlessly. Detects malicious patterns and alerts you instantly via email. Perfect for small businesses and privacy-conscious homes. Zero telemetry, absolutely no tracking. Optional secure remote support available.', 'AEGIS-IDS-01', 299.99, 50, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800', true, 'hardware'),
('p-privacy-hub', 'Aegis Privacy Hub', 'Take back your network. This drop-in gateway features network-wide AdGuard ad-blocking, a built-in WireGuard VPN client, and military-grade DNS encryption. Prevent your ISP from spying on your traffic and block trackers before they reach your devices. Can be used standalone or seamlessly integrated with the Aegis Network Sentry.', 'AEGIS-PRV-01', 249.99, 75, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800', true, 'hardware'),
('p-nomad-router', 'Nomad Secure Mobile Router', 'Complete anonymity wherever you go. A portable Wi-Fi router featuring full traffic encryption and a pre-configured, untraceable eSIM not linked to your identity. Create a secure, private network bubble in any hotel, cafe, or airport.', 'NOMAD-MR-01', 349.99, 30, 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?auto=format&fit=crop&q=80&w=800', true, 'hardware'),
('p-phantom-pixel', 'Phantom Pixel 8 (GrapheneOS)', 'A premium refurbished Google Pixel 8, professionally flashed with GrapheneOS. Stripped of all Google Play Services and tracking telemetry. Experience the pinnacle of mobile privacy without sacrificing modern smartphone capabilities.', 'PHANTOM-P8-01', 599.99, 15, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800', true, 'hardware'),
('p-libre-book', 'LibreBook Secure Laptop (QubesOS)', 'Security through compartmentalization. A laptop built entirely from open-source hardware components, running QubesOS out of the box. Isolate your work, personal, and secure environments into hardware-enforced virtual machines.', 'LIBRE-QB-01', 1499.99, 10, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800', true, 'hardware'),
('p-filter-list', 'VaultWares Ultimate Filter List', 'A meticulously curated filter list for uBlock Origin and AdGuard. Over a year in the making, this list provides maximum security against trackers and malware domains while manually fixing breakages on popular websites for maximum usability. Delivered as a secure, auto-updating subscription link.', 'VW-FILTER-01', 19.99, 9999, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800', true, 'software');

INSERT INTO orders (id, user_id, total_amount, status, created_at) VALUES 
('ord-001', 'u-12345', 549.98, 'shipped', '2026-02-15 10:30:00Z');

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
('ord-001', 'p-sentry-ids', 1, 299.99),
('ord-001', 'p-privacy-hub', 1, 249.99);
