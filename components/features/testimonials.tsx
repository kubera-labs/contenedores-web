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

function TestimonialCard({ t, featured = false }: { t: TestimonialItem; featured?: boolean }) {
  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 ${featured ? "md:col-span-2" : ""}`}
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
        <p
          className={`leading-relaxed ${featured ? "text-base md:text-lg" : "text-sm"}`}
          style={{ color: "rgba(255,255,255,0.82)" }}
        >
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

export function Testimonials() {
  const [featured, ...rest] = data.items;

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

        {/* Featured + rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" data-gsap="stagger">
          {/* Featured card spans 2 cols on md, 1 on xl */}
          <TestimonialCard t={featured} featured />
          {rest.map((t) => (
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

