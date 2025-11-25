import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const images = [
  { src: "/gallery1.jpg", caption: "Gallery Z Fold4" },
  { src: "/gallery2.jpg", caption: "Gallery Z Fold4" },
  { src: "/gallery3.jpg", caption: "Gallery Z Fold4" },
  { src: "/gallery4.jpg", caption: "Gallery Z Fold4" },
  { src: "/gallery5.jpg", caption: "Gallery Z Fold4" },
  { src: "/gallery6.jpg", caption: "Gallery Z Fold4" },
];

const Gallery = () => {
  return (
    <Reveal
      animation={["fade", "up"]}
      stagger
      id="gallery"
      className="w-full py-24 px-6 md:px-12 lg:px-20 bg-white"
    >
      {/* TITLE */}
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: "var(--color-primary-500)" }}
        >
          Gallery
        </h2>
        <div
          className="w-20 h-[3px] mx-auto mt-3 rounded-full"
          style={{ backgroundColor: "var(--color-primary-500)" }}
        ></div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover"
            />

            {/* CAPTION (bottom left, subtle) */}
            <p className="absolute bottom-3 left-3 text-xs text-white/90 drop-shadow-md">
              {img.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </Reveal>
  );
};

export default Gallery;
