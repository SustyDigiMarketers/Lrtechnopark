import React from 'react';
import { keyStats } from '../../data/companyData';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../motion/StaggerContainer';

export const MetricsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#05070a] border-t border-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          theme="dark"
          indexTag="[ 04 // METRICS ]"
          badge="PERFORMANCE"
          title="Proven Reliability."
          highlightText=""
          description="Key operational benchmarks across enterprise hardware and managed network deployments."
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
          {keyStats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="p-6 rounded-3xl bg-[#0d1322] border border-slate-800 flex flex-col justify-center items-center shadow-xl hover:border-amber-500/50 transition-colors h-full">
                <div className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white mt-2 leading-tight">
                  {stat.label}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  {stat.context}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
