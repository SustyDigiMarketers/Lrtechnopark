import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustedMarquee } from '../components/home/TrustedMarquee';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { ServicesShowcaseSection } from '../components/home/ServicesShowcaseSection';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { MetricsSection } from '../components/home/MetricsSection';
import { CtaSection } from '../components/home/CtaSection';
import { PageTransition } from '../components/motion/PageTransition';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenTracker: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onQuickOrder: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenTracker,
  onOpenAuth,
  onQuickOrder
}) => {
  return (
    <PageTransition className="space-y-0 bg-[#07090e]">
      {/* 1. Futuristic Enterprise Hero with Interactive Mesh Visualizer */}
      <HeroSection
        onNavigate={onNavigate}
        onOpenTracker={onOpenTracker}
        onOpenCalculator={() => onNavigate('contact')}
        onOpenAuth={onOpenAuth}
      />

      {/* 2. Enterprise Standards & Compliance Marquee */}
      <TrustedMarquee />

      {/* 3. Flagship Enterprise Software & Edge Suite */}
      <FeaturedProductsSection
        onNavigate={onNavigate}
        onQuickOrder={onQuickOrder}
      />

      {/* 4. Engineering & Managed Architecture Capabilities */}
      <ServicesShowcaseSection
        onNavigate={onNavigate}
        onOpenContactWithService={(serviceName) => onNavigate('contact', serviceName)}
      />

      {/* 5. Regulated Industry Verticals */}
      <IndustriesSection onNavigate={onNavigate} />

      {/* 6. Operational Metrics & Verified SLA Telemetry */}
      <MetricsSection />

      {/* 7. Architecture Advisory & Portal CTA */}
      <CtaSection
        onNavigate={onNavigate}
        onOpenAuth={onOpenAuth}
      />
    </PageTransition>
  );
};
