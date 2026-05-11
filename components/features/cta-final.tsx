import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui";
import content from "@/data/content.json";

export function CtaFinal() {
  const data = content.cta;
  return (
    <section
      id="contacto"
      className="section section-dark bg-dot-grid relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent-500/8 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container-narrow relative text-center">
        <span className="badge badge-accent mb-6">
          <Icon name="zap" size={14} />
          {data.badge}
        </span>
        <h2 id="cta-heading" className="heading-2 mb-4">
          {data.title}
        </h2>
        <p className="text-lg text-dark-fg-secondary max-w-lg mx-auto mb-8 leading-relaxed">
          {data.subtitle}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <a href={siteConfig.whatsapp} className="btn btn-whatsapp btn-lg">
            <Icon name="whatsapp" size={20} />
            {data.ctaWhatsapp}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="btn btn-secondary btn-lg">
            <Icon name="mail" size={18} />
            {data.ctaEmail}
          </a>
        </div>

        {/* Contact details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-dark-fg-muted">
          <span className="flex items-center gap-2">
            <Icon name="phone" size={16} />
            {siteConfig.phone}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="mail" size={16} />
            {siteConfig.email}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="map-pin" size={16} />
            Buenos Aires, Argentina
          </span>
        </div>
      </div>
    </section>
  );
}
