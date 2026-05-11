import { z } from "zod";

const str = z.string();

const HeroSchema = z.object({
  eyebrow: str,
  title: str,
  titleAccent: str,
  subtitle: str,
  subtitleStrong: str,
  ctaPrimary: str,
  ctaSecondary: str,
  microtrust: str,
  image: str,
});

const ImageStripSchema = z.object({
  items: z.array(z.object({ id: str, src: str })),
});

const SocialProofSchema = z.object({
  stats: z.array(z.object({ id: str, value: str, label: str, detail: str })),
});

const AboutSchema = z.object({
  eyebrow: str,
  title: str,
  titleAccent: str,
  subtitle: str,
  closing: str,
  closingStrong: str,
  ctaLabel: str,
  image: str,
  overlayValue: str,
  overlayLabel: str,
  stats: z.array(z.object({ id: str, value: str, label: str })),
  pillars: z.array(z.object({ id: str, icon: str, title: str, description: str })),
});

const WhyModularSchema = z.object({
  eyebrow: str,
  title: str,
  titleAccent: str,
  subtitle: str,
  items: z.array(z.object({ id: str, icon: str, title: str, description: str })),
});

const ServicesSchema = z.object({
  eyebrow: str,
  title: str,
  titleAccent: str,
  subtitle: str,
  items: z.array(z.object({ id: str, icon: str, title: str, tagline: str, bullets: z.array(str) })),
});

const TestimonialsSchema = z.object({
  eyebrow: str,
  title: str,
  subtitle: str,
  items: z.array(z.object({ id: str, name: str, role: str, quote: str, rating: z.number().int().min(1).max(5) })),
});

const FaqSchema = z.object({
  eyebrow: str,
  title: str,
  subtitle: str,
  items: z.array(z.object({ id: str, question: str, answer: str })),
});

const CtaSchema = z.object({
  badge: str,
  title: str,
  subtitle: str,
  ctaWhatsapp: str,
  ctaEmail: str,
});

const GallerySchema = z.object({
  eyebrow: str,
  title: str,
  titleAccent: str,
  images: z.array(z.object({ id: str, src: str, alt: str })),
});

export const SiteContentSchema = z.object({
  hero: HeroSchema,
  imageStrip: ImageStripSchema,
  socialProof: SocialProofSchema,
  about: AboutSchema,
  gallery: GallerySchema,
  whyModular: WhyModularSchema,
  services: ServicesSchema,
  testimonials: TestimonialsSchema,
  faq: FaqSchema,
  cta: CtaSchema,
});

export type ValidatedSiteContent = z.infer<typeof SiteContentSchema>;
