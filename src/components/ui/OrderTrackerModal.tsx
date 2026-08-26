import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CheckCircle2, Clock, PackageCheck, AlertCircle, ShieldCheck, Printer, Truck, Box, Shield, Server } from 'lucide-react';
import { Order, OrderStatus } from '../../types';
import { useOrders } from '../../context/OrderContext';
import { TechBadge } from './TechBadge';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

const ORDER_STEPS: { status: OrderStatus; label: string; description: string }[] = [
  { status: 'SUBMITTED', label: 'Order Transmitted', description: 'Procurement PO logged and validated by LR Operations Gateway.' },
  { status: 'UNDER_REVIEW', label: 'Engineering Sizing', description: 'Technical team validating hardware Bill of Materials (BOM) & compatibility.' },
  { status: 'APPROVED', label: 'Procurement Cleared', description: 'Commercial terms, GST invoice generation, and warehouse allocation confirmed.' },
  { status: 'PROCESSING', label: 'Staging & Burn-In Testing', description: 'Firmware flashing, optical telemetry staging, and 24-hour hardware burn-in.' },
  { status: 'COMPLETED', label: 'Dispatched & Commissioned', description: 'Insured freight dispatched with tracking ID and on-site warranty activated.' }
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose, initialOrderId = '' }) => {
  const { fetchOrderById } = useOrders();
  const [searchId, setSearchId] = useState(initialOrderId);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // If initialOrderId is supplied, look it up automatically
  React.useEffect(() => {
    if (initialOrderId) {
      setSearchId(initialOrderId);
      fetchOrderById(initialOrderId).then((o) => {
        if (o) setSearchedOrder(o);
      });
    }
  }, [initialOrderId, fetchOrderById]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchId.trim()) return;

    setIsSearching(true);
    setErrorMsg('');
    try {
      const order = await fetchOrderById(searchId.trim());
      if (order) {
        setSearchedOrder(order);
      } else {
        setSearchedOrder(null);
        setErrorMsg(`No order found matching "${searchId.trim()}". Please verify your Order Reference ID (e.g. LRTP-2026-000101).`);
      }
    } catch {
      setErrorMsg('Failed to connect to tracking API.');
    } finally {
      setIsSearching(false);
    }
  };

  const getStepStatus = (stepStatus: OrderStatus, currentStatus: OrderStatus) => {
    const statusOrder: OrderStatus[] = ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PROCESSING', 'COMPLETED'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (currentStatus === 'CANCELLED' || currentStatus === 'REJECTED') {
      return 'error';
    }
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden z-10 my-8 text-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 bg-[#fafbff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a56db]">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Live Hardware Order & Staging Tracking</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Real-time status synced with Google Sheets & Logistics Dispatch</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-7 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter Order Reference ID (e.g. LRTP-2026-000101)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching || !searchId.trim()}
                  className="px-6 py-3 rounded-full bg-[#1a56db] hover:bg-[#1545b3] disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-blue-600/20 active:scale-98"
                >
                  {isSearching ? <Clock className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  <span>Track Pipeline</span>
                </button>
              </form>

              {/* Sample Quick Lookup Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Sample orders to test:</span>
                {['LRTP-2026-000101', 'LRTP-2026-000102', 'LRTP-2026-000103'].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSearchId(id);
                      fetchOrderById(id).then((o) => setSearchedOrder(o));
                    }}
                    className="px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1a56db] font-mono text-[11px] font-bold border border-blue-100 transition-colors cursor-pointer"
                  >
                    {id}
                  </button>
                ))}
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                  <div>
                    <p className="font-bold">Order Not Found</p>
                    <p className="text-xs text-rose-700 mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              {/* Order Result Card */}
              {searchedOrder && (
                <div className="space-y-6 pt-2">
                  {/* Summary Bar */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-bold font-mono text-slate-900">{searchedOrder.id}</span>
                        <TechBadge
                          variant={
                            searchedOrder.status === 'COMPLETED'
                              ? 'emerald'
                              : searchedOrder.status === 'PROCESSING'
                              ? 'blue'
                              : 'slate'
                          }
                          size="sm"
                        >
                          {searchedOrder.status.replace('_', ' ')}
                        </TechBadge>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 font-normal">
                        Client: <strong className="text-slate-900">{searchedOrder.companyName}</strong> ({searchedOrder.customerName})
                      </p>
                    </div>

                    <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                      <div className="text-xs text-slate-500 font-mono">Total (Incl. GST)</div>
                      <div className="text-lg font-black font-mono text-[#1a56db]">₹{searchedOrder.total.toLocaleString('en-IN')}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">PO: {searchedOrder.purchaseOrderNumber || 'Standard'}</div>
                    </div>
                  </div>

                  {/* Logistics Tracking Bar */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-[#1a56db]" />
                      <span>Logistics: <strong className="text-slate-900">{searchedOrder.courierPartner || 'Blue Dart Apex'}</strong> &bull; Tracking #: <span className="font-mono font-bold text-[#1a56db]">{searchedOrder.dispatchTrackingNumber || 'BDT-883920194-IN'}</span></span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">
                      Destination: {searchedOrder.shippingAddress || 'Chennai Campus'}
                    </div>
                  </div>

                  {/* Step Timeline */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-bold">
                      Fulfillment & Staging Pipeline
                    </h4>
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {ORDER_STEPS.map((step, idx) => {
                        const stepState = getStepStatus(step.status, searchedOrder.status);
                        return (
                          <div key={step.status} className="relative flex items-start gap-4">
                            <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              stepState === 'completed' ? 'bg-emerald-600 text-white' :
                              stepState === 'current' ? 'bg-[#1a56db] text-white ring-4 ring-blue-100 animate-pulse' :
                              'bg-slate-200 text-slate-500'
                            }`}>
                              {stepState === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${
                                  stepState === 'completed' || stepState === 'current' ? 'text-slate-900' : 'text-slate-400'
                                }`}>
                                  {step.label}
                                </span>
                                {stepState === 'current' && (
                                  <TechBadge variant="blue" size="sm">
                                    CURRENT STAGE
                                  </TechBadge>
                                )}
                              </div>
                              <p className={`text-xs mt-0.5 ${
                                stepState === 'completed' || stepState === 'current' ? 'text-slate-600' : 'text-slate-400'
                              }`}>
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items in this Order */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-bold">
                      Hardware Units & Staging Configuration
                    </h4>
                    <div className="space-y-2">
                      {searchedOrder.items.map((item, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{item.productName}</div>
                            <div className="text-slate-500 text-xs mt-0.5">
                              Code: <span className="font-mono text-[#1a56db] font-semibold">{item.productCode}</span> &bull; {item.deploymentTier?.replace(/_/g, ' ')}
                            </div>
                            {item.configurationNotes && (
                              <div className="text-[11px] text-slate-500 italic mt-1 font-normal">&ldquo;{item.configurationNotes}&rdquo;</div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-slate-900">Qty: {item.quantity}</div>
                            <div className="text-xs font-mono text-slate-500">₹{item.totalPrice.toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational status */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-normal">3-Year On-Site OEM Hardware Warranty Active</span>
                    </div>
                    <TechBadge variant="emerald" size="sm" dot>
                      LIVE
                    </TechBadge>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-7 py-4 border-t border-slate-100 bg-[#fafbff] text-xs text-slate-500">
              <span>Procurement Hotline: <strong className="text-slate-900 font-mono">+91 98400 12345</strong></span>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
