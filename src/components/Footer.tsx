import { Shield, Lock, Server, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/10 bg-black py-12 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-emerald-400">
              <Shield className="h-6 w-6" />
              <span className="font-mono text-lg font-bold tracking-tighter text-white">
                VAULT<span className="text-emerald-400">WARES</span>
              </span>
            </Link>
            <p className="text-sm">
              {t("Securing your digital life with enterprise-grade hardware and software solutions.")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-white">{t("PRODUCTS")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/store?category=hardware" className="hover:text-emerald-400">{t("Hardware Security")}</Link></li>
              <li><Link to="/store?category=software" className="hover:text-emerald-400">{t("Privacy Software")}</Link></li>
              <li><Link to="/store" className="hover:text-emerald-400">{t("All Products")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-white">{t("SUPPORT")}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400">{t("Documentation")}</a></li>
              <li><a href="#" className="hover:text-emerald-400">{t("Contact Us")}</a></li>
              <li><a href="#" className="hover:text-emerald-400">{t("Returns Policy")}</a></li>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-white">SECURITY</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Lock className="h-4 w-4" /> End-to-End Encrypted</li>
              <li className="flex items-center gap-2"><Server className="h-4 w-4" /> Zero-Log Policy</li>
              <li className="flex items-center gap-2"><Cpu className="h-4 w-4" /> Open Source Firmware</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} VaultWares Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
