import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, CheckCircle } from "lucide-react";

const primaryColor = "#ff5a04";
const secondaryColor = "#300037";

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
      Application Submitted!
    </h3>
    <p className="text-gray-600 mb-6">
      Thank you for applying! We've received your driver application and will
      contact you soon to discuss next steps.
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

const items = [
  {
    title: "Quick Payouts",
    icon: "💳",
    description: "Get paid fast with our streamlined payment processing",
  },
  {
    title: "Highly Negotiable Payment Terms",
    icon: "🤝",
    description: "Flexible terms that work for your business model",
  },
  {
    title: "Fuel Advances",
    icon: "⛽",
    description: "Keep your trucks running with fuel advance programs",
  },
  {
    title: "24/7 Support",
    icon: "🎧",
    description: "Round-the-clock assistance whenever you need it",
  },
  {
    title: "Seamless Onboarding",
    icon: "📋",
    description: "Quick and easy process to get you started",
  },
  {
    title: "Spot & Contract Loads",
    icon: "🚚",
    description: "Access to both spot and long-term contract opportunities",
  },
];

// --- FORM COMPONENTS ---
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
        {/* Row 1 */}
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

        {/* Row 2 */}
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

        {/* Row 3 */}
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

        {/* Resume Upload */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YOUR RESUME*
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Please attach your resume to the email that will open after
            submission.
          </p>
        </div>

        {/* Submit Button */}
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

const CarrierNetwork = () => {
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const openDriverModal = useCallback(() => setIsDriverModalOpen(true), []);
  const closeDriverModal = useCallback(() => setIsDriverModalOpen(false), []);

  const handleSuccess = useCallback(() => {
    setIsDriverModalOpen(false);
    setShowSuccess(true);
  }, []);

  const closeSuccess = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return (
    <div
      className="w-full py-20 lg:py-32 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "#300037" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* HERO HEADER SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Join Our Carrier Network
          </h2>

          <div
            className="w-32 h-1 mx-auto rounded-full mb-8"
            style={{ backgroundColor: "#ff5a04" }}
          ></div>

          <p
            className="text-xl md:text-2xl leading-relaxed mb-6"
            style={{ color: "#ffdcc8" }}
          >
            If you're a contract carrier or private fleet looking for consistent
            freight and dependable coordination,{" "}
            <strong>Royal Hunters is your plug.</strong>
          </p>

          <p className="text-lg leading-relaxed" style={{ color: "#d2c2de" }}>
            Our carriers are partners — not just numbers in a database. We're
            committed to building long-term, mutually beneficial relationships
            that keep your trucks loaded and your business thriving.
          </p>
        </div>

        {/* WHY JOIN SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Join Our Carrier Network
          </h3>
          <p className="text-lg" style={{ color: "#d2c2de" }}>
            By joining our network, you get access to our private load board,
            additional carrier services and exclusive benefits from a trusted
            name in transportation.
          </p>
        </div>

        {/* BENEFITS GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-xl transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #1c001f, #28002e)",
                border: "1px solid rgba(255, 90, 4, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ff5a04";
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px -12px rgba(255, 90, 4, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 90, 4, 0.2)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div
                className="mb-5 p-4 rounded-full transition-all duration-300 text-5xl"
                style={{
                  backgroundColor: "rgba(255, 90, 4, 0.1)",
                }}
              >
                {item.icon}
              </div>

              <h4 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h4>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "#d2c2de" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA SECTION */}
        <div
          className="max-w-4xl mx-auto text-center p-12 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #1c001f, #28002e)",
            border: "2px solid #ff5a04",
          }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the RHL Carrier Team Today
          </h3>
          <p className="text-lg mb-8" style={{ color: "#ffdcc8" }}>
            Start your journey with Royal Hunters and experience the difference
            of working with a carrier-focused partner.
          </p>

          <button
            onClick={openDriverModal}
            className="font-bold py-4 px-10 rounded-lg uppercase tracking-wider transition-all duration-300 text-lg"
            style={{
              backgroundColor: "#ff5a04",
              color: "white",
              boxShadow: "0 10px 30px rgba(255, 90, 4, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e85000";
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 15px 40px rgba(255, 90, 4, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ff5a04";
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 10px 30px rgba(255, 90, 4, 0.3)";
            }}
          >
            Start Onboarding Now
          </button>

          <p className="text-sm mt-6" style={{ color: "#a98cbf" }}>
            Complete our driver application to begin your journey
          </p>
        </div>
      </div>

      {/* DRIVER APPLICATION MODAL */}
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
                onSuccess={handleSuccess}
              />
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
  );
};

export default CarrierNetwork;
