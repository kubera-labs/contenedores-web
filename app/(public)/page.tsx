import { Hero } from "@/components/features/hero";
import { SocialProof } from "@/components/features/social-proof";
import { Services } from "@/components/features/services";
import { Solutions } from "@/components/features/solutions";
import { Benefits } from "@/components/features/benefits";
import { Testimonials } from "@/components/features/testimonials";
import { Faq } from "@/components/features/faq";
import { CtaFinal } from "@/components/features/cta-final";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Services />
      <Solutions />
      <Benefits />
      <Testimonials />
      <Faq />
      <CtaFinal />
    </>
  );
}
