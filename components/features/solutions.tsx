import { Icon } from "@/components/ui";

const steps = [
  {
    number: "01",
    icon: "phone" as const,
    title: "Contacto inicial",
    description:
      "Nos escribís por WhatsApp o completás el formulario. Te respondemos en menos de 24 horas con una primera orientación.",
  },
  {
    number: "02",
    icon: "target" as const,
    title: "Relevamiento y propuesta",
    description:
      "Analizamos tu necesidad: dimensiones, uso, ubicación y plazo. Te enviamos una cotización detallada sin compromiso.",
  },
  {
    number: "03",
    icon: "wrench" as const,
    title: "Preparación o modificación",
    description:
      "Preparamos tu contenedor: limpieza, pintura, modificaciones estructurales, instalaciones y acabados según proyecto.",
  },
  {
    number: "04",
    icon: "truck" as const,
    title: "Entrega e instalación",
    description:
      "Coordinamos la logística y entregamos en el punto que necesites, con grúa y asesoramiento para la instalación.",
  },
];

export function Solutions() {
  return (
    <section
      id="soluciones"
      className="section section-dark bg-dot-grid relative"
      style={{ '--dot-opacity': '0.03' } as React.CSSProperties}
      aria-labelledby="solutions-heading"
    >
      {/* ─── Ambient glow (overflow clipped separately) ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 w-[800px] h-[400px] bg-accent-500/5 rounded-[100%] blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      </div>

      {/* ─── Top fade ─── */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: "-5rem",
          height: "8rem",
          background: "linear-gradient(to bottom, transparent, var(--dark-bg))",
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      <div className="container-base relative py-12 md:py-16" style={{ zIndex: 3 }}>
        {/* Header */}
        <div className="text-center mb-16 md:mb-20" data-gsap="section-header">
          <span className="eyebrow" style={{ color: "var(--color-accent-400)" }}>Cómo trabajamos</span>
          <h2 id="solutions-heading" className="heading-2 mt-4 mb-5">
            Del contacto a la entrega, sin vueltas
          </h2>
          <p className="section-subtitle mx-auto text-lg" style={{ color: "var(--dark-fg-secondary)" }}>
            Un proceso claro y transparente para que sepas exactamente qué esperar en cada etapa, asegurando la entrega en tiempo y forma.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 relative" data-gsap="stagger">
          
          {/* Connector line behind cards - hidden on mobile/tablet */}
          <div 
            className="hidden xl:block absolute top-[5.5rem] mt-2 left-6 right-6 h-px" 
            style={{ background: "linear-gradient(90deg, transparent 0%, var(--dark-border) 10%, var(--dark-border) 90%, transparent 100%)", zIndex: 1 }}
            aria-hidden="true" 
          />

          {steps.map((step) => (
            <div 
              key={step.number} 
              className="relative flex flex-col p-8 rounded-2xl border border-[var(--dark-border)] bg-[rgba(15,32,53,0.4)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-[rgba(15,32,53,0.7)] hover:border-[rgba(251,191,36,0.3)] group-hover/card z-10"
              style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
            >
              {/* Top Accent line on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full border border-[var(--dark-border)] bg-[var(--dark-bg-secondary)] text-[var(--color-accent-400)] transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--color-accent-400)/30] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] relative">
                  <Icon name={step.icon} size={24} />
                  {/* Subtle ring on active */}
                  <div className="absolute inset-0 rounded-full border border-accent-400 opacity-0 group-hover:animate-ping group-hover:opacity-20" />
                </div>
                <span 
                  className="text-5xl font-black italic select-none transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.03)", WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
                >
                  {step.number}
                </span>
              </div>
              
              <h3 className="heading-5 mb-3 text-[var(--dark-fg)] transition-colors duration-300 group-hover:text-white">
                {step.title}
              </h3>
              
              <p className="text-[15px] leading-relaxed m-0" style={{ color: "var(--dark-fg-secondary)" }}>
                {step.description}
              </p>
              
            </div>
          ))}
        </div>
      </div>

      {/* ─── Bottom fade ─── */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          bottom: "-5rem",
          height: "8rem",
          background: "linear-gradient(to top, transparent, var(--dark-bg))",
          zIndex: 2,
        }}
        aria-hidden="true"
      />
    </section>
  );
}
