import { Icon } from "@/components/ui";

const services = [
  {
    icon: "container" as const,
    title: "Venta de contenedores",
    tagline: "Nuevos y usados, listos para operar",
    bullets: [
      "Contenedores de 10, 20 y 40 pies",
      "Certificación de calidad incluida",
      "Opciones de financiamiento flexibles",
    ],
  },
  {
    icon: "clock" as const,
    title: "Alquiler temporario",
    tagline: "Para obras, eventos o almacenamiento",
    bullets: [
      "Plazos desde 1 mes sin penalidades",
      "Entrega y retiro incluidos",
      "Mantenimiento durante el alquiler",
    ],
  },
  {
    icon: "wrench" as const,
    title: "Modificaciones a medida",
    tagline: "Tu contenedor, a tu manera",
    bullets: [
      "Oficinas, viviendas y locales",
      "Instalaciones eléctricas y sanitarias",
      "Aislamiento térmico y acústico",
    ],
  },
];

export function Services() {
  return (
    <section id="servicios" className="section" aria-labelledby="services-heading">
      <div className="container-base">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow">Servicios</span>
          <h2 id="services-heading" className="heading-2 mt-3 mb-4">
            Todo lo que necesitás en contenedores
          </h2>
          <p className="section-subtitle mx-auto">
            Desde la venta y alquiler hasta modificaciones completas, cubrimos toda la cadena
            con calidad industrial y atención personalizada.
          </p>
        </div>

        {/* Cards */}
        <div className="grid-auto">
          {services.map((service) => (
            <article key={service.title} className="card-glow p-6 md:p-8 flex flex-col">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-5">
                <Icon name={service.icon} size={22} />
              </div>
              <h3 className="heading-5 mb-1">{service.title}</h3>
              <p className="text-sm text-foreground-secondary mb-4">{service.tagline}</p>
              <ul className="space-y-2 mt-auto">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <Icon name="check" size={16} className="text-success mt-0.5 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
