"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface ImageStripProps {
  images: string[];
}

const ITEM_HEIGHT = 220; // px
const ITEM_GAP = 10;     // px between images

export function ImageStrip({ images }: ImageStripProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // We triplicate so the seamless loop always has content visible at any viewport width
  const tripled = [...images, ...images, ...images];

  useEffect(() => {
    const strip = stripRef.current;
    const outer = outerRef.current;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!strip || !outer || images.length === 0 || prefersReducedMotion) return;

    // Wait for images to be in DOM, then measure one "set" width
    const setup = () => {
      const children = strip.querySelectorAll<HTMLElement>("[data-strip-item]");
      if (!children.length) return;

      // One copy = images.length items
      let oneSetW = 0;
      for (let i = 0; i < images.length; i++) {
        const el = children[i];
        oneSetW += el.offsetWidth + ITEM_GAP;
      }

      // Kill previous tween
      tweenRef.current?.kill();

      // Always start from 0 (no accumulated offset)
      gsap.set(strip, { x: 0 });

      tweenRef.current = gsap.to(strip, {
        x: -oneSetW,
        duration: images.length * 2.5, // ~2.5s per image, slows for more images
        ease: "none",
        repeat: -1,
        // When repeat fires, x snaps back to 0 seamlessly because set #2 == set #1
      });
    };

    // Small delay so Next/Image fills in dimensions
    const raf = requestAnimationFrame(() => requestAnimationFrame(setup));

    const onResize = () => {
      const strip2 = stripRef.current;
      if (!strip2) return;
      const children = strip2.querySelectorAll<HTMLElement>("[data-strip-item]");
      if (!children.length) return;
      let oneSetW = 0;
      for (let i = 0; i < images.length; i++) {
        oneSetW += children[i].offsetWidth + ITEM_GAP;
      }
      tweenRef.current?.kill();
      gsap.set(strip2, { x: 0 });
      tweenRef.current = gsap.to(strip2, {
        x: -oneSetW,
        duration: images.length * 2.5,
        ease: "none",
        repeat: -1,
      });
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      tweenRef.current?.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [images]);

  // Pause on hover
  const pause = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.play();

  if (images.length === 0) return null;

  return (
    <div
      ref={outerRef}
      className="w-full overflow-hidden"
      style={{
        height: ITEM_HEIGHT,
        background: "#060E1A",
        // This strip sits between hero (dark) and social proof (dark)
        // No border needed — it just flows
      }}
      aria-hidden="true"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Inner strip: flex row, no wrap, no shrink */}
      <div
        ref={stripRef}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: ITEM_GAP,
          height: "100%",
          willChange: "transform",
          // width: max-content prevents wrapping at any zoom
          width: "max-content",
        }}
      >
        {tripled.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            data-strip-item=""
            style={{
              position: "relative",
              height: ITEM_HEIGHT,
              // Responsive width: 4:3 ratio → ~293px at 220px height
              width: Math.round((ITEM_HEIGHT * 4) / 3),
              flexShrink: 0,
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="300px"
              // Don't lazy-load first copy so strip is populated immediately
              loading={idx < images.length ? "eager" : "lazy"}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
