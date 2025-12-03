import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
// NOTE: Since external libraries cannot be imported in a single file,
// we are assuming 'Reveal' is a custom component defined elsewhere,
// and we are creating a functional mock of the carousel logic locally.

const primaryColor = "#ff5a04"; // --color-primary-500 (Main Orange)
const secondaryColor = "#300037"; // --color-secondary-500 (Dark Purple Accent)
const lightAccent = "#fff1e8"; // --color-primary-50 (Light Background)
const hoverBorderColor = "#ff8731"; // --color-primary-400

// --- TESTIMONIAL DATA ---
const testimonials = [
  {
    quote:
      "RHL took the stress out of our peak season logistics. We had consistent capacity, and their real-time tracking gave us total peace of mind. Our freight was delivered on time, every time, allowing us to focus on our core business. They are truly reliable.",
    name: "David Chen",
    title: "Logistics Coordinator",
    company: "Brightside Manufacturing",
  },
  {
    quote:
      "The difference with Royal Hunters is their proactive communication. We have a dedicated rep who knows our lanes inside and out. No more chasing updates—they keep us in the loop from pickup to delivery. It’s personalized service that feels like an extension of our own team.",
    name: "Sarah Jenson",
    title: "Supply Chain Manager",
    company: "OmniFoods Distribution",
  },
  {
    quote:
      "As a carrier, RHL treats us like a partner, not just a resource. Their loads are clearly described, payments are fast and fair, and the lanes they offer are consistent. They are one of the few brokers we trust for smooth, profitable business.",
    name: "Mark O'Connell",
    title: "Owner-Operator",
    company: "O'Connell Trucking",
  },
  {
    quote:
      "We had an urgent, complex movement that other brokers wouldn't touch. RHL stepped in, found an asset-based solution, and executed flawlessly under pressure. Their integrity and commitment to finding a solution were exactly what we needed.",
    name: "Emily Rodriguez",
    title: "Director of Operations",
    company: "Zenith Retail Group",
  },
  {
    quote:
      "The visibility RHL provides is top-tier. Integrating their tracking data was seamless, giving our e-commerce customers accurate delivery predictions. This technology-forward approach saves us time and boosts customer satisfaction.",
    name: "Alex Tran",
    title: "E-commerce Founder",
    company: "GearUp Sports",
  },
];

