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
('p-1', 'VaultKey Pro', 'FIDO2 certified hardware security key with biometric authentication. Protect your accounts from phishing attacks.', 'VK-PRO-01', 89.99, 150, 'https://images.unsplash.com/photo-1614064641936-7327321e10d2?auto=format&fit=crop&q=80&w=800', true, 'hardware'),
('p-2', 'StealthRouter X1', 'Open-source firmware router with built-in VPN client, ad-blocking, and deep packet inspection for home network security.', 'SR-X1-00', 249.00, 45, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800', true, 'hardware'),
('p-3', 'VaultOS Secure Laptop', 'Privacy-first laptop running a hardened Linux distribution. Hardware kill switches for mic, camera, and wireless.', 'VL-OS-14', 1299.00, 12, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', true, 'hardware'),
('p-4', 'CipherDrive 2TB', 'Hardware-encrypted external SSD with keypad PIN entry. Military-grade AES-256 encryption.', 'CD-2TB-KP', 349.50, 80, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=800', true, 'hardware'),
('p-5', 'VaultVPN Annual Pass', 'Zero-log VPN service with wireguard protocol. Includes multi-hop routing and obfuscated servers.', 'VVPN-1YR', 59.99, 9999, 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800', true, 'software'),
('p-6', 'DataShredder Pro', 'Secure file deletion utility that overwrites data multiple times to prevent forensic recovery.', 'DS-PRO-WIN', 29.99, 9999, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800', true, 'software');

INSERT INTO orders (id, user_id, total_amount, status, created_at) VALUES 
('ord-001', 'u-12345', 338.99, 'shipped', '2026-02-15 10:30:00Z');

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES 
('ord-001', 'p-1', 1, 89.99),
('ord-001', 'p-2', 1, 249.00);
