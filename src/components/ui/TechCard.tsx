import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TechCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  theme?: 'light' | 'dark' | 'glass';
  cornerAccents?: boolean;
  onClick?: () => void;
}

export const TechCard: React.FC<TechCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  theme = 'light',
  cornerAccents = false,
  onClick
}) => {
  const shouldReduceMotion = useReducedMotion();

  const themeStyles = {
    light:
      'bg-[#0d1322] border border-slate-800 shadow-xl hover:border-amber-500/40 hover:shadow-amber-500/5 text-white',
    dark:
      'bg-[#090d18] border border-slate-800/90 shadow-2xl text-white backdrop-blur-md hover:border-amber-500/50',
    glass:
      'bg-[#0d1322]/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl text-white hover:border-amber-500/40'
  };

  const Component = hoverEffect && !shouldReduceMotion ? motion.div : 'div';

  const motionProps =
    hoverEffect && !shouldReduceMotion
      ? {
          whileHover: { y: -3, transition: { duration: 0.22, ease: 'easeOut' } },
          whileTap: onClick ? { scale: 0.99 } : undefined
        }
      : {};

  return (
    <Component
      {...(motionProps as any)}
      onClick={onClick}
      className={`relative rounded-3xl p-6 sm:p-8 transition-all ${themeStyles[theme]} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Precision corner ticks for technical aesthetic */}
      {cornerAccents && (
        <>
          <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-amber-400/60 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-amber-400/60 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-amber-400/60 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-amber-400/60 pointer-events-none" />
        </>
      )}
      {children}
    </Component>
  );
};
