"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  ChevronsUpDown,
  Plus,
  Check,
  FileText,
  Trash2,
  Pencil,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/general/button";
import { useEditorStore } from "@/store/editorStore";
import { Input } from "@/components/ui/input";

export const DiagramSelector = () => {
  const {
    diagrams,
    currentDiagramId,
    createDiagram,
    switchDiagram,
    deleteDiagram,
    renameDiagram,
  } = useEditorStore();

  const [isRenamingDiagram, setIsRenamingDiagram] = useState<string | null>(
    null
  );
  const [renameDiagramValue, setRenameDiagramValue] = useState("");

  const currentDiagram = diagrams.find((d) => d.id === currentDiagramId);
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
    const trimmed = renameDiagramValue.trim();

    if (!trimmed) {
      toast.error("Invalid name", {
        description: "Diagram name cannot be empty.",
      });
      return;
    }

    renameDiagram(diagramId, trimmed);

    toast.success("Diagram renamed", {
      description: `Renamed to "${trimmed}".`,
    });

    setIsRenamingDiagram(null);
    setRenameDiagramValue("");
  };

  const handleCancelRenameDiagram = () => {
    setIsRenamingDiagram(null);
    setRenameDiagramValue("");
  };

  const handleCreateDiagram = () => {
    const name = "Untitled diagram";
    createDiagram(name);

    toast.success("Diagram created", {
      description: `"${name}" has been created successfully.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="flex justify-center items-center gap-2 px-3 text-foreground hover:bg-muted"
        >
          <FileText className="h-4 w-4" />
          <span className="font-medium truncate max-w-[180px]">
            {currentLabel}
          </span>

          {!hasSavedDiagram && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-amber-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This diagram is generated from a random id and not saved
                    yet.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="truncate w-54 bg-popover z-50 shadow-md"
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
                  diagram.id === currentDiagramId ? "opacity-100" : "opacity-0"
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
                    className="h-6 w-6 p-0 shrink-0 hover:bg-green-100 dark:hover:bg-green-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmitRenameDiagram(diagram.id);
                    }}
                    aria-label="Save"
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    className="h-6 w-6 p-0 shrink-0 hover:bg-red-100 dark:hover:bg-red-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelRenameDiagram();
                    }}
                    aria-label="Cancel"
                  >
                    <X className="h-3 w-3 text-red-600 dark:text-red-400" />
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
                  {diagram.name}
                </span>
              )}
            </div>

            {isRenamingDiagram !== diagram.id && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                <Button
                  className="h-6 w-6 p-0 shrink-0"
                  onClick={(e) =>
                    handleStartRenameDiagram(diagram.id, diagram.name, e)
                  }
                  aria-label="Rename diagram"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                {diagrams.length > 1 && (
                  <Button
                    className="h-6 w-6 p-0 shrink-0"
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

        <DropdownMenuItem
          onClick={handleCreateDiagram}
          className="cursor-pointer text-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>Create Diagram</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
