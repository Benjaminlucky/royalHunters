import React from "react";

export default function Footer() {
  return (
    <footer
      className="w-full py-6 px-6 md:px-12 flex items-center justify-center"
      style={{ backgroundColor: "var(--color-secondary-900)" }}
    >
      <p className="text-white/70 text-sm md:text-base tracking-wide text-center">
        © {new Date().getFullYear()} All Rights Reserved Royalhuntersllc
      </p>
    </footer>
  );
}
