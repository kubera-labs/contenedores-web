import Image from "next/image";
import content from "@/data/content.json";

type Pillar = (typeof content.about.pillars)[number];
type Stat = (typeof content.about.stats)[number];

function PillarItem({ pillar }: { pillar: Pillar }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: "var(--color-accent-400)" }}
        aria-hidden="true"
      />
      <div>
        <p className="font-semibold text-sm" style={{ color: "var(--dark-fg)" }}>
          {pillar.title}
        </p>
        <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "var(--dark-fg-secondary)" }}>
          {pillar.description}
        </p>
      </div>
    </div>
  );
}

function StatItem({ stat }: { stat: Stat }) {
  return (
    <div>
      <p className="heading-4" style={{ color: "var(--color-accent-400)" }}>
        {stat.value}
      </p>
      <p
        className="text-xs uppercase tracking-widest mt-1"
        style={{ color: "var(--dark-fg-muted)" }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export function About() {
  const data = content.about;

  return (
    <section
      id="nosotros"
      className="section section-dark"
      aria-labelledby="about-heading"
    >
      <div className="container-base">

        {/* Two-column split */}
        <div className="grid-split">

          {/* Left: text */}
          <div>
            <span className="eyebrow">{data.eyebrow}</span>

            <h2
              id="about-heading"
              className="heading-2 mt-4 mb-6"
              style={{ color: "var(--dark-fg)" }}
            >
              {data.title}{" "}
              <em style={{ color: "var(--color-accent-400)" }}>
                {data.titleAccent}
              </em>
            </h2>

            <p className="text-body-lg mb-3" style={{ color: "var(--dark-fg-secondary)" }}>
              {data.subtitle}
            </p>
            <p className="text-body-lg mb-8" style={{ color: "var(--dark-fg-secondary)" }}>
              {data.closing}
            </p>

            <div className="flex flex-col gap-4">
              {data.pillars.map((pillar) => (
                <PillarItem key={pillar.id} pillar={pillar} />
              ))}
            </div>
          </div>

          {/* Right: image with overlay */}
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "420px" }}>
            <Image
              src={data.image}
              alt="Monarca Containers — vivienda modular personalizada"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Stat overlay card */}
            <div
              className="absolute bottom-6 right-6 rounded-xl p-5"
              style={{ background: "var(--color-accent-400)" }}
            >
              <p className="heading-3" style={{ color: "var(--color-primary-950)" }}>
                {data.overlayValue}
              </p>
              <p
                className="text-xs uppercase tracking-widest mt-1"
                style={{ color: "var(--color-primary-800)" }}
              >
                {data.overlayLabel}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom stats row */}
        <div
          className="grid grid-cols-3 gap-8 mt-16 pt-10"
          style={{ borderTop: "1px solid var(--dark-border)" }}
        >
          {data.stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>

      </div>
    </section>
  );
}
