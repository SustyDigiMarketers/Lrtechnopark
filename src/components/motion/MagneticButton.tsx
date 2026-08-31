import React, { useRef, useState, ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'dark' | 'glow';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 18,
  className = '',
  variant = 'primary',
  onClick,
  disabled,
  type = 'button',
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({
      x: (middleX / width) * strength,
      y: (middleY / height) * strength
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 active:scale-95',
    secondary:
      'bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-amber-500/50 active:bg-slate-950',
    ghost:
      'bg-transparent hover:bg-slate-900/80 text-slate-300 hover:text-white active:bg-slate-800',
    outline:
      'bg-transparent border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-white active:bg-slate-900',
    dark:
      'bg-slate-950 hover:bg-slate-900 text-white shadow-md border border-slate-800 hover:border-amber-500/40 active:bg-black',
    glow:
      'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/30'
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center font-semibold text-sm rounded-full transition-colors cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};
