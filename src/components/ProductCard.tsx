import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../store/mockData';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Cpu, Code } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:bg-zinc-900/80">
      <Link to={`/product/${product.id}`} className="block aspect-[4/3] overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/80 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
          {product.category === 'hardware' ? <Cpu className="h-3 w-3" /> : <Code className="h-3 w-3" />}
          {product.category === 'hardware' ? t('store.filter_hw') : t('store.filter_sw')}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-sans text-lg font-bold text-white transition-colors hover:text-emerald-400">
              {t(`products.${product.id}.name`, { defaultValue: product.name })}
            </h3>
          </Link>
          <span className="font-mono text-lg font-bold text-white">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="mb-6 line-clamp-2 flex-1 text-sm text-zinc-400">
          {t(`products.${product.id}.desc`, { defaultValue: product.description })}
        </p>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-mono text-xs text-zinc-500">
            {t('product.sku')}: {product.sku}
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.is_active || product.inventory_count === 0}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm font-bold transition-all",
              product.is_active && product.inventory_count > 0
                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                : "cursor-not-allowed bg-zinc-800 text-zinc-500"
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.inventory_count === 0 ? t('product.out_of_stock') : t('common.add')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
