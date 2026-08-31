import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TrustedMarquee: React.FC = () => {
  const signalBadges = [
    { title: 'SOC 2 Type II Certified', sub: 'Trust Services Criteria' },
    { title: 'ISO/IEC 27001 ISMS', sub: 'Information Security' },
    { title: 'HIPAA & HITECH Aligned', sub: 'Healthcare Security' },
    { title: 'PCI-DSS v4.0 Level 1', sub: 'Financial Encryption' },
    { title: 'FIPS 140-2 Cryptography', sub: 'Hardware Security' },
    { title: 'NIST 800-53 Hardened', sub: 'Federal Security Standards' },
    { title: 'Zero-Trust Architecture', sub: 'mTLS Ephemeral Access' }
  ];

  return (
    <section className="py-7 bg-[#050607] border-b border-slate-800/80 overflow-hidden text-[#9ca5ae] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#f4b72d]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5f6f7] font-semibold">
            ENTERPRISE COMPLIANCE & PROTOCOL STANDARDS
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#f4b72d]/70">
          [ DEPLOYABLE ACROSS PUBLIC CLOUD, PRIVATE VPC & AIR-GAPPED OT ]
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050607] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050607] to-transparent z-10 pointer-events-none" />

        {/* Marquee Row */}
        <div className="flex items-center gap-4 sm:gap-6 animate-marquee whitespace-nowrap">
          {[...signalBadges, ...signalBadges].map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0b0e12] border border-slate-800/80 hover:border-[#f4b72d]/40 text-[#9ca5ae] transition-colors shrink-0 group cursor-default"
            >
              <div className="w-6 h-6 rounded-xl bg-[#11161b] border border-slate-700/60 flex items-center justify-center text-[#f4b72d] text-xs font-mono font-bold group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f4b72d]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold font-mono tracking-tight text-slate-200">
                  {item.title}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
