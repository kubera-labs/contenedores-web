"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 bg-background/80 backdrop-blur-md border-b border-border"
      style={{ zIndex: "var(--z-sticky)" }}
    >
      <nav
        aria-label="Navegación principal"
        className="container-base flex items-center justify-between h-16 md:h-18"
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Icon name="container" size={28} className="text-primary-600" />
          <span>{siteConfig.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground-secondary rounded-md hover:text-foreground hover:bg-background-tertiary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href={siteConfig.whatsapp} className="btn btn-whatsapp btn-sm">
            <Icon name="whatsapp" size={16} />
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-background-tertiary"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <Icon name={open ? "x" : "menu"} size={24} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="container-base py-4 flex flex-col gap-1">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-foreground-secondary rounded-md hover:text-foreground hover:bg-background-tertiary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-border mt-2">
              <a href={siteConfig.whatsapp} className="btn btn-whatsapp w-full">
                <Icon name="whatsapp" size={18} />
                Escribinos por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
