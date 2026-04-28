import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui";

export function Hero() {
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
            "linear-gradient(to bottom, rgba(8,18,32,0.82) 0%, rgba(8,18,32,0.55) 40%, rgba(8,18,32,0.78) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ─── Content ─── */}
      <div
        className="container-base relative z-10 flex-1 flex flex-col items-center justify-center text-center pt-16 md:pt-18 pb-12"
      >
        {/* Eyebrow pill */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-semibold tracking-wider uppercase"
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
          Stock disponible · Entrega en 20 días hábiles
        </div>

        {/* Headline */}
        <h1
          className="heading-1 max-w-4xl"
          style={{ color: "#ffffff" }}
        >
          Contenedores Marítimos y Modulares <br className="hidden sm:block" />
          <span className="text-gradient">listos y entregados sin vueltas.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mt-6"
          style={{ color: "rgba(255,255,255,0.88)", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          No más presupuestos que se disparan ni plazos que no se cumplen.
          Stock propio, modificaciones a medida y logística en todo el país —{" "}
          <strong style={{ color: "#ffffff", fontWeight: 700 }}>
            con garantía escrita en contrato.
          </strong>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
          <a
            href={siteConfig.whatsapp}
            className="btn btn-whatsapp btn-lg w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            aria-label="Solicitar cotización gratuita por WhatsApp de manera segura y sin compromiso"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={20} aria-hidden="true" />
            <span>Quiero mi cotización gratis</span>
          </a>
          <Link
            href="/#soluciones"
            className="btn btn-secondary btn-lg w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff" }}
            aria-label="Ir a la sección de soluciones modulares y descubrir cómo trabajamos los contenedores marítimos"
          >
            <span>Ver cómo trabajamos</span>
            <Icon name="arrow-right" size={18} aria-hidden="true" />
          </Link>
        </div>

        {/* Micro-trust */}
        <p
          className="flex items-center gap-2 mt-6"
          style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.62)" }}
        >
          <Icon name="clock" size={13} />
          Sin compromiso · Respondemos en menos de 24 hs · Garantía escrita
        </p>
      </div>
    </section>
  );
}