// --- MOCK REVEAL COMPONENT (Since we can't import it) ---
// We create a basic wrapper to ensure the main component uses the expected structure.
const Reveal = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// --- TESTIMONIAL SLIDER MOCK COMPONENT (Simulating Embla) ---
const TestimonialsSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalSlides = testimonials.length;

  const scrollPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const scrollNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(() => {
      scrollNext();
    }, 8000); // Change slide every 8 seconds
    return () => clearInterval(timer);
  }, [scrollNext]);

  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
      {/* Testimonial Viewport */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex-none w-full p-2">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center bg-white p-8 md:p-12 rounded-xl shadow-lg border-t-4"
              style={{ borderTopColor: primaryColor }}
            >
              <p className="text-4xl font-serif text-gray-400 mb-4 opacity-70">
                “
              </p>
              <p className="text-xl italic text-gray-700 leading-relaxed mb-6">
                {testimonial.quote}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p
                  className="font-bold text-lg"
                  style={{ color: primaryColor }}
                >
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={scrollPrev}
          className="bg-white/50 p-3 rounded-full shadow-lg ml-2 hover:bg-white transition duration-200 hidden md:block"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={scrollNext}
          className="bg-white/50 p-3 rounded-full shadow-lg mr-2 hover:bg-white transition duration-200 hidden md:block"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
            style={
              index === selectedIndex ? { backgroundColor: primaryColor } : {}
            }
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- MAIN ABOUT COMPONENT ---
const About = () => {
  // Define styles using the new theme colors
  const styleConfig = {
    primary: { color: primaryColor },
    secondary: { color: secondaryColor, borderColor: secondaryColor },
    lightBg: { backgroundColor: lightAccent },
  };

  return (
    <div
      className="w-full py-20 md:py-36 px-6 md:px-12 lg:px-20 bg-white"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        {/* === 1. MAIN ABOUT SECTION (2-COLUMN) === */}
        <Reveal
          animation={["fade", "up"]}
          className="grid md:grid-cols-2 gap-16 items-start mb-24"
        >
          {/* TEXT SECTION: Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
              style={styleConfig.primary}
            >
              About Royal Hunters LLC
            </h2>

            {/* Paragraph 1 */}
            <p className="text-xl leading-relaxed text-gray-800 mb-4">
              Royal Hunters LLC is a **forward-thinking freight brokerage and
              third-party logistics company** built on reliability, integrity,
              and a dedicated commitment to operational excellence. As a growing
              force in the transportation industry, we deliver tailored
              logistics solutions that empower shippers and carriers to move
              freight with confidence, clarity, and efficiency.
            </p>

            {/* Paragraph 2 - Highlighted (Using the light background) */}
            <p
              className="text-lg leading-relaxed text-gray-700 mb-4 border-l-4 pl-4 rounded-r-lg py-1"
              style={{ ...styleConfig.lightBg, borderColor: primaryColor }}
            >
              Our strength lies in a carefully vetted network of carrier
              partners and a streamlined operational model designed to scale
              seamlessly with the evolving needs of our clients. Whether
              supporting a single lane or a complex, multi-state supply chain,
              we bring the same level of diligence, responsiveness, and
              professionalism to every move.
            </p>

            {/* Paragraph 3 */}
            <p className="text-lg leading-relaxed text-gray-800">
              From our inception, **service has been the foundation of our
              identity**. We operate with a solutions-driven mindset, proactive
              communication, and a dedication to doing business the right
              way—every time. Through disciplined work ethic, transparent
              processes, and a focus on long-term partnership, we aim to
              redefine what shippers and carriers can expect from a modern
              freight broker.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="md:pt-10"
          >
            <img
              // Updated placeholder image color to match the primary theme
              src="https://placehold.co/800x500/ff5a04/FFFFFF?text=Logistics+Solution"
              alt="Royal Hunters LLC Logistics"
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-2xl transition duration-300 hover:shadow-3xl"
            />
          </motion.div>
        </Reveal>

        {/* --- 2. WHY CHOOSE US SECTION (FEATURE LIST) --- */}
        <div className="pt-16 pb-24">
          <Reveal
            animation={["fade", "up"]}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={styleConfig.primary}
            >
              Why Choose Royal Hunters LLC
            </h3>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Flexible Capacity",
                description:
                  "Access our vast network of vetted, DOT-authorized carriers and private fleets for reliable nationwide coverage.",
              },
              {
                title: "Asset-Based Carrier Advantage",
                description:
                  "We maintain a dedicated fleet, giving us flexibility and control to fill empty trailers and reduce your shipping costs.",
              },
              {
                title: "Dedicated Account Management",
                description:
                  "One point of contact means faster communication and personalized service.",
              },
              {
                title: "Advanced Visibility",
                description:
                  "Our technology allows real-time tracking and status updates, so you’re always in the know.",
              },
              {
                title: "Scalable Solutions",
                description:
                  "From a single shipment to a full-scale logistics strategy, RHL provides the capacity, technology, and expertise to grow with your business.",
              },
              {
                title: "Operational Excellence",
                description:
                  "A commitment to transparent processes, disciplined work ethic, and doing business the right way—every time.",
              },
            ].map((feature, index) => (
              <Reveal
                key={index}
                // Small stagger for a nice wave effect
                animation={["fade", "up"]}
                delay={index * 0.1}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 transition duration-300 hover:shadow-lg"
                style={{ borderColor: hoverBorderColor }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    {/* Checkmark and title use the contrasting secondary color (dark purple) */}
                    <span
                      className="text-xl mr-3 font-extrabold"
                      style={styleConfig.secondary}
                    >
                      &#10003;
                    </span>
                    <h4
                      className="text-xl font-bold"
                      style={styleConfig.secondary}
                    >
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* --- 3. TESTIMONIALS SECTION (EMBLA MOCK) --- */}
        {/* Updated background to lightAccent */}
        <div
          className="pt-12 md:pt-20 rounded-2xl p-4 md:p-12"
          style={styleConfig.lightBg}
        >
          <Reveal
            animation={["fade", "up"]}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold text-center mb-10"
              style={styleConfig.primary}
            >
              What Our Partners Say
            </h3>
          </Reveal>

          <TestimonialsSlider />
        </div>
      </div>
    </div>
  );
};

export default About;
