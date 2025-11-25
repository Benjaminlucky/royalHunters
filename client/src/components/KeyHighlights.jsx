import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { Truck, Boxes, ArrowUpDown, Snowflake, Crosshair } from "lucide-react";

const highlights = [
  {
    title: "Full Truckload (FTL)",
    icon: <Truck size={48} strokeWidth={1.8} />,
  },
  {
    title: "Less-Than-Truckload (LTL)",
    icon: <Boxes size={48} strokeWidth={1.8} />,
  },
  {
    title: "Intermodal & Multi-Modal",
    icon: <ArrowUpDown size={48} strokeWidth={1.8} />,
  },
  {
    title: "Specialized Freight",
    icon: <Snowflake size={48} strokeWidth={1.8} />,
  },
  {
    title: "Real-Time Shipping Visibility",
    icon: <Crosshair size={48} strokeWidth={1.8} />,
  },
];

const KeyHighlights = () => {
  return (
    <Reveal
      animation={["fade", "up"]}
      stagger
      id="highlights"
      className="w-full bg-secondary-500 py-36 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "var(--color-secondary-800)" }}
    >
      {/* TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Key Highlights
        </h2>

        <div
          className="w-20 h-[3px] mx-auto mt-2 rounded-full"
          style={{ backgroundColor: "var(--color-primary-500)" }}
        ></div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-8 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4" style={{ color: "var(--color-primary-500)" }}>
              {item.icon}
            </div>

            <p className="text-center font-medium text-sm md:text-base text-black/80">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </Reveal>
  );
};

export default KeyHighlights;
