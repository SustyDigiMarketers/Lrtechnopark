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
      'bg-[#1a56db] hover:bg-[#1545b3] text-white shadow-md hover:shadow-lg hover:shadow-blue-500/20 active:bg-blue-800',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 active:bg-slate-300',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 active:bg-slate-200',
    outline:
      'bg-transparent border border-slate-300 hover:border-slate-800 text-slate-800 active:bg-slate-50',
    dark:
      'bg-slate-900 hover:bg-slate-800 text-white shadow-md border border-slate-800 active:bg-black',
    glow:
      'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25'
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
