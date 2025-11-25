import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <Reveal
      animation={["fade", "up"]}
      stagger
      id="contact-section"
      className="w-full py-3 py-36 px-6 md:px-12 lg:px-20 bg-secondary-800"
      style={{ backgroundColor: "var(--color-secondary-900)" }}
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Let’s Move Forward Together
        </h2>

        <div
          className="w-24 h-[3px] mx-auto rounded-full mt-3"
          style={{ backgroundColor: "var(--color-primary-500)" }}
        ></div>

        <p className="text-white/70 mt-4 leading-relaxed">
          Whether local, interstate, or international, Royal Hunters LLC ensures
          your freight moves on time and within budget.
        </p>
      </div>

      {/* CONTACT INFO */}
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6 text-white text-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <Phone size={26} strokeWidth={1.8} />
          <span className="font-medium">+1 (214) 355-6669</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <Mail size={26} strokeWidth={1.8} />
          <span className="font-medium">support@royalhuntersllc.com</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-center"
        >
          <MapPin size={26} strokeWidth={1.8} />
          <span className="font-medium">
            1868 Ballinger Drive, Forney, TX 75126
          </span>
        </motion.div>
      </div>
    </Reveal>
  );
}
