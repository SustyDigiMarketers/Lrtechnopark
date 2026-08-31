import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { productsData } from '../data/productsData';
import { Product } from '../types';
import { Package, Search, Check, ArrowRight, ShieldCheck, Cpu, HardDrive, Shield, Laptop, Network } from 'lucide-react';
import { PageTransition } from '../components/motion/PageTransition';
import { SectionHeader } from '../components/ui/SectionHeader';
import { TechBadge } from '../components/ui/TechBadge';
import { StaggerContainer, StaggerItem } from '../components/motion/StaggerContainer';

interface ProductsPageProps {
  onNavigate: (view: string, param?: string) => void;
  onQuickOrder: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onNavigate,
  onQuickOrder
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories: string[] = [
    'ALL',
    'Computer Hardware',
    'CCTV Cameras',
    'Networking Hardware',
    'Laptops'
  ];

  const filteredProducts = productsData.filter((p) => {
    const matchesCategory =
      selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Computer Hardware':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'CCTV Cameras':
        return <Shield className="w-3.5 h-3.5" />;
      case 'Networking Hardware':
        return <Network className="w-3.5 h-3.5" />;
      case 'Laptops':
        return <Laptop className="w-3.5 h-3.5" />;
      default:
        return <Package className="w-3.5 h-3.5" />;
    }
  };

  return (
    <PageTransition className="pt-32 pb-24 bg-[#07090e] min-h-screen text-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-800">
          <SectionHeader
            indexTag="[ CATALOG // 2026 ]"
            badge="CERTIFIED IT PRODUCTS"
            title="Hardware & Equipment Catalog."
            highlightText=""
            description="Commercial workstations, 4K CCTV surveillance, network switches, and laptops with GST billing and on-site warranty."
            align="left"
          />

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/20 shrink-0 self-start md:self-auto active:scale-98"
          >
            <span>Request Bulk Enterprise Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-amber-500/40'
                }`}
              >
                {cat !== 'ALL' && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hardware name, code, brand..."
              className="w-full bg-[#0d1322] border border-slate-800 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <div className="flex flex-col justify-between h-full rounded-3xl bg-[#0d1322] border border-slate-800 hover:border-amber-500/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                <div>
                  {/* Product Image Box */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-slate-900 border border-slate-800">
                    <img
                      src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <TechBadge variant="blue" size="sm">
                        {product.category}
                      </TechBadge>
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-xs text-amber-400 border border-amber-400/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                      {product.code}
                    </div>
                  </div>

                  {/* Brand & Name */}
                  <div className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase mb-1">
                    {product.brand}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {/* Key Feature Bullets */}
                  <div className="space-y-2 py-3.5 my-4 border-y border-slate-800 text-xs">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="line-clamp-1">
                          <strong className="text-slate-200 font-semibold">
                            {feat.title}:
                          </strong>{' '}
                          <span className="text-slate-400">{feat.metricHighlight || feat.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Specs & Availability */}
                  <div className="space-y-1.5 mb-5 text-[11px] text-slate-400">
                    <div className="flex justify-between items-center">
                      <span>Availability:</span>
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                        {product.availability}
                      </span>
                    </div>
                    {product.warranty && (
                      <div className="flex justify-between items-center">
                        <span>Warranty:</span>
                        <span className="font-medium text-slate-300">
                          {product.warranty}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-black text-amber-400 font-mono">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 ml-1">
                          / {product.unit || 'Unit'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        + 18% GST ({product.discountPrice ? `Bulk from ₹${product.discountPrice.toLocaleString('en-IN')}` : 'GST Input Credit Eligible'})
                      </div>
                    </div>
                    <TechBadge variant="emerald" size="sm" dot>
                      In Stock
                    </TechBadge>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => onNavigate('product-detail', product.slug)}
                      className="py-2.5 px-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer text-center"
                    >
                      Specifications
                    </button>

                    <button
                      type="button"
                      onClick={() => onQuickOrder(product)}
                      className="py-2.5 px-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-xs font-bold text-slate-950 transition-all cursor-pointer text-center shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 active:scale-98"
                    >
                      <span>Order Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
};
