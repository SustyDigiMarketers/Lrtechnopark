import React from 'react';
import { servicesData } from '../../data/servicesData';
import {
  ShieldCheck,
  Network,
  Shield,
  Wifi,
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../motion/StaggerContainer';

interface ServicesShowcaseSectionProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenContactWithService: (serviceName: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Network,
  Shield,
  Wifi
};

const SERVICE_SUMMARIES: Record<string, { tag: string; headline: string; summary: string }> = {
  'firewall': {
    tag: 'MANAGED SECURITY',
    headline: 'Protect your network with managed security.',
    summary: 'Perimeter firewall installation, VPN hardening, UTM rulesets, and 24/7 security monitoring.'
  },
  'networking': {
    tag: 'INFRASTRUCTURE',
    headline: 'Build a faster, more reliable network.',
    summary: 'Structured Cat6/fiber cabling, managed rack assembly, switching, and routing architecture.'
  },
  'cctv': {
    tag: 'SURVEILLANCE',
    headline: 'See more. Secure better.',
    summary: 'High-definition 4K surveillance, AI night-vision cameras, NVR storage arrays, and mobile monitoring.'
  },
  'wifi': {
    tag: 'CONNECTIVITY',
    headline: 'Reliable connectivity across your space.',
    summary: 'High-density commercial Wi-Fi 6/7, seamless roaming, guest hotspots, and bandwidth management.'
  }
};

export const ServicesShowcaseSection: React.FC<ServicesShowcaseSectionProps> = ({
  onNavigate,
  onOpenContactWithService
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#050607] border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          indexTag="[ 02 // MANAGED SERVICES ]"
          badge="IT INFRASTRUCTURE & ENGINEERING"
          title="Infrastructure Services."
          highlightText=""
          description="End-to-end IT deployment, network engineering, and 24/7 technical maintenance for modern commercial facilities."
          className="mb-14"
        />

        {/* 4 Clean High-Impact Service Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.slice(0, 4).map((srv) => {
            const IconComponent = ICON_MAP[srv.icon] || ShieldCheck;
            const meta = SERVICE_SUMMARIES[srv.slug] || {
              tag: 'MANAGED SERVICE',
              headline: srv.name,
              summary: srv.shortDescription
            };

            return (
              <StaggerItem key={srv.id}>
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0b0e12] border border-slate-800/90 hover:border-[#f4b72d]/50 hover:bg-[#11161b] transition-all duration-300 flex flex-col justify-between h-full shadow-xl hover:shadow-2xl group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#11161b] border border-slate-700/60 flex items-center justify-center text-[#f4b72d] group-hover:scale-105 transition-transform shadow-xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#11161b] border border-slate-800 text-[#f4b72d] text-[10px] font-mono font-semibold uppercase">
                        {meta.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#f5f6f7] group-hover:text-[#f4b72d] transition-colors leading-snug">
                        {srv.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#f4b72d] mt-1">
                        {meta.headline}
                      </p>
                    </div>

                    <p className="text-xs text-[#9ca5ae] leading-relaxed font-normal">
                      {meta.summary}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                      {srv.capabilities.slice(0, 3).map((cap, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#f4b72d] shrink-0" />
                          <span className="truncate">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onNavigate('services', srv.slug)}
                      className="text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Learn More
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenContactWithService(srv.name)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f4b72d] hover:bg-[#ffd76a] text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-sm shadow-[#f4b72d]/10"
                    >
                      <span>Consult</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
