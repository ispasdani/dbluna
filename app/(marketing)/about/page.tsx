import { Badge } from "@/components/general/badge";
import { Container } from "@/components/general/container";
import { DivideX } from "@/components/general/divideX";
import { Heading } from "@/components/general/heading";
import { InformationBlock } from "@/components/general/informationBlock";
import { SectionHeading } from "@/components/general/sectionHeading";
import { SubHeading } from "@/components/general/subHeading";
import { Testimonials } from "@/components/general/testimonials";
import { getSEOTags } from "@/lib/seo";
import Image from "next/image";

export const metadata = getSEOTags({
  title: "About Us - Notus | Aceternity UI Pro Template",
  description:
    "We're Building the Future of Agent-Driven Development. Founded by engineers and AI researchers, Notus was born out of a simple frustration: building intelligent systems still required too much manual orchestration. We set out to change that by creating a tool that lets teams design, simulate, and launch autonomous agents visually and intuitively.",
});

export default function AboutPage() {
  return (
    <main>
      <DivideX />
      <Container className="border-divide flex flex-col items-center justify-center border-x px-4 pt-10 pb-10 md:px-8 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <Badge text="About Our Product" />
            <Heading className="mt-4 text-left">
              We &#8217;re Engineering the Future of Visual-First Data Modeling
            </Heading>
            <SubHeading className="mt-6 mr-auto text-left">
              We built our platform on a simple belief: database should be fun
              and design should feel intuitive, not intimidating. Created by
              engineers and design enthusiasts who remember when software was
              crafted with genuine care for the human experience, our tool
              brings clarity and delight back to schema design.
              <br /> <br />
              With our platform, you can effortlessly switch between a powerful
              visual canvas and a clean, expressive code editor—without losing
              context, precision, or flow. It &#8217;s the database design tool
              we always wished existed.
            </SubHeading>
          </div>
          <div className="border-divide rounded-3xl border p-2">
            <Image
              src=""
              alt="About Us"
              width={1000}
              height={1000}
              className="h-full rounded-2xl object-cover"
            />
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col items-center lg:flex-row">
          <h2 className="mb-4 min-w-35 text-center font-mono text-sm tracking-tight text-neutral-500 uppercase lg:mb-0 lg:text-left dark:text-neutral-400">
            Featured in
          </h2>
          <div className="grid w-full grid-cols-2 items-center gap-4 md:grid-cols-4">
            <Image
              src="/logos/productHunt.png"
              alt="Bloomberg"
              width={200}
              height={70}
              className="h-14 w-auto object-contain dark:invert dark:filter"
            />
            <Image
              src="/logos/indieHackers.png"
              alt="Bloomberg"
              width={200}
              height={70}
              className="h-7 w-auto object-contain dark:invert dark:filter"
            />
            <div className="flex justify-start items-center">
              <Image
                src="/logos/betaList.svg"
                alt="Bloomberg"
                width={200}
                height={70}
                className="h-8 w-auto object-contain dark:invert dark:filter"
              />
              <p className="ml-3 font-mono uppercase font-bold text-xl">
                BetaList
              </p>
            </div>
          </div>
        </div>
      </Container>
      <DivideX />
      <Testimonials />
      <Container className="border-divide border-x border-t p-4 py-20 md:px-8 md:py-40">
        <div className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <Badge text="Journey and Values" />
            <SectionHeading className="mt-4 text-left">
              Designing Data Tools That Feel Human Again
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto text-left">
              Our journey is about creating tools that support people, not the
              other way around. DbLuna helps teams visualize, iterate, and
              understand their data with clarity and joy.
            </SubHeading>
            <div className="divide-divide mt-8 grid grid-cols-3 gap-6">
              <MetricBlock value="1.2M+" label="Workflows created" />
              <MetricBlock value="6.4k" label="Tech Community" />
              <MetricBlock value="1.2K" label="G2 reviews" />
            </div>
          </div>
          <InformationBlock />
        </div>
      </Container>
      <DivideX />
    </main>
  );
}

const MetricBlock = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="flex flex-col items-start justify-start">
      <h3 className="text-charcoal-700 text-3xl font-medium dark:text-neutral-100">
        {value}
      </h3>
      <p className="text-sm text-gray-600 dark:text-neutral-400">{label}</p>
    </div>
  );
};
