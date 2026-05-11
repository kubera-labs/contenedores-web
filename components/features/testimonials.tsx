"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import content from "@/data/content.json";
import { Icon } from "@/components/ui";
import type { TestimonialItem } from "@/types/content";

const { testimonials: data } = content;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: rating }).map((_, i) => (
        <Icon key={i} name="star" size={14} style={{ color: "var(--color-accent-400)" }} />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <article
      className="flex flex-col h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: "var(--dark-border)",
        background: "rgba(15,32,53,0.55)",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <StarRating rating={t.rating} />
        <Icon name="quote" size={20} style={{ color: "var(--color-accent-400)", opacity: 0.6, flexShrink: 0 }} />
      </div>

      <blockquote className="flex-1 mb-6">
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
          &ldquo;{t.quote}&rdquo;
        </p>
      </blockquote>

      <div
        className="flex items-center gap-3 pt-5"
        style={{ borderTop: "1px solid var(--dark-border)" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
          style={{
            background: "rgba(251,191,36,0.15)",
            color: "var(--color-accent-400)",
            border: "1px solid rgba(251,191,36,0.25)",
          }}
        >
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>
            {t.name}
          </p>
          <p className="text-xs" style={{ color: "var(--dark-fg-muted)" }}>
            {t.role}
          </p>
        </div>
      </div>
    </article>
  );
}

function TestimonialsMobileCarousel({ items }: { items: TestimonialItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y" style={{ gap: "1rem" }}>
          {items.map((t) => (
            <div key={t.id} style={{ flex: "0 0 88%", minWidth: 0 }}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 px-1">
        <button
          onClick={scrollPrev}
          aria-label="Testimonio anterior"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <Icon name="arrow-left" size={16} style={{ color: "rgba(255,255,255,0.7)" }} />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Indicadores de testimonio">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Testimonio ${i + 1} de ${scrollSnaps.length}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === selectedIndex ? "1.25rem" : "0.375rem",
                height: "0.375rem",
                background: i === selectedIndex
                  ? "var(--color-accent-400)"
                  : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Siguiente testimonio"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <Icon name="arrow-right" size={16} style={{ color: "rgba(255,255,255,0.7)" }} />
        </button>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="section section-dark bg-dot-grid relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            top: "10%",
            left: "5%",
            width: "35rem",
            height: "35rem",
            background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            bottom: "10%",
            right: "5%",
            width: "28rem",
            height: "28rem",
            background: "radial-gradient(circle, rgba(99,179,237,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-base relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-gsap="section-header">
          <span className="eyebrow" style={{ color: "var(--color-accent-400)" }}>
            {data.eyebrow}
          </span>
          <h2 id="testimonials-heading" className="heading-2 mt-3 mb-4">
            {data.title}
          </h2>
          <p className="section-subtitle mx-auto">{data.subtitle}</p>
        </div>

        {/* Mobile: Embla carousel */}
        <div className="md:hidden">
          <TestimonialsMobileCarousel items={data.items} />
        </div>

        {/* Desktop: grid */}
        <div
          className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-5"
          data-gsap="stagger"
        >
          {data.items.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        {/* Social trust bar */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm"
          style={{ color: "var(--dark-fg-muted)" }}
        >
          <span className="flex items-center gap-2">
            <Icon name="star" size={16} style={{ color: "var(--color-accent-400)" }} />
            5.0 · Calificación promedio
          </span>
          <span
            className="hidden sm:block w-px h-4"
            style={{ background: "var(--dark-border)" }}
            aria-hidden="true"
          />
          <span className="flex items-center gap-2">
            <Icon name="check" size={16} style={{ color: "var(--color-accent-400)" }} />
            Proyectos entregados en tiempo
          </span>
          <span
            className="hidden sm:block w-px h-4"
            style={{ background: "var(--dark-border)" }}
            aria-hidden="true"
          />
          <span className="flex items-center gap-2">
            <Icon name="shield" size={16} style={{ color: "var(--color-accent-400)" }} />
            Garantía escrita en todos los casos
          </span>
        </div>
      </div>
    </section>
  );
}

