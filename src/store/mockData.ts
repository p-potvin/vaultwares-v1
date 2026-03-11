export type Product = {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  inventory_count: number;
  image_url: string;
  is_active: boolean;
  category: 'hardware' | 'software'; // Added for frontend filtering
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'VaultKey Pro',
    description: 'FIDO2 certified hardware security key with biometric authentication. Protect your accounts from phishing attacks.',
    sku: 'VK-PRO-01',
    price: 89.99,
    inventory_count: 150,
    image_url: 'https://images.unsplash.com/photo-1614064641936-7327321e10d2?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-2',
    name: 'StealthRouter X1',
    description: 'Open-source firmware router with built-in VPN client, ad-blocking, and deep packet inspection for home network security.',
    sku: 'SR-X1-00',
    price: 249.00,
    inventory_count: 45,
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-3',
    name: 'VaultOS Secure Laptop',
    description: 'Privacy-first laptop running a hardened Linux distribution. Hardware kill switches for mic, camera, and wireless.',
    sku: 'VL-OS-14',
    price: 1299.00,
    inventory_count: 12,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-4',
    name: 'CipherDrive 2TB',
    description: 'Hardware-encrypted external SSD with keypad PIN entry. Military-grade AES-256 encryption.',
    sku: 'CD-2TB-KP',
    price: 349.50,
    inventory_count: 80,
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-5',
    name: 'VaultVPN Annual Pass',
    description: 'Zero-log VPN service with wireguard protocol. Includes multi-hop routing and obfuscated servers.',
    sku: 'VVPN-1YR',
    price: 59.99,
    inventory_count: 9999,
    image_url: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'software',
  },
  {
    id: 'p-6',
    name: 'DataShredder Pro',
    description: 'Secure file deletion utility that overwrites data multiple times to prevent forensic recovery.',
    sku: 'DS-PRO-WIN',
    price: 29.99,
    inventory_count: 9999,
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'software',
  },
];

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  user_id: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  items: {
    product_id: string;
    quantity: number;
    price_at_purchase: number;
    product: Product;
  }[];
};

export const MOCK_USER = {
  id: 'u-12345',
  email: 'admin@vaultwares.com',
  first_name: 'Admin',
  last_name: 'User',
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    user_id: MOCK_USER.id,
    total_amount: 338.99,
    status: 'shipped',
    created_at: '2026-02-15T10:30:00Z',
    items: [
      {
        product_id: 'p-1',
        quantity: 1,
        price_at_purchase: 89.99,
        product: MOCK_PRODUCTS[0],
      },
      {
        product_id: 'p-2',
        quantity: 1,
        price_at_purchase: 249.00,
        product: MOCK_PRODUCTS[1],
      }
    ]
  }
];
