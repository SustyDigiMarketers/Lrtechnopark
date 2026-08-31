import React from 'react';
import { AnimatedReveal } from '../motion/AnimatedReveal';

interface SectionHeaderProps {
  indexTag?: string;
  badge?: string;
  title: string;
  highlightText?: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  indexTag,
  badge,
  title,
  highlightText,
  description,
  align = 'center',
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {/* Precision Tech Tag */}
      {(indexTag || badge) && (
        <AnimatedReveal variant="fadeUp" delay={0.05}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase mb-4 bg-amber-400/10 border border-amber-400/30 text-amber-400">
            {indexTag && <span className="text-amber-400 font-bold">{indexTag}</span>}
            {indexTag && badge && <span className="opacity-40">&bull;</span>}
            {badge && <span>{badge}</span>}
          </div>
        </AnimatedReveal>
      )}

      {/* Dominant Editorial Heading */}
      <AnimatedReveal variant="fadeUp" delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-white">
          {title}{' '}
          {highlightText && (
            <span className="text-amber-400 font-bold">
              {highlightText}
            </span>
          )}
        </h2>
      </AnimatedReveal>

      {/* Balanced Body Copy */}
      {description && (
        <AnimatedReveal variant="fadeUp" delay={0.16}>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-400">
            {description}
          </p>
        </AnimatedReveal>
      )}
    </div>
  );
};
