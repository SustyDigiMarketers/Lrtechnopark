import React from 'react';
import { ArrowRight, Lock, Headphones } from 'lucide-react';
import { AnimatedReveal } from '../motion/AnimatedReveal';

interface CtaSectionProps {
  onNavigate: (view: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onNavigate,
  onOpenAuth
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#050607] relative overflow-hidden border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedReveal variant="scale">
          <div className="rounded-3xl bg-[#0b0e12] text-[#f5f6f7] p-8 sm:p-12 lg:p-16 border border-slate-800/90 shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#f4b72d]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#ffd76a]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11161b] border border-slate-700/60 text-[#f4b72d] text-xs font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4b72d]" />
                  <span>READY TO START?</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f5f6f7] tracking-tight leading-[1.1]">
                  Let's Build Your Infrastructure.
                </h2>

                <p className="text-sm sm:text-base text-[#9ca5ae] max-w-xl font-normal leading-relaxed">
                  Speak with our engineers or configure your order through the customer portal.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3.5 px-6 rounded-full bg-[#f4b72d] hover:bg-[#ffd76a] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#f4b72d]/15 active:scale-98"
                >
                  <Headphones className="w-4 h-4 text-slate-950" />
                  <span>Talk to Us</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="w-full py-3.5 px-6 rounded-full bg-[#11161b] hover:bg-[#181f26] text-[#f5f6f7] font-semibold text-sm border border-slate-700/60 hover:border-[#f4b72d]/40 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  <Lock className="w-4 h-4 text-[#f4b72d]" />
                  <span>Access Customer Portal</span>
                </button>
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};
