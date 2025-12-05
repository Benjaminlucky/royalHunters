import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle } from "lucide-react";

const primaryColor = "#ff5a04";
const secondaryColor = "#300037";
const lightAccent = "#fff1e8";

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

// --- MODAL SUB-COMPONENTS ---
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

const ShippersSection = () => {
  const [activeTab, setActiveTab] = useState("Over Dimensional");
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

  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      height: 8px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #1c001f;
      border-radius: 10px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(90deg, #ff5a04, #ff8731);
      border-radius: 10px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(90deg, #e85000, #ff5a04);
    }
    
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #ff5a04 #1c001f;
    }
  `;

  const services = [
    {
      id: "Dry Van",
      title: "Dry Van",
      description:
        "Standard full truckload (FTL) service for non-perishable, palletized freight. The most cost-effective solution for general goods.",
      details:
        "We offer reliable capacity for your daily dry freight needs across the national network.",
      image: "/gallery1.jpg",
    },
    {
      id: "Temp-Controlled",
      title: "Temp-Controlled",
      description:
        "Refrigerated (Reefer) transportation for goods requiring precise temperature management, including frozen, chilled, or heated items.",
      details:
        "Protecting your sensitive products with state-of-the-art temperature monitoring and dedicated carriers.",
      image: "/gallery2.jpg",
    },
    {
      id: "Flatbed",
      title: "Flatbed",
      description:
        "Ideal for construction materials, machinery, and oddly-shaped freight that needs to be loaded from the top or sides.",
      details:
        "Our flatbed network is equipped to handle loads requiring tarps, chains, and secure strapping for safe transit.",
      image: "/gallery3.jpg",
    },
    {
      id: "LTL",
      title: "Less-Than-Truckload (LTL)",
      description:
        "Cost-effective solution where you only pay for the space your smaller shipment occupies on the trailer.",
      details:
        "Our vast LTL network ensures fast, reliable delivery of smaller shipments—ideal for businesses that ship frequently or in smaller volumes.",
      image: "/gallery4.jpg",
    },
    {
      id: "Expedited",
      title: "Expedited Freight",
      description:
        "A high-priority service for urgent, time-critical shipments. This ensures the fastest transit time possible.",
      details:
        "When time is critical, Royal Hunters move fast. Our expedited services ensure urgent shipments reach their destination safely and on time—without compromising care or compliance.",
      image: "/gallery5.jpg",
    },
    {
      id: "Over Dimensional",
      title: "OVER DIMENSIONAL",
      description:
        "Our approach and experience simplifies the complexities of oversized freight, ensuring your shipments are delivered safely, on time, and in compliance with all regulations.",
      details:
        "This specialized service handles complex shipments that exceed standard legal size or weight limits, requiring permits and specific escort vehicles.",
      image: "/gallery6.jpg",
    },
    {
      id: "Drayage",
      title: "Drayage",
      description:
        "Specialized hauling of freight short distances, typically between a port, rail yard, or border crossing and a warehouse.",
      details:
        "Essential for efficient intermodal freight movement, connecting sea and rail transport to road delivery.",
      image: "/images/drayage.jpg",
    },
    {
      id: "Intermodal",
      title: "Intermodal",
      description:
        "Integrating two or more transportation modes (truck, rail, ship, air) for a single shipment, often using shipping containers.",
      details:
        "We integrate truck, ship, air, and rail options to optimize speed, cost, and flexibility for long-haul and global shipments.",
      image: "/images/intermodal.jpg",
    },
  ];

  const currentService = services.find((service) => service.id === activeTab);

  return (
    <div
      style={{ backgroundColor: "#300037" }}
      className="text-white py-12 lg:py-24 font-sans"
    >
      <style>{scrollbarStyles}</style>

      <section className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          SHIPPERS
        </h1>
        <h2
          className="text-2xl lg:text-3xl font-semibold mb-6"
          style={{ color: "#ffdcc8" }}
        >
          Freight Brokerage Solutions That Scale With Your Business
        </h2>
        <p
          className="max-w-3xl mx-auto text-lg mb-8"
          style={{ color: "#d2c2de" }}
        >
          Our brokerage services are built to adapt and grow with your company.
          Whether you're a small manufacturer or a national distributor,{" "}
          <strong>Royal Hunters LLC</strong> provides flexible,
          technology-driven logistics solutions that guarantee both reliability
          and value.
        </p>
        <button
          onClick={openModal}
          className="font-bold py-3 px-8 rounded uppercase tracking-wider transition duration-300"
          style={{ backgroundColor: "#ff5a04", color: "white" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e85000")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff5a04")}
        >
          Get an Instant Quote
        </button>
      </section>

      <hr style={{ borderColor: "#592281" }} className="mb-16" />

      <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-10">
          <h3 className="text-3xl lg:text-4xl font-extrabold mb-4">
            MULTI-MODAL OPERATIONS
          </h3>
          <p className="max-w-2xl mx-auto" style={{ color: "#d2c2de" }}>
            Our carrier network allows us to access any transport method you
            need. Trust our dedicated industry experts to fulfill your
            deliveries—fast.
          </p>
        </div>

        <div className="flex justify-center overflow-x-auto whitespace-nowrap py-4 my-8 custom-scrollbar">
          {services.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 mx-1 text-sm font-semibold rounded-t-lg transition duration-300"
              style={{
                backgroundColor:
                  activeTab === tab.id ? "#1c001f" : "transparent",
                color: activeTab === tab.id ? "white" : "#a98cbf",
                border: activeTab === tab.id ? "1px solid #592281" : "none",
                borderBottom: activeTab === tab.id ? "none" : undefined,
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = "#ff8731";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.color = "#a98cbf";
                }
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div
          style={{ backgroundColor: "#1c001f", borderColor: "#592281" }}
          className="border rounded-lg p-0 shadow-2xl"
        >
          <div className="relative flex flex-col md:flex-row items-center overflow-hidden">
            <div
              className="md:w-1/3 w-full h-64 md:h-96 overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "#28002e" }}
            >
              <img
                src={currentService.image}
                alt={currentService.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-2/3 w-full p-8 md:p-12 text-left">
              <h4
                className="text-3xl lg:text-4xl font-extrabold mb-3 uppercase"
                style={{ color: "#ff5a04" }}
              >
                {currentService.title}
              </h4>
              <p className="text-lg mb-6" style={{ color: "#ffdcc8" }}>
                {currentService.description}
              </p>
              <p className="italic mb-6" style={{ color: "#d2c2de" }}>
                {currentService.details}
              </p>
              <button
                onClick={openModal}
                className="font-bold py-3 px-6 rounded uppercase tracking-wider transition duration-300"
                style={{ backgroundColor: "#ff5a04", color: "white" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e85000")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#ff5a04")
                }
              >
                Get an Instant Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ borderColor: "#592281" }} className="mb-16" />

      <section className="container mx-auto px-4 mt-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h3>
          <p
            className="max-w-4xl mx-auto text-lg mb-4"
            style={{ color: "#d2c2de" }}
          >
            We believe shipping should be the easiest part of doing business.
            Our dedicated team handles the heavy lifting: from rate negotiation
            and route planning to real-time tracking and delivery confirmation,
            so you can stay focused on what matters most:{" "}
            <strong>running your business.</strong>
          </p>
          <h4
            className="text-2xl font-semibold mt-8"
            style={{ color: "#ff8731" }}
          >
            We make it super simple to move your goods:
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          <div
            className="relative rounded-lg p-8 transition-all duration-300"
            style={{
              background: "linear-gradient(to bottom right, #28002e, #1c001f)",
              border: "1px solid rgba(255, 90, 4, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff5a04";
              e.currentTarget.style.boxShadow =
                "0 25px 50px -12px rgba(255, 90, 4, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 90, 4, 0.3)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div
              className="absolute -top-6 left-8 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
              style={{ backgroundColor: "#ff5a04", color: "white" }}
            >
              1
            </div>
            <h5 className="text-xl font-bold text-white mt-4 mb-3">
              Get an instant quote
            </h5>
            <p style={{ color: "#d2c2de" }}>
              Fast, transparent pricing with no surprises. Enter your shipment
              details and receive competitive rates in seconds.
            </p>
          </div>

          <div
            className="relative rounded-lg p-8 transition-all duration-300"
            style={{
              background: "linear-gradient(to bottom right, #28002e, #1c001f)",
              border: "1px solid rgba(255, 90, 4, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff5a04";
              e.currentTarget.style.boxShadow =
                "0 25px 50px -12px rgba(255, 90, 4, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 90, 4, 0.3)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div
              className="absolute -top-6 left-8 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
              style={{ backgroundColor: "#ff5a04", color: "white" }}
            >
              2
            </div>
            <h5 className="text-xl font-bold text-white mt-4 mb-3">
              Book your shipment
            </h5>
            <p style={{ color: "#d2c2de" }}>
              Accept the quote to secure your load in minutes. Our system
              instantly connects you with verified carriers ready to move your
              freight.
            </p>
          </div>

          <div
            className="relative rounded-lg p-8 transition-all duration-300"
            style={{
              background: "linear-gradient(to bottom right, #28002e, #1c001f)",
              border: "1px solid rgba(255, 90, 4, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff5a04";
              e.currentTarget.style.boxShadow =
                "0 25px 50px -12px rgba(255, 90, 4, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 90, 4, 0.3)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div
              className="absolute -top-6 left-8 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
              style={{ backgroundColor: "#ff5a04", color: "white" }}
            >
              3
            </div>
            <h5 className="text-xl font-bold text-white mt-4 mb-3">
              Track delivery in real time
            </h5>
            <p style={{ color: "#d2c2de" }}>
              Stay informed at every mile with live updates. Monitor your
              shipment's progress from pickup to delivery with complete
              visibility.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={openModal}
            className="font-bold py-3 px-8 rounded uppercase tracking-wider transition duration-300"
            style={{ backgroundColor: "#ff5a04", color: "white" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e85000")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff5a04")}
          >
            Get an Instant Quote
          </button>
        </div>
      </section>

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

export default ShippersSection;
