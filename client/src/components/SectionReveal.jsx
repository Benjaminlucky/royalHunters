import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const SectionReveal = ({ id, className = "", children }) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default SectionReveal;
