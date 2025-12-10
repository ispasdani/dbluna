// src/store/editorStore.ts
"use client";

import { create } from "zustand";

export type Diagram = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt?: number;
};

type EditorState = {
  diagrams: Diagram[];
  currentDiagramId: string | null;

  // actions
  createDiagram: (name: string, idOverride?: string) => string;
  switchDiagram: (id: string) => void;
  deleteDiagram: (id: string) => void;
  renameDiagram: (id: string, newName: string) => void;

  // useful when you land on /diagram/:id with just a random UUID
  ensureDiagramForId: (id: string) => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  // start with one default diagram
  diagrams: [
    {
      id: "initial-diagram",
      name: "Untitled diagram",
      createdAt: Date.now(),
    },
  ],
  currentDiagramId: "initial-diagram",

  createDiagram: (name: string, idOverride?: string) => {
    const id = idOverride ?? crypto.randomUUID();
    const now = Date.now();

    const newDiagram: Diagram = {
      id,
      name,
      createdAt: now,
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

  ensureDiagramForId: (id: string) => {
    const { diagrams } = get();
    const existing = diagrams.find((d) => d.id === id);
    if (existing) {
      set({ currentDiagramId: id });
      return;
    }

    // If not present, create an "unsaved" diagram entry for this id
    const now = Date.now();
    const newDiagram: Diagram = {
      id,
      name: "Untitled diagram",
      createdAt: now,
    };

    set((state) => ({
      diagrams: [...state.diagrams, newDiagram],
      currentDiagramId: id,
    }));
  },
}));
