import React from 'react';
import { ArrowRight, Lock, Headphones, ShieldCheck, Terminal } from 'lucide-react';
import { AnimatedReveal } from '../motion/AnimatedReveal';
import { MagneticButton } from '../motion/MagneticButton';
import { TechBadge } from '../ui/TechBadge';

interface CtaSectionProps {
  onNavigate: (view: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onNavigate,
  onOpenAuth
}) => {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedReveal variant="scale">
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <TechBadge variant="dark" size="md" dot>
                  READY TO START?
                </TechBadge>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Let's Build Your Infrastructure.
                </h2>

                <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                  Speak with our engineers or configure your order through the customer portal.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <MagneticButton
                  variant="primary"
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3.5 px-6 text-sm font-bold gap-2 shadow-xl shadow-blue-600/30"
                >
                  <Headphones className="w-4 h-4 text-white" />
                  <span>Talk to Us</span>
                </MagneticButton>

                <MagneticButton
                  variant="dark"
                  onClick={() => onOpenAuth('login')}
                  className="w-full py-3.5 px-6 text-sm font-semibold bg-slate-900 border border-slate-700 hover:border-slate-500 gap-2 text-white"
                >
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span>Access Customer Portal</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};
