import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "Contenedores Web — Soluciones modulares en contenedores",
    template: "%s | Contenedores Web",
  },
  description:
    "Venta, alquiler y modificación de contenedores marítimos en toda Argentina. Calidad industrial, personalización total y entrega rápida.",
  metadataBase: new URL("https://contenedoresweb.com"),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Contenedores Web",
  },
  robots: {
    index: true,
    follow: true,
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
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
