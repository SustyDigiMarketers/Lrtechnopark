import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { productsData } from '../../data/productsData';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useNotification } from '../../context/NotificationContext';
import { LicenseType, DeploymentTier, CreateOrderInput } from '../../types';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Server,
  Cloud,
  Cpu,
  Sparkles,
  Search,
  Truck,
  Package,
  Shield
} from 'lucide-react';
import { PageTransition } from '../../components/motion/PageTransition';
import { TechBadge } from '../../components/ui/TechBadge';
import { SectionHeader } from '../../components/ui/SectionHeader';

interface OrderWizardPageProps {
  initialPrefill?: {
    productId: string;
    productName: string;
    productCode: string;
    licenseType: LicenseType;
    deploymentTier: DeploymentTier;
    quantity: number;
    unitPrice: number;
  } | null;
  onNavigate: (view: string, param?: string) => void;
  onOpenTracker: (orderId?: string) => void;
}

export const OrderWizardPage: React.FC<OrderWizardPageProps> = ({
  initialPrefill,
  onNavigate,
  onOpenTracker
}) => {
  const { user } = useAuth();
  const { createOrder, isCreatingOrder } = useOrders();
  const { showToast } = useNotification();

  // Wizard Step State (1: Hardware Product, 2: Fulfillment & Staging, 3: Organization & GST, 4: Review)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Configuration State
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialPrefill?.productId || productsData[0].id
  );
  const [licenseType, setLicenseType] = useState<LicenseType>(
    initialPrefill?.licenseType || 'ANNUAL'
  );
  const [deploymentTier, setDeploymentTier] = useState<DeploymentTier>(
    initialPrefill?.deploymentTier || 'STANDARD_DELIVERY'
  );
  const [quantity, setQuantity] = useState<number>(
    initialPrefill?.quantity || 1
  );
  const [includeOnsiteAMC, setIncludeOnsiteAMC] = useState<boolean>(true);
  const [configurationNotes, setConfigurationNotes] = useState<string>('');

  // Organization & Procurement Info
  const [customerName, setCustomerName] = useState<string>(user?.displayName || '');
  const [customerEmail, setCustomerEmail] = useState<string>(user?.email || '');
  const [companyName, setCompanyName] = useState<string>(user?.company || '');
  const [phone, setPhone] = useState<string>(user?.phone || '+91 98400 12345');
  const [taxId, setTaxId] = useState<string>('33AAACL8890K1ZV');
  const [billingAddress, setBillingAddress] = useState<string>('Olympia Tech Park, Guindy, Chennai, TN 600032');
  const [shippingAddress, setShippingAddress] = useState<string>('Olympia Tech Park, Guindy, Chennai, TN 600032');
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState<string>(
    `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`
  );

  // Success Confirmation State
  const [createdOrderResult, setCreatedOrderResult] = useState<any>(null);

  const selectedProduct =
    productsData.find((p) => p.id === selectedProductId) || productsData[0];

  // Pricing calculations in INR
  const baseUnitPrice = (quantity >= 5 && selectedProduct.discountPrice)
    ? selectedProduct.discountPrice
    : selectedProduct.price;

  let effectiveUnitPrice = baseUnitPrice;
  if (deploymentTier === 'WHITE_GLOVE_COMMISSIONING')
    effectiveUnitPrice = Math.round(baseUnitPrice * 1.10);
  if (deploymentTier === 'EXPRESS_DISPATCH')
    effectiveUnitPrice = Math.round(baseUnitPrice * 1.05);

  const lineItemTotal = effectiveUnitPrice * quantity;
  const amcSupportFee = includeOnsiteAMC ? (quantity * 2500) : 0;
  const subtotal = lineItemTotal + amcSupportFee;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + tax;

  // Validate step progress
  const handleNextStep = () => {
    if (currentStep === 3) {
      if (!customerName || !customerEmail || !companyName) {
        showToast(
          'Required Information',
          'Please provide contact name, corporate email, and company name.',
          'warning'
        );
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitOrder = async () => {
    const orderInput: CreateOrderInput = {
      customerId: user?.id || 'LR-CUST-GUEST',
      customerName,
      customerEmail,
      companyName,
      phone,
      gstin: taxId,
      billingAddress,
      shippingAddress,
      purchaseOrderNumber,
      taxId,
      items: [
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          productCode: selectedProduct.code,
          category: selectedProduct.category,
          brand: selectedProduct.brand,
          licenseType,
          deploymentTier,
          quantity,
          unitPrice: effectiveUnitPrice,
          totalPrice: lineItemTotal,
          configurationNotes:
            configurationNotes ||
            `Configured ${quantity} ${selectedProduct.unit || 'units'} under ${deploymentTier}`
        }
      ],
      notes: includeOnsiteAMC
        ? `Includes Comprehensive On-Site AMC Support Package (₹2,500/unit). Staging Notes: ${configurationNotes}`
        : configurationNotes
    };

    const res = await createOrder(orderInput);
    if (res.success && res.data) {
      setCreatedOrderResult(res.data);
      showToast(
        'Order Transmitted Successfully',
        `Generated Reference: ${res.data.id}. Hardware staging queued and synced to Google Sheets.`,
        'success'
      );
    } else {
      showToast(
        'Submission Failed',
        'Submission failed. Please try again or contact our team directly.',
        'error'
      );
    }
  };

  return (
    <PageTransition className="pt-32 pb-24 bg-[#fafbff] min-h-screen text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-200 pb-6">
          <SectionHeader
            indexTag="[ PROCUREMENT // WIZARD ]"
            badge="HARDWARE ORDER & FULFILLMENT GATEWAY"
            title="Enterprise Hardware"
            highlightText="Procurement Wizard"
            description="Authoritative real-time pricing, automatic GST calculation, hardware staging selection, and instant Google Sheets dispatch."
            align="left"
          />
        </div>

        {/* Step Indicator */}
        {!createdOrderResult && (
          <div className="space-y-3">
            {/* Mobile Compact Stepper */}
            <div className="sm:hidden flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div>
                <div className="text-[10px] font-mono font-bold tracking-widest text-[#1a56db] uppercase">
                  Step {currentStep} of 4
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {currentStep === 1 && '01 Product Selection'}
                  {currentStep === 2 && '02 Delivery & Fulfillment'}
                  {currentStep === 3 && '03 Billing & GST'}
                  {currentStep === 4 && '04 Review & PO'}
                </div>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentStep === s
                        ? 'bg-[#1a56db] ring-2 ring-blue-200'
                        : currentStep > s
                        ? 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Full Stepper */}
            <div className="hidden sm:grid grid-cols-4 gap-3 text-left">
              {[
                { num: 1, title: 'Product', label: 'Hardware Spec' },
                { num: 2, title: 'Delivery', label: 'Staging & SLA' },
                { num: 3, title: 'Billing', label: 'GST & Invoice' },
                { num: 4, title: 'Review', label: 'Authorize & PO' }
              ].map((step) => {
                const isCurrent = currentStep === step.num;
                const isCompleted = currentStep > step.num;
                return (
                  <div
                    key={step.num}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-blue-50/60 border-[#1a56db] ring-1 ring-[#1a56db]/30 text-slate-900 shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-50/40 text-emerald-800 border-emerald-200/70'
                        : 'bg-white text-slate-400 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider uppercase ${
                          isCurrent
                            ? 'text-[#1a56db]'
                            : isCompleted
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}
                      >
                        0{step.num} {isCompleted ? '✓ Done' : isCurrent ? 'Active' : 'Upcoming'}
                      </span>
                    </div>
                    <div className={`text-xs font-bold mt-1 ${isCurrent ? 'text-slate-900' : isCompleted ? 'text-emerald-900' : 'text-slate-500'}`}>
                      {step.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Main Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-6 sm:p-10 relative overflow-hidden">
          {/* Order Success State */}
          {createdOrderResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <TechBadge variant="emerald" size="md" dot>
                  ORDER COMMITTED & DISPATCHED
                </TechBadge>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Hardware Order Placed!
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Your procurement request has been validated, assigned to the operations queue, and synchronized to the Google Sheets ledger.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-xs text-slate-500">Order Reference ID:</span>
                  <span className="font-mono font-bold text-[#1a56db] text-sm">
                    {createdOrderResult.id}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 text-xs">
                  <span className="text-slate-500">Hardware Product:</span>
                  <span className="font-bold text-slate-900">
                    {createdOrderResult.items[0]?.productName}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 text-xs">
                  <span className="text-slate-500">Total Investment (Incl. GST):</span>
                  <span className="font-mono font-black text-slate-900">
                    ₹{createdOrderResult.total?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-4 h-4" /> Google Sheets Sync:
                  </span>
                  <span className="font-mono font-bold">SYNCHRONIZED (LIVE)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => onOpenTracker(createdOrderResult.id)}
                  className="px-6 py-3 rounded-full bg-[#1a56db] hover:bg-[#1545b3] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20 active:scale-98"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Fulfillment Pipeline</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('portal-orders')}
                  className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                >
                  View in Orders Ledger
                </button>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* STEP 1: Product Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Select IT Hardware Product & Quantity
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose from commercial desktops, 4K CCTV cameras, switches, or laptops
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {productsData.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => setSelectedProductId(prod.id)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                          selectedProductId === prod.id
                            ? 'bg-blue-50/70 border-[#1a56db] ring-1 ring-[#1a56db] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">
                            {prod.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#1a56db] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                            {prod.code}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-blue-600 mt-0.5 uppercase">
                          {prod.brand} &bull; {prod.category}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {prod.shortDescription}
                        </p>
                        <div className="mt-3 flex items-baseline justify-between text-xs font-mono text-slate-500">
                          <span>
                            Price:{' '}
                            <strong className="text-slate-900 font-bold text-sm">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </strong>{' '}
                            / {prod.unit || 'Unit'}
                          </span>
                          <span className="text-emerald-600 font-semibold text-[11px]">
                            {prod.availability}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Select Unit Quantity ({selectedProduct.unit || 'Units'}):</span>
                      <span className="font-mono text-[#1a56db] font-bold text-sm">
                        {quantity} {selectedProduct.unit || 'Units'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-base flex items-center justify-center cursor-pointer transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 text-center font-mono font-bold text-sm bg-white border border-slate-200 rounded-xl py-2 text-slate-900 focus:outline-none focus:border-[#1a56db]"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-base flex items-center justify-center cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>
                    {selectedProduct.discountPrice && quantity < 5 && (
                      <div className="text-[11px] text-slate-500">
                        * Bulk pricing applies for orders of 5 units or more (₹{selectedProduct.discountPrice.toLocaleString('en-IN')}/unit).
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Fulfillment & Staging */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Fulfillment & Commissioning Model
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select hardware logistics and on-site engineering staging
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Fulfillment Option
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'STANDARD_DELIVERY' as DeploymentTier,
                          label: 'Standard Insured Freight',
                          icon: Truck,
                          desc: '3-5 business days insured delivery across India'
                        },
                        {
                          id: 'EXPRESS_DISPATCH' as DeploymentTier,
                          label: 'Priority Express Dispatch',
                          icon: Package,
                          desc: 'Same-day dispatch & expedited transit (+5%)'
                        },
                        {
                          id: 'WHITE_GLOVE_COMMISSIONING' as DeploymentTier,
                          label: 'White Glove Setup',
                          icon: Server,
                          desc: 'Onsite rack mount, cabling & burn-in (+10%)'
                        }
                      ].map((dep) => {
                        const Icon = dep.icon;
                        return (
                          <div
                            key={dep.id}
                            onClick={() => setDeploymentTier(dep.id)}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                              deploymentTier === dep.id
                                ? 'bg-blue-50/70 border-[#1a56db] ring-1 ring-[#1a56db] shadow-xs'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <Icon className="w-5 h-5 text-[#1a56db] mb-2" />
                            <div className="text-xs font-bold text-slate-900">
                              {dep.label}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1">
                              {dep.desc}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Annual Comprehensive On-Site AMC Support (₹2,500/unit/yr)
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal">
                          Includes quarterly preventive maintenance, optical testing, and genuine replacement components
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeOnsiteAMC}
                      onChange={(e) => setIncludeOnsiteAMC(e.target.checked)}
                      className="w-4 h-4 text-[#1a56db] accent-[#1a56db] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Custom Hardware Staging Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={configurationNotes}
                      onChange={(e) => setConfigurationNotes(e.target.value)}
                      placeholder="e.g., Pre-configure IP ranges 192.168.1.0/24, OS staging, or tag VLAN 20 on ports 1-12..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Company & Billing */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Procurement & GST Tax Invoice Details
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter billing contact, GSTIN, and delivery location
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Apex Enterprise Solutions Pvt Ltd"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Authorized Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Anand Kumar"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Corporate Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="anand@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98400 12345"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        GSTIN / Corporate Tax ID
                      </label>
                      <input
                        type="text"
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                        placeholder="33AAACL8890K1ZV"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Purchase Order (PO) Reference #
                      </label>
                      <input
                        type="text"
                        value={purchaseOrderNumber}
                        onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                        placeholder="PO-2026-9042"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Shipping / Site Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Building name, Floor, Tech Park, City, PIN"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a56db] focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Review & Confirm Hardware Order
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Validate all line items before dispatching to operations queue and Google Sheets
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {selectedProduct.name}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          Code:{' '}
                          <span className="font-mono text-[#1a56db] font-semibold">
                            {selectedProduct.code}
                          </span>{' '}
                          &bull; {selectedProduct.category} &bull;{' '}
                          {deploymentTier.replace(/_/g, ' ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-slate-900">
                          ₹{lineItemTotal.toLocaleString('en-IN')}
                        </div>
                        <div className="text-slate-400 text-[10px]">
                          {quantity} {selectedProduct.unit || 'units'} @ ₹{effectiveUnitPrice.toLocaleString('en-IN')}/ea
                        </div>
                      </div>
                    </div>

                    {includeOnsiteAMC && (
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div>
                          <div className="font-semibold text-slate-900">
                            Annual Comprehensive On-Site AMC Support
                          </div>
                          <div className="text-slate-500 text-[11px]">
                            Onsite hardware maintenance and replacement support (₹2,500/unit)
                          </div>
                        </div>
                        <div className="font-mono font-bold text-slate-900">₹{amcSupportFee.toLocaleString('en-IN')}</div>
                      </div>
                    )}

                    <div className="space-y-2 pt-2 text-slate-600 font-normal">
                      <div className="flex justify-between">
                        <span>Organization:</span>
                        <strong className="text-slate-900">
                          {companyName} ({customerName})
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping Address:</span>
                        <span className="text-slate-800 text-right max-w-xs truncate">
                          {shippingAddress}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Corporate PO:</span>
                        <strong className="text-slate-900 font-mono">
                          {purchaseOrderNumber}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Subtotal:</span>
                        <span className="font-mono text-slate-900 font-bold">
                          ₹{subtotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Tax (18% GST):</span>
                        <span className="font-mono text-slate-900 font-bold">
                          ₹{tax.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                        <span>Grand Total (Incl. GST):</span>
                        <span className="font-mono text-[#1a56db] font-black">
                          ₹{grandTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-normal">
                      Order submission automatically logs the transaction in the Product Orders Google Sheet and initializes staging.
                    </span>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Footer */}
              <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 rounded-full bg-[#1a56db] hover:bg-[#1545b3] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-600/20 active:scale-98"
                  >
                    <span>Continue to Step 0{currentStep + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isCreatingOrder}
                    onClick={handleSubmitOrder}
                    className="px-8 py-3.5 rounded-full bg-[#1a56db] hover:bg-[#1545b3] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/25 active:scale-98"
                  >
                    {isCreatingOrder ? (
                      <span>Transmitting to Order Gateway...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Confirm & Place Hardware Order</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
