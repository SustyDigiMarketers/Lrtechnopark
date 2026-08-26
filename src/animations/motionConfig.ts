/**
 * LR TECHNO PARK — MOTION CONFIGURATION
 * Master easing curves, durations, and accessibility reduced-motion rules
 */

export const MOTION_EASINGS = {
  // Cinematic smooth bezier for editorial & hero reveals
  editorial: [0.16, 1, 0.3, 1],
  // Precise snappy cubic for interactive buttons & tabs
  snappy: [0.22, 1, 0.36, 1],
  // Subtle deceleration for cards & modals
  decelerate: [0.05, 0.7, 0.1, 1],
  // High-performance sprint for dashboard data & alerts
  portal: [0.25, 0.1, 0.25, 1],
  // Spring configurations
  springTight: { type: 'spring', stiffness: 400, damping: 30 },
  springGentle: { type: 'spring', stiffness: 200, damping: 25 },
  springBouncy: { type: 'spring', stiffness: 300, damping: 18 }
} as const;

export const MOTION_DURATIONS = {
  micro: 0.18,
  fast: 0.32,
  normal: 0.5,
  cinematic: 0.8,
  epic: 1.2
} as const;

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
