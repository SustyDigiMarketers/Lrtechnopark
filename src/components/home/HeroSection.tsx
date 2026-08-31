import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  Play,
  Pause,
  Server,
  Cpu,
  Wifi,
  Lock,
  Headphones,
  Sparkles,
  Layers
} from 'lucide-react';
import { MagneticButton } from '../motion/MagneticButton';
import { staggerContainerVariants, staggerItemVariants } from '../../animations';

interface HeroSectionProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenTracker: () => void;
  onOpenCalculator: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenTracker,
  onOpenCalculator,
  onOpenAuth
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 overflow-hidden bg-[#050607] text-[#f5f6f7]">
      {/* Subtle Ambient Background Gradients */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f4b72d 1px, transparent 1px), linear-gradient(to bottom, #f4b72d 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute top-12 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-[#f4b72d]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[280px] bg-[#ffd76a]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainerVariants(0.1, 0.04)}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* 
            On Mobile: MEDIA CARD IS FIRST (order-1 lg:order-2)
            On Desktop: MEDIA CARD IS RIGHT (lg:col-span-6)
          */}
          <motion.div
            variants={staggerItemVariants}
            className="w-full order-1 lg:order-2 lg:col-span-6"
          >
            <div className="relative rounded-3xl bg-[#0b0e12] border border-slate-800/90 shadow-2xl p-3 sm:p-4 overflow-hidden group">
              {/* Media Card Container */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#11161b] border border-slate-800/80">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
                  alt="Enterprise Infrastructure & Data Systems"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e12] via-transparent to-black/40" />

                {/* Top Status Header */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b0e12]/90 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-[#f5f6f7]">
                    <span className="w-2 h-2 rounded-full bg-[#f4b72d] animate-pulse" />
                    <span className="font-semibold text-[11px] text-[#f4b72d]">OPERATIONAL</span>
                    <span className="text-slate-500">&bull;</span>
                    <span className="text-[11px] text-slate-300">TIER-4 FACILITY</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-[#0b0e12]/85 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-[#f4b72d] hover:text-[#ffd76a] hover:border-[#f4b72d]/50 transition-all cursor-pointer shadow-md"
                    title={isPlaying ? 'Pause Overview' : 'Play Overview'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-0.5" />}
                  </button>
                </div>

                {/* Center Technology Overlay Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#050607]/85 backdrop-blur-md border border-slate-700/70 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 shadow-sm">
                    <Server className="w-3.5 h-3.5 text-[#f4b72d]" />
                    <span>Dual-WAN Multi-Gig</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#050607]/85 backdrop-blur-md border border-slate-700/70 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 shadow-sm">
                    <Shield className="w-3.5 h-3.5 text-[#f4b72d]" />
                    <span>UTM Stateful Firewall</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#050607]/85 backdrop-blur-md border border-slate-700/70 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 shadow-sm">
                    <Wifi className="w-3.5 h-3.5 text-[#f4b72d]" />
                    <span>Wi-Fi 7 Mesh</span>
                  </span>
                </div>
              </div>

              {/* Media Card Footer Metadata Area */}
              <div className="mt-3.5 pt-3 border-t border-slate-800/80 px-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[11px] text-slate-300">Zero-Downtime Deployment SLA</span>
                </div>
                <div className="font-mono text-[11px] text-[#f4b72d] font-semibold">
                  24/7 Field Support
                </div>
              </div>
            </div>
          </motion.div>

          {/* 
            On Mobile: CONTENT IS BELOW MEDIA (order-2 lg:order-1)
            On Desktop: CONTENT IS LEFT (lg:col-span-6)
          */}
          <div className="w-full order-2 lg:order-1 lg:col-span-6 space-y-6 sm:space-y-7 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <motion.div variants={staggerItemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11161b] border border-slate-700/60 text-[#f4b72d] text-xs font-mono font-medium shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4b72d]" />
                <span className="font-bold tracking-wider">LR TECHNO PARK</span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-slate-300 font-sans">IT INFRASTRUCTURE & HARDWARE</span>
              </div>
            </motion.div>

            {/* Dominant Clean Headline */}
            <motion.h1
              variants={staggerItemVariants}
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.12] text-[#f5f6f7]"
            >
              Technology That Keeps{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd76a] via-[#f4b72d] to-[#e5a820]">
                Your Business Moving.
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              variants={staggerItemVariants}
              className="text-base sm:text-lg text-[#9ca5ae] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
            >
              Commercial computer hardware, high-throughput networking, next-gen firewalls, and enterprise surveillance systems built for continuous operations.
            </motion.p>

            {/* 
              CTA Buttons:
              ON MOBILE: SINGLE ROW (flex-row gap-3 w-full [&>*]:flex-1)
              ON DESKTOP: flex-wrap gap-3.5
            */}
            <motion.div
              variants={staggerItemVariants}
              className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start gap-3 pt-2 w-full max-w-md mx-auto lg:mx-0"
            >
              <button
                type="button"
                onClick={() => onNavigate('products')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#f4b72d] hover:bg-[#ffd76a] text-slate-950 font-bold text-sm transition-all cursor-pointer shadow-lg shadow-[#f4b72d]/15 active:scale-98 whitespace-nowrap"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#11161b] hover:bg-[#181f26] text-[#f5f6f7] font-semibold text-sm border border-slate-700/60 hover:border-[#f4b72d]/40 transition-all cursor-pointer active:scale-98 whitespace-nowrap"
              >
                <span>Talk to Us</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('portal-dashboard')}
                className="hidden xl:inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full bg-[#11161b]/60 hover:bg-[#181f26] border border-slate-800 hover:border-[#f4b72d]/30 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#f4b72d]" />
                <span>Customer Portal</span>
              </button>
            </motion.div>

            {/* Operational Telemetry / Performance Row */}
            <motion.div
              variants={staggerItemVariants}
              className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-[#f5f6f7]">99.995%</div>
                <div className="text-[11px] text-[#9ca5ae] leading-tight">Uptime SLA Guarantee</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-[#f4b72d]">10Gbps</div>
                <div className="text-[11px] text-[#9ca5ae] leading-tight">Enterprise Switching</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">24/7 SLA</div>
                <div className="text-[11px] text-[#9ca5ae] leading-tight">Certified Engineers</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
