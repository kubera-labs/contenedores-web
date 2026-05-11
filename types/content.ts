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

export interface ImageStripItem {
  id: string;
  src: string;
}

export interface ImageStripContent {
  items: ImageStripItem[];
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

export interface AboutPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutStat {
  id: string;
  value: string;
  label: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  closing: string;
  closingStrong: string;
  ctaLabel: string;
  image: string;
  overlayValue: string;
  overlayLabel: string;
  stats: AboutStat[];
  pillars: AboutPillar[];
}

export interface WhyModularItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyModularContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  items: WhyModularItem[];
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
  titleAccent: string;
  subtitle: string;
  items: ServiceItem[];
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

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  images: GalleryImage[];
}

export interface SiteContent {
  hero: HeroContent;
  imageStrip: ImageStripContent;
  socialProof: SocialProofContent;
  about: AboutContent;
  gallery: GalleryContent;
  whyModular: WhyModularContent;
  services: ServicesContent;
  testimonials: TestimonialsContent;
  faq: FaqContent;
  cta: CtaContent;
}

export type ContentSection = keyof SiteContent;
export type ContentOf<K extends ContentSection> = SiteContent[K];
