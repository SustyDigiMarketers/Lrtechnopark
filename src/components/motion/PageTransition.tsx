import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { pageTransitionVariants, portalPageTransitionVariants } from '../../animations';

interface PageTransitionProps {
  children: ReactNode;
  isPortal?: boolean;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isPortal = false,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={isPortal ? portalPageTransitionVariants : pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};
