import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal"; // your advanced reveal system

// Light sweep animation
const Sweep = () => (
  <motion.div
    initial={{ x: "-150%" }}
    animate={{ x: "150%" }}
    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
      filter: "blur(22px)",
    }}
  />
);

const Hero = () => {
  return (
    <Reveal
      animation={["blur", "up"]}
      stagger
      id="hero"
      className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/heroBanner.jpeg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Light Sweep */}
      <Sweep />

      {/* Content */}
      <div className="relative text-center max-w-5xl px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Dependable & Affordable <br /> Freight Broker in Dallas, Texas
        </h1>

        <p className="mt-4 text-lg md:text-xl opacity-90">
          Connecting shippers to trusted, DOT-authorized carriers{" "}
          <strong>fast, affordable, and reliable.</strong>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {/* Primary button with pulse */}
          <motion.button
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 22px var(--color-primary-400)",
            }}
            className="px-6 py-3 rounded-md font-semibold text-white transition-transform duration-300 hover:shadow-lg relative overflow-hidden"
            style={{ backgroundColor: "var(--color-primary-500)" }}
          >
            <span className="relative z-10">Get an Instant Quote</span>
            <motion.span
              className="absolute inset-0"
              initial={{ x: "-120%" }}
              whileHover={{ x: "120%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.35) 0%, transparent 70%)",
              }}
            />
          </motion.button>

          {/* Outline button */}
          <motion.button
            whileHover={{
              scale: 1.07,
              boxShadow: "0 0 22px var(--color-primary-400)",
            }}
            className="px-6 py-3 rounded-md font-semibold border transition-all duration-300 relative overflow-hidden"
            style={{
              borderColor: "var(--color-primary-500)",
              color: "var(--color-primary-50)",
            }}
          >
            <span className="relative z-10">Book Your Shipment</span>
            <motion.span
              className="absolute inset-0"
              initial={{ x: "-120%" }}
              whileHover={{ x: "120%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.25) 0%, transparent 70%)",
              }}
            />
          </motion.button>
        </div>
      </div>
    </Reveal>
  );
};

export default Hero;
