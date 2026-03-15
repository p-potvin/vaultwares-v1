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
              {t('footer.desc')}
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-white">{t('footer.products')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/store?category=hardware" className="hover:text-emerald-400">{t('footer.prod_hw')}</Link></li>
              <li><Link to="/store?category=software" className="hover:text-emerald-400">{t('footer.prod_sw')}</Link></li>
              <li><Link to="/store" className="hover:text-emerald-400">{t('footer.prod_all')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-white">{t('footer.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400">{t('footer.sup_docs')}</a></li>
              <li><a href="#" className="hover:text-emerald-400">{t('footer.sup_contact')}</a></li>
              <li><a href="#" className="hover:text-emerald-400">{t('footer.sup_return')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-white">{t('footer.security')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Lock className="h-4 w-4" /> {t('footer.sec_e2e')}</li>
              <li className="flex items-center gap-2"><Server className="h-4 w-4" /> {t('footer.sec_logs')}</li>
              <li className="flex items-center gap-2"><Cpu className="h-4 w-4" /> {t('footer.sec_oss')}</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
