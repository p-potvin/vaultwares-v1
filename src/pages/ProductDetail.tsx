import { useParams, Link } from 'react-router-dom';
import { Product } from '../store/mockData';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, ShieldCheck, Cpu, Code, Package, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black text-white">
        <h1 className="mb-4 font-mono text-4xl font-bold text-emerald-500">404</h1>
        <p className="mb-8 text-zinc-400">PRODUCT NOT FOUND</p>
        <Link to="/store" className="font-mono text-sm font-bold text-emerald-400 hover:text-emerald-300">
          [ RETURN TO STORE ]
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/store" className="mb-8 inline-flex items-center gap-2 font-mono text-sm font-medium text-zinc-400 hover:text-emerald-400">
          <ArrowLeft className="h-4 w-4" /> BACK TO CATALOG
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                {product.category === 'hardware' ? <Cpu className="h-3 w-3" /> : <Code className="h-3 w-3" />}
                {product.category}
              </span>
              <span className="font-mono text-xs text-zinc-500">SKU: {product.sku}</span>
            </div>

            <h1 className="mb-4 font-sans text-4xl font-bold text-white sm:text-5xl">{product.name}</h1>
            <p className="mb-8 font-mono text-3xl font-bold text-emerald-400">${product.price.toFixed(2)}</p>

            <div className="mb-8 border-y border-white/10 py-6">
              <h3 className="mb-4 font-mono text-sm font-bold text-zinc-400">DESCRIPTION</h3>
              <p className="text-lg leading-relaxed text-zinc-300">{product.description}</p>
            </div>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center rounded-lg border border-white/10 bg-zinc-900 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-md font-mono text-lg font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white"
                >
                  -
                </button>
                <span className="flex h-10 w-16 items-center justify-center font-mono text-lg font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.inventory_count}
                  className="flex h-10 w-10 items-center justify-center rounded-md font-mono text-lg font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.is_active || product.inventory_count === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 font-mono text-sm font-bold text-black transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inventory_count === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span>Verified Secure</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Package className="h-5 w-5 text-emerald-500" />
                <span>
                  {product.inventory_count > 0
                    ? `${product.inventory_count} in stock`
                    : 'Currently unavailable'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
