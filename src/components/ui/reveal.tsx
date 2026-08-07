"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type MotionDivProps = React.ComponentProps<typeof motion.div>;

type RevealProps = MotionDivProps & {
  delay?: number;
  /** Distance travelled on entry, in px. */
  distance?: number;
};

/**
 * Standard scroll-entry. Deliberately restrained: 24px and 0.7s.
 * Reduced motion is neutralized globally in globals.css and by motion's own
 * reduced-motion handling, which zeroes transforms.
 */
export function Reveal({
  delay = 0,
  distance = 24,
  className,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Stagger({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={staggerParent}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div variants={staggerChild} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
