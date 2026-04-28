"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/data/content.json";

/* ── lightgallery CSS (client-side only) ── */
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

gsap.registerPlugin(ScrollTrigger);

const { gallery: data } = content;

/* ── Full-bleed placeholder: gradient fill + subtle geometric texture ── */
function ContainerSVG({ index }: { index: number }) {
  /* Each slot gets its own unique dark gradient palette */
  const palettes = [
    { from: "#0D1F35", to: "#1A3A5C", accent: "#3B82F6" },
    { from: "#12101E", to: "#2A1F42", accent: "#8B5CF6" },
    { from: "#0E2018", to: "#1A4030", accent: "#10B981" },
    { from: "#1C1208", to: "#3A2510", accent: "#F59E0B" },
    { from: "#0D1F35", to: "#162B4A", accent: "#06B6D4" },
    { from: "#1A0F1F", to: "#321A38", accent: "#EC4899" },
  ];
  const p = palettes[index % palettes.length];
  const gradId = `g${index}`;
  const noiseId = `n${index}`;
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <filter id={noiseId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" />
        </filter>
      </defs>
      {/* Full background */}
      <rect width="800" height="500" fill={`url(#${gradId})`} />
      {/* Noise texture overlay */}
      <rect width="800" height="500" fill={p.from} opacity="0.35" filter={`url(#${noiseId})`} />
      {/* Diagonal lines pattern */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1={-100 + i * 70} y1="0"
          x2={-100 + i * 70 + 500} y2="500"
          stroke={p.accent} strokeWidth="0.5" opacity="0.07"
        />
      ))}
      {/* Large ambient glow */}
      <circle cx="400" cy="250" r="260" fill={p.accent} opacity="0.07" />
      {/* Bottom vignette */}
      <rect width="800" height="160" y="340" fill="url(#vignette)" opacity="0.6" />
      <defs>
        <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>
      {/* "Foto próximamente" label */}
      <text
        x="400" y="262"
        textAnchor="middle"
        fill={p.accent}
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="500"
        letterSpacing="3"
        opacity="0.45"
        textDecoration="none"
      >
        FOTO PRÓXIMAMENTE
      </text>
    </svg>
  );
}

