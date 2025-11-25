// hooks/useScrollSpy.js
import { useEffect, useState } from "react";

const useScrollSpy = (sectionIds, offset = 120) => {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // Section becomes active when top enters viewport
        if (rect.top <= offset && rect.bottom >= offset) {
          current = id;
          break;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return active;
};

export default useScrollSpy;
