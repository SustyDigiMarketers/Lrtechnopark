import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { productsData } from '../data/productsData';
import { Product, LicenseType, DeploymentTier } from '../types';
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Server,
  Cloud,
  Cpu,
  Lock,
  ArrowRight,
  CheckCircle2,
  Headphones,
  Zap,
  Sliders,
  Truck,
  Shield,
  Clock,
  Package
} from 'lucide-react';
import { PageTransition } from '../components/motion/PageTransition';
import { TechBadge } from '../components/ui/TechBadge';
import { SectionHeader } from '../components/ui/SectionHeader';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onProceedToOrder: (prefilledItem: {
    productId: string;
    productName: string;
    productCode: string;
    licenseType: LicenseType;
    deploymentTier: DeploymentTier;
    quantity: number;
    unitPrice: number;
  }) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
  onProceedToOrder
}) => {
  const product = productsData.find((p) => p.slug === slug || p.id === slug) || productsData[0];

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedDelivery, setSelectedDelivery] = useState<DeploymentTier>('STANDARD_DELIVERY');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'];

  const baseUnitPrice = (quantity >= 5 && product.discountPrice) ? product.discountPrice : product.price;
  
  let deliveryMultiplier = 1.0;
  if (selectedDelivery === 'WHITE_GLOVE_COMMISSIONING') deliveryMultiplier = 1.10;
  if (selectedDelivery === 'EXPRESS_DISPATCH') deliveryMultiplier = 1.05;

  const unitPrice = Math.round(baseUnitPrice * deliveryMultiplier);
  const subtotal = unitPrice * quantity;
  const estimatedGst = Math.round(subtotal * 0.18);
  const estimatedTotal = subtotal + estimatedGst;

  const handleOrderNow = () => {
    onProceedToOrder({
      productId: product.id,
      productName: product.name,
      productCode: product.code,
      licenseType: 'ANNUAL',
      deploymentTier: selectedDelivery,
      quantity,
      unitPrice
    });
  };

  return (
    <PageTransition className="pt-32 pb-24 bg-[#fafbff] min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <button
          type="button"
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1a56db] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalog</span>
        </button>

        {/* Hero Product Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Summary & Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Image Preview Box */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-xs overflow-hidden">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 mb-3">
                <img
                  src={images[selectedImageIndex] || images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <TechBadge variant="blue" size="sm">
                    {product.category}
                  </TechBadge>
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg">
                  {product.code}
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-12 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#1a56db] scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <TechBadge variant="blue" size="sm">
                {product.category}
              </TechBadge>
              <TechBadge variant="slate" size="sm">
                CODE: {product.code}
              </TechBadge>
              <TechBadge variant="emerald" size="sm" dot>
                {product.availability}
              </TechBadge>
            </div>

            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {product.brand}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-sm font-semibold text-slate-700">
                {product.tagline}
              </p>
            )}

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs shadow-xs">
                <div className="text-slate-400 font-mono text-[10px] uppercase">
                  Category
                </div>
                <div className="font-bold text-slate-900 mt-1">{product.category}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs shadow-xs">
                <div className="text-slate-400 font-mono text-[10px] uppercase">
                  Warranty Support
                </div>
                <div className="font-bold text-slate-900 mt-1 line-clamp-1">{product.warranty || '3-Year On-Site'}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs shadow-xs">
                <div className="text-slate-400 font-mono text-[10px] uppercase">
                  Tax / GST Status
                </div>
                <div className="font-bold text-[#1a56db] mt-1">GST e-Invoice Ready (18%)</div>
              </div>
            </div>
          </div>

          {/* Right Live Order Configuration Card (5 cols) */}
          <div className="lg:col-span-5 p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <TechBadge variant="blue" size="sm">
                PROCUREMENT CONFIGURATOR
              </TechBadge>
              <h3 className="text-xl font-bold text-slate-900 mt-2">
                Order Hardware & Deployment
              </h3>
            </div>

            {/* Delivery / Deployment Tier */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Fulfillment & Commissioning Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'STANDARD_DELIVERY' as DeploymentTier, label: 'Standard Delivery' },
                  { id: 'EXPRESS_DISPATCH' as DeploymentTier, label: 'Express Dispatch' },
                  { id: 'WHITE_GLOVE_COMMISSIONING' as DeploymentTier, label: 'On-Site Setup' }
                ].map((dep) => (
                  <button
                    key={dep.id}
                    type="button"
                    onClick={() => setSelectedDelivery(dep.id)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      selectedDelivery === dep.id
                        ? 'bg-blue-50 text-[#1a56db] border-[#1a56db]'
                        : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {dep.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Quantity ({product.unit || 'Units'}):</span>
                <span className="font-mono text-[#1a56db] text-sm">{quantity} {product.unit || 'Units'}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base flex items-center justify-center cursor-pointer transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 text-center font-mono font-bold text-sm bg-slate-50 border border-slate-200 rounded-xl py-2 text-slate-900 focus:outline-none focus:border-[#1a56db]"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base flex items-center justify-center cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>
              {product.discountPrice && quantity < 5 && (
                <div className="text-[11px] text-slate-500 mt-1.5">
                  Order 5+ units for bulk pricing (₹{product.discountPrice.toLocaleString('en-IN')}/unit)
                </div>
              )}
            </div>

            {/* Total Price Display */}
            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase">
                    Base Subtotal ({quantity} {product.unit || 'Units'})
                  </div>
                  <div className="text-xl font-bold font-mono text-slate-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono text-slate-500 uppercase">
                    GST (18%)
                  </div>
                  <div className="text-sm font-bold font-mono text-slate-700">
                    + ₹{estimatedGst.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">
                    Grand Total (Incl. GST)
                  </div>
                  <div className="text-2xl font-black font-mono text-[#1a56db]">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </div>
                </div>
                <TechBadge variant="emerald" size="sm" dot>
                  READY FOR DISPATCH
                </TechBadge>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <button
                type="button"
                onClick={handleOrderNow}
                className="w-full py-4 rounded-full bg-[#1a56db] hover:bg-[#1545b3] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/25 active:scale-98"
              >
                <span>Proceed to Order in Customer Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Hardware Features */}
        <div className="space-y-8 mb-16">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900">
              Hardware Capabilities & Enterprise Features
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Field-tested enterprise hardware engineered for mission-critical reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a56db] text-xs font-bold font-mono">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                {feat.metricHighlight && (
                  <div className="pt-2 text-xs font-mono font-semibold text-emerald-600">
                    {feat.metricHighlight}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications & Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-[#1a56db]" />
              <span>Complete Hardware Specifications</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5"
                >
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    {spec.label}
                  </div>
                  <div className="text-xs font-bold text-slate-800">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Warranty, Quality Assurance & GST Invoicing</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Every hardware unit shipped by LR Techno Park undergoes thorough diagnostic burn-in testing before dispatch. Backed by direct manufacturer warranty with on-site technician support and genuine replacement components.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>GST Tax Invoice with Input Tax Credit (ITC) eligibility</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{product.warranty || '3-Year On-Site Comprehensive Hardware Support'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Same-day dispatch for in-stock enterprise hardware</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
