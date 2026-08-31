import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Package, Shield, Cpu, Zap, Layers, Sparkles, Network, Laptop } from 'lucide-react';
import { productsData } from '../../data/productsData';
import { Product } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { TechBadge } from '../ui/TechBadge';
import { StaggerContainer, StaggerItem } from '../motion/StaggerContainer';
import { AnimatedReveal } from '../motion/AnimatedReveal';

interface FeaturedProductsSectionProps {
  onNavigate: (view: string, param?: string) => void;
  onQuickOrder: (product: Product) => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  onNavigate,
  onQuickOrder
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Computer Hardware',
    'CCTV Cameras',
    'Networking Hardware',
    'Laptops'
  ];

  const filteredProducts =
    activeCategory === 'ALL'
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 bg-[#050607] relative overflow-hidden border-t border-slate-800/80">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f4b72d 1px, transparent 1px), linear-gradient(to bottom, #f4b72d 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <SectionHeader
            indexTag="[ 01 // HARDWARE CATALOG ]"
            badge="ENTERPRISE IT PRODUCTS"
            title="Enterprise IT Products."
            highlightText=""
            description="Commercial desktops, 4K CCTV surveillance, network switches, and laptops with GST billing and on-site warranty."
            align="left"
          />

          <AnimatedReveal variant="fadeLeft" delay={0.2} className="self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#f4b72d] hover:bg-[#ffd76a] text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#f4b72d]/15 group active:scale-98"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </AnimatedReveal>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#f4b72d] text-slate-950 shadow-md shadow-[#f4b72d]/15 font-bold'
                  : 'bg-[#0b0e12] text-[#9ca5ae] hover:text-[#f5f6f7] border border-slate-800 hover:border-[#f4b72d]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredProducts.slice(0, 6).map((product) => (
            <StaggerItem key={product.id}>
              <div className="flex flex-col justify-between h-full rounded-3xl bg-[#0b0e12] border border-slate-800/90 hover:border-[#f4b72d]/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                <div>
                  {/* Image Box */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-[#11161b] border border-slate-800/80">
                    <img
                      src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#050607]/85 backdrop-blur-md border border-slate-700/60 text-[#f4b72d] text-[10px] font-mono font-bold uppercase">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#050607]/90 backdrop-blur-xs text-[#f5f6f7] border border-slate-700/60 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                      {product.code}
                    </div>
                  </div>

                  {/* Brand & Title */}
                  <div className="text-[11px] font-semibold text-[#f4b72d] uppercase tracking-wider mb-1">
                    {product.brand}
                  </div>
                  <h3 className="text-xl font-bold text-[#f5f6f7] group-hover:text-[#f4b72d] transition-colors leading-snug mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#9ca5ae] leading-relaxed line-clamp-2 mb-5">
                    {product.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 py-3.5 border-y border-slate-800/80 mb-5 text-xs">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#f4b72d]/10 text-[#f4b72d] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <div className="line-clamp-1">
                          <strong className="text-slate-200 font-semibold">{feat.title}:</strong>{' '}
                          <span className="text-[#9ca5ae]">{feat.metricHighlight || feat.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Order CTAs */}
                <div className="pt-2">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-black text-[#f4b72d] font-mono">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-[#9ca5ae] ml-1">
                          / {product.unit || 'Unit'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        + 18% GST ({product.discountPrice ? `Bulk from ₹${product.discountPrice.toLocaleString('en-IN')}` : 'GST Input Eligible'})
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      In Stock
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => onNavigate('product-detail', product.slug)}
                      className="py-2.5 px-4 rounded-full bg-[#11161b] hover:bg-[#181f26] border border-slate-700/60 hover:border-[#f4b72d]/40 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer text-center"
                    >
                      Specifications
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickOrder(product)}
                      className="py-2.5 px-4 rounded-full bg-[#f4b72d] hover:bg-[#ffd76a] text-xs font-bold text-slate-950 transition-all cursor-pointer text-center shadow-md shadow-[#f4b72d]/15 flex items-center justify-center gap-1.5 active:scale-98"
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
    </section>
  );
};
