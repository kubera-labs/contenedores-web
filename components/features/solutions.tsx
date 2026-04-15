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
      className="section section-dark bg-dot-grid relative overflow-hidden"
      aria-labelledby="solutions-heading"
    >
      <div
        className="absolute top-1/2 left-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="container-base relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow">Cómo trabajamos</span>
          <h2 id="solutions-heading" className="heading-2 mt-3 mb-4">
            Del contacto a la entrega, sin vueltas
          </h2>
          <p className="section-subtitle mx-auto">
            Un proceso claro y transparente para que sepas exactamente qué esperar en cada etapa.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col">
              {/* Connector line (hidden on last) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-dark-border to-transparent"
                  aria-hidden="true"
                />
              )}

              <span className="text-4xl font-extrabold text-white/5 mb-2 select-none">
                {step.number}
              </span>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-500/10 text-accent-400 mb-4">
                <Icon name={step.icon} size={22} />
              </div>
              <h3 className="heading-6 mb-2">{step.title}</h3>
              <p className="text-sm text-dark-fg-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
