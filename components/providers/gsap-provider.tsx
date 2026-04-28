"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global GSAP orchestrator — animates elements tagged with data-gsap="…".
 * Variants: "fade-up" | "stagger" | "section-header"
 * Mount once in the root/public layout; works on SSR-rendered server components.
 */
export function GsapProvider() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* ── section-header: single block slides up ── */
      gsap.utils.toArray<HTMLElement>('[data-gsap="section-header"]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      /* ── fade-up: single element ── */
      gsap.utils.toArray<HTMLElement>('[data-gsap="fade-up"]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      });

      /* ── stagger: animates direct children in sequence ── */
      gsap.utils.toArray<HTMLElement>('[data-gsap="stagger"]').forEach((el) => {
        const items = Array.from(el.children) as HTMLElement[];
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
