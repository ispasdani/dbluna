"use client";
import { useState } from "react";
import { Scale } from "./scale";
import { motion } from "motion/react";
import {
  BoltIcon,
  CloudCheckIcon,
  ShieldSplitIcon,
  SparklesIcon,
} from "../ui/cardIcons";

export const InformationBlock = () => {
  const useCases = [
    {
      title: "Complete Clarity",
      description:
        "Design and understand your data models at a glance with a visual-first workspace that keeps complexity out of the way.",
      icon: <CloudCheckIcon className="text-brand size-6" />,
    },
    {
      title: "Move Fast, Think Visually",
      description:
        "Sketch, refine, and iterate on your schemas with the speed of a whiteboard—no friction, no heavy setup, just flow.",
      icon: <BoltIcon className="text-brand size-6" />,
    },
    {
      title: "Built-In Confidence",
      description:
        "Stay accurate and aligned with smart validations, relationship checks, and a modeling experience that prevents mistakes before they happen.",
      icon: <ShieldSplitIcon className="text-brand size-6" />,
    },
    {
      title: "Designs That Matter",
      description:
        "Create structures your whole team can understand—bringing clarity, consistency, and long-lasting value to every project.",
      icon: <SparklesIcon className="text-brand size-6" />,
    },
  ];

  const [activeUseCase, setActiveUseCase] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {useCases.map((useCase, index) => (
        <div
          onMouseEnter={() => setActiveUseCase(index)}
          key={useCase.title}
          className="relative h-full"
        >
          {activeUseCase === index && (
            <motion.div
              layoutId="scale"
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <Scale />
            </motion.div>
          )}
          <div className="relative z-10 h-full rounded-lg bg-gray-50 p-4 transition duration-200 hover:bg-transparent md:p-5 dark:bg-neutral-800">
            <div className="flex items-center gap-2">{useCase.icon}</div>
            <h3 className="mt-4 mb-2 text-base font-medium">{useCase.title}</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              {useCase.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
