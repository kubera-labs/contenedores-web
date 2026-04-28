import { z } from "zod";

/* ── Primitive schemas ── */
const str = z.string();

/* ── Section schemas ── */
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

const AboutPillarSchema = z.object({
  id: str,
  icon: str,
  title: str,
  description: str,
});

const AboutSchema = z.object({
  eyebrow: str,
  title: str,
  titleAccent: str,
  subtitle: str,
  closing: str,
  closingStrong: str,
  ctaLabel: str,
  pillars: z.array(AboutPillarSchema),
});

const GalleryItemSchema = z.object({
  id: str,
  label: str,
  description: str,
  tag: str,
  image: str.optional(),
});

const GallerySchema = z.object({
  eyebrow: str,
  title: str,
  titleAccent: str,
  subtitle: str,
  items: z.array(GalleryItemSchema),
});

const SolutionStepSchema = z.object({
  id: str,
  number: str,
  icon: str,
  title: str,
  description: str,
});

const SolutionsSchema = z.object({
  eyebrow: str,
  title: str,
  subtitle: str,
  steps: z.array(SolutionStepSchema),
});

const SocialProofStatSchema = z.object({
  id: str,
  value: str,
  label: str,
  detail: str,
});

const SocialProofSchema = z.object({
  stats: z.array(SocialProofStatSchema),
});

const TestimonialItemSchema = z.object({
  id: str,
  name: str,
  role: str,
  quote: str,
  rating: z.number().int().min(1).max(5),
});

const TestimonialsSchema = z.object({
  eyebrow: str,
  title: str,
  subtitle: str,
  items: z.array(TestimonialItemSchema),
});

const FaqItemSchema = z.object({
  id: str,
  question: str,
  answer: str,
});

const FaqSchema = z.object({
  eyebrow: str,
  title: str,
  subtitle: str,
  items: z.array(FaqItemSchema),
});

const CtaSchema = z.object({
  badge: str,
  title: str,
  subtitle: str,
  ctaWhatsapp: str,
  ctaEmail: str,
});

const ServiceItemSchema = z.object({
  id: str,
  icon: str,
  title: str,
  tagline: str,
  bullets: z.array(str),
});

const ServicesSchema = z.object({
  eyebrow: str,
  title: str,
  subtitle: str,
  items: z.array(ServiceItemSchema),
});

const BenefitItemSchema = z.object({
  id: str,
  icon: str,
  title: str,
  description: str,
});

const BenefitsSchema = z.object({
  eyebrow: str,
  title: str,
  subtitle: str,
  items: z.array(BenefitItemSchema),
});

/* ── Root schema ── */
export const SiteContentSchema = z.object({
  hero: HeroSchema,
  about: AboutSchema,
  gallery: GallerySchema,
  solutions: SolutionsSchema,
  socialProof: SocialProofSchema,
  testimonials: TestimonialsSchema,
  faq: FaqSchema,
  cta: CtaSchema,
  services: ServicesSchema,
  benefits: BenefitsSchema,
});

export type ValidatedSiteContent = z.infer<typeof SiteContentSchema>;
