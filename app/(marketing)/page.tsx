import { DivideX } from "@/components/general/divideX";
import { HeroImage } from "@/components/general/heroImage";
import { AgenticIntelligence } from "@/components/sections/agenticItelligence/agenticItenlligence";
import { Benefits } from "@/components/sections/benefits";
import { FAQs } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/howItWorks/howItWorks";
import { LogoCloud } from "@/components/sections/logoCloud";
import { Pricing } from "@/components/sections/pricing";
import { UseCases } from "@/components/sections/useCases";

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
      <AgenticIntelligence />
      <DivideX />
      <UseCases />
      <DivideX />
      <Benefits />
      <DivideX />
      <Pricing />
      <DivideX />
      <FAQs />
      <DivideX />
    </main>
  );
}
