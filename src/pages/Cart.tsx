import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingCart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-mono text-4xl font-bold tracking-tighter text-white">
          {t('cart.title')}
        </h1>

        {items.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-900/20 py-12 text-center">
            <ShoppingCart className="mb-6 h-16 w-16 text-zinc-600" />
            <h2 className="mb-4 font-mono text-2xl font-bold text-white">{t('cart.empty')}</h2>
            <p className="mb-8 text-zinc-400">{t('cart.empty_desc')}</p>
            <Link
              to="/store"
              className="rounded-lg bg-emerald-500 px-8 py-4 font-mono text-sm font-bold text-black transition-all hover:bg-emerald-400"
            >
              {t('cart.browse')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
                <div className="hidden grid-cols-12 gap-4 border-b border-white/10 pb-4 font-mono text-xs font-bold text-zinc-500 sm:grid">
                  <div className="col-span-6">PRODUIT</div>
                  <div className="col-span-3 text-center">QUANTITÉ</div>
                  <div className="col-span-2 text-right">PRIX</div>
                  <div className="col-span-1"></div>
                </div>

                <div className="divide-y divide-white/10">
                  {items.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-1 items-center gap-4 py-6 sm:grid-cols-12">
                      <div className="col-span-1 flex items-center gap-4 sm:col-span-6">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-sans text-lg font-bold text-white hover:text-emerald-400"
                          >
                            {t(`products.${item.product.id}.name`, { defaultValue: item.product.name })}
                          </Link>
                          <p className="font-mono text-xs text-zinc-500">{t('product.sku')}: {item.product.sku}</p>
                        </div>
                      </div>

                      <div className="col-span-1 flex items-center justify-between sm:col-span-3 sm:justify-center">
                        <span className="font-mono text-xs text-zinc-500 sm:hidden">QTÉ:</span>
                        <div className="flex items-center rounded-lg border border-white/10 bg-black p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded font-mono text-lg font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white"
                          >
                            -
                          </button>
                          <span className="flex h-8 w-12 items-center justify-center font-mono text-sm font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.inventory_count}
                            className="flex h-8 w-8 items-center justify-center rounded font-mono text-lg font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 flex items-center justify-between sm:col-span-2 sm:justify-end">
                        <span className="font-mono text-xs text-zinc-500 sm:hidden">PRIX:</span>
                        <span className="font-mono text-lg font-bold text-emerald-400">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="col-span-1 flex justify-end sm:col-span-1">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-zinc-500 transition-colors hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
                <h2 className="mb-6 font-mono text-xl font-bold text-white">{t('cart.summary')}</h2>

                <div className="mb-6 space-y-4 border-b border-white/10 pb-6">
                  <div className="flex justify-between text-zinc-400">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-mono text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>{t('cart.shipping')}</span>
                    <span className="font-mono text-emerald-400">{t('cart.shipping_calc')}</span>
                  </div>
                </div>

                <div className="mb-8 flex justify-between">
                  <span className="font-sans text-xl font-bold text-white">{t('cart.total')}</span>
                  <span className="font-mono text-2xl font-bold text-emerald-400">${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 font-mono text-sm font-bold text-black transition-all hover:bg-emerald-400"
                >
                  {t('cart.checkout')} <ArrowRight className="h-4 w-4" />
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{t('cart.secure_payment')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
