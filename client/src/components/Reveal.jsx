import React from "react";
import { motion } from "framer-motion";

/**
 * Utility animation variants
 */
const baseVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
};

/**
 * Combine multiple variants together
 */
const mergeVariants = (list) => {
  const hidden = {};
  const visible = {};

  list.forEach((key) => {
    if (baseVariants[key]) {
      Object.assign(hidden, baseVariants[key].hidden);
      Object.assign(visible, baseVariants[key].visible);
    }
  });

  return { hidden, visible };
};

/**
 * Reveal Component
 */
const Reveal = ({
  id,
  as = "section",
  className = "",
  animation = ["fade", "up"],
  duration = 0.6,
  delay = 0,
  stagger = false,
  children,
}) => {
  const Tag = motion[as] || motion.section;

  return (
    <Tag
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        ease: "easeOut",
        delay,
        staggerChildren: stagger ? 0.12 : 0,
      }}
      variants={mergeVariants(animation)}
      className={className}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
