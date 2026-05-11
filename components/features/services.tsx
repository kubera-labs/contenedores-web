import { Icon } from "@/components/ui";
import content from "@/data/content.json";
import type { IconName } from "@/components/ui";

const { services: data } = content;

export function Services() {
  return (
    <section
      id="servicios"
      className="section section-dark"
      aria-labelledby="services-heading"
    >
      <div className="container-base">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow" style={{ color: "var(--color-accent-400)" }}>
            {data.eyebrow}
          </span>
          <h2
            id="services-heading"
            className="heading-2 mt-3 mb-4"
            style={{ color: "var(--dark-fg)" }}
          >
            {data.title}{" "}
            <em style={{ color: "var(--color-accent-400)" }}>{data.titleAccent}</em>
          </h2>
          <p className="section-subtitle mx-auto" style={{ color: "var(--dark-fg-secondary)" }}>
            {data.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid-auto">
          {data.items.map((service) => (
            <article
              key={service.id}
              className="flex flex-col rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(15,32,53,0.55)",
                border: "1px solid var(--dark-border)",
              }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                style={{
                  background: "rgba(251,191,36,0.12)",
                  color: "var(--color-accent-400)",
                  border: "1px solid rgba(251,191,36,0.20)",
                }}
              >
                <Icon name={service.icon as IconName} size={22} />
              </div>

              <h3 className="heading-5 mb-1" style={{ color: "var(--dark-fg)" }}>
                {service.title}
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--dark-fg-muted)" }}>
                {service.tagline}
              </p>

              <ul className="space-y-2 mt-auto">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--dark-fg-secondary)" }}
                  >
                    <Icon
                      name="check"
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--color-accent-400)" }}
                    />
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
