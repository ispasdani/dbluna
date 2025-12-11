"use client";

import { useRouter } from "next/navigation";
import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/store/editorStore";
import { useUserTier } from "@/hooks/useUserTier";

export const DiagramCloudStatus = () => {
  const router = useRouter();
  const { tier, isLoaded } = useUserTier();
  const { getCurrentDiagram } = useEditorStore();

  const diagram = getCurrentDiagram();

  let iconClasses = "h-4 w-4";
  let tooltipText = "No diagram selected yet.";

  if (diagram) {
    switch (diagram.persistence) {
      case "local":
        iconClasses += " text-amber-500";
        tooltipText =
          "This diagram is saved in your browser (local storage). Sign in and upgrade to Pro to save it to the cloud.";
        break;
      case "cloud":
        iconClasses += " text-emerald-500";
        tooltipText = "This diagram is saved in the cloud.";
        break;
      case "unsaved":
      default:
        iconClasses += " text-muted-foreground";
        tooltipText =
          "This diagram is not saved yet. Changes are only temporary.";
        break;
    }
  }

  const showUpgradeButton = isLoaded && tier !== "pro";

  const handleUpgradeClick = () => {
    router.push("/pricing?reason=cloud-diagrams");
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex items-center justify-center rounded-full border-[1.5px] border-border dark:border-divide px-2 py-1 text-xs gap-1 cursor-default">
              <Cloud className={iconClasses} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs flex flex-col gap-3">
              {tooltipText}{" "}
              {showUpgradeButton && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-7 text-xs cursor-pointer"
                  onClick={handleUpgradeClick}
                >
                  Upgrade to Pro
                </Button>
              )}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
