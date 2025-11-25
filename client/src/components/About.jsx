import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const About = () => {
  return (
    <Reveal
      animation={["fade", "up"]}
      stagger
      id="about"
      className="w-full py-36 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--color-primary-500)" }}
          >
            About Royal Hunters LLC
          </h2>

          <p className="text-lg leading-relaxed text-black/80">
            Royal Hunters LLC (RHL) makes freight movement simple, affordable,
            and dependable. Based just outside Dallas, Texas, we connect
            shippers with reliable carriers to ensure smooth, on-time deliveries
            across the U.S.
          </p>

          <h3
            className="text-2xl font-semibold mt-10 mb-3"
            style={{ color: "var(--color-primary-400)" }}
          >
            What We Stand For
          </h3>

          <p className="text-lg leading-relaxed text-black/80">
            At RHL, we believe shipping should be the easiest part of doing
            business. Our team handles rate negotiation, route planning,
            real-time tracking, and delivery confirmation — so you can focus on
            running your business.
          </p>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/AboutImage.jpeg"
            alt="About Royal Hunters LLC"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </Reveal>
  );
};

export default About;
