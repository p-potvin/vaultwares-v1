import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Globe, User, LogOut, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 text-emerald-400">
            <img
              src="https://raw.githubusercontent.com/p-potvin/vaultwares-docs/main/logo/vaultwares-logo.svg"
              alt="VaultWares"
              className="h-8 w-auto"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                (e.currentTarget.nextElementSibling as HTMLElement | null)?.removeAttribute('data-hidden');
              }}
            />
            <span className="font-mono text-xl font-bold tracking-tighter text-white" data-hidden>
              VAULT<span className="text-emerald-400">WARES</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link to="/store" className="font-mono text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400">
            {t('nav.store')}
          </Link>
          <Link to="/blog" className="font-mono text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400">
            {t('nav.intel')}
          </Link>
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 font-mono text-xs font-medium text-zinc-400 transition-colors hover:text-emerald-400"
            >
              <Globe className="h-4 w-4" />
              {i18n.language.toUpperCase()}
            </button>
            {user ? (
              <>
                <Link to="/account" className="flex items-center gap-1.5 font-mono text-xs font-medium text-zinc-400 transition-colors hover:text-emerald-400">
                  <User className="h-4 w-4" />
                  {user.first_name}
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 font-mono text-xs font-medium text-zinc-400 transition-colors hover:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-1.5 font-mono text-xs font-medium text-zinc-400 transition-colors hover:text-emerald-400">
                <LogIn className="h-4 w-4" />
                {t('nav.login')}
              </Link>
            )}
            <Link to="/cart" className="relative text-zinc-400 transition-colors hover:text-white">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 font-mono text-xs font-medium text-zinc-400 transition-colors hover:text-emerald-400"
          >
            <Globe className="h-4 w-4" />
            {i18n.language.toUpperCase()}
          </button>
          <Link to="/cart" className="relative text-zinc-400 transition-colors hover:text-white">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-zinc-400 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="border-b border-white/10 bg-black px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              to="/store"
              onClick={() => setIsMenuOpen(false)}
              className="font-mono text-sm font-medium text-zinc-400 hover:text-emerald-400"
            >
              {t('nav.store')}
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="font-mono text-sm font-medium text-zinc-400 hover:text-emerald-400"
            >
              {t('nav.intel')}
            </Link>
            {user ? (
              <>
                <Link
                  to="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 font-mono text-sm font-medium text-zinc-400 hover:text-emerald-400"
                >
                  <User className="h-4 w-4" />
                  {t('nav.account')}
                </Link>
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="flex items-center gap-2 font-mono text-sm font-medium text-zinc-400 hover:text-red-400 text-left"
                >
                  <LogOut className="h-4 w-4" />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 font-mono text-sm font-medium text-zinc-400 hover:text-emerald-400"
              >
                <LogIn className="h-4 w-4" />
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
