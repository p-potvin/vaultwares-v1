import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, CreditCard, Lock, CheckCircle, Download, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [receiptEmail, setReceiptEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          items,
          total_amount: totalPrice,
          user_id: 'guest',
        }),
      });

      if (response.ok) {
        const generatedOrderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setOrderId(generatedOrderId);
        setReceiptEmail(formData.email);
        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
      // In a real app, show error toast here
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptEmail) return;
    // In a real app, this would trigger the backend to send the email
    setEmailSent(true);
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-black text-white px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex w-full max-w-md flex-col items-center"
        >
          <CheckCircle className="mb-6 h-24 w-24 text-emerald-500" />
          <h1 className="mb-2 font-mono text-4xl font-bold text-white">PAIEMENT RÉUSSI</h1>
          <p className="mb-8 text-zinc-400">
            La commande <span className="font-mono text-emerald-400">{orderId}</span> a été traitée de manière sécurisée.
          </p>

          <div className="w-full space-y-6 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-left">
            <h3 className="font-mono text-lg font-bold text-white">OPTIONS DE REÇU</h3>
            
            <button 
              onClick={() => window.print()} 
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 font-mono text-sm font-bold text-black transition-colors hover:bg-zinc-200"
            >
              <Download className="h-4 w-4" /> ENREGISTRER EN PDF / IMPRIMER
            </button>

            <div className="border-t border-white/10 pt-6">
              <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">ENVOYER LE REÇU PAR EMAIL À :</label>
              <form onSubmit={handleSendEmail} className="flex gap-2">
                <input
                  type="email"
                  value={receiptEmail}
                  onChange={(e) => setReceiptEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button 
                  type="submit"
                  disabled={emailSent}
                  className="flex items-center justify-center rounded-lg bg-emerald-500 px-6 font-mono text-sm font-bold text-black transition-colors hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                  {emailSent ? <CheckCircle className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </button>
              </form>
              {emailSent && (
                <p className="mt-2 font-mono text-xs text-emerald-400">Reçu envoyé avec succès.</p>
              )}
            </div>
          </div>

          <button 
            onClick={() => navigate('/')} 
            className="mt-8 flex items-center gap-2 font-mono text-sm font-bold text-zinc-400 transition-colors hover:text-white"
          >
            RETOUR À LA BOUTIQUE <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/store');
    return null;
  }

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
            PAIEMENT <span className="text-emerald-400">SÉCURISÉ</span>
          </h1>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Lock className="h-4 w-4 text-emerald-500" />
            <span>Connexion Chiffrée AES 256 bits</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8">
                <h2 className="mb-6 font-mono text-xl font-bold text-white">COORDONNÉES</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">ADRESSE EMAIL</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="secure@example.com"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">PRÉNOM</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">NOM DE FAMILLE</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8">
                <h2 className="mb-6 font-mono text-xl font-bold text-white">ADRESSE DE LIVRAISON</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">ADRESSE</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">VILLE</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">PAYS</label>
                    <input
                      required
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">CODE POSTAL</label>
                    <input
                      required
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-mono text-xl font-bold text-white">DÉTAILS DU PAIEMENT</h2>
                  <CreditCard className="h-6 w-6 text-zinc-500" />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">NUMÉRO DE CARTE</label>
                    <input
                      required
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="0000 0000 0000 0000"
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">DATE D'EXPIRATION</label>
                    <input
                      required
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold text-zinc-400">CVC</label>
                    <input
                      required
                      type="text"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 font-mono text-sm font-bold text-black transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 print:hidden"
              >
                {isProcessing ? (
                  <span className="animate-pulse">TRAITEMENT DE LA TRANSACTION CHIFFRÉE...</span>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    PAYER ${totalPrice.toFixed(2)} EN TOUTE SÉCURITÉ
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
              <h2 className="mb-6 font-mono text-xl font-bold text-white">RÉSUMÉ DE LA COMMANDE</h2>
              
              <div className="mb-6 max-h-[40vh] space-y-4 overflow-y-auto border-b border-white/10 pb-6 pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-white/10">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <p className="line-clamp-2 font-sans text-sm font-bold text-white">{item.product.name}</p>
                        <p className="font-mono text-xs text-zinc-500">{item.product.sku}</p>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-emerald-400">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Sous-total</span>
                  <span className="font-mono text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Livraison</span>
                  <span className="font-mono text-white">Gratuit</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Taxes</span>
                  <span className="font-mono text-white">$0.00</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-4">
                  <span className="font-sans text-xl font-bold text-white">Total</span>
                  <span className="font-mono text-2xl font-bold text-emerald-400">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
