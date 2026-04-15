import { Icon } from "@/components/ui";

const benefits = [
  {
    icon: "shield" as const,
    title: "Calidad garantizada",
    description:
      "Cada contenedor pasa por un proceso de inspección riguroso. Garantía escrita en todas nuestras unidades.",
  },
  {
    icon: "zap" as const,
    title: "Entrega rápida",
    description:
      "Logística propia y acuerdos con transportistas en todo el país. Cumplimos plazos o te avisamos con tiempo.",
  },
  {
    icon: "wrench" as const,
    title: "Personalización total",
    description:
      "Desde una ventana hasta una vivienda completa. Nuestro equipo de ingeniería adapta todo a tu proyecto.",
  },
  {
    icon: "users" as const,
    title: "Atención humana",
    description:
      "No hablás con un bot. Te atiende un asesor que entiende tu rubro y te acompaña de principio a fin.",
  },
  {
    icon: "award" as const,
    title: "Experiencia comprobada",
    description:
      "Más de 500 proyectos entregados en 12 industrias diferentes. Referencias disponibles.",
  },
  {
    icon: "heart" as const,
    title: "Precio justo y transparente",
    description:
      "Cotización detallada, sin sorpresas ni costos ocultos. Opciones de financiamiento a medida.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="section section-alt" aria-labelledby="benefits-heading">
      <div className="container-base">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow">¿Por qué elegirnos?</span>
          <h2 id="benefits-heading" className="heading-2 mt-3 mb-4">
            Lo que nos diferencia
          </h2>
          <p className="section-subtitle mx-auto">
            No solo vendemos contenedores. Construimos soluciones con el respaldo, la calidad
            y la atención que tu proyecto necesita.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Icon name={benefit.icon} size={20} />
              </div>
              <div>
                <h3 className="heading-6 mb-1">{benefit.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
