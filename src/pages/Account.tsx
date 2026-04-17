import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, LogOut, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import type { Order } from '../store/mockData';

export default function Account() {
  const { t } = useTranslation();
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) {
      navigate('/login', { state: { from: '/account' }, replace: true });
      return;
    }
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setOrders(await res.json());
        }
      } catch {
        // silently fail — orders list stays empty
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user, token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white"
    >
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <User className="h-7 w-7" />
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500">{t('auth.welcome')}</p>
              <h1 className="font-mono text-2xl font-bold text-white">
                {user.first_name} {user.last_name}
              </h1>
              <p className="font-mono text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 font-mono text-sm font-medium text-zinc-400 transition-colors hover:border-red-500/40 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            {t('nav.logout')}
          </button>
        </div>

        {/* Orders */}
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Package className="h-5 w-5 text-emerald-400" />
            <h2 className="font-mono text-xl font-bold text-white">{t('auth.orders_title')}</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/20 py-16 text-center">
              <Package className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
              <p className="font-mono text-zinc-500">{t('auth.no_orders')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-zinc-500">{t('auth.order_id')}</p>
                      <p className="font-mono text-sm font-bold text-emerald-400">{order.id}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-zinc-500">{t('auth.order_date')}</p>
                      <p className="font-mono text-sm text-white">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-zinc-500">{t('auth.order_status')}</p>
                      <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-0.5 font-mono text-xs font-bold uppercase text-emerald-400">
                        {order.status}
                      </span>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-zinc-500">{t('auth.order_total')}</p>
                      <p className="font-mono text-sm font-bold text-white">
                        ${order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="space-y-3 border-t border-white/10 pt-4">
                      {order.items.map((item) => (
                        <div key={item.product_id} className="flex items-center gap-4">
                          {item.product.image_url && (
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="h-12 w-12 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-sans text-sm font-medium text-white">
                              {item.product.name}
                            </p>
                            <p className="font-mono text-xs text-zinc-500">
                              ×{item.quantity} @ ${item.price_at_purchase.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-mono text-sm font-bold text-emerald-400">
                            ${(item.price_at_purchase * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
