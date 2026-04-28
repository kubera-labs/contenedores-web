import type { Metadata } from "next";
import { Hero } from "@/components/features/hero";
import { ImageStrip } from "@/components/features/image-strip";
import { SocialProof } from "@/components/features/social-proof";
import { About } from "@/components/features/about";
import { Gallery } from "@/components/features/gallery";
import { Solutions } from "@/components/features/solutions";
import { Testimonials } from "@/components/features/testimonials";
import { Faq } from "@/components/features/faq";
import { getStripImages } from "@/lib/get-strip-images";

export const metadata: Metadata = {
  title: "Casas Contenedor Uruguay | Módulos Habitables | Monarca Conteiners",
  description:
    "Casas contenedor y módulos habitables en Uruguay. Diseños de 1, 2 y 3 dormitorios, llave en mano, con instalación en tu terreno. Entrega en 20 días hábiles. Financiación bancaria hasta 60 cuotas.",
  alternates: {
    canonical: "https://monarcaconteiners.com",
  },
  openGraph: {
    title: "Casas Contenedor Uruguay | Módulos Habitables | Monarca Conteiners",
    description:
      "Casas contenedor llave en mano en Uruguay. Viviendas de 1, 2 y 3 dormitorios, entrega en 20 días hábiles en Montevideo, Canelones, Maldonado y todo el país.",
    url: "https://monarcaconteiners.com",
  },
};

export default async function HomePage() {
  const stripImages = await getStripImages();

  return (
    <>
      <Hero />
      <ImageStrip images={stripImages} />
      <SocialProof />
      <About />
      <Gallery />
      <Solutions />
      <Testimonials />
      <Faq />
    </>
  );
}

