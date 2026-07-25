"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/media", label: "Galería de medios" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/image-strip", label: "Banda de imágenes" },
  { href: "/admin/social-proof", label: "Estadísticas" },
  { href: "/admin/about", label: "Nosotros" },
  { href: "/admin/why-modular", label: "Por qué modular" },
  { href: "/admin/services", label: "Servicios" },
  { href: "/admin/testimonios", label: "Testimonios" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/cta", label: "CTA final" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  }

  return (
    <aside
      className="fixed top-0 left-0 bottom-0 w-56 flex flex-col"
      style={{
        background: "var(--background)",
        borderRight: "1px solid var(--border)",
        zIndex: 40,
      }}
    >
      {/* Brand / Logo */}
      <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <Image
          src="/logo_final_optimizado.webp"
          alt="Monarca container"
          width={120}
          height={36}
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2" aria-label="Secciones del sitio">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2.5 text-sm transition-colors"
              style={{
                color: active
                  ? "var(--color-primary-900)"
                  : "var(--foreground-secondary)",
                background: active ? "var(--background-tertiary)" : "transparent",
                fontWeight: active ? 600 : 400,
                borderLeft: active
                  ? "3px solid var(--color-accent-500)"
                  : "3px solid transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-4 py-3 flex flex-col gap-2 text-xs"
        style={{ borderTop: "1px solid var(--border)", color: "var(--foreground-muted)" }}
      >
        <a href="/" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Ver sitio público →
        </a>
        <button
          type="button"
          onClick={handleLogout}
          className="text-left hover:underline transition-colors"
          style={{ color: "var(--color-error)" }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
