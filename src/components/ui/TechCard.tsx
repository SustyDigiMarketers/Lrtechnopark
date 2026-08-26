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
      'bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md text-slate-900',
    dark:
      'bg-slate-900/90 border border-slate-800 shadow-xl text-white backdrop-blur-md hover:border-slate-700',
    glass:
      'bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-lg text-slate-900'
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
      className={`relative rounded-3xl p-6 sm:p-8 transition-colors ${themeStyles[theme]} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Precision corner ticks for technical aesthetic */}
      {cornerAccents && (
        <>
          <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-blue-500/40 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-blue-500/40 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-blue-500/40 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-blue-500/40 pointer-events-none" />
        </>
      )}
      {children}
    </Component>
  );
};
