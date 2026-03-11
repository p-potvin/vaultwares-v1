import { useState } from 'react';
import { PackageSearch, MapPin, CheckCircle2, Truck, AlertCircle, Loader2 } from 'lucide-react';

interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

interface TrackingData {
  trackingNumber: string;
  carrier: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'exception';
  estimatedDelivery: string;
  events: TrackingEvent[];
}

export default function TrackingWidget() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const response = await fetch(`/api/track/${trackingNumber}`);
      if (!response.ok) {
        throw new Error('Tracking information not found');
      }
      const data = await response.json();
      setTrackingData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tracking data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
          <PackageSearch className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-mono text-xl font-bold text-white">SECURE TRACKING</h2>
          <p className="font-mono text-xs text-zinc-400">End-to-end encrypted shipment visibility</p>
        </div>
      </div>

      <form onSubmit={handleTrack} className="mb-8 flex gap-3">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter tracking number (e.g., VW-12345)"
          className="flex-1 rounded-lg border border-white/10 bg-black px-4 py-3 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={isLoading || !trackingNumber.trim()}
          className="flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 font-mono text-sm font-bold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'TRACK'}
        </button>
      </form>

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {trackingData && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-black/50 p-4 sm:grid-cols-4">
            <div>
              <p className="font-mono text-xs text-zinc-500">CARRIER</p>
              <p className="font-mono font-bold text-white">{trackingData.carrier}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500">STATUS</p>
              <p className={`font-mono font-bold uppercase ${
                trackingData.status === 'delivered' ? 'text-emerald-400' :
                trackingData.status === 'exception' ? 'text-red-400' :
                'text-blue-400'
              }`}>
                {trackingData.status.replace('_', ' ')}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-2">
              <p className="font-mono text-xs text-zinc-500">ESTIMATED DELIVERY</p>
              <p className="font-mono font-bold text-white">{new Date(trackingData.estimatedDelivery).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="relative space-y-0 pl-4 before:absolute before:bottom-0 before:left-[23px] before:top-2 before:w-0.5 before:bg-white/10">
            {trackingData.events.map((event, index) => (
              <div key={index} className="relative flex items-start gap-6 pb-8 last:pb-0">
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 ring-4 ring-black">
                  {index === 0 && trackingData.status === 'delivered' ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : index === 0 ? (
                    <Truck className="h-4 w-4 text-blue-400" />
                  ) : (
                    <MapPin className="h-4 w-4 text-zinc-500" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-sans font-bold text-white">{event.status}</p>
                    <p className="font-mono text-xs text-zinc-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{event.description}</p>
                  <p className="mt-1 font-mono text-xs text-zinc-500">{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
