import Link from "next/link";

const SECTIONS = [
  {
    href: "/admin/media",
    title: "Galería de medios",
    desc: "Repositorio central de imágenes compartido por la banda y la galería. Subí, eliminá y controlá el almacenamiento (500 MB).",
  },
  {
    href: "/admin/hero",
    title: "Hero",
    desc: "Eyebrow, título, subtítulo, botones y microtexto de confianza.",
  },
  {
    href: "/admin/banda",
    title: "Banda de imágenes",
    desc: "Strip infinito bajo el hero. Las imágenes vienen de la Galería de medios.",
  },
  {
    href: "/admin/estadisticas",
    title: "Estadísticas",
    desc: "Cifras clave: precio de entrada, plazo, garantía, cuotas.",
  },
  {
    href: "/admin/about",
    title: "Nosotros",
    desc: "Descripción de la empresa y los pilares de valor.",
  },
  {
    href: "/admin/galeria",
    title: "Galería",
    desc: "Proyectos destacados: asigná imágenes, títulos y descripciones.",
  },
  {
    href: "/admin/soluciones",
    title: "Cómo trabajamos",
    desc: "Pasos del proceso de trabajo con número, ícono y descripción.",
  },
  {
    href: "/admin/testimonios",
    title: "Testimonios",
    desc: "Reseñas de clientes con nombre, cargo y texto.",
  },
  {
    href: "/admin/faq",
    title: "FAQ",
    desc: "Preguntas frecuentes con pregunta y respuesta expandible.",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Panel de contenido
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--foreground-secondary)" }}>
          Seleccioná una sección para editar su contenido. Los cambios se reflejan en el sitio
          público después de guardar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{
              borderColor: "var(--border)",
              background: "var(--background)",
            }}
          >
            <h2 className="font-semibold text-base mb-1" style={{ color: "var(--foreground)" }}>
              {s.title}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
              {s.desc}
            </p>
            <span
              className="inline-block mt-3 text-xs font-semibold"
              style={{ color: "var(--color-primary-600)" }}
            >
              Editar →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
