import { Transition } from 'framer-motion';
import { MOTION_EASINGS, MOTION_DURATIONS } from './motionConfig';

export const transitionCinematic: Transition = {
  duration: MOTION_DURATIONS.cinematic,
  ease: MOTION_EASINGS.editorial
};

export const transitionSnappy: Transition = {
  duration: MOTION_DURATIONS.fast,
  ease: MOTION_EASINGS.snappy
};

export const transitionFast: Transition = {
  duration: MOTION_DURATIONS.micro,
  ease: 'easeOut'
};

export const transitionSpringModal: Transition = {
  type: 'spring',
  stiffness: 340,
  damping: 28,
  mass: 0.8
};

export const transitionPage: Transition = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1]
};

export const transitionStaggerItem = (delay: number = 0): Transition => ({
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
  delay
});
