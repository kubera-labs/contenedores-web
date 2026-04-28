import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { name: "instagram" as const, href: siteConfig.social.instagram },
  { name: "facebook" as const, href: siteConfig.social.facebook },
  { name: "linkedin" as const, href: siteConfig.social.linkedin },
];

export function Footer() {
  return (
    <footer className="section section-dark" role="contentinfo">
      <div className="container-base">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-dark-border">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 font-bold text-lg mb-4">
              <Image
                src="/logo_final_optimizado.webp"
                className={`rounded-full duration-300 cursor-pointer hover:scale-110`}
                alt={siteConfig.name}
                width={56}
                height={56}
              />
              <span className="text-xl tracking-wide">{siteConfig.name}</span>
            </Link>
            <p className="text-sm leading-relaxed text-dark-fg-secondary mb-6 max-w-sm">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="p-2 rounded-lg bg-dark-bg-secondary text-dark-fg-muted hover:text-accent-400 hover:bg-white/5 transition-colors"
                >
                  <Icon name={s.name} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-dark-fg mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-dark-fg-secondary hover:text-dark-fg transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-dark-fg mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-dark-fg-secondary hover:text-dark-fg transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4">
          <p className="text-xs text-dark-fg-muted text-center sm:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-dark-fg-muted">
             <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-dark-fg transition-colors">
              <Icon name="phone" size={14} />
              {siteConfig.phone}
            </a>
            <span className="hidden sm:inline" aria-hidden="true">&bull;</span>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-dark-fg transition-colors">
              <Icon name="mail" size={14} />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
