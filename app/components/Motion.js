"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const revealViewport = {
  once: true,
  amount: 0.2,
};

export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

export const staggerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

export function FadeIn({
  as = "div",
  className,
  children,
  viewport = revealViewport,
  variants = fadeUpVariants,
  inView = true,
  ...props
}) {
  const MotionTag = motion[as] ?? motion.div;

  const triggerProps = inView
    ? {
        initial: "hidden",
        whileInView: "show",
        viewport,
      }
    : {};

  return (
    <MotionTag
      variants={variants}
      className={className}
      {...triggerProps}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({
  as = "div",
  className,
  children,
  viewport = revealViewport,
  variants = staggerVariants,
  inView = true,
  ...props
}) {
  const MotionTag = motion[as] ?? motion.div;

  const triggerProps = inView
    ? {
        initial: "hidden",
        whileInView: "show",
        viewport,
      }
    : {};

  return (
    <MotionTag
      variants={variants}
      className={className}
      {...triggerProps}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
