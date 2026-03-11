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
    id: 'p-sentry-ids',
    name: 'Aegis Network Sentry (IDS)',
    description: 'A drop-in Intrusion Detection System (IDS) gateway that analyzes network packets in real-time. Powered by a high-performance quad-core processor, 8GB RAM, and a 128GB NVMe SSD, it handles gigabit speeds (1Gbps) effortlessly. Detects malicious patterns and alerts you instantly via email. Perfect for small businesses and privacy-conscious homes. Zero telemetry, absolutely no tracking. Optional secure remote support available.',
    sku: 'AEGIS-IDS-01',
    price: 299.99,
    inventory_count: 50,
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-privacy-hub',
    name: 'Aegis Privacy Hub',
    description: 'Take back your network. This drop-in gateway features network-wide AdGuard ad-blocking, a built-in WireGuard VPN client, and military-grade DNS encryption. Prevent your ISP from spying on your traffic and block trackers before they reach your devices. Can be used standalone or seamlessly integrated with the Aegis Network Sentry.',
    sku: 'AEGIS-PRV-01',
    price: 249.99,
    inventory_count: 75,
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-nomad-router',
    name: 'Nomad Secure Mobile Router',
    description: 'Complete anonymity wherever you go. A portable Wi-Fi router featuring full traffic encryption and a pre-configured, untraceable eSIM not linked to your identity. Create a secure, private network bubble in any hotel, cafe, or airport.',
    sku: 'NOMAD-MR-01',
    price: 349.99,
    inventory_count: 30,
    image_url: 'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-phantom-pixel',
    name: 'Phantom Pixel 8 (GrapheneOS)',
    description: 'A premium refurbished Google Pixel 8, professionally flashed with GrapheneOS. Stripped of all Google Play Services and tracking telemetry. Experience the pinnacle of mobile privacy without sacrificing modern smartphone capabilities.',
    sku: 'PHANTOM-P8-01',
    price: 599.99,
    inventory_count: 15,
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-libre-book',
    name: 'LibreBook Secure Laptop (QubesOS)',
    description: 'Security through compartmentalization. A laptop built entirely from open-source hardware components, running QubesOS out of the box. Isolate your work, personal, and secure environments into hardware-enforced virtual machines.',
    sku: 'LIBRE-QB-01',
    price: 1499.99,
    inventory_count: 10,
    image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-filter-list',
    name: 'VaultWares Ultimate Filter List',
    description: 'A meticulously curated filter list for uBlock Origin and AdGuard. Over a year in the making, this list provides maximum security against trackers and malware domains while manually fixing breakages on popular websites for maximum usability. Delivered as a secure, auto-updating subscription link.',
    sku: 'VW-FILTER-01',
    price: 19.99,
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
    total_amount: 549.98,
    status: 'shipped',
    created_at: '2026-02-15T10:30:00Z',
    items: [
      {
        product_id: 'p-sentry-ids',
        quantity: 1,
        price_at_purchase: 299.99,
        product: MOCK_PRODUCTS[0],
      },
      {
        product_id: 'p-privacy-hub',
        quantity: 1,
        price_at_purchase: 249.99,
        product: MOCK_PRODUCTS[1],
      }
    ]
  }
];
