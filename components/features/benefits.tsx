import { Icon } from "@/components/ui";
import type { IconName } from "@/components/ui";
import content from "@/data/content.json";

const { benefits: data } = content;

export function Benefits() {
  return (
    <section id="beneficios" className="section section-alt" aria-labelledby="benefits-heading">
      <div className="container-base">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-gsap="section-header">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="benefits-heading" className="heading-2 mt-3 mb-4">
            {data.title}
          </h2>
          <p className="section-subtitle mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-gsap="stagger">
          {data.items.map((benefit) => (
            <div key={benefit.id} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Icon name={benefit.icon as IconName} size={20} />
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
