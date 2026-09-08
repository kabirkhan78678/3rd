// lib/animations.ts
// Centralized animation configuration for KLUB

import { Variants } from "framer-motion";

// ─── Easing Curves ───────────────────────────────────────────────────────────
export const EASING = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  snap: [0.77, 0, 0.175, 1] as const,
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
  out: [0, 0, 0.2, 1] as const,
  in: [0.4, 0, 1, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
};

// ─── Durations ───────────────────────────────────────────────────────────────
export const DURATION = {
  instant: 0.1,
  fast: 0.25,
  normal: 0.4,
  medium: 0.6,
  slow: 0.8,
  cinematic: 1.2,
};

// ─── Spring Configs ───────────────────────────────────────────────────────────
export const SPRING = {
  gentle: { type: "spring" as const, stiffness: 80, damping: 20 },
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 10 },
  stiff: { type: "spring" as const, stiffness: 500, damping: 40 },
};

// ─── Shared Variants ──────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASING.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASING.smooth },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASING.out },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.medium, ease: EASING.out },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.medium, ease: EASING.out },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.medium, ease: EASING.out },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING.snappy,
  },
};

// ─── Container / Stagger Variants ─────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ─── Text Reveal ──────────────────────────────────────────────────────────────

export const textReveal: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: DURATION.medium, ease: EASING.snap },
  },
};

export const charReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASING.out },
  },
};

// ─── Page Transition ──────────────────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASING.out },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: DURATION.fast, ease: EASING.in },
  },
};

// ─── Drawer / Panel ───────────────────────────────────────────────────────────

export const drawerRight: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: DURATION.medium, ease: EASING.snap },
  },
  exit: {
    x: "100%",
    transition: { duration: DURATION.normal, ease: EASING.in },
  },
};

export const drawerLeft: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { duration: DURATION.medium, ease: EASING.snap },
  },
  exit: {
    x: "-100%",
    transition: { duration: DURATION.normal, ease: EASING.in },
  },
};

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast },
  },
};

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

export const mobileMenu: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASING.out },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: DURATION.fast, ease: EASING.in },
  },
};

// ─── Hover Variants ───────────────────────────────────────────────────────────

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: DURATION.fast } },
  whileTap: { y: 0, scale: 0.98, transition: { duration: 0.1 } },
};

export const hoverScale = {
  whileHover: { scale: 1.03, transition: { duration: DURATION.fast } },
  whileTap: { scale: 0.97, transition: { duration: 0.1 } },
};

export const hoverGrow = {
  whileHover: { scale: 1.08, transition: { duration: DURATION.normal } },
};

// ─── Number Counter ───────────────────────────────────────────────────────────

export const VIEWPORT_ONCE = { once: true, margin: "-100px" };
export const VIEWPORT_REPEAT = { once: false, margin: "-80px" };
