import { Variants } from 'framer-motion';
import { MOTION_EASINGS } from './motionConfig';

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: MOTION_EASINGS.editorial }
  }
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: MOTION_EASINGS.editorial }
  }
};

export const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: MOTION_EASINGS.editorial }
  }
};

export const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: MOTION_EASINGS.editorial }
  }
};

export const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: MOTION_EASINGS.editorial }
  }
};

export const scaleRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: MOTION_EASINGS.editorial }
  }
};

export const blurRevealVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: MOTION_EASINGS.editorial }
  }
};
