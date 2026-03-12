import { Link } from 'react-router-dom';
import { Shield, Lock, Server, ArrowRight, EyeOff, Cpu, GlobeLock } from 'lucide-react';
import { MOCK_PRODUCTS } from '../store/mockData';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

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
              <Shield className="h-4 w-4" /> RECLAIM YOUR DIGITAL AUTONOMY
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 font-sans text-5xl font-extrabold tracking-tight sm:text-7xl"
          >
            {t("Uncompromising")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {t("Privacy & Security")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 sm:text-xl"
          >
            {t("VaultWares provides enterprise-grade Intrusion Detection Systems, GrapheneOS devices, QubesOS laptops, and zero-telemetry network sentries to protect you from corporate surveillance and malicious actors.")}
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
              {t("BROWSE CATALOG")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/blog"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 font-mono text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
            >
              {t("READ OUR INTEL")}
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
              <h3 className="mb-4 font-mono text-xl font-bold text-white">Zero Telemetry</h3>
              <p className="text-zinc-400">Our hardware and software are stripped of all tracking. No analytics, no data harvesting, no compromise. Your data stays on your device.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-mono text-xl font-bold text-white">Open Source Hardware</h3>
              <p className="text-zinc-400">Trust through transparency. Our laptops and routers are built on verifiable open-source hardware and firmware, ensuring no hidden backdoors.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <GlobeLock className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-mono text-xl font-bold text-white">Network Sovereignty</h3>
              <p className="text-zinc-400">Take back your network with our drop-in Intrusion Detection Systems and Privacy Hubs. Block ISP spying and malicious traffic at the gateway.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="font-mono text-3xl font-bold text-white">FLAGSHIP HARDWARE</h2>
              <p className="mt-2 text-zinc-400">Top-tier security devices for uncompromising protection.</p>
            </div>
            <Link to="/store" className="hidden font-mono text-sm font-bold text-emerald-400 hover:text-emerald-300 sm:block">
              VIEW ALL [→]
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/store" className="font-mono text-sm font-bold text-emerald-400 hover:text-emerald-300">
              VIEW ALL [→]
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
