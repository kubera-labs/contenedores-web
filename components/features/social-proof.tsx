import { Icon } from "@/components/ui";

const stats = [
  { value: "500+", label: "Proyectos entregados", icon: "container" as const },
  { value: "150+", label: "Clientes activos", icon: "users" as const },
  { value: "12+", label: "Rubros atendidos", icon: "building" as const },
  { value: "<24hs", label: "Tiempo de respuesta", icon: "clock" as const },
];

const logos = [
  "TechCorp",
  "MinaSur",
  "AgroPlus",
  "EnergíaVerde",
  "LogísticaBA",
  "GastroGroup",
];

export function SocialProof() {
  return (
    <section className="section section-alt" aria-label="Prueba social">
      <div className="container-base">
        {/* Stats */}
        <div className="grid-stats mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-3">
                <Icon name={stat.icon} size={22} />
              </div>
              <p className="heading-4 text-foreground">{stat.value}</p>
              <p className="text-sm text-foreground-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Logo strip */}
        <div className="border-t border-border pt-8">
          <p className="text-xs text-foreground-muted uppercase tracking-widest text-center mb-6">
            Confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logos.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-foreground-muted/60 tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
