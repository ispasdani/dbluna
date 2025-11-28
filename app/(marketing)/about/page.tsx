import { Badge } from "@/components/general/badge";
import { Container } from "@/components/general/container";
import { DivideX } from "@/components/general/divideX";
import { Heading } from "@/components/general/heading";
import { SubHeading } from "@/components/general/subHeading";
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
            <Badge text="About Us" />
            <Heading className="mt-4 text-left">
              We're Building the Future of Agent-Driven Development
            </Heading>
            <SubHeading className="mt-6 mr-auto text-left">
              Founded by engineers and AI researchers, Notus was born out of a
              simple frustration: building intelligent systems still required
              too much manual orchestration. We set out to change that by
              creating a tool that lets teams design, simulate, and launch
              autonomous agents visually and intuitively.
              <br /> <br />
              Today, Notus powers next-gen workflows for startups, dev teams,
              and AI-first platforms across the globe. Whether you're automating
              internal ops, scaling customer support, or building complex
              multi-agent systems.
            </SubHeading>
          </div>
          <div className="border-divide rounded-3xl border p-2">
            <Image
              src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us"
              width={1000}
              height={1000}
              className="h-full rounded-2xl object-cover"
            />
          </div>
        </div>
        <div className="mt-20 flex w-full flex-col items-center lg:flex-row">
          <h2 className="mb-4 min-w-40 text-center font-mono text-sm tracking-tight text-neutral-500 uppercase lg:mb-0 lg:text-left dark:text-neutral-400">
            As featured in
          </h2>
          <div className="grid w-full grid-cols-2 items-center gap-4 md:grid-cols-4">
            <Image
              src="/logos/bloomberg.png"
              alt="Bloomberg"
              width={140}
              height={140}
              className="h-6 w-auto object-contain dark:invert dark:filter"
            />
            <Image
              src="/logos/wired.png"
              alt="Bloomberg"
              width={140}
              height={140}
              className="h-6 w-auto object-contain dark:invert dark:filter"
            />
            <Image
              src="/logos/forbes.png"
              alt="Bloomberg"
              width={140}
              height={140}
              className="h-6 w-auto object-contain dark:invert dark:filter"
            />
            <Image
              src="/logos/the-guardian.png"
              alt="Bloomberg"
              width={140}
              height={140}
              className="h-6 w-auto object-contain dark:invert dark:filter"
            />
          </div>
        </div>
      </Container>
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
