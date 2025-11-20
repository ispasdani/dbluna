import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "../general/container";
import { SectionHeading } from "../general/sectionHeading";
import { Button } from "../general/button";

const VideoSec = () => {
  return (
    <Container className="border-divide relative flex min-h-60 flex-col items-center justify-center overflow-hidden border-x px-4 py-4 md:min-h-120">
      <SectionHeading className="relative z-10 text-center lg:text-6xl">
        Connect your Current Stack <br /> and Start Automating
      </SectionHeading>
    </Container>
  );
};

export default VideoSec;
