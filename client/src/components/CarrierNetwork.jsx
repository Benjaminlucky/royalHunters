import React from "react";

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

const CarrierNetwork = () => {
  const handleJoinClick = () => {
    window.open("https://www.ritewaytrucking.com/employment/", "_blank");
  };

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
              {/* Icon Container */}
              <div
                className="mb-5 p-4 rounded-full transition-all duration-300 text-5xl"
                style={{
                  backgroundColor: "rgba(255, 90, 4, 0.1)",
                }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h4 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h4>

              {/* Description */}
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
            onClick={handleJoinClick}
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
            Visit our employment portal to begin your application
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarrierNetwork;