/* ── Data-URI placeholder for lightgallery fullscreen ── */
function getPlaceholderSrc(index: number): string {
  const accents = ["#3B82F6","#8B5CF6","#10B981","#F59E0B","#06B6D4","#EC4899"];
  const c = encodeURIComponent(accents[index % accents.length]);
  return (
    `data:image/svg+xml,` +
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>` +
    `<rect width='1200' height='675' fill='%230A1628'/>` +
    `<circle cx='600' cy='338' r='340' fill='${c}' opacity='.06'/>` +
    `<text x='600' y='350' text-anchor='middle' fill='${c}' font-size='18' font-family='sans-serif' opacity='.45' letter-spacing='3'>FOTO PRÓXIMAMENTE</text>` +
    `</svg>`
  );
}

/* ── Icon helpers ── */
function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ZoomIn() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   Gallery
   Desktop → feature viewer (large image + thumbnails column)
   Mobile  → Embla swipe carousel with pill dots
   ════════════════════════════════════════════════════════════════ */
export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef        = useRef<HTMLDivElement>(null);
  const metaRef        = useRef<HTMLDivElement>(null);
  const sectionRef     = useRef<HTMLElement>(null);
  const headerRef      = useRef<HTMLDivElement>(null);
  const thumbsRef      = useRef<HTMLDivElement>(null);
  const lgContainerRef = useRef<HTMLDivElement>(null);
  const lgInstanceRef  = useRef<{ openGallery: (i: number) => void; destroy: () => void } | null>(null);

  /* Embla for mobile */
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [mobileIndex, setMobileIndex] = useState(0);

  const activeItem = data.items[activeIndex];

  /* Sync Embla selected index to state */
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setMobileIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  /* Init lightgallery in dynamic mode (deferred import keeps SSR clean) */
  useEffect(() => {
    const container = lgContainerRef.current;
    if (!container) return;
    let destroyed = false;

    Promise.all([
      import("lightgallery"),
      import("lightgallery/plugins/zoom"),
    ]).then(([{ default: lightGallery }, { default: lgZoom }]) => {
      if (destroyed || !container) return;
      lgInstanceRef.current = lightGallery(container, {
        plugins: [lgZoom],
        dynamic: true,
        dynamicEl: data.items.map((item, i) => ({
          src: item.image || getPlaceholderSrc(i),
          alt: item.label,
          subHtml:
            `<div style="text-align:center;padding:6px 0">` +
            `<h4 style="font-size:16px;font-weight:600;color:#F0F4F8;margin:0 0 4px">${item.label}</h4>` +
            `<p style="font-size:13px;color:#9FB3C8;margin:0">${item.description}</p>` +
            `</div>`,
        })),
        speed: 500,
        download: false,
        counter: true,
      } as Parameters<typeof lightGallery>[1]);
    });

    return () => {
      destroyed = true;
      lgInstanceRef.current?.destroy();
    };
  }, []);

  /* ── GSAP: staggered entrance on scroll ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header slides up */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );
      /* Main image fades in with slight scale */
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          delay: 0.15,
        }
      );
      /* Thumbnails stagger in from right */
      if (thumbsRef.current) {
        gsap.fromTo(
          Array.from(thumbsRef.current.children),
          { opacity: 0, x: 24 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
            delay: 0.25,
          }
        );
      }
      /* Meta text slides up */
      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
          delay: 0.35,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Desktop thumbnail click → GSAP crossfade on main image + meta ── */
  const handleSelect = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      gsap
        .timeline()
        .to([mainRef.current, metaRef.current], { opacity: 0, y: 8, duration: 0.18, ease: "power2.in" })
        .call(() => setActiveIndex(index))
        .fromTo(
          [mainRef.current, metaRef.current],
          { opacity: 0, y: 14, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "power3.out" }
        );
    },
    [activeIndex]
  );

  const openLg = (index: number) => lgInstanceRef.current?.openGallery(index);

  const prev = useCallback(() => {
    handleSelect((activeIndex - 1 + data.items.length) % data.items.length);
    emblaApi?.scrollPrev();
  }, [activeIndex, handleSelect, emblaApi]);

  const next = useCallback(() => {
    handleSelect((activeIndex + 1) % data.items.length);
    emblaApi?.scrollNext();
  }, [activeIndex, handleSelect, emblaApi]);

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="section"
      style={{ background: "#FFFFFF" }}
      aria-labelledby="gallery-heading"
    >
      {/* Hidden lightgallery mount point */}
      <div ref={lgContainerRef} style={{ display: "none" }} aria-hidden="true" />

      <div className="container-base">

        {/* ── Section header ── */}
        <div ref={headerRef} className="mb-10 md:mb-14 max-w-2xl">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="gallery-heading" className="heading-2 mt-3 mb-3">
            {data.title}{" "}
            <span className="text-gradient">{data.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>

        {/* ══ DESKTOP: Feature viewer + thumbnail column ══ */}
        <div className="hidden md:grid md:grid-cols-[1fr_230px] xl:grid-cols-[1fr_270px] gap-6 xl:gap-8">

          {/* Left: main image + meta */}
          <div className="flex flex-col gap-5">

            {/* Featured image */}
            <div
              className="relative overflow-hidden rounded-2xl cursor-zoom-in group"
              style={{
                aspectRatio: "16/9",
                background: "#0A1628",
                boxShadow: "0 20px 60px -12px rgba(10,22,40,0.22)",
              }}
              onClick={() => openLg(activeIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLg(activeIndex)}
              aria-label={`Ampliar: ${activeItem.label}`}
            >
              <div ref={mainRef} className="w-full h-full">
                {activeItem.image ? (
                  <Image
                    src={activeItem.image}
                    alt={activeItem.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 70vw, 900px"
                    priority
                  />
                ) : (
                  <ContainerSVG index={activeIndex} />
                )}
              </div>

              {/* Zoom overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/28 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <div
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 rounded-full p-3.5"
                  style={{ background: "rgba(255,255,255,0.92)" }}
                >
                  <ZoomIn />
                </div>
              </div>
            </div>

            {/* Meta + navigation controls */}
            <div ref={metaRef} className="flex items-start justify-between gap-6">
              <div>
                <h3 className="heading-5 mb-1">{activeItem.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
                  {activeItem.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-0.5">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 hover:bg-background-tertiary hover:border-foreground-muted"
                  style={{ borderColor: "var(--border)" }}
                  aria-label="Proyecto anterior"
                >
                  <ChevronLeft />
                </button>
                <span
                  className="text-xs tabular-nums font-medium min-w-13 text-center select-none"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(data.items.length).padStart(2, "0")}
                </span>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 hover:bg-background-tertiary hover:border-foreground-muted"
                  style={{ borderColor: "var(--border)" }}
                  aria-label="Proyecto siguiente"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* Right: thumbnail column */}
          <div
            ref={thumbsRef}
            className="flex flex-col gap-3 overflow-y-auto"
            style={{ maxHeight: "520px", scrollbarWidth: "none" }}
          >
            {data.items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(i)}
                  className="relative overflow-hidden rounded-xl shrink-0 transition-all duration-300 text-left"
                  style={{
                    aspectRatio: "4/3",
                    border: isActive ? "2px solid rgba(59,130,246,0.8)" : "2px solid var(--border)",
                    opacity: isActive ? 1 : 0.52,
                    transform: isActive ? "scale(1)" : "scale(0.965)",
                    boxShadow: isActive ? "0 6px 24px rgba(59,130,246,0.18)" : "none",
                  }}
                  aria-label={`Ver proyecto: ${item.label}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover"
                      sizes="270px"
                    />
                  ) : (
                    <ContainerSVG index={i} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ MOBILE: Embla swipe carousel ══ */}
        <div className="md:hidden">
          <div ref={emblaRef} style={{ overflow: "hidden" }}>
            <div style={{ display: "flex", gap: "12px", touchAction: "pan-y" }}>
              {data.items.map((item, i) => (
                <div key={item.id} style={{ flex: "0 0 84%", minWidth: 0 }}>
                  <div
                    className="relative overflow-hidden rounded-2xl cursor-pointer"
                    style={{ aspectRatio: "4/3" }}
                    onClick={() => openLg(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openLg(i)}
                    aria-label={`Ampliar: ${item.label}`}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover"
                        sizes="85vw"
                      />
                    ) : (
                      <ContainerSVG index={i} />
                    )}
                    {/* Zoom overlay for mobile */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className="rounded-full p-3 opacity-60"
                        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
                      >
                        <ZoomIn />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="heading-6 mb-1">{item.label}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile nav: arrows + pill dots */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-background-tertiary transition-colors"
              style={{ borderColor: "var(--border)" }}
              aria-label="Anterior"
            >
              <ChevronLeft />
            </button>

            <div className="flex items-center gap-1.5">
              {data.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="rounded-full transition-all duration-250"
                  style={{
                    width: i === mobileIndex ? "22px" : "8px",
                    height: "8px",
                    background:
                      i === mobileIndex ? "var(--color-primary-600)" : "var(--border-strong)",
                  }}
                  aria-label={`Ir al proyecto ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-background-tertiary transition-colors"
              style={{ borderColor: "var(--border)" }}
              aria-label="Siguiente"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* ── CTA row ── */}
        <div
          className="mt-14 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>
            ¿Tenés un proyecto en mente? Podemos hacerlo realidad.
          </p>
          <a href="#contacto" className="btn btn-primary">
            Hablemos de tu proyecto
          </a>
        </div>

      </div>
    </section>
  );
}
