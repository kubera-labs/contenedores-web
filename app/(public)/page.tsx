import type { Metadata } from "next";
import { Hero } from "@/components/features/hero";
import { ImageStrip } from "@/components/features/image-strip";
import { SocialProof } from "@/components/features/social-proof";
import { About } from "@/components/features/about";
import { WhyModular } from "@/components/features/why-modular";
import { Services } from "@/components/features/services";
import { Testimonials } from "@/components/features/testimonials";
import { Gallery } from "@/components/features/gallery";
import { Faq } from "@/components/features/faq";
import { CtaFinal } from "@/components/features/cta-final";
import { getSection } from "@/lib/db";

export const metadata: Metadata = {
  title: "Viviendas y Espacios Modulares | Monarca container",
  description:
    "Diseñamos viviendas, monoambientes, oficinas y espacios modulares a medida. Asesoramiento completo, cobertura en todo el país y financiación disponible.",
  alternates: {
    canonical: "https://monarcascontainer.com",
  },
  openGraph: {
    title: "Viviendas y Espacios Modulares | Monarca container",
    description:
      "Diseñamos viviendas, monoambientes, oficinas y espacios modulares a medida. Asesoramiento completo, cobertura en todo el país y financiación disponible.",
    url: "https://monarcascontainer.com",
  },
};

export default async function HomePage() {
  const imageStrip = await getSection("imageStrip");

  return (
    <>
      <Hero />
      <ImageStrip images={imageStrip.items.map((item) => item.src)} />
      <SocialProof />
      <About />
      <WhyModular />
      <Services />
      <Gallery />
      <Testimonials />
      <Faq />
      <CtaFinal />
    </>
  );
}


