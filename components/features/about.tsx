import { Icon } from "@/components/ui";
import content from "@/data/content.json";

type Pillar = (typeof content.about.pillars)[number];

function PillarRow({ pillar }: { pillar: Pillar }) {
  return (
    <div className="flex items-start gap-5 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
      {/* Icon */}
      <div
        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
        style={{
          background: "var(--color-primary-50)",
          color: "var(--color-primary-600)",
        }}
        aria-hidden="true"
      >
        <Icon name={pillar.icon as "target" | "zap" | "sparkles"} size={20} />
      </div>

      {/* Title + desc side by side on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row md:items-baseline md:gap-6 flex-1 min-w-0">
        <h3
          className="heading-6 shrink-0 md:w-64"
          style={{ color: "var(--foreground)" }}
        >
          {pillar.title}
        </h3>
        <p
          className="text-sm leading-relaxed mt-1 md:mt-0"
          style={{ color: "var(--foreground-secondary)" }}
        >
          {pillar.description}
        </p>
      </div>
    </div>
  );
}

export function About() {
  const data = content.about;

  return (
    <section id="nosotros" className="section" aria-labelledby="about-heading">
      <div className="container-base max-w-4xl">

        {/* Header */}
        <div className="mb-10" data-gsap="section-header">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="about-heading" className="heading-2 mt-3 mb-4">
            {data.title}{" "}
            <span className="text-gradient">{data.titleAccent}</span>
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--foreground-secondary)" }}>
            {data.subtitle}
          </p>
        </div>

        {/* Pillars as rows */}
        <div data-gsap="stagger">
          {/* Top border */}
          <div style={{ borderTop: "1px solid var(--border)" }} />
          {data.pillars.map((pillar) => (
            <PillarRow key={pillar.id} pillar={pillar} />
          ))}
        </div>

      </div>
    </section>
  );
}
