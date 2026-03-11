import { useState, useEffect } from 'react';
import { MOCK_USER, Order } from '../store/mockData';
import { User, Package, Settings, LogOut, ShieldAlert, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
            SECURE <span className="text-emerald-400">DASHBOARD</span>
          </h1>
          <p className="text-zinc-400">
            Welcome back, {MOCK_USER.first_name}. Your connection is encrypted.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 font-mono text-sm font-bold transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  ORDER HISTORY
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 font-mono text-sm font-bold transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <User className="h-5 w-5" />
                  PROFILE SETTINGS
                </button>
                <div className="my-4 border-t border-white/10"></div>
                <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-mono text-sm font-bold text-red-400 transition-colors hover:bg-red-500/10">
                  <LogOut className="h-5 w-5" />
                  SECURE LOGOUT
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="mb-6 font-mono text-xl font-bold text-white">RECENT ORDERS</h2>
                {isLoading ? (
                  <div className="flex min-h-[20vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/20 p-12 text-center">
                    <p className="font-mono text-zinc-500">NO ORDERS FOUND</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
                      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                        <div>
                          <p className="font-mono text-sm text-zinc-400">ORDER ID</p>
                          <p className="font-mono font-bold text-white">{order.id}</p>
                        </div>
                        <div>
                          <p className="font-mono text-sm text-zinc-400">DATE</p>
                          <p className="font-mono font-bold text-white">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-sm text-zinc-400">TOTAL</p>
                          <p className="font-mono font-bold text-emerald-400">${order.total_amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="font-mono text-sm text-zinc-400">STATUS</p>
                          <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${
                            order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                            order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                            order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="h-16 w-16 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1">
                              <p className="font-sans font-bold text-white">{item.product.name}</p>
                              <p className="font-mono text-xs text-zinc-500">QTY: {item.quantity}</p>
                            </div>
                            <p className="font-mono font-bold text-white">${item.price_at_purchase.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-8">
                <h2 className="mb-6 font-mono text-xl font-bold text-white">PROFILE SETTINGS</h2>
                
                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8">
                  <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-2xl font-bold text-emerald-400">
                      {MOCK_USER.first_name[0]}{MOCK_USER.last_name[0]}
                    </div>
                    <div>
                      <p className="font-sans text-xl font-bold text-white">{MOCK_USER.first_name} {MOCK_USER.last_name}</p>
                      <p className="font-mono text-sm text-zinc-400">{MOCK_USER.email}</p>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">FIRST NAME</label>
                        <input
                          type="text"
                          defaultValue={MOCK_USER.first_name}
                          className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">LAST NAME</label>
                        <input
                          type="text"
                          defaultValue={MOCK_USER.last_name}
                          className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">EMAIL ADDRESS</label>
                        <input
                          type="email"
                          defaultValue={MOCK_USER.email}
                          disabled
                          className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-zinc-500 opacity-50"
                        />
                        <p className="mt-2 flex items-center gap-1 font-mono text-xs text-zinc-500">
                          <ShieldAlert className="h-3 w-3" /> Email changes require 2FA verification.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end border-t border-white/10 pt-6">
                      <button
                        type="button"
                        className="rounded-lg bg-emerald-500 px-6 py-3 font-mono text-sm font-bold text-black transition-colors hover:bg-emerald-400"
                      >
                        SAVE CHANGES
                      </button>
                    </div>
                  </form>
                </div>

                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 sm:p-8">
                  <h3 className="mb-2 font-mono text-lg font-bold text-red-400">DANGER ZONE</h3>
                  <p className="mb-6 text-sm text-zinc-400">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <button className="rounded-lg border border-red-500/50 bg-red-500/10 px-6 py-3 font-mono text-sm font-bold text-red-400 transition-colors hover:bg-red-500 hover:text-white">
                    DELETE ACCOUNT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
