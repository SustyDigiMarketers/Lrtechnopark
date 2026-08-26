import { Variants } from 'framer-motion';
import { MOTION_EASINGS } from './motionConfig';

export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: MOTION_EASINGS.editorial
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.22,
      ease: 'easeIn'
    }
  }
};

export const portalPageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.99
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: MOTION_EASINGS.portal
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  }
};

export const slideStepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: MOTION_EASINGS.snappy
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  })
};
