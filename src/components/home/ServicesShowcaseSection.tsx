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
import { TechBadge } from '../ui/TechBadge';
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
    <section className="py-24 sm:py-32 bg-[#05070a] border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          indexTag="[ 02 // MANAGED SERVICES ]"
          badge="IT INFRASTRUCTURE & ENGINEERING"
          title="Infrastructure Services."
          highlightText=""
          description="End-to-end IT deployment, network engineering, and 24/7 technical maintenance for modern commercial facilities."
          className="mb-16"
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
                <div className="p-7 rounded-3xl bg-[#0d1322] border border-slate-800 hover:border-amber-500/50 hover:bg-[#0f172a] transition-all duration-300 flex flex-col justify-between h-full shadow-xl hover:shadow-2xl group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <TechBadge variant="blue" size="sm">
                        {meta.tag}
                      </TechBadge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                        {srv.name}
                      </h3>
                      <p className="text-xs font-semibold text-amber-400 mt-1">
                        {meta.headline}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {meta.summary}
                    </p>

                    {/* Key capabilities pill list */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      {srv.capabilities.slice(0, 3).map((cap, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('services', srv.slug)}
                      className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenContactWithService(srv.name)}
                      className="w-full py-2 px-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/40 text-xs font-semibold transition-colors cursor-pointer text-center"
                    >
                      Book Consultation
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
