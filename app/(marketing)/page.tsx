import { DivideX } from "@/components/general/divideX";
import { HeroImage } from "@/components/general/heroImage";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/howItWorks/howItWorks";
import { LogoCloud } from "@/components/sections/logoCloud";

export default function Home() {
  return (
    <main>
      <DivideX />
      <Hero />
      <DivideX />
      <HeroImage />
      <DivideX />
      <LogoCloud />
      <DivideX />
      <HowItWorks />
      <DivideX />
    </main>
  );
}
