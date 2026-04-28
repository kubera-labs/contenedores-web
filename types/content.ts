// Types for the JSON content database (data/content.json)
// Each section matches a top-level key in the JSON file.

export interface HeroContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  subtitleStrong: string;
  ctaPrimary: string;
  ctaSecondary: string;
  microtrust: string;
  image: string;
}

export interface AboutPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  closing: string;
  closingStrong: string;
  ctaLabel: string;
  pillars: AboutPillar[];
}

export interface GalleryItem {
  id: string;
  label: string;
  description: string;
  tag: string;
  image?: string;
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  items: GalleryItem[];
}

export interface SolutionStep {
  id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface SolutionsContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: SolutionStep[];
}

export interface SocialProofStat {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface SocialProofContent {
  stats: SocialProofStat[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface TestimonialsContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface CtaContent {
  badge: string;
  title: string;
  subtitle: string;
  ctaWhatsapp: string;
  ctaEmail: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  bullets: string[];
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface BenefitsContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: BenefitItem[];
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  gallery: GalleryContent;
  solutions: SolutionsContent;
  socialProof: SocialProofContent;
  testimonials: TestimonialsContent;
  faq: FaqContent;
  cta: CtaContent;
  services: ServicesContent;
  benefits: BenefitsContent;
}

/** Union of all section keys in the content DB */
export type ContentSection = keyof SiteContent;

/** Resolves the type for a given section key */
export type ContentOf<K extends ContentSection> = SiteContent[K];
