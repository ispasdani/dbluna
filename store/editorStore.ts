"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type DiagramPersistence = "unsaved" | "local" | "cloud";

export type Diagram = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt?: number;
  content: string;
  persistence: DiagramPersistence;
};

type EditorState = {
  diagrams: Diagram[];
  currentDiagramId: string | null;

  createDiagram: (name?: string, idOverride?: string) => string;
  switchDiagram: (id: string) => void;
  deleteDiagram: (id: string) => void;
  renameDiagram: (id: string, newName: string) => void;
  updateDiagramContent: (id: string, content: string) => void;
  ensureDiagramForId: (id: string) => void;
  getCurrentDiagram: () => Diagram | null;

  setDiagramPersistence: (id: string, persistence: DiagramPersistence) => void;
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      setDiagramPersistence: (id, persistence) => {
        set((state) => ({
          diagrams: state.diagrams.map((d) =>
            d.id === id ? { ...d, persistence, updatedAt: Date.now() } : d
          ),
        }));
      },
      diagrams: [
        {
          id: "initial-diagram",
          name: "Untitled diagram",
          createdAt: Date.now(),
          content: "",
          persistence: "local",
        },
      ],
      currentDiagramId: "initial-diagram",

      createDiagram: (name = "Untitled diagram", idOverride?: string) => {
        const id = idOverride ?? crypto.randomUUID();
        const now = Date.now();

        const newDiagram: Diagram = {
          id,
          name,
          createdAt: now,
          updatedAt: now,
          content: "",
          persistence: "local",
        };

        set((state) => ({
          diagrams: [...state.diagrams, newDiagram],
          currentDiagramId: id,
        }));

        return id;
      },

      switchDiagram: (id: string) => {
        const { diagrams } = get();
        const exists = diagrams.some((d) => d.id === id);
        if (!exists) return;
        set({ currentDiagramId: id });
      },

      deleteDiagram: (id: string) => {
        const { diagrams, currentDiagramId } = get();
        if (diagrams.length <= 1) return;

        const filtered = diagrams.filter((d) => d.id !== id);

        let nextCurrent = currentDiagramId;
        if (currentDiagramId === id) {
          nextCurrent = filtered[0]?.id ?? null;
        }

        set({
          diagrams: filtered,
          currentDiagramId: nextCurrent,
        });
      },

      renameDiagram: (id: string, newName: string) => {
        const trimmed = newName.trim();
        if (!trimmed) return;

        set((state) => ({
          diagrams: state.diagrams.map((d) =>
            d.id === id ? { ...d, name: trimmed, updatedAt: Date.now() } : d
          ),
        }));
      },

      updateDiagramContent: (id: string, content: string) => {
        set((state) => ({
          diagrams: state.diagrams.map((d) =>
            d.id === id ? { ...d, content, updatedAt: Date.now() } : d
          ),
        }));
      },

      ensureDiagramForId: (id: string) => {
        const { diagrams } = get();
        const existing = diagrams.find((d) => d.id === id);
        if (existing) {
          set({ currentDiagramId: id });
          return;
        }

        const now = Date.now();
        const newDiagram: Diagram = {
          id,
          name: "Untitled diagram",
          createdAt: now,
          updatedAt: now,
          content: "",
          persistence: "local",
        };

        set((state) => ({
          diagrams: [...state.diagrams, newDiagram],
          currentDiagramId: id,
        }));
      },

      getCurrentDiagram: () => {
        const { diagrams, currentDiagramId } = get();
        if (!currentDiagramId) return null;
        return diagrams.find((d) => d.id === currentDiagramId) ?? null;
      },
    }),
    {
      name: "dbluna-diagrams",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        diagrams: state.diagrams,
        currentDiagramId: state.currentDiagramId,
      }),
      version: 1,
    }
  )
);
