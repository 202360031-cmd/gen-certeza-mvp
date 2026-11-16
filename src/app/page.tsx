import { CallToAction } from "@/components/landing/CallToAction";
import { Confidentiality } from "@/components/landing/Confidentiality";
import { Custody } from "@/components/landing/Custody";
import { Faq } from "@/components/landing/Faq";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Custody />
      <Confidentiality />
      <Faq />
      <CallToAction />
    </>
  );
}
