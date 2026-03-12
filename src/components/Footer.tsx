import { Shield, Lock, Server, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
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
              Sécuriser votre vie numérique avec des solutions matérielles et logicielles de niveau entreprise.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-white">PRODUITS</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/store?category=hardware" className="hover:text-emerald-400">Sécurité Matérielle</Link></li>
              <li><Link to="/store?category=software" className="hover:text-emerald-400">Logiciels de Confidentialité</Link></li>
              <li><Link to="/store" className="hover:text-emerald-400">Tous les Produits</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-white">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-400">Nous Contacter</a></li>
              <li><a href="#" className="hover:text-emerald-400">Politique de Retour</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-white">SÉCURITÉ</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Lock className="h-4 w-4" /> Chiffrement de Bout en Bout</li>
              <li className="flex items-center gap-2"><Server className="h-4 w-4" /> Politique Zéro Log</li>
              <li className="flex items-center gap-2"><Cpu className="h-4 w-4" /> Firmware Open Source</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} VaultWares Inc. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
