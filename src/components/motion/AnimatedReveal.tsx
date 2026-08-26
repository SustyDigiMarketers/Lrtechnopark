import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  fadeInUpVariants,
  fadeInVariants,
  fadeInLeftVariants,
  fadeInRightVariants,
  scaleRevealVariants,
  blurRevealVariants
} from '../../animations';

interface AnimatedRevealProps {
  children: ReactNode;
  variant?: 'fadeUp' | 'fade' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur';
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  className = '',
  viewportMargin = '-60px',
  once = true
}) => {
  const shouldReduceMotion = useReducedMotion();

  const variantMap = {
    fadeUp: fadeInUpVariants,
    fade: fadeInVariants,
    fadeLeft: fadeInLeftVariants,
    fadeRight: fadeInRightVariants,
    scale: scaleRevealVariants,
    blur: blurRevealVariants
  };

  const selectedVariant = variantMap[variant] || fadeInUpVariants;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      transition={
        duration
          ? { duration, delay, ease: [0.16, 1, 0.3, 1] }
          : delay
          ? { delay, ease: [0.16, 1, 0.3, 1] }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};
