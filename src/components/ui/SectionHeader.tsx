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
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase mb-4 ${
            isDark
              ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
              : 'bg-blue-50 border border-blue-200 text-[#1a56db]'
          }`}>
            {indexTag && <span className="text-blue-500 font-bold">{indexTag}</span>}
            {indexTag && badge && <span className="opacity-40">&bull;</span>}
            {badge && <span>{badge}</span>}
          </div>
        </AnimatedReveal>
      )}

      {/* Dominant Editorial Heading */}
      <AnimatedReveal variant="fadeUp" delay={0.1}>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {title}{' '}
          {highlightText && (
            <span className={isDark ? 'text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-300' : 'text-[#1a56db]'}>
              {highlightText}
            </span>
          )}
        </h2>
      </AnimatedReveal>

      {/* Balanced Body Copy */}
      {description && (
        <AnimatedReveal variant="fadeUp" delay={0.16}>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {description}
          </p>
        </AnimatedReveal>
      )}
    </div>
  );
};
