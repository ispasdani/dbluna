"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Container } from "./container";
import { Button } from "./button";
import Link from "next/link";
import { SectionHeading } from "./sectionHeading";

type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type CTAOrbitProps = {
  size?: number;
  className?: string;
  showRings?: boolean;
  ringDurationsSec?: number[];
  numRings?: number;
};

export const CTA = () => {
  return (
    <Container className="border-divide relative flex min-h-60 flex-col items-center justify-center overflow-hidden border-x px-4 py-4 md:min-h-120">
      <SectionHeading className="relative z-10 text-center lg:text-6xl">
        Connect your Current Stack <br /> and Start Automating
      </SectionHeading>
      <Button as={Link} href="/sign-up" className="relative z-20 mt-4">
        Start Building for Free
      </Button>
    </Container>
  );
};
