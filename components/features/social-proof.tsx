const stats = [
  { value: "USD 13.900", label: "Precio de entrada", detail: "Modelo Estándar" },
  { value: "20 días", label: "Entrega garantizada", detail: "hábiles desde tu pedido" },
  { value: "3 meses", label: "Garantía escrita", detail: "en contrato, sin vueltas" },
  { value: "60 cuotas", label: "Financiación bancaria", detail: "en unidades indexadas" },
];

export function SocialProof() {
  return (
    <section className="section-dark relative" aria-label="Indicadores de confianza">

      {/* ─── Top fade: blends into the hero image above ─── */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: "-6rem",
          height: "6rem",
          background: "linear-gradient(to bottom, transparent, var(--dark-bg))",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <div className="container-base py-10 md:py-12 relative" style={{ zIndex: 2 }}>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6" data-gsap="stagger">
          {stats.map(({ value, label, detail }) => (
            <div key={label} className="flex flex-col gap-1 text-center lg:text-left">
              <dt
                className="font-extrabold leading-none"
                style={{
                  fontSize: "var(--text-5xl)",
                  fontFamily: "var(--font-heading), ui-sans-serif, sans-serif",
                  color: "var(--color-accent-400)",
                }}
              >
                {value}
              </dt>
              <dd>
                <span
                  className="block font-semibold"
                  style={{ fontSize: "var(--text-sm)", color: "var(--dark-fg)" }}
                >
                  {label}
                </span>
                <span
                  className="block"
                  style={{ fontSize: "var(--text-xs)", color: "var(--dark-fg-muted)" }}
                >
                  {detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
