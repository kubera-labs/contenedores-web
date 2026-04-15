import { Navbar } from "@/components/features/navbar";
import { Footer } from "@/components/features/footer";
import { WhatsappFab, ScrollCta } from "@/components/features/floating-ctas";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 md:pt-18">
        {children}
      </main>
      <Footer />
      <WhatsappFab />
      <ScrollCta />
    </>
  );
}
