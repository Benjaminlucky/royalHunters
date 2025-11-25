import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  CreditCard,
  Handshake,
  Fuel,
  Headphones,
  ClipboardList,
  Truck,
} from "lucide-react";

const items = [
  {
    title: "Quick Payouts",
    icon: <CreditCard size={62} strokeWidth={1.8} />,
  },
  {
    title: "Highly Negotiable Payment Terms",
    icon: <Handshake size={62} strokeWidth={1.8} />,
  },
  {
    title: "Fuel Advances",
    icon: <Fuel size={62} strokeWidth={1.8} />,
  },
  {
    title: "24/7 Support",
    icon: <Headphones size={62} strokeWidth={1.8} />,
  },
  {
    title: "Seamless Onboarding",
    icon: <ClipboardList size={62} strokeWidth={1.8} />,
  },
  {
    title: "Spot & Contract Loads Available",
    icon: <Truck size={62} strokeWidth={1.8} />,
  },
];

const CarrierNetwork = () => {
  return (
    <Reveal
      animation={["fade", "up"]}
      stagger
      id="carrier-network"
      className="w-full bg-secondary-700 py-36 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "var(--color-secondary-900)" }}
    >
      {/* SECTION TITLE */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Join Our Carrier Network
        </h2>

        <div
          className="w-24 h-[3px] mx-auto rounded-full mt-3"
          style={{ backgroundColor: "var(--color-primary-500)" }}
        ></div>

        <p className="text-white/70 mt-4 leading-relaxed">
          At RHL, carriers are partners — not just numbers. We build long-term,
          mutually beneficial relationships to keep your trucks loaded
          year-round.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-10 text-white"
            style={{
              backgroundColor: "var(--color-primary-500)",
            }}
          >
            <div className="mb-4">{item.icon}</div>
            <p className="text-center font-medium text-xl leading-relaxed">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </Reveal>
  );
};

export default CarrierNetwork;
