"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronsUpDown,
  Plus,
  Check,
  FileText,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEditorStore } from "@/store/editorStore";
import { useUserTier } from "@/hooks/useUserTier";
import { z } from "zod";
import { Text } from "@/components/general/text";

const diagramSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Diagram name cannot be empty" })
    .max(50, { message: "Diagram name must be less than 50 characters" }),
});

export const DiagramSelector = () => {
  const router = useRouter();
  const { tier, isLoaded } = useUserTier();

  const {
    diagrams,
    currentDiagramId,
    createDiagram,
    switchDiagram,
    deleteDiagram,
    renameDiagram,
    getCurrentDiagram,
  } = useEditorStore();

  const [isRenamingDiagram, setIsRenamingDiagram] = useState<string | null>(
    null
  );
  const [renameDiagramValue, setRenameDiagramValue] = useState("");

  const [isDiagramDialogOpen, setIsDiagramDialogOpen] = useState(false);
  const [diagramName, setDiagramName] = useState("");
  const [diagramError, setDiagramError] = useState<string | null>(null);

  const currentDiagram = getCurrentDiagram();
  const hasSavedDiagram = !!currentDiagram;

  const currentLabel = hasSavedDiagram
    ? currentDiagram!.name
    : "Untitled diagram";

  const handleDeleteDiagram = (diagramId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (diagrams.length === 1) {
      toast.error("You must have at least one diagram.", {
        description: "Cannot delete the last remaining diagram.",
      });
      return;
    }

    deleteDiagram(diagramId);

    toast.success("Diagram deleted", {
      description: "The diagram has been deleted.",
    });
  };

  const handleStartRenameDiagram = (
    diagramId: string,
    currentName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setIsRenamingDiagram(diagramId);
    setRenameDiagramValue(currentName);
  };

  const handleSubmitRenameDiagram = (diagramId: string) => {
    try {
      const validated = diagramSchema.parse({ name: renameDiagramValue });
      renameDiagram(diagramId, validated.name);

      toast.success("Diagram renamed", {
        description: `Renamed to "${validated.name}".`,
      });

      setIsRenamingDiagram(null);
      setRenameDiagramValue("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error("Invalid name", {
          description: err.message,
        });
      }
    }
  };

  const handleCancelRenameDiagram = () => {
    setIsRenamingDiagram(null);
    setRenameDiagramValue("");
  };

  // When user clicks "Create Diagram" in dropdown
  const handleCreateDiagramClick = () => {
    // wait until Clerk has loaded so we know the real tier
    if (!isLoaded) return;

    // only Pro users can create multiple diagrams
    if (tier !== "pro") {
      toast.info("Upgrade to Pro to create multiple diagrams", {
        description:
          tier === "guest"
            ? "Sign in and upgrade to save and manage multiple diagrams."
            : "Your current plan supports a single local diagram. Upgrade to Pro for more.",
        action: {
          label: "Upgrade",
          onClick: () => router.push("/pricing?reason=extra-diagrams"),
        },
      });
      return;
    }

    // Open the create-diagram dialog for Pro users
    setDiagramName("");
    setDiagramError(null);
    setIsDiagramDialogOpen(true);
  };

  // When user submits the create-diagram dialog
  const handleSubmitDiagram = () => {
    try {
      const validated = diagramSchema.parse({ name: diagramName });

      // 🔹 create the diagram and get its id
      const newId = createDiagram(validated.name);

      toast.success("Diagram created", {
        description: `"${validated.name}" has been created successfully.`,
      });

      // 🔹 close modal + reset state
      setIsDiagramDialogOpen(false);
      setDiagramName("");
      setDiagramError(null);

      // 🔹 redirect to the new diagram URL
      router.push(`/d/${newId}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setDiagramError(err.message);
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="gap-2 px-3 text-foreground hover:bg-muted"
          >
            <FileText className="h-4 w-4" />
            <span className="font-medium truncate max-w-[180px]">
              <Text variant="primary" size="sm">
                {currentLabel}
              </Text>
            </span>
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-64 bg-popover z-50 shadow-md"
        >
          <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
            Diagrams
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {diagrams.map((diagram) => (
            <DropdownMenuItem
              key={diagram.id}
              onClick={() =>
                isRenamingDiagram !== diagram.id && switchDiagram(diagram.id)
              }
              className="cursor-pointer flex items-center justify-between group"
              onSelect={(e) => {
                if (isRenamingDiagram === diagram.id) {
                  e.preventDefault();
                }
              }}
            >
              <div className="flex items-center flex-1 min-w-0 gap-1">
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 shrink-0",
                    diagram.id === currentDiagramId
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />

                {isRenamingDiagram === diagram.id ? (
                  <>
                    <Input
                      value={renameDiagramValue}
                      onChange={(e) => setRenameDiagramValue(e.target.value)}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === "Enter") {
                          handleSubmitRenameDiagram(diagram.id);
                        } else if (e.key === "Escape") {
                          handleCancelRenameDiagram();
                        }
                      }}
                      className="h-6 px-2 text-sm flex-1"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-6 w-6 p-0 shrink-0 cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubmitRenameDiagram(diagram.id);
                      }}
                      aria-label="Save"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-6 w-6 p-0 shrink-0 cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelRenameDiagram();
                      }}
                      aria-label="Cancel"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <span
                    className="truncate flex-1 select-none"
                    onDoubleClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleStartRenameDiagram(diagram.id, diagram.name, e);
                    }}
                    onMouseDown={(e) => {
                      if (e.detail === 2) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Text variant="secondary" size="sm">
                      {diagram.name}
                    </Text>
                  </span>
                )}
              </div>

              {isRenamingDiagram !== diagram.id && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 shrink-0 cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    onClick={(e) =>
                      handleStartRenameDiagram(diagram.id, diagram.name, e)
                    }
                    aria-label="Rename diagram"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  {diagrams.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 shrink-0 cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-600"
                      onClick={(e) => handleDeleteDiagram(diagram.id, e)}
                      aria-label="Delete diagram"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  onClick={handleCreateDiagramClick}
                  aria-disabled={tier !== "pro"}
                  className={cn(
                    "text-primary",
                    tier !== "pro" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create Diagram</span>
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {tier === "pro"
                    ? "Create a new diagram."
                    : "Upgrade to Pro to create and manage multiple diagrams."}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create Diagram Dialog */}
      <Dialog open={isDiagramDialogOpen} onOpenChange={setIsDiagramDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-popover">
          <DialogHeader>
            <DialogTitle>Create New Diagram</DialogTitle>
            <DialogDescription>
              Enter a name for your new diagram.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label
                htmlFor="diagram-name"
                className="text-sm font-medium text-foreground"
              >
                Diagram Name
              </label>
              <Input
                id="diagram-name"
                placeholder="Untitled Diagram"
                value={diagramName}
                onChange={(e) => {
                  setDiagramName(e.target.value);
                  setDiagramError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitDiagram()}
                className={cn(diagramError && "border-destructive")}
                maxLength={50}
              />
              {diagramError && (
                <p className="text-sm text-destructive">{diagramError}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDiagramDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitDiagram}>Create Diagram</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
