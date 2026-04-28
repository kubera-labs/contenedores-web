import { Icon } from "@/components/ui";
import content from "@/data/content.json";
import type { IconName } from "@/components/ui";

const { services: data } = content;

export function Services() {
  return (
    <section id="servicios" className="section" aria-labelledby="services-heading">
      <div className="container-base">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="services-heading" className="heading-2 mt-3 mb-4">
            {data.title}
          </h2>
          <p className="section-subtitle mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid-auto">
          {data.items.map((service) => (
            <article key={service.id} className="card-glow p-6 md:p-8 flex flex-col">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-5">
                <Icon name={service.icon as IconName} size={22} />
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
