import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui";
import content from "@/data/content.json";

export function Hero() {
  const data = content.hero;
  return (
    <section
      id="hero"
      className="section-dark relative overflow-hidden min-h-svh flex flex-col"
      aria-label="Presentación principal"
    >
      {/* ─── Background image ─── */}
      <Image
        src="/hero/contenedores-personalizados-1.png"
        alt="Patio logístico con contenedores marítimos apilados, listos para entrega en Argentina"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* ─── Overlay gradient ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.50) 35%, rgba(10,22,40,0.92) 75%, #0A1628 100%)",
        }}
        aria-hidden="true"
      />

      {/* ─── Content ─── */}
      <div
        className="container-base relative z-10 flex-1 flex flex-col items-center justify-center text-center pt-12 sm:pt-16 md:pt-18 pb-12"
      >
        {/* Eyebrow pill — desktop only */}
        <div
          className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-semibold tracking-wider uppercase"
          style={{
            background: "rgba(251,191,36,0.12)",
            border: "1px solid rgba(251,191,36,0.30)",
            color: "rgba(251,191,36,0.90)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent-400 inline-block animate-pulse"
            aria-hidden="true"
          />
          {data.eyebrow}
        </div>

        {/* Headline */}
        <h1
          className="heading-1 max-w-4xl"
          style={{ color: "#ffffff" }}
        >
          {/* Mobile: título compacto */}
          <span className="sm:hidden" style={{ fontSize: "var(--text-4xl)" }}>
            Contenedores modulares,{" "}<span className="text-gradient">diseñados a medida.</span>
          </span>
          {/* Desktop: título completo */}
          <span className="hidden sm:inline">
            {data.title} <br />
            <span className="text-gradient">{data.titleAccent}</span>
          </span>
        </h1>

        {/* Subtitle — mobile: datos clave en una línea / desktop: párrafo completo */}
        <p
          className="mt-3 sm:mt-6 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.80)", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          <span
            className="sm:hidden"
            style={{ fontSize: "var(--text-sm)" }}
          >
            Entrega desde 20 días hábiles · Financiación disponible · Todo el país
          </span>
          <span className="hidden sm:inline text-lg md:text-xl max-w-2xl">
            {data.subtitle}{" "}
            <strong style={{ color: "#ffffff", fontWeight: 700 }}>{data.subtitleStrong}</strong>
          </span>
        </p>

        {/* CTAs — desktop only */}
        <div className="hidden sm:flex flex-row gap-3 mt-8 w-auto">
          <a
            href={siteConfig.whatsapp}
            className="btn btn-whatsapp btn-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            aria-label="Solicitar cotización gratuita por WhatsApp de manera segura y sin compromiso"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={20} aria-hidden="true" />
            <span>{data.ctaPrimary}</span>
          </a>
          <Link
            href="/#servicios"
            className="btn btn-secondary btn-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff" }}
            aria-label="Ir a la sección de soluciones modulares y descubrir cómo trabajamos los contenedores marítimos"
          >
            <span>{data.ctaSecondary}</span>
            <Icon name="arrow-right" size={18} aria-hidden="true" />
          </Link>
        </div>

        {/* Micro-trust — desktop only */}
        <p
          className="hidden sm:flex items-center gap-2 mt-6"
          style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.62)" }}
        >
          <Icon name="clock" size={13} />
          {data.microtrust}
        </p>
      </div>
    </section>
  );
}
