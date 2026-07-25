import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Monarca container — Casas Contenedor y Módulos Habitables en Uruguay",
    template: "%s | Monarca container",
  },
  description:
    "Casas contenedor y módulos habitables en Uruguay. Diseñamos viviendas en contenedor llave en mano: 1, 2 y 3 dormitorios. Entrega a partir de 20 días hábiles en todo Uruguay. Financiación disponible.",
  metadataBase: new URL("https://monarcascontainer.com"),
  keywords: [
    "casas contenedor Uruguay",
    "casa contenedor Uruguay",
    "módulos habitables Uruguay",
    "viviendas modulares Uruguay",
    "casa contenedor llave en mano",
    "casas contenedor financiadas",
    "casa contenedor 40 pies Uruguay",
    "casa contenedor 2 dormitorios",
    "contenedores para vivienda Uruguay",
    "casas prefabricadas Uruguay",
    "venta de contenedores Uruguay",
    "alquiler de contenedores Uruguay",
  ],
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: "https://monarcascontainer.com",
    title: "Monarca container — Casas Contenedor y Módulos Habitables en Uruguay",
    description: "Casas contenedor llave en mano en Uruguay. Viviendas de 1, 2 y 3 dormitorios, entrega a partir de 20 días hábiles y financiación bancaria. Instalamos en tu terreno.",
    siteName: "Monarca container",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Monarca container — Casas contenedor Uruguay llave en mano",
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Monarca container — Casas Contenedor en Uruguay",
    description: "Viviendas en contenedor llave en mano. Modelos de 1, 2 y 3 dormitorios. Entrega a partir de 20 días hábiles en todo Uruguay.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  alternates: {
    canonical: "https://monarcascontainer.com",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo_final_optimizado.webp`,
    "description": siteConfig.description,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": siteConfig.address,
      "addressCountry": "UY",
    },
    "areaServed": {
      "@type": "Country",
      "name": "Uruguay",
    },
    "sameAs": Object.values(siteConfig.social),
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": siteConfig.phone,
      "availableLanguage": "Spanish",
    },
  };

  return (
    <html
      lang="es-UY"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
