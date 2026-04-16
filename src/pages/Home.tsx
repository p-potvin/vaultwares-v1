import { Link } from 'react-router-dom';
import { Shield, ArrowRight, EyeOff, Cpu, GlobeLock } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '../store/mockData';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: Product[]) => setFeaturedProducts(data.slice(0, 3)))
      .catch((err) => console.error('[Home] Failed to fetch products:', err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col bg-black text-white"
    >
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-black px-4 py-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-no-repeat opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-sm font-medium text-emerald-400 backdrop-blur-sm">
              <Shield className="h-4 w-4" /> {t('home.hero_tag')}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 font-sans text-5xl font-extrabold tracking-tight sm:text-7xl"
          >
            {t('home.hero_title_1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {t('home.hero_title_2')}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 sm:text-xl"
          >
            {t('home.hero_desc')}
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/store"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 font-mono text-sm font-bold text-black transition-all hover:bg-emerald-400 sm:w-auto"
            >
              {t('home.btn_catalog')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/blog"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 font-mono text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
            >
              {t('home.btn_intel')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-white/10 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <EyeOff className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-mono text-xl font-bold text-white">{t('home.feat_1_title')}</h3>
              <p className="text-zinc-400">{t('home.feat_1_desc')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-mono text-xl font-bold text-white">{t('home.feat_2_title')}</h3>
              <p className="text-zinc-400">{t('home.feat_2_desc')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <GlobeLock className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-mono text-xl font-bold text-white">{t('home.feat_3_title')}</h3>
              <p className="text-zinc-400">{t('home.feat_3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="font-mono text-3xl font-bold text-white">{t('home.featured_hw')}</h2>
              <p className="mt-2 text-zinc-400">{t('home.featured_hw_desc')}</p>
            </div>
            <Link to="/store" className="hidden font-mono text-sm font-bold text-emerald-400 hover:text-emerald-300 sm:block">
              {t('home.view_all')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/store" className="font-mono text-sm font-bold text-emerald-400 hover:text-emerald-300">
              {t('home.view_all')}
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
