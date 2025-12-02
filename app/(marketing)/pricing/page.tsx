import { CTA } from "@/components/general/cta";
import { DivideX } from "@/components/general/divideX";
import PricingTable from "@/components/general/pricingTable";
import { FAQs } from "@/components/sections/faq";
import { Pricing } from "@/components/sections/pricing";
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Pricing - Notus | Aceternity UI Pro Template",
  description:
    "Notus is a platform for building agentic workflows. It allows you to design, simulate, and launch autonomous agents visually and intuitively.",
});

export default function PricingPage() {
  return (
    <main>
      <DivideX />
      <Pricing />
      <DivideX />
      <PricingTable />
      {/* <DivideX /> */}
      <FAQs />
      <DivideX />
      <CTA />
      <DivideX />
    </main>
  );
}
