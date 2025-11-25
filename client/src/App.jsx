import React from "react";
import Homepage from "./components/pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ height: "var(--nav-height)" }} />
      <Homepage />
      <Footer />
    </>
  );
}

export default App;
