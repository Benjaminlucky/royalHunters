// components/Navbar.jsx
import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import logo from "/royalhuntersLogo.webp";
import useScrollSpy from "../hooks/useScrollSpy.js";

const menu = [
  { label: "Home", hash: "home" },
  { label: "About us", hash: "about" },
  { label: "Expedited Freight", hash: "expedited" },
  { label: "Why Choose Us", hash: "choose" },
  { label: "Gallery", hash: "gallery" },
  { label: "Carrier Network", hash: "carrier" },
  { label: "Contact us", hash: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const active = useScrollSpy(
    menu.map((m) => m.hash),
    130
  );

  const handleNavClick = (hash) => {
    setOpen(false);
    const el = document.getElementById(hash);
    if (!el) return;

    const offset = el.offsetTop - 90;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b">
      <nav className="max-w-[1300px] mx-auto  h-[80px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Royal Hunters" className="w-12 h-12" />
          <h1 className="font-bold text-xl text-secondary-500">
            ROYAL <span className="text-primary-500">HUNTERS</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {menu.map((item) => (
            <li key={item.hash}>
              <button
                onClick={() => handleNavClick(item.hash)}
                className={`text-sm font-medium relative py-1 transition-colors ${
                  active === item.hash
                    ? "text-primary-500"
                    : "text-secondary-700"
                }`}
              >
                {item.label}

                <span
                  className={`block h-[2px] mt-1 transition-all ${
                    active === item.hash
                      ? "w-full bg-primary-500"
                      : "w-0 bg-transparent"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-3xl text-secondary-700"
        >
          <HiMenuAlt3 />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 md:hidden transition ${
          open
            ? "pointer-events-auto bg-black/40 backdrop-blur"
            : "pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 w-[75%] max-w-[300px] h-full !bg-white shadow-lg transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between bg-white items-center px-5 py-4 border-b">
            <h2 className="text-lg font-semibold text-secondary-700">Menu</h2>
            <button onClick={() => setOpen(false)} className="text-2xl">
              <HiX />
            </button>
          </div>

          <ul className="mt-2 bg-white">
            {menu.map((item) => (
              <li key={item.hash}>
                <button
                  onClick={() => handleNavClick(item.hash)}
                  className={`block w-full text-left px-5 py-4 text-base font-medium ${
                    active === item.hash
                      ? "text-primary-500 bg-primary-50"
                      : "text-secondary-700"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
