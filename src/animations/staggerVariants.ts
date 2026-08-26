import { Variants } from 'framer-motion';
import { MOTION_EASINGS } from './motionConfig';

export const staggerContainerVariants = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0.05
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
      ease: MOTION_EASINGS.editorial
    }
  }
});

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: MOTION_EASINGS.editorial
    }
  }
};

export const staggerFastItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: MOTION_EASINGS.snappy
    }
  }
};
