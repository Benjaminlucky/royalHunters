import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Truck, FileText, CheckCircle } from "lucide-react";

const primaryColor = "#ff5a04";
const secondaryColor = "#300037";
const lightAccent = "#fff1e8";

const Reveal = ({ children, className }) => (
  <div className={className}>{children}</div>
);

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

// Success Modal Component
const SuccessModal = ({ onClose, type }) => (
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
      {type === "quote" ? "Quote Request Received!" : "Application Submitted!"}
    </h3>
    <p className="text-gray-600 mb-6">
      {type === "quote"
        ? "Thank you for your interest! Our team will review your quote request and get back to you within 24 hours."
        : "Thank you for applying! We've received your driver application and will contact you soon."}
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

// --- QUOTE FORM COMPONENTS ---
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

// --- DRIVER APPLICATION FORM ---
const DriverApplicationForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    yourName: "",
    emailAddress: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    stateOrProvince: "",
    cdlLicense: "",
    cdlIssueState: "",
    employmentType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = () => {
    if (!formData.yourName || !formData.emailAddress || !formData.phoneNumber) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const emailBody = `
New Driver Application

Personal Information:
- Name: ${formData.yourName}
- Email: ${formData.emailAddress}
- Phone: ${formData.phoneNumber}

Address:
- Street: ${formData.streetAddress}
- City: ${formData.city}
- State: ${formData.stateOrProvince}

License Information:
- CDL License #: ${formData.cdlLicense}
- CDL Issue State: ${formData.cdlIssueState}
- Employment Type: ${formData.employmentType}

Note: Please attach resume separately if available.
    `.trim();

    const mailtoLink = `mailto:royalhuntersllc@gmail.com?subject=Driver Application - ${
      formData.yourName
    }&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  };

  const employmentTypes = [
    "Driver",
    "Owner Operator",
    "Company Driver",
    "Lease Purchase",
  ];
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <div>
          <h3 className="text-2xl font-bold" style={{ color: secondaryColor }}>
            Driver Application
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Use the form below to help us find the perfect position for you
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 p-1 transition"
        >
          <X size={24} />
        </button>
      </div>

      <div>
        <div className="grid sm:grid-cols-3 gap-4">
          <InputField
            label="YOUR NAME"
            name="yourName"
            placeholder="John Doe"
            formData={formData}
            handleChange={handleChange}
          />
          <InputField
            label="EMAIL ADDRESS"
            name="emailAddress"
            type="email"
            placeholder="john@example.com"
            formData={formData}
            handleChange={handleChange}
          />
          <InputField
            label="PHONE NUMBER"
            name="phoneNumber"
            type="tel"
            placeholder="(555) 123-4567"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <InputField
            label="STREET ADDRESS"
            name="streetAddress"
            placeholder="123 Main Street"
            formData={formData}
            handleChange={handleChange}
          />
          <InputField
            label="CITY"
            name="city"
            placeholder="Dallas"
            formData={formData}
            handleChange={handleChange}
          />
          <SelectField
            label="STATE OR PROVINCE"
            name="stateOrProvince"
            options={states}
            placeholder="Select State"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <InputField
            label="CDL LICENSE #"
            name="cdlLicense"
            placeholder="CDL123456"
            formData={formData}
            handleChange={handleChange}
          />
          <SelectField
            label="CDL ISSUE STATE"
            name="cdlIssueState"
            options={states}
            placeholder="Select State"
            formData={formData}
            handleChange={handleChange}
          />
          <SelectField
            label="EMPLOYMENT TYPE"
            name="employmentType"
            options={employmentTypes}
            placeholder="Select Type"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YOUR RESUME*
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Please attach your resume to the email that will open after
            submission.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full mt-8 flex justify-center items-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-bold text-white transition duration-300 hover:scale-[1.01] uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: primaryColor }}
        >
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <FileText size={20} className="mr-2" />
              Submit Application
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// --- MAIN HERO COMPONENT ---
const Hero = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState("");

  const openQuoteModal = useCallback(() => setIsQuoteModalOpen(true), []);
  const closeQuoteModal = useCallback(() => setIsQuoteModalOpen(false), []);

  const openDriverModal = useCallback(() => setIsDriverModalOpen(true), []);
  const closeDriverModal = useCallback(() => setIsDriverModalOpen(false), []);

  const handleQuoteSuccess = useCallback(() => {
    setIsQuoteModalOpen(false);
    setSuccessType("quote");
    setShowSuccess(true);
  }, []);

  const handleDriverSuccess = useCallback(() => {
    setIsDriverModalOpen(false);
    setSuccessType("driver");
    setShowSuccess(true);
  }, []);

  const closeSuccess = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return (
    <Reveal
      animation={["blur", "up"]}
      stagger
      id="hero"
      className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/heroBanner.jpeg')`,
        }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <Sweep />

      <div className="relative text-center max-w-5xl px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Dependable & Affordable <br /> Freight Broker in Dallas, Texas
        </h1>

        <p className="mt-4 text-lg md:text-xl opacity-90">
          Connecting shippers to trusted, DOT-authorized carriers{" "}
          <strong>fast, affordable, and reliable.</strong>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            onClick={openQuoteModal}
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
            style={{ backgroundColor: primaryColor }}
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

          <motion.button
            onClick={openDriverModal}
            whileHover={{
              scale: 1.07,
              boxShadow: `0 0 22px ${primaryColor}40`,
            }}
            className="px-6 py-3 rounded-md font-semibold border transition-all duration-300 relative overflow-hidden"
            style={{
              borderColor: primaryColor,
              color: "white",
            }}
          >
            <span className="relative z-10">Join Our Carrier Network</span>
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

      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuoteModal}
            className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <QuoteForm
                onClose={closeQuoteModal}
                onSuccess={handleQuoteSuccess}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDriverModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDriverModal}
            className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <DriverApplicationForm
                onClose={closeDriverModal}
                onSuccess={handleDriverSuccess}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <SuccessModal onClose={closeSuccess} type={successType} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
};

export default Hero;
