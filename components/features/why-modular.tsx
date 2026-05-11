import { Icon } from "@/components/ui";
import type { IconName } from "@/components/ui";
import content from "@/data/content.json";

const { whyModular: data } = content;

export function WhyModular() {
  return (
    <section id="por-que-modular" className="section section-alt" aria-labelledby="why-modular-heading">
      <div className="container-base">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-gsap="section-header">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="why-modular-heading" className="heading-2 mt-3 mb-4">
            {data.title}{" "}
            <span className="text-gradient">{data.titleAccent}</span>
          </h2>
          <p className="section-subtitle mx-auto">{data.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-gsap="stagger">
          {data.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Icon name={item.icon as IconName} size={20} />
              </div>
              <div>
                <h3 className="heading-6 mb-1">{item.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
