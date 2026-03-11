import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../store/mockData';
import ProductCard from '../components/ProductCard';
import { Filter, Search, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch && product.is_active;
    });
  }, [categoryFilter, searchQuery]);

  const setCategory = (category: string) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="mb-4 font-mono text-4xl font-bold tracking-tighter text-white">
            SECURE <span className="text-emerald-400">CATALOG</span>
          </h1>
          <p className="max-w-2xl text-zinc-400">
            Browse our selection of privacy-focused hardware and software. All products are vetted for security and come with our zero-log guarantee.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="mr-2 h-5 w-5 text-zinc-500" />
            <button
              onClick={() => setCategory('all')}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 font-mono text-sm font-medium transition-colors ${
                categoryFilter === 'all' ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              ALL PRODUCTS
            </button>
            <button
              onClick={() => setCategory('hardware')}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 font-mono text-sm font-medium transition-colors ${
                categoryFilter === 'hardware' ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              HARDWARE
            </button>
            <button
              onClick={() => setCategory('software')}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 font-mono text-sm font-medium transition-colors ${
                categoryFilter === 'software' ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              SOFTWARE
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-lg border border-white/10 bg-zinc-900/50 py-2 pl-10 pr-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-zinc-900/20 py-12 text-center">
            <Search className="mb-4 h-12 w-12 text-zinc-600" />
            <h3 className="mb-2 font-mono text-lg font-bold text-white">NO RESULTS FOUND</h3>
            <p className="text-zinc-500">Try adjusting your search or filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategory('all');
              }}
              className="mt-6 font-mono text-sm font-bold text-emerald-400 hover:text-emerald-300"
            >
              [ CLEAR FILTERS ]
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
