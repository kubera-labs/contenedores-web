// Types for the JSON content database (data/content.json)
// Each section matches a top-level key in the JSON file.

export interface HeroContent {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  title: string;
  description: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactContent {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

export interface FooterContent {
  copyright: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
}

export interface SiteContent {
  hero: HeroContent;
  features: FeatureItem[];
  about: AboutContent;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  faq: FaqItem[];
  contact: ContactContent;
  footer: FooterContent;
}

/** Union of all section keys in the content DB */
export type ContentSection = keyof SiteContent;

/** Resolves the type for a given section key */
export type ContentOf<K extends ContentSection> = SiteContent[K];
