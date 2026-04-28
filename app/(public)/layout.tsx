import { Navbar } from "@/components/features/navbar";
import { Footer } from "@/components/features/footer";
import { WhatsappFab, ScrollCta } from "@/components/features/floating-ctas";
import { GsapProvider } from "@/components/providers/gsap-provider";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GsapProvider />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsappFab />
      <ScrollCta />
    </>
  );
}
