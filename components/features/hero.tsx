import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui";

const industries = [
  "Construcción",
  "Minería",
  "Agroindustria",
  "Energía",
  "Logística",
  "Gastronomía",
  "Retail",
  "Vivienda",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="section section-dark bg-dot-grid relative overflow-hidden"
      aria-label="Presentación principal"
    >
      {/* Decorative gradient blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container-base relative">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          {/* Badge */}
          <span className="badge">
            <Icon name="sparkles" size={14} />
            Soluciones modulares para todo el país
          </span>

          {/* Headline */}
          <h1 className="heading-1">
            Contenedores que{" "}
            <span className="text-gradient">transforman</span>{" "}
            tu negocio
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-dark-fg-secondary max-w-2xl leading-relaxed">
            Venta, alquiler y modificación de contenedores marítimos. Calidad industrial,
            personalización total y entrega en tiempo récord en toda Argentina.
          </p>

          {/* Industry pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-dark-fg-secondary border border-white/10"
              >
                {industry}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
            <a href={siteConfig.whatsapp} className="btn btn-whatsapp btn-lg">
              <Icon name="whatsapp" size={20} />
              Pedir cotización gratis
            </a>
            <a href="#servicios" className="btn btn-secondary btn-lg">
              Ver servicios
              <Icon name="arrow-right" size={18} />
            </a>
          </div>

          {/* Trust micro-copy */}
          <p className="text-xs text-dark-fg-muted mt-2 flex items-center gap-2">
            <Icon name="clock" size={14} />
            Respuesta en menos de 24 hs · Sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
}
