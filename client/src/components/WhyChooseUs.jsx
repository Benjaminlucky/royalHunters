import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { Network, Truck, Headphones, Radar, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Flexible Capacity",
    description: "Access to a large network of DOT-authorized carriers.",
    icon: <Network size={52} strokeWidth={1.8} />,
    bg: "var(--color-primary-900)",
  },
  {
    title: "Asset-Based Carrier Advantage",
    description: "Dedicated fleet reduces cost and increases availability.",
    icon: <Truck size={52} strokeWidth={1.8} />,
    bg: "var(--color-primary-800)",
  },
  {
    title: "Dedicated Account Management",
    description: "One point of contact for personalized service.",
    icon: <Headphones size={52} strokeWidth={1.8} />,
    bg: "var(--color-primary-700)",
  },
  {
    title: "Advanced Visibility",
    description: "Real-time tracking and shipment updates.",
    icon: <Radar size={52} strokeWidth={1.8} />,
    bg: "var(--color-primary-600)",
  },
  {
    title: "Scalable Solutions",
    description: "From one shipment to a full logistics strategy.",
    icon: <BarChart3 size={52} strokeWidth={1.8} />,
    bg: "var(--color-primary-500)",
  },
];

const WhyChooseUs = () => {
  return (
    <Reveal
      animation={["fade", "up"]}
      stagger
      id="why-choose-us"
      className="w-full py-36 bg-secondary-700 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "var(--color-secondary-900)" }}
    >
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Why Choose Royal Hunters LLC
        </h2>

        <p className="text-white/70 mt-3 text-base md:text-lg">
          Built for reliability, transparency, and performance.
        </p>

        <div
          className="w-24 h-[3px] mx-auto mt-4 rounded-full"
          style={{ backgroundColor: "var(--color-primary-500)" }}
        ></div>
      </div>

      {/* FEATURES BLOCKS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 text-center flex flex-col items-center justify-center"
            style={{
              backgroundColor: item.bg,
              color: index < 5 ? "white" : "black",
            }}
          >
            <div className="mb-4">{item.icon}</div>

            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

            <p className="text-sm opacity-80 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Reveal>
  );
};

export default WhyChooseUs;
