import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Truck } from "lucide-react";

// Assuming these color constants match the overall design theme defined in Contact.jsx
const primaryColor = "#ff5a04"; // Main Orange
const secondaryColor = "#300037"; // Dark Purple Accent
const lightAccent = "#fff1e8"; // Light Background

// --- MOCK REVEAL COMPONENT ---
const Reveal = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// Light sweep animation (from original Hero component)
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

// --- MODAL SUB-COMPONENTS (Copied from Contact.jsx) ---
const truckTypes = [
  "Full or Partial",
  "Less Than Truckload (LTL)",
  "Flatbed",
  "Reefer",
];
const neededTypes = [
  "Dry Van",
  "Refrigerated",
  "Specialized Equipment",
  "Heavy Haul",
];

// Helper component for text/number inputs
const InputField = ({
  label,
  name,
  type = "text",
  required = true,
  placeholder = "",
  formData,
  handleChange,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
      {required && "*"}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={formData[name]}
      onChange={handleChange}
      required={required}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
      style={{ borderColor: primaryColor, color: secondaryColor }}
    />
  </div>
);

// Helper component for date inputs
const DateInput = ({ label, name, value, handleChange }) => (
  <div className="mb-4 w-full">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type="date"
      name={name}
      id={name}
      value={value}
      onChange={handleChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 appearance-none"
      style={{ borderColor: primaryColor, color: secondaryColor }}
    />
  </div>
);

// Helper component for select/dropdown fields
const SelectField = ({
  label,
  name,
  options,
  required = true,
  placeholder,
  formData,
  handleChange,
}) => (
  <div className="mb-4 w-full">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
      {required && "*"}
    </label>
    <select
      name={name}
      id={name}
      value={formData[name]}
      onChange={handleChange}
      required={required}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 appearance-none bg-white"
      style={{ borderColor: primaryColor, color: secondaryColor }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// --- QuoteForm Component (The modal content) ---
const QuoteForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    arrangeCall: "no",
    truckloadType: "",
    truckTypeNeeded: "",
    pickupDate: "",
    pickupZip: "",
    deliveryDate: "",
    deliveryZip: "",
    questions: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Quote Form Submitted:", formData);
    // In a real application, you would handle submission logic here
    onClose();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h3 className="text-2xl font-bold" style={{ color: secondaryColor }}>
          Request a Freight Quote
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 p-1 transition"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Contact Details */}
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField
            label="Name"
            name="name"
            placeholder="Your Full Name"
            formData={formData}
            handleChange={handleChange}
          />
          <InputField
            label="Company"
            name="company"
            placeholder="Your Company Name"
            formData={formData}
            handleChange={handleChange}
          />
          <InputField
            label="E-Mail"
            name="email"
            type="email"
            placeholder="email@example.com"
            formData={formData}
            handleChange={handleChange}
          />
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* Arrange a Call */}
        <div
          className="mt-6 mb-4 p-4 border rounded-lg"
          style={{ borderColor: lightAccent }}
        >
          <p className="text-sm font-medium text-gray-700 mb-2">
            Arrange a Call
          </p>
          <p className="text-sm text-gray-500 mb-3">
            I would like to talk through my requirements.
          </p>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="radio"
                name="arrangeCall"
                value="yes"
                checked={formData.arrangeCall === "yes"}
                onChange={handleChange}
                className="form-radio"
                style={{ color: primaryColor }}
              />
              <span>YES</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="radio"
                name="arrangeCall"
                value="no"
                checked={formData.arrangeCall === "no"}
                onChange={handleChange}
                className="form-radio"
                style={{ color: primaryColor }}
              />
              <span>NO</span>
            </label>
          </div>
        </div>

        {/* Load Details */}
        <h4
          className="text-lg font-semibold mt-8 mb-4 border-b pb-2"
          style={{ color: primaryColor }}
        >
          Load Requirements
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <SelectField
            label="Truckload Type"
            name="truckloadType"
            options={truckTypes}
            placeholder="Select..."
            formData={formData}
            handleChange={handleChange}
          />
          <SelectField
            label="Truck Type Needed"
            name="truckTypeNeeded"
            options={neededTypes}
            placeholder="The right truck for the job"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* Locations */}
        <h4
          className="text-lg font-semibold mt-8 mb-4 border-b pb-2"
          style={{ color: primaryColor }}
        >
          Pickup Location
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <DateInput
            label="Planned Pickup Date"
            name="pickupDate"
            value={formData.pickupDate}
            handleChange={handleChange}
          />
          <InputField
            label="Zip Code"
            name="pickupZip"
            placeholder="75201"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        <h4
          className="text-lg font-semibold mt-8 mb-4 border-b pb-2"
          style={{ color: primaryColor }}
        >
          Delivery Location
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <DateInput
            label="Planned Delivery Date"
            name="deliveryDate"
            value={formData.deliveryDate}
            handleChange={handleChange}
          />
          <InputField
            label="Zip Code"
            name="deliveryZip"
            placeholder="90001"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* Questions / File Upload */}
        <div className="mt-6">
          <label
            htmlFor="questions"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Questions, or Tell Us How We Can Help
          </label>
          <textarea
            name="questions"
            id="questions"
            rows="4"
            value={formData.questions}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
            style={{ borderColor: primaryColor, color: secondaryColor }}
          />
        </div>

        <div className="mt-4 mb-6">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Optional: File Upload
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              style={{ borderColor: primaryColor }}
            >
              <div className="text-sm text-gray-600">CHOOSE A FILE</div>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition duration-300 hover:scale-[1.01]"
          style={{ backgroundColor: primaryColor }}
        >
          <Send size={20} className="mr-2" />
          Submit Request
        </button>
      </form>
    </div>
  );
};

// --- MAIN HERO COMPONENT (Updated) ---
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

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
          // Note: Using a placeholder image URL for the original /heroBanner.jpeg for reliability
          backgroundImage: `url('/heroBanner.jpeg')`,
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
          {/* Primary button with pulse - Opens Modal */}
          <motion.button
            onClick={openModal} // <-- Opens the Quote Modal
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
              boxShadow: `0 0 22px ${primaryColor}40`,
            }}
            className="px-6 py-3 rounded-md font-semibold text-white transition-transform duration-300 hover:shadow-lg relative overflow-hidden"
            style={{ backgroundColor: primaryColor }} // Using color constant
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
              boxShadow: `0 0 22px ${primaryColor}40`,
            }}
            className="px-6 py-3 rounded-md font-semibold border transition-all duration-300 relative overflow-hidden"
            style={{
              borderColor: primaryColor, // Using color constant
              color: "white", // Changed to white for better contrast
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

      {/* --- MODAL IMPLEMENTATION --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            // Use a higher z-index like 50 to ensure it is on top of everything
            className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
              className="w-full max-w-2xl"
            >
              <QuoteForm onClose={closeModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
};

export default Hero;
