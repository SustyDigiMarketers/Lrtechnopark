import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, ShieldCheck, CheckCircle2, Copy, Check, AlertTriangle, Package, Truck, Shield } from 'lucide-react';
import { Order } from '../../types';
import { useNotification } from '../../context/NotificationContext';
import { TechBadge } from './TechBadge';

interface GstInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const GstInvoiceModal: React.FC<GstInvoiceModalProps> = ({ isOpen, onClose, order }) => {
  const { showToast } = useNotification();
  const [copiedToken, setCopiedToken] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!order) return null;

  const handleCopyWarranty = (certId: string) => {
    navigator.clipboard.writeText(certId);
    setCopiedToken(true);
    showToast('Warranty ID Copied', 'Hardware warranty certificate ID copied to clipboard.', 'success');
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Tax calculation variables
  const subtotal = order.subtotal || order.items.reduce((acc, i) => acc + i.totalPrice, 0);
  const tax = order.tax || Math.round(subtotal * 0.18);
  const total = order.total || subtotal + tax;
  const isInterState = order.gstBreakdown?.isInterState ?? (order.shippingAddress && !order.shippingAddress.toLowerCase().includes('tamil nadu') && !order.shippingAddress.toLowerCase().includes('chennai'));

  const warrantyCert = order.warrantyCertificateId || `LRTP-WRN-${order.id.replace(/[^a-zA-Z0-9]/g, '')}-2026`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto print:p-0 print:m-0 print:absolute print:inset-0 print:bg-white">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs print:hidden"
          />

          {/* Invoice Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-3xl rounded-3xl bg-[#0d1322] border border-slate-800 shadow-2xl overflow-hidden z-10 my-8 text-white print:shadow-none print:border-none print:bg-white print:text-black print:my-0 print:max-w-full print:rounded-none"
          >
            {/* Top Modal Controls */}
            <div className="flex items-center justify-between px-7 py-4 border-b border-slate-800 bg-slate-900/90 print:hidden">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GST TAX INVOICE & WARRANTY CERTIFICATE</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-1.5 px-4 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Body */}
            <div className="p-8 space-y-6 max-h-[85vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-800 print:border-slate-300">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center font-black text-slate-950 text-xs print:bg-black print:text-white">
                      LR
                    </div>
                    <span className="text-lg font-black text-white tracking-tight print:text-black">
                      LR TECHNO PARK PVT LTD
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 print:text-slate-600 font-normal">
                    Olympia Tech Park, Guindy, Chennai, Tamil Nadu - 600032, India
                  </p>
                  <p className="text-xs text-slate-400 print:text-slate-600 font-mono">
                    GSTIN: <strong className="text-white print:text-black">33AAACL8890K1ZV</strong> | State Code: 33 (TN)
                  </p>
                  <p className="text-xs text-slate-400 print:text-slate-600 font-normal">
                    Email: billing@lrtechnopark.com | Procurement Hotline: +91 98400 12345
                  </p>
                </div>

                <div className="sm:text-right">
                  <TechBadge variant="amber" size="sm">
                    TAX / GST INVOICE
                  </TechBadge>
                  <h2 className="text-base font-bold text-white font-mono mt-1 print:text-black">
                    {order.id}
                  </h2>
                  <p className="text-xs text-slate-400 print:text-slate-600 font-mono">
                    Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                  </p>
                  <p className="text-xs text-slate-400 print:text-slate-600 font-mono">
                    PO Ref: {order.purchaseOrderNumber || 'DIRECT-PO'}
                  </p>
                </div>
              </div>

              {/* Bill To / Ship To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-900 border border-slate-800 print:bg-transparent print:border-slate-300 text-xs">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400 print:text-slate-600 font-mono">
                    BILLED TO (BUYER):
                  </div>
                  <div className="font-bold text-white print:text-black text-sm">{order.companyName}</div>
                  <div className="text-slate-300 print:text-black">Attn: {order.customerName}</div>
                  <div className="text-slate-400 print:text-slate-600">{order.customerEmail}</div>
                  <div className="text-slate-400 print:text-slate-600">{order.phone}</div>
                  <div className="font-mono text-slate-300 print:text-black pt-1">
                    GSTIN / Tax ID: <strong className="text-white">{order.gstin || order.taxId || '33AAACL8890K1ZV'}</strong>
                  </div>
                  <div className="text-slate-400 print:text-slate-600 pt-0.5">{order.billingAddress || order.shippingAddress}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400 print:text-slate-600 font-mono">
                    DISPATCH & FULFILLMENT:
                  </div>
                  <div className="text-slate-300 print:text-black">Delivery: {order.shippingAddress}</div>
                  <div className="text-slate-300 print:text-black">Logistics Partner: {order.courierPartner || 'Blue Dart Apex Express'}</div>
                  <div className="text-slate-300 print:text-black">Tracking #: <span className="font-mono font-semibold text-amber-400">{order.dispatchTrackingNumber || 'BDT-883920194-IN'}</span></div>
                  <div className="text-slate-300 print:text-black">Reverse Charge: No</div>
                  <div className="pt-2">
                    <span className="text-[10px] uppercase text-emerald-400 print:text-black font-bold font-mono">
                      Status: {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 print:border-slate-400 text-slate-400 print:text-black text-[11px] font-bold font-mono">
                      <th className="py-2.5 px-3">Item / Description</th>
                      <th className="py-2.5 px-3">HSN Code</th>
                      <th className="py-2.5 px-3">Fulfillment</th>
                      <th className="py-2.5 px-3 text-right">Qty</th>
                      <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                      <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 print:divide-slate-300">
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="text-white print:text-black">
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{item.productName}</div>
                          <div className="text-[11px] font-mono text-slate-400 print:text-slate-600">
                            {item.productCode} &bull; Brand: {item.brand || 'OEM'} &bull; Warranty: {item.warrantyPeriod || '3-Yr On-Site'}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-400 print:text-slate-600">{item.hsnCode || '8471'}</td>
                        <td className="py-3 px-3 font-mono text-xs">{item.deploymentTier?.replace(/_/g, ' ')}</td>
                        <td className="py-3 px-3 text-right font-mono">{item.quantity}</td>
                        <td className="py-3 px-3 text-right font-mono">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">₹{item.totalPrice.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Calculation & Tax Schedule */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-slate-800 print:border-slate-300">
                <div className="text-xs text-slate-400 print:text-slate-600 max-w-sm space-y-1">
                  <div className="font-bold text-white print:text-black">Terms of Hardware Supply:</div>
                  <p className="font-normal leading-relaxed">
                    Goods once sold are covered under OEM manufacturer warranty and LR Techno Park on-site AMC agreement. Standard 3-year replacement guarantee applies against manufacturing defects.
                  </p>
                </div>

                <div className="w-full sm:w-72 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400 print:text-slate-600">
                    <span>Taxable Subtotal:</span>
                    <span className="font-mono text-white print:text-black font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {!isInterState ? (
                    <>
                      <div className="flex justify-between text-slate-400 print:text-slate-600">
                        <span>CGST (9%):</span>
                        <span className="font-mono text-white print:text-black font-semibold">₹{(tax / 2).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 print:text-slate-600">
                        <span>SGST (9%):</span>
                        <span className="font-mono text-white print:text-black font-semibold">₹{(tax / 2).toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-slate-400 print:text-slate-600">
                      <span>IGST (18%):</span>
                      <span className="font-mono text-white print:text-black font-semibold">₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-bold text-white print:text-black pt-2 border-t border-slate-800 print:border-slate-400">
                    <span>Grand Total (INR):</span>
                    <span className="font-mono text-amber-400 print:text-black font-black">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Hardware Warranty & Asset Registration */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 print:bg-transparent print:border-slate-400 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white print:text-black">
                      Hardware Warranty & Asset Registration Certificate
                    </span>
                  </div>
                  <div className="flex items-center gap-2 print:hidden">
                    <button
                      type="button"
                      onClick={() => handleCopyWarranty(warrantyCert)}
                      className="py-1 px-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedToken ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedToken ? 'Copied' : 'Copy Certificate #'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-white break-all border border-slate-800 print:bg-transparent print:text-black print:border-slate-300 flex items-center justify-between">
                  <span>Certificate ID: <strong className="text-amber-400">{warrantyCert}</strong></span>
                  <span className="text-emerald-400 font-bold">3-YEAR ON-SITE NBD REPLACEMENT</span>
                </div>
              </div>

              {/* Authorized Signatory */}
              <div className="flex justify-between items-end pt-6 text-xs text-slate-400 print:text-slate-600">
                <div>
                  <p className="font-medium text-slate-300">Computer Generated GST Tax Invoice</p>
                  <p className="font-mono text-[10px] text-slate-500">Section 31 of CGST Act 2017 & IT Act 2000 compliant</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white print:text-black">
                    For LR TECHNO PARK PRIVATE LIMITED
                  </div>
                  <div className="text-[10px] text-slate-500 print:text-slate-600 pt-6">
                    Authorized Signatory / Finance Controller
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
