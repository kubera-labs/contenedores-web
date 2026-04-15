"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui";

export function WhatsappFab() {
  return (
    <a
      href={siteConfig.whatsapp}
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 p-4 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      style={{ zIndex: "var(--z-fab)" }}
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}

export function ScrollCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-6 right-20 sm:left-auto sm:right-24 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: "var(--z-fab)" }}
    >
      <a
        href="#contacto"
        className="btn btn-primary btn-sm shadow-lg"
      >
        <Icon name="phone" size={16} />
        Solicitar cotización
      </a>
    </div>
  );
}
