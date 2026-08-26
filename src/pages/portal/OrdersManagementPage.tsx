import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Order, OrderStatus } from '../../types';
import {
  Package,
  Search,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Printer,
  FileText,
  Filter,
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { PageTransition } from '../../components/motion/PageTransition';
import { TechBadge } from '../../components/ui/TechBadge';
import { SectionHeader } from '../../components/ui/SectionHeader';

interface OrdersManagementPageProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenTracker: (orderId?: string) => void;
  onOpenInvoice?: (order: Order) => void;
}

export const OrdersManagementPage: React.FC<OrdersManagementPageProps> = ({
  onNavigate,
  onOpenTracker,
  onOpenInvoice
}) => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { showToast } = useNotification();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const isStaffRole =
    user?.role === 'admin' ||
    user?.role === 'superadmin' ||
    user?.role === 'sales' ||
    user?.role === 'support';
  const userOrders = isStaffRole
    ? orders
    : orders.filter(
        (o) =>
          o.customerId === user?.uid ||
          o.customerEmail.toLowerCase() === user?.email.toLowerCase()
      );

  const filteredOrders = userOrders.filter((order) => {
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(
        (i) =>
          i.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.productCode.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      (order.purchaseOrderNumber &&
        order.purchaseOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handlePrintReceipt = (order: Order) => {
    if (onOpenInvoice) {
      onOpenInvoice(order);
    } else {
      onOpenTracker(order.id);
    }
  };

  return (
    <PageTransition className="pt-32 pb-24 bg-[#fafbff] min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <SectionHeader
            indexTag="[ LEDGER // 2026 ]"
            badge="ENTERPRISE PROCUREMENT"
            title="Hardware Orders & Fulfillment"
            highlightText="Ledger"
            description="Authoritative B2B hardware procurement tracking, GST e-invoices, warranty certificates, and staging records."
            align="left"
          />

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('portal-order-new')}
              className="py-3.5 px-6 rounded-full bg-[#1a56db] hover:bg-[#1545b3] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Configure New Order</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {[
              'ALL',
              'SUBMITTED',
              'UNDER_REVIEW',
              'APPROVED',
              'PROCESSING',
              'COMPLETED'
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase transition-colors cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#1a56db] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by Order ID, PO, Product..."
              className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db]"
            />
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
          {filteredOrders.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Package className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Orders Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No orders match your filter criteria. Create your first enterprise hardware order using our guided wizard.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('portal-order-new')}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#1a56db] text-white text-xs font-semibold cursor-pointer shadow-md shadow-blue-600/20"
              >
                Configure New Order
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-6">Order Reference</th>
                    <th className="py-4 px-6">Hardware & Model</th>
                    <th className="py-4 px-6">Company / PO</th>
                    <th className="py-4 px-6">Total (INR)</th>
                    <th className="py-4 px-6">Fulfillment Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Order Reference */}
                      <td className="py-4 px-6">
                        <div className="font-mono font-bold text-slate-900 text-sm">
                          {order.id}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-[10px] font-medium text-emerald-600 flex items-center gap-1 mt-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified & Synced</span>
                        </div>
                      </td>

                      {/* Products & Config */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">
                          {order.items[0]?.productName || 'LR Enterprise Hardware'}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Code:{' '}
                          <span className="font-mono text-[#1a56db] font-semibold">
                            {order.items[0]?.productCode}
                          </span>{' '}
                          &bull; {order.items[0]?.category || 'Hardware'}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Logistics:{' '}
                          {order.items[0]?.deploymentTier?.replace(/_/g, ' ')} (
                          {order.items[0]?.quantity} units)
                        </div>
                      </td>

                      {/* Company / PO */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">
                          {order.companyName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {order.customerEmail}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                          PO: {order.purchaseOrderNumber || 'STANDARD'}
                        </div>
                      </td>

                      {/* Total Amount */}
                      <td className="py-4 px-6">
                        <div className="font-mono font-black text-sm text-slate-900">
                          ₹{order.total?.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Incl. 18% GST
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
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
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => onOpenTracker(order.id)}
                          className="px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-100 text-[#1a56db] text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                          title="View live fulfillment timeline"
                        >
                          <Search className="w-3 h-3" />
                          <span>Track</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePrintReceipt(order)}
                          className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer inline-flex items-center gap-1 font-semibold"
                          title="View & Print GST Tax Invoice"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span className="text-[11px] hidden sm:inline">Invoice</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
