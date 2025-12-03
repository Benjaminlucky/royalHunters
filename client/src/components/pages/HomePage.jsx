// pages/Homepage.jsx
import React from "react";
import Hero from "../Hero";
import About from "../About";
import KeyHighlights from "../KeyHighlights";
import ExpeditedFreight from "../ExpeditedFreight";
import WhyChooseUs from "../WhyChooseUs";
import Gallery from "../Gallery";
import CarrierNetwork from "../CarrierNetwork";
import Contact from "../Contact";
import ShippersSection from "../ShippersSection";

const Homepage = () => {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>

      <section id="shippers">
        <ShippersSection />
      </section>
      <section id="carrier">
        <CarrierNetwork />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default Homepage;
