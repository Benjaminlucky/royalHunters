import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal"; // your existing reveal system

const ExpeditedFreight = () => {
  return (
    <section className="w-full py-36 px-6 md:px-12 lg:px-20 bg-white">
      <Reveal animation={["fade", "up"]} stagger>
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--color-primary-500)" }}
          >
            Scalable Freight Brokerage Solutions
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-secondary-700">
            Our brokerage services are built to adapt and grow with your
            company. Whether you're a small manufacturer or a national
            distributor, Royal Hunters LLC provides flexible, technology-driven
            logistics solutions that guarantee both reliability and value.
          </p>
        </div>

        {/* How it Works */}
        <h3
          className="text-2xl md:text-3xl text-center font-semibold mb-10"
          style={{ color: "var(--color-primary-500)" }}
        >
          How it Works
        </h3>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Step 1 */}
          <motion.div
            className="rounded-lg p-8 text-center shadow-md"
            style={{ background: "var(--color-primary-500)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-white/70">Step 1</p>
            <h4 className="text-xl font-bold text-white mt-1">
              Get an Instant Quote
            </h4>
            <p className="text-white/90 mt-2">Fast, transparent pricing.</p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="rounded-lg p-8 text-center shadow-md"
            style={{ background: "var(--color-primary-500)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-white/70">Step 2</p>
            <h4 className="text-xl font-bold text-white mt-1">
              Book Your Shipment
            </h4>
            <p className="text-white/90 mt-2">Secure your load in minutes.</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="rounded-lg p-8 text-center shadow-md"
            style={{ background: "var(--color-primary-500)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-white/70">Step 3</p>
            <h4 className="text-xl font-bold text-white mt-1">
              Track Delivery in Real Time
            </h4>
            <p className="text-white/90 mt-2">Full visibility at every mile.</p>
          </motion.div>
        </div>

        {/* Service Categories */}
        <h3
          className="text-2xl md:text-3xl text-center font-semibold mt-20 mb-10"
          style={{ color: "var(--color-primary-500)" }}
        >
          Service Categories
        </h3>

        <div className="grid md:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {/* Category 1 */}
          <motion.div
            className="bg-secondary-700 text-white flex flex-col text-center justify-center  p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-2">Full Truckload (FTL)</h4>
            <p className="text-sm text-white/80">
              Exclusive truck use with access to reliable, vetted carriers.
              Options include: Dry Van, Refrigerated, Temperature Controlled,
              Heavy Haul & Specialized Freight.
            </p>
          </motion.div>

          {/* Category 2 */}
          <motion.div
            className="bg-secondary-700 text-white p-6 flex flex-col text-center justify-center  rounded-lg shadow-md"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-2">
              Less-Than-Truckload (LTL)
            </h4>
            <p className="text-sm text-white/80">
              Pay only for the space you use. Perfect for frequent or
              small-volume shipments.
            </p>
          </motion.div>

          {/* Category 3 */}
          <motion.div
            className="bg-secondary-700 text-white flex flex-col text-center justify-center  p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-2">Expedited Freight</h4>
            <p className="text-sm text-white/80">
              For time-critical shipments requiring fast, secure delivery.
            </p>
          </motion.div>

          {/* Category 4 */}
          <motion.div
            className="bg-secondary-700 text-white flex flex-col text-center justify-center  p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-2">Multi-Modal Freight</h4>
            <p className="text-sm text-white/80">
              Integrated truck, ship, air & rail solutions to optimize speed,
              cost, and flexibility.
            </p>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
};

export default ExpeditedFreight;
