import { Variants } from 'framer-motion';
import { MOTION_EASINGS } from './motionConfig';

/**
 * Core Micro-Interaction Variants (Hover, Tap, Elevation)
 */

export const buttonMotionVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: MOTION_EASINGS.snappy }
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: { duration: 0.1 }
  }
};

export const cardHoverVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -4,
    transition: { duration: 0.28, ease: MOTION_EASINGS.snappy }
  }
};

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.24, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: 'easeIn' }
  }
};

export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 28,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: { duration: 0.18, ease: 'easeIn' }
  }
};

export const drawerVariants: Variants = {
  hidden: { x: '100%', opacity: 0.5 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeInOut' }
  }
};
