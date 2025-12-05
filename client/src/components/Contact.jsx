import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, X, Send, Truck, CheckCircle } from "lucide-react";

const primaryColor = "#ff5a04";
const secondaryColor = "#300037";
const lightAccent = "#fff1e8";

const Reveal = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// Success Modal Component
const SuccessModal = ({ onClose }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    className="bg-white p-8 rounded-lg shadow-2xl max-w-md mx-auto text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    >
      <CheckCircle
        size={64}
        className="mx-auto mb-4"
        style={{ color: "#10b981" }}
      />
    </motion.div>
    <h3 className="text-2xl font-bold mb-3" style={{ color: secondaryColor }}>
      Quote Request Received!
    </h3>
    <p className="text-gray-600 mb-6">
      Thank you for your interest! Our team will review your quote request and
      get back to you within 24 hours.
    </p>
    <button
      onClick={onClose}
      className="px-6 py-3 rounded-md font-semibold text-white transition-all duration-300 hover:scale-105"
      style={{ backgroundColor: primaryColor }}
    >
      Close
    </button>
  </motion.div>
);

// --- MODAL: REQUEST A QUOTE FORM ---
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

const QuoteForm = ({ onClose, onSuccess }) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const emailBody = `
New Freight Quote Request

Contact Information:
- Name: ${formData.name}
- Company: ${formData.company}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Arrange Call: ${formData.arrangeCall.toUpperCase()}

Load Requirements:
- Truckload Type: ${formData.truckloadType}
- Truck Type Needed: ${formData.truckTypeNeeded}

Pickup Location:
- Date: ${formData.pickupDate}
- Zip Code: ${formData.pickupZip}

Delivery Location:
- Date: ${formData.deliveryDate}
- Zip Code: ${formData.deliveryZip}

Additional Information:
${formData.questions || "None provided"}
    `.trim();

    const mailtoLink = `mailto:royalhuntersllc@gmail.com?subject=Freight Quote Request - ${
      formData.company || formData.name
    }&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  };

  const InputField = ({
    label,
    name,
    type = "text",
    required = true,
    placeholder = "",
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

  const DateInput = ({ label, name, value }) => (
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

  const SelectField = ({
    label,
    name,
    options,
    required = true,
    placeholder,
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

      <div>
        {/* Contact Details */}
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="Name" name="name" placeholder="Your Full Name" />
          <InputField
            label="Company"
            name="company"
            placeholder="Your Company Name"
          />
          <InputField
            label="E-Mail"
            name="email"
            type="email"
            placeholder="email@example.com"
          />
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
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
          />
          <SelectField
            label="Truck Type Needed"
            name="truckTypeNeeded"
            options={neededTypes}
            placeholder="The right truck for the job"
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
          />
          <InputField label="Zip Code" name="pickupZip" placeholder="75201" />
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
          />
          <InputField label="Zip Code" name="deliveryZip" placeholder="90001" />
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

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full mt-6 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: primaryColor }}
        >
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <Send size={20} className="mr-2" />
              Submit Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// --- MAIN CONTACT COMPONENT ---
export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleSuccess = useCallback(() => {
    setIsModalOpen(false);
    setShowSuccess(true);
  }, []);

  const closeSuccess = useCallback(() => {
    setShowSuccess(false);
  }, []);

  const styleConfig = useMemo(
    () => ({
      primary: { color: primaryColor },
      secondary: { color: secondaryColor },
      darkBg: { backgroundColor: secondaryColor },
      buttonBg: { backgroundColor: primaryColor },
    }),
    []
  );

  const addressQuery = "1868 Ballinger Drive, Forney, TX 75126";
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressQuery
  )}`;

  const staticMapPlaceholderUrl = `https://placehold.co/800x400/${primaryColor.substring(
    1
  )}/FFFFFF?text=${encodeURIComponent("Royal Hunters LLC Location")}`;

  const handleMapClick = () => {
    window.open(mapsLink, "_blank");
  };

  return (
    <div
      className="w-full py-20 md:py-36 px-6 md:px-12 lg:px-20"
      style={styleConfig.darkBg}
      id="contact"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal
          animation={["fade", "up"]}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h3 className="text-base font-semibold uppercase tracking-wider text-white/80 mb-2">
            We are a Call Away
          </h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Partner with Royal Hunters LLC
          </h2>
          <div
            className="w-24 h-[4px] mx-auto rounded-full mt-4"
            style={styleConfig.buttonBg}
          ></div>

          <p className="text-white/70 mt-6 leading-relaxed text-xl">
            Experience a freight brokerage built on dependability,
            affordability, and trust. Whether you're shipping across Texas,
            across the country, or across the world — we've got you covered.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {/* LEFT: Contact Info & Action Button */}
          <div className="text-white">
            <h3 className="text-3xl font-bold mb-6" style={styleConfig.primary}>
              Get In Touch
            </h3>

            <div className="flex flex-col gap-6 text-lg">
              <div className="flex items-start gap-4">
                <Phone
                  size={24}
                  className="mt-1 flex-shrink-0"
                  style={styleConfig.primary}
                />
                <div className="flex flex-col">
                  <span className="font-medium">Call Us</span>
                  <a
                    href="tel:+12143556669"
                    className="text-white/80 hover:text-white transition"
                  >
                    +1 (214) 355-6669
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail
                  size={24}
                  className="mt-1 flex-shrink-0"
                  style={styleConfig.primary}
                />
                <div className="flex flex-col">
                  <span className="font-medium">Email Support</span>
                  <a
                    href="mailto:royalhuntersllc@gmail.com"
                    className="text-white/80 hover:text-white transition"
                  >
                    royalhuntersllc@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin
                  size={24}
                  className="mt-1 flex-shrink-0"
                  style={styleConfig.primary}
                />
                <div className="flex flex-col">
                  <span className="font-medium">Our Location</span>
                  <p className="text-white/80">
                    1868 Ballinger Drive, Forney, TX 75126
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Request Button */}
            <motion.button
              onClick={openModal}
              className="mt-10 flex items-center justify-center py-3 px-8 text-lg font-bold rounded-xl text-white shadow-lg transition duration-300 hover:scale-[1.03] hover:shadow-xl"
              style={styleConfig.buttonBg}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Truck size={20} className="mr-3" />
              Get an Instant Quote
            </motion.button>
          </div>

          {/* RIGHT: Static Map Placeholder */}
          <Reveal animation={["fade", "up"]} delay={0.3}>
            <div
              className="relative bg-gray-100 rounded-xl overflow-hidden shadow-2xl h-[400px] w-full cursor-pointer group"
              onClick={handleMapClick}
              title="Click to view full map in Google Maps"
            >
              <img
                src={staticMapPlaceholderUrl}
                alt="Static Map Placeholder for 1868 Ballinger Drive, Forney, TX 75126"
                className="w-full h-full object-cover transition duration-300 group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="flex flex-col items-center p-4 rounded-lg bg-white/90">
                  <MapPin size={32} style={{ color: primaryColor }} />
                  <p
                    className="mt-2 text-base font-semibold"
                    style={{ color: secondaryColor }}
                  >
                    Click to Open Full Map
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* --- MODAL IMPLEMENTATION --- */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl"
              >
                <QuoteForm onClose={closeModal} onSuccess={handleSuccess} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUCCESS MODAL */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
              onClick={closeSuccess}
            >
              <motion.div onClick={(e) => e.stopPropagation()}>
                <SuccessModal onClose={closeSuccess} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
