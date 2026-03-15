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
    description: 'Un système de détection d\'intrusion (IDS) passerelle prêt à l\'emploi qui analyse les paquets réseau en temps réel. Propulsé par un processeur quad-core haute performance, 8 Go de RAM et un SSD NVMe de 128 Go, il gère les vitesses gigabit (1 Gbps) sans effort. Détecte les modèles malveillants et vous alerte instantanément par e-mail. Parfait pour les petites entreprises et les foyers soucieux de la confidentialité. Zéro télémétrie, absolument aucun suivi. Support à distance sécurisé en option disponible.',
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
    description: 'Reprenez le contrôle de votre réseau. Cette passerelle prête à l\'emploi comprend un bloqueur de publicités AdGuard à l\'échelle du réseau, un client VPN WireGuard intégré et un cryptage DNS de niveau militaire. Empêchez votre FAI d\'espionner votre trafic et bloquez les traqueurs avant qu\'ils n\'atteignent vos appareils. Peut être utilisé seul ou intégré de manière transparente avec l\'Aegis Network Sentry.',
    sku: 'AEGIS-PRV-01',
    price: 249.99,
    inventory_count: 75,
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-nomad-router',
    name: 'Routeur Mobile Sécurisé Nomad',
    description: 'Anonymat complet où que vous alliez. Un routeur Wi-Fi portable doté d\'un cryptage de trafic complet et d\'une eSIM préconfigurée et intraçable, non liée à votre identité. Créez une bulle réseau privée et sécurisée dans n\'importe quel hôtel, café ou aéroport.',
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
    description: 'Un Google Pixel 8 reconditionné haut de gamme, flashé par des professionnels avec GrapheneOS. Dépouillé de tous les services Google Play et de la télémétrie de suivi. Découvrez le summum de la confidentialité mobile sans sacrifier les capacités des smartphones modernes.',
    sku: 'PHANTOM-P8-01',
    price: 599.99,
    inventory_count: 15,
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-libre-book',
    name: 'Ordinateur Portable Sécurisé LibreBook (QubesOS)',
    description: 'La sécurité par le cloisonnement. Un ordinateur portable entièrement construit à partir de composants matériels open source, fonctionnant sous QubesOS dès la sortie de la boîte. Isolez vos environnements de travail, personnels et sécurisés dans des machines virtuelles appliquées par le matériel.',
    sku: 'LIBRE-QB-01',
    price: 1499.99,
    inventory_count: 10,
    image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    category: 'hardware',
  },
  {
    id: 'p-filter-list',
    name: 'Liste de Filtres Ultime VaultWares',
    description: 'Une liste de filtres méticuleusement organisée pour uBlock Origin et AdGuard. Plus d\'un an de préparation, cette liste offre une sécurité maximale contre les traqueurs et les domaines malveillants tout en corrigeant manuellement les pannes sur les sites Web populaires pour une utilisation maximale. Livré sous forme de lien d\'abonnement sécurisé à mise à jour automatique.',
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
