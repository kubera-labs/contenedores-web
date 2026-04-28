"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Slide-down entrance on mount */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        headerRef.current,
        { y: -64, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity" }
      );
    });
    return () => mm.revert();
  }, []);

  const solid = scrolled || open;

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 transition-all duration-300"
      style={{
        zIndex: "var(--z-sticky)",
        background: solid ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        WebkitBackdropFilter: solid ? "blur(12px)" : "none",
        boxShadow: solid ? "0 1px 16px 0 rgba(0,0,0,0.10)" : "none",
        borderBottom: "none",
      }}
    >
      <nav
        aria-label="Navegación principal"
        className="container-base flex items-center justify-between h-16 md:h-18"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo_final_optimizado.webp"
            className={`rounded-full duration-300 cursor-pointer hover:scale-110`}
            alt={siteConfig.name}
            width={72}
            height={72}
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  solid
                    ? "text-foreground-secondary hover:text-foreground hover:bg-background-tertiary"
                    : "hover:bg-white/10"
                }`}
                style={!solid ? { color: "rgba(255,255,255,0.85)" } : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden lg:flex flex-col text-right text-xs items-end" style={!solid ? { color: "rgba(255,255,255,0.85)" } : { color: "var(--foreground-secondary)" }}>
            <span className="font-semibold flex items-center gap-1.5"><Icon name="phone" size={12}/> {siteConfig.phone}</span>
            <span className="opacity-80 flex items-center gap-1.5"><Icon name="mail" size={12}/> {siteConfig.email}</span>
          </div>
          <a href={siteConfig.whatsapp} className="btn btn-whatsapp btn-sm hover:scale-110 transition-transform">
            <Icon name="whatsapp" size={16} />
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`md:hidden p-2 rounded-md transition-colors ${
            solid ? "hover:bg-background-tertiary" : "hover:bg-white/10"
          }`}
          style={!solid ? { color: "#ffffff" } : undefined}
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
