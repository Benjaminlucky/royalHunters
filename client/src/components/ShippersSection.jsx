import React, { useState } from "react";

const ShippersSection = () => {
  const [activeTab, setActiveTab] = useState("Over Dimensional");

  const handleQuoteClick = () => {
    console.log("Requesting a quote...");
  };

  // Custom scrollbar styles
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
    
    /* Firefox */
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
      {/* Inject custom scrollbar styles */}
      <style>{scrollbarStyles}</style>

      {/* SHIPPERS HERO SECTION */}
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
          onClick={handleQuoteClick}
          className="font-bold py-3 px-8 rounded uppercase tracking-wider transition duration-300"
          style={{ backgroundColor: "#ff5a04", color: "white" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e85000")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff5a04")}
        >
          Request a Quote
        </button>
      </section>

      <hr style={{ borderColor: "#592281" }} className="mb-16" />

      {/* TABBED MULTI-MODAL OPERATIONS SECTION */}
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

        {/* Tab Navigation */}
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

        {/* Tab Content Panel */}
        <div
          style={{ backgroundColor: "#1c001f", borderColor: "#592281" }}
          className="border rounded-lg p-0 shadow-2xl"
        >
          <div className="relative flex flex-col md:flex-row items-center overflow-hidden">
            {/* Image Area */}
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

            {/* Text Content Area */}
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
                onClick={handleQuoteClick}
                className="font-bold py-3 px-6 rounded uppercase tracking-wider transition duration-300"
                style={{ backgroundColor: "#ff5a04", color: "white" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e85000")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#ff5a04")
                }
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ borderColor: "#592281" }} className="mb-16" />

      {/* HOW IT WORKS SECTION */}
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

        {/* Three Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* Step 1 */}
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

          {/* Step 2 */}
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

          {/* Step 3 */}
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
            onClick={handleQuoteClick}
            className="font-bold py-3 px-8 rounded uppercase tracking-wider transition duration-300"
            style={{ backgroundColor: "#ff5a04", color: "white" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e85000")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff5a04")}
          >
            Request a Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default ShippersSection;
