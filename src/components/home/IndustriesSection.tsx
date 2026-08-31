import React from 'react';
import { industriesList } from '../../data/companyData';
import { Activity, Landmark, Cpu, Truck, GraduationCap, Building2, ArrowRight, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../motion/StaggerContainer';
import { TechBadge } from '../ui/TechBadge';

const ICON_MAP: Record<string, React.ElementType> = {
  Activity,
  Landmark,
  Cpu,
  Truck,
  GraduationCap,
  Building2
};

export const IndustriesSection: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <section id="industries-section" className="py-24 sm:py-32 bg-[#07090e] border-t border-slate-800 text-white relative overflow-hidden">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          theme="dark"
          indexTag="[ 03 // SECTORS ]"
          badge="INDUSTRIES"
          title="Built for Every Sector."
          highlightText=""
          description="Delivering reliable hardware and network infrastructure across critical environments."
          className="mb-14"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesList.map((ind) => {
            const Icon = ICON_MAP[ind.icon] || Building2;
            return (
              <StaggerItem key={ind.id}>
                <div className="p-7 sm:p-8 rounded-3xl bg-[#0d1322] border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between h-full group shadow-xl hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <TechBadge variant="blue" size="sm">
                        {ind.stat}
                      </TechBadge>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {ind.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-amber-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      ISO / SOC 2 Type II
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Inquire Sector Arch</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
