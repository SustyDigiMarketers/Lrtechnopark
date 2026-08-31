import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Search,
  Headphones,
  Shield,
  Copy,
  ExternalLink,
  ShieldCheck,
  Server,
  ArrowRight,
  TrendingUp,
  Activity,
  Truck,
  Cpu
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { PageTransition } from '../../components/motion/PageTransition';
import { TechBadge } from '../../components/ui/TechBadge';
import { StaggerContainer, StaggerItem } from '../../components/motion/StaggerContainer';

interface CustomerDashboardPageProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenTracker: (orderId?: string) => void;
}

export const CustomerDashboardPage: React.FC<CustomerDashboardPageProps> = ({
  onNavigate,
  onOpenTracker
}) => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { showToast } = useNotification();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // User-specific orders (or all if admin)
  const userOrders =
    user?.role === 'ADMIN'
      ? orders
      : orders.filter(
          (o) =>
            o.customerId === user?.id ||
            o.companyName.toLowerCase().includes(user?.company.toLowerCase() || '')
        );

  const completedOrders = userOrders.filter((o) => o.status === 'COMPLETED');
  const processingOrders = userOrders.filter(
    (o) =>
      o.status === 'PROCESSING' ||
      o.status === 'UNDER_REVIEW' ||
      o.status === 'SUBMITTED'
  );

  const totalSpent = userOrders.reduce((acc, curr) => acc + (curr.total || 0), 0);

  const handleCopyKey = (key: string, label: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    showToast(
      `${label} Copied`,
      'Warranty reference copied to clipboard for service verification.',
      'success'
    );
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <PageTransition className="pt-32 pb-24 bg-[#07090e] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0d1322] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TechBadge variant="blue" size="sm">
                {user?.role || 'ENTERPRISE CLIENT'}
              </TechBadge>
              <span className="text-xs text-slate-400 font-mono">
                CLIENT ID: {user?.id || 'LR-CUST-2026'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, {user?.displayName || 'Enterprise Partner'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Organization:{' '}
              <strong className="text-white">
                {user?.company || 'Organization Partner'}
              </strong>{' '}
              &bull; Active SLA:{' '}
              <strong className="text-amber-400 font-mono">
                4-Hour On-Site Critical Response
              </strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('portal-order-new')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Procure Hardware & Deployment</span>
            </button>
          </div>
        </div>

        {/* Operational Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold font-mono">
              <span>TOTAL PROCUREMENTS</span>
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black font-mono text-white">
              {userOrders.length}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              GST Invoiced & Dispatched
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold font-mono">
              <span>ACTIVE HARDWARE ASSETS</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black font-mono text-emerald-400">
              {completedOrders.length > 0 ? completedOrders.length * 12 : 24} Units
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Under Active AMC Warranty
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold font-mono">
              <span>IN TRANSIT / STAGING</span>
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black font-mono text-amber-400">
              {processingOrders.length}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Staging & Logistics Queue
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold font-mono">
              <span>TOTAL EXPENDITURE</span>
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black font-mono text-white">
              ₹{totalSpent.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              GST ITC Input Claimable
            </div>
          </div>
        </div>

        {/* Active Hardware Warranty Certificates & Equipment Asset Tags */}
        <div className="p-7 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Hardware Warranty Certificates & Equipment Asset Tags</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official OEM warranty tokens for on-site parts replacement and AMC service dispatch.
              </p>
            </div>
            <TechBadge variant="emerald" size="sm" dot>
              OEM WARRANTY ACTIVE
            </TechBadge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Enterprise Core Switch 24P PoE+ (24 Nodes)</span>
                <TechBadge variant="emerald" size="sm">
                  5-YR LIFETIME WARRANTY
                </TechBadge>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-400 flex items-center justify-between shadow-2xs">
                <span className="truncate font-semibold">LRTP-WRN-SW24P-88E1-2026-TN</span>
                <button
                  type="button"
                  onClick={() => handleCopyKey('LRTP-WRN-SW24P-88E1-2026-TN', 'Warranty Certificate')}
                  className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  title="Copy Warranty Certificate"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-[10px] text-slate-400 flex justify-between font-mono">
                <span>Asset Tag: LR-HW-2026-881</span>
                <span>Valid: 2026 - 2031 (On-Site NBD)</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">4K AI Smart Dome CCTV Surveillance Fleet (16 Cams)</span>
                <TechBadge variant="blue" size="sm" dot>
                  AMC ACTIVE
                </TechBadge>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-400 flex items-center justify-between shadow-2xs">
                <span className="truncate font-semibold">LRTP-WRN-CCTV4K-4421-B883-LIVE</span>
                <button
                  type="button"
                  onClick={() => handleCopyKey('LRTP-WRN-CCTV4K-4421-B883-LIVE', 'Warranty Certificate')}
                  className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  title="Copy Certificate"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-[10px] text-slate-400 flex justify-between font-mono">
                <span>Fleet: 16 Cameras + 32-Ch NVR</span>
                <span>Preventive Maintenance: Quarterly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="p-7 rounded-3xl bg-[#0d1322] border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Hardware Procurements</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Live order fulfillment status, courier dispatch tracking, and GST invoicing
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('portal-orders')}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View All Procurements ({userOrders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {userOrders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm font-bold text-white">
                      {order.id}
                    </span>
                    <TechBadge
                      variant={
                        order.status === 'COMPLETED'
                          ? 'emerald'
                          : order.status === 'PROCESSING'
                          ? 'blue'
                          : 'slate'
                      }
                      size="sm"
                    >
                      {order.status.replace('_', ' ')}
                    </TechBadge>
                  </div>
                  <div className="text-xs text-slate-300 font-normal">
                    Product:{' '}
                    <strong className="text-white">
                      {order.items[0]?.productName || 'LR Commercial Hardware'}
                    </strong>{' '}
                    ({order.items[0]?.quantity || 1} units) &bull; PO:{' '}
                    {order.purchaseOrderNumber || 'N/A'}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left sm:text-right">
                    <div className="text-sm font-mono font-black text-amber-400">
                      ₹{order.total?.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenTracker(order.id)}
                    className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-98"
                  >
                    <Search className="w-3.5 h-3.5 text-amber-400" />
                    <span>Track Pipeline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
