import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Sparkles, Shield, Cpu, Activity, Terminal, CheckCircle2 } from 'lucide-react';
import { TechnologyVisualizer } from '../ui/TechnologyVisualizer';
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
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden bg-[#07090e] text-white">
      {/* Precision Blueprint Grid & Radial Glow */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[300px] bg-yellow-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainerVariants(0.12, 0.05)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
        >
          {/* Left Column: Editorial Hero Positioning */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            {/* Tech Tag Eyebrow */}
            <motion.div variants={staggerItemVariants}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-medium shadow-inner">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-bold tracking-wider">LR TECHNO PARK</span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-slate-300">IT INFRASTRUCTURE & HARDWARE</span>
              </div>
            </motion.div>

            {/* Massive Dominant Typography */}
            <motion.h1
              variants={staggerItemVariants}
              className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
            >
              Technology That Keeps{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                Your Business Moving.
              </span>
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p
              variants={staggerItemVariants}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
            >
              Commercial computer hardware, high-throughput networking, next-gen firewalls, and enterprise surveillance systems built for continuous operations.
            </motion.p>

            {/* Primary & Secondary Action Group */}
            <motion.div
              variants={staggerItemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1"
            >
              <MagneticButton
                variant="primary"
                onClick={() => onNavigate('products')}
                className="px-7 py-3.5 text-sm gap-2 font-bold shadow-xl shadow-amber-500/20"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 text-sm gap-2 font-semibold"
              >
                <span>Talk to Us</span>
              </MagneticButton>

              <button
                type="button"
                onClick={() => onNavigate('portal-dashboard')}
                className="px-4 py-3.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Customer Portal</span>
              </button>
            </motion.div>

            {/* Core Verification Telemetry Row */}
            <motion.div
              variants={staggerItemVariants}
              className="pt-6 border-t border-slate-800/90 grid grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">99.995%</div>
                <div className="text-[11px] text-slate-400 leading-tight">Uptime SLA</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">10Gbps</div>
                <div className="text-[11px] text-slate-400 leading-tight">Network Ready</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">24/7 SLA</div>
                <div className="text-[11px] text-slate-400 leading-tight">Engineer Support</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-End Technology Visualizer */}
          <motion.div
            variants={staggerItemVariants}
            className="lg:col-span-6 w-full"
          >
            <TechnologyVisualizer />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
