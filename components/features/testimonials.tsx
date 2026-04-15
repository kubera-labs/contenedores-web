import { Icon } from "@/components/ui";

const testimonials = [
  {
    name: "María López",
    role: "Gerente de Operaciones · MinaSur",
    quote:
      "Excelente calidad y cumplimiento en los plazos de entrega. Ya llevamos 3 proyectos juntos y cada vez superan las expectativas.",
    rating: 5,
  },
  {
    name: "Juan Rodríguez",
    role: "Director de Proyectos · TechCorp",
    quote:
      "La personalización que ofrecen no la encontramos en ningún otro proveedor. Nos hicieron oficinas modulares en tiempo récord.",
    rating: 5,
  },
  {
    name: "Carolina Méndez",
    role: "Fundadora · GastroGroup",
    quote:
      "Transformaron un contenedor en nuestro primer local gastronómico. La atención fue impecable desde el día uno.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="section" aria-labelledby="testimonials-heading">
      <div className="container-base">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow">Testimonios</span>
          <h2 id="testimonials-heading" className="heading-2 mt-3 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="section-subtitle mx-auto">
            Historias reales de empresas que confiaron en nosotros para sus proyectos.
          </p>
        </div>

        {/* Cards */}
        <div className="grid-auto">
          {testimonials.map((t) => (
            <article key={t.name} className="card-glow p-6 md:p-8 flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Icon key={i} name="star" size={16} className="text-warning" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 mb-6">
                <Icon
                  name="quote"
                  size={24}
                  className="text-primary-200 mb-2"
                />
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {t.quote}
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-foreground-muted">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
