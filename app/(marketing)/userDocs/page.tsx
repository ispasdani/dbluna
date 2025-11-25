"use client";

import {
  Table2,
  Link2,
  Square,
  StickyNote,
  FileDown,
  FileUp,
  ZoomIn,
  ZoomOut,
  Grid3x3,
  Magnet,
  Search,
  Keyboard,
  Database,
  FileText,
  Maximize2,
  AlignLeft,
  AlignCenterHorizontal,
  AlignRight,
  MoveVertical,
  MoveHorizontal,
  Save,
  Undo2,
  Redo2,
  Eye,
  Code,
  Plus,
  Edit3,
  Focus,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/general/button";
import Link from "next/link";
import { Badge } from "@/components/general/badge";

const sections = [
  { id: "getting-started", title: "Getting Started" },
  { id: "interface", title: "Interface Overview" },
  { id: "tables", title: "Working with Tables" },
  { id: "columns", title: "Managing Columns" },
  { id: "relationships", title: "Creating Relationships" },
  { id: "areas", title: "Using Areas" },
  { id: "notes", title: "Adding Notes" },
  { id: "code-mode", title: "Code Editor Mode" },
  { id: "navigation", title: "Navigation & Search" },
  { id: "export-import", title: "Export & Import" },
  { id: "templates", title: "Using Templates" },
  { id: "keyboard", title: "Keyboard Shortcuts" },
  { id: "tips", title: "Tips & Best Practices" },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState("getting-started");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto flex gap-8 px-8 py-12">
        {/* Sidebar Navigation */}
        <aside className="sticky top-8 hidden h-fit w-64 shrink-0 md:block">
          <nav className="space-y-1">
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
              Documentation
            </h3>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  activeSection === section.id
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <ChevronRight className="h-3 w-3" />
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {/* Introduction */}
            <div className="mb-12">
              <Badge text={"Documentation"} />
              <h1 className="mt-4 text-4xl font-bold">Complete User Guide</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Welcome to the comprehensive documentation for our database
                schema design tool. This guide will walk you through every
                feature and capability to help you design, document, and export
                professional database schemas efficiently.
              </p>
            </div>

            {/* Getting Started */}
            <section id="getting-started" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  1
                </span>
                Getting Started
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    What is this tool?
                  </h3>
                  <p className="text-muted-foreground">
                    Our platform is a visual database schema design tool that
                    lets you create, document, and export database schemas using
                    either a visual drag-and-drop interface or by writing
                    SQL/DBML code directly. It's designed to make database
                    design intuitive for both visual thinkers and developers who
                    prefer code.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Visual Editor:</strong> Drag-and-drop tables,
                        create relationships with visual connectors
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Code Editor:</strong> Write schemas in SQL or
                        DBML format
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Real-time Sync:</strong> Changes in visual mode
                        instantly reflect in code, and vice versa
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Multiple Export Formats:</strong> PostgreSQL,
                        MySQL, SQLite, SQL Server, Oracle, DBML
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Team Collaboration:</strong> Share workspaces
                        with different access levels
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Templates:</strong> Start quickly with pre-built
                        schema templates
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Creating Your First Schema
                  </h3>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        1
                      </span>
                      <span>
                        Click the <strong>"+ Table"</strong> button in the
                        toolbar to add your first table to the canvas
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        2
                      </span>
                      <span>
                        Click on the table to give it a name and start adding
                        columns
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        3
                      </span>
                      <span>
                        Add more tables and connect them using the{" "}
                        <strong>"Relation"</strong> button
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        4
                      </span>
                      <span>
                        Organize related tables using <strong>Areas</strong> for
                        better visual grouping
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        5
                      </span>
                      <span>
                        Export your schema when ready using{" "}
                        <strong>File → Export</strong> menu
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Interface Overview */}
            <section id="interface" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  2
                </span>
                Interface Overview
              </h2>

              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-panel p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Top Navigation Bar
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    The top bar contains your diagram name and quick access to
                    diagram management features.
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Click the diagram name to rename it</li>
                    <li>
                      • Use the dropdown to switch between multiple diagrams
                    </li>
                    <li>• Create new diagrams or delete existing ones</li>
                    <li>• Access theme toggle (light/dark mode)</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-panel p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Edit3 className="h-5 w-5 text-primary" />
                    Main Toolbar
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    The toolbar provides quick access to all primary actions for
                    schema design.
                  </p>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Plus className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <strong>Add Buttons:</strong> Quickly add tables, areas,
                        notes, or relationships to your canvas
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Save className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <strong>Save:</strong> Save your diagram to browser
                        local storage (auto-save enabled)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <strong>File Menu:</strong> Import/export diagrams,
                        access code generation, and persistence options
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Edit3 className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <strong>Edit Menu:</strong> Undo/redo actions and edit
                        operations
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Eye className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <strong>View Menu:</strong> Toggle panels, switch
                        between schema and code views, show/hide grid and snap
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlignLeft className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <strong>Align Menu:</strong> Align and distribute
                        multiple selected elements
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ZoomIn className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <strong>Zoom Controls:</strong> Zoom in/out, reset zoom,
                        or fit all tables to view
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-panel p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Square className="h-5 w-5 text-primary" />
                    Canvas Area
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    The main canvas is your workspace where you design and
                    visualize your database schema.
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • Pan around by clicking and dragging on empty space
                    </li>
                    <li>• Zoom using mouse wheel or trackpad pinch gesture</li>
                    <li>
                      • Optional grid display with snap-to-grid functionality
                    </li>
                    <li>
                      • Minimap in the bottom-right corner for quick navigation
                    </li>
                    <li>
                      • Right-click on elements for context menu with quick
                      actions
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-panel p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Left Sidebar
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    The resizable left sidebar provides access to schema browser
                    and code editor.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-foreground">
                        Schema View (3 tabs):
                      </strong>
                      <ul className="mt-2 space-y-1 text-muted-foreground ml-4">
                        <li>
                          • <strong>Tables:</strong> Browse all tables, columns,
                          and relationships
                        </li>
                        <li>
                          • <strong>Templates:</strong> Access pre-built schema
                          templates
                        </li>
                        <li>
                          • <strong>Issues:</strong> View validation errors and
                          warnings
                        </li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-foreground">
                        Code View (2 tabs):
                      </strong>
                      <ul className="mt-2 space-y-1 text-muted-foreground ml-4">
                        <li>
                          • <strong>SQL:</strong> View and edit schema as SQL
                          code
                        </li>
                        <li>
                          • <strong>DBML:</strong> View and edit schema as DBML
                          code
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Working with Tables */}
            <section id="tables" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  3
                </span>
                Working with Tables
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Creating Tables
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Tables are the foundation of your database schema. Each
                    table represents an entity in your database.
                  </p>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      1. Click the <strong>"+ Table"</strong> button in the
                      toolbar
                    </li>
                    <li>
                      2. A new table appears in the center of your current
                      viewport
                    </li>
                    <li>3. Click on the table name to edit it</li>
                    <li>4. The table is automatically saved as you work</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Editing Table Properties
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Click on any table to edit its properties:
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Table Name:</strong> Click the name field to
                      rename the table
                    </li>
                    <li>
                      • <strong>Table Note:</strong> Add documentation or
                      comments about the table's purpose
                    </li>
                    <li>
                      • <strong>Color:</strong> Assign a custom color to
                      visually categorize tables
                    </li>
                    <li>
                      • <strong>Visibility:</strong> Temporarily hide tables
                      from the canvas without deleting them
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Moving Tables</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Click and drag</strong> any table to reposition
                      it on the canvas
                    </li>
                    <li>
                      • Use <strong>arrow keys</strong> to nudge selected tables
                      (1px per press)
                    </li>
                    <li>
                      • Hold <strong>Shift + arrow keys</strong> to nudge faster
                      (10px per press)
                    </li>
                    <li>
                      • Enable <strong>snap to grid</strong> for precise
                      alignment
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Selecting Multiple Tables
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • Hold <strong>Shift</strong> and click tables to add them
                      to selection
                    </li>
                    <li>
                      • Click and drag on empty canvas to create a selection box
                    </li>
                    <li>
                      • Press <strong>Escape</strong> to clear selection
                    </li>
                    <li>
                      • Use selection to perform bulk operations like alignment,
                      distribution, or deletion
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Copying and Pasting Tables
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Select one or more tables</li>
                    <li>
                      • Press <strong>Cmd/Ctrl + C</strong> to copy
                    </li>
                    <li>
                      • Press <strong>Cmd/Ctrl + V</strong> to paste (creates
                      duplicates with new IDs)
                    </li>
                    <li>• Pasted tables appear offset from the originals</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Deleting Tables
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Select the table(s) you want to delete</li>
                    <li>
                      • Press <strong>Delete</strong> or{" "}
                      <strong>Backspace</strong> key
                    </li>
                    <li>
                      • Or right-click and select <strong>"Delete"</strong> from
                      context menu
                    </li>
                    <li>
                      • Deleting a table also removes all its relationships
                    </li>
                    <li>
                      • Use <strong>Cmd/Ctrl + Z</strong> to undo if deleted by
                      mistake
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Managing Columns */}
            <section id="columns" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  4
                </span>
                Managing Columns
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Adding Columns</h3>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>1. Click on a table to select it</li>
                    <li>
                      2. Look for the <strong>"+ Add Column"</strong> button
                      inside the table
                    </li>
                    <li>3. Click to add a new column</li>
                    <li>4. The column appears with a default name and type</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Column Properties
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Each column has multiple properties you can configure:
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">Basic Properties</h4>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>
                          • <strong>Name:</strong> The column identifier (e.g.,
                          "user_id", "email", "created_at")
                        </li>
                        <li>
                          • <strong>Data Type:</strong> The type of data stored
                          (VARCHAR, INTEGER, TIMESTAMP, etc.)
                        </li>
                        <li>
                          • <strong>Comment:</strong> Optional documentation for
                          the column's purpose
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">Constraints</h4>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>
                          • <strong>PK (Primary Key):</strong> Uniquely
                          identifies each row in the table
                        </li>
                        <li>
                          • <strong>FK (Foreign Key):</strong> References a
                          column in another table
                        </li>
                        <li>
                          • <strong>NN (Not Null):</strong> Requires a value,
                          cannot be empty
                        </li>
                        <li>
                          • <strong>UQ (Unique):</strong> All values must be
                          unique across rows
                        </li>
                        <li>
                          • <strong>AI (Auto Increment):</strong> Automatically
                          generates sequential numbers
                        </li>
                        <li>
                          • <strong>Unsigned:</strong> Only positive numbers
                          (for numeric types)
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">Default Values</h4>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li>
                          • Set a default value that's used when no value is
                          specified
                        </li>
                        <li>
                          • Examples: "0" for numbers, "'active'" for status,
                          "NOW()" for timestamps
                        </li>
                        <li>• Can be a literal value or database function</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Common Data Types
                  </h3>
                  <div className="grid gap-3 text-sm">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Text Types:</strong> VARCHAR, TEXT, CHAR
                      <p className="text-muted-foreground text-xs mt-1">
                        Use VARCHAR for variable-length strings like names and
                        emails
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Number Types:</strong> INTEGER, BIGINT, DECIMAL,
                      FLOAT
                      <p className="text-muted-foreground text-xs mt-1">
                        Use INTEGER for whole numbers, DECIMAL for precise
                        decimals
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Date/Time Types:</strong> DATE, TIME, TIMESTAMP,
                      DATETIME
                      <p className="text-muted-foreground text-xs mt-1">
                        Use TIMESTAMP for created_at/updated_at fields
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Boolean:</strong> BOOLEAN, TINYINT(1)
                      <p className="text-muted-foreground text-xs mt-1">
                        Use for true/false flags like is_active, is_verified
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Other:</strong> JSON, BLOB, UUID
                      <p className="text-muted-foreground text-xs mt-1">
                        JSON for flexible data, BLOB for binary, UUID for unique
                        identifiers
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Reordering Columns
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • Click and drag the handle icon next to each column
                    </li>
                    <li>• Drop it in the new position within the same table</li>
                    <li>• Order matters for code generation and readability</li>
                    <li>
                      • Best practice: Primary key first, then foreign keys,
                      then data fields
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Deleting Columns
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Hover over a column to reveal the delete icon</li>
                    <li>
                      • Click the delete icon or right-click and select "Delete"
                    </li>
                    <li>
                      • Deleting a foreign key column also removes the
                      relationship
                    </li>
                    <li>
                      • Use undo (Cmd/Ctrl + Z) to restore deleted columns
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Creating Relationships */}
            <section id="relationships" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  5
                </span>
                Creating Relationships
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Understanding Relationships
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Relationships define how tables are connected to each other
                    through foreign keys. They're visualized as lines connecting
                    tables on the canvas.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Creating a Relationship
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    There are multiple ways to create relationships:
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">
                        Method 1: Using the Relation Button
                      </h4>
                      <ol className="space-y-2 text-muted-foreground text-sm">
                        <li>
                          1. Select two tables by holding Shift and clicking
                          each one
                        </li>
                        <li>
                          2. Click the <strong>"Relation"</strong> button in the
                          toolbar
                        </li>
                        <li>
                          3. A dialog appears to configure the relationship
                        </li>
                        <li>4. Select source and target columns</li>
                        <li>
                          5. Choose relationship type and referential actions
                        </li>
                        <li>6. Click "Create" to establish the relationship</li>
                      </ol>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">
                        Method 2: Drag from Column
                      </h4>
                      <ol className="space-y-2 text-muted-foreground text-sm">
                        <li>1. Hover over a column in the source table</li>
                        <li>2. Look for the link icon that appears</li>
                        <li>
                          3. Click and drag from the icon to a column in another
                          table
                        </li>
                        <li>4. Release to create an automatic relationship</li>
                      </ol>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">
                        Method 3: Context Menu
                      </h4>
                      <ol className="space-y-2 text-muted-foreground text-sm">
                        <li>1. Right-click on a table</li>
                        <li>2. Select "Create Relationship"</li>
                        <li>3. Follow the dialog prompts</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Relationship Types
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="text-blue-500">1:1</span> One-to-One
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Each row in Table A relates to exactly one row in Table
                        B, and vice versa.
                      </p>
                      <p className="text-muted-foreground text-xs mt-2">
                        Example: User ↔ Profile (each user has one profile)
                      </p>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="text-green-500">1:N</span> One-to-Many
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Each row in Table A can relate to multiple rows in Table
                        B, but each row in Table B relates to only one row in
                        Table A.
                      </p>
                      <p className="text-muted-foreground text-xs mt-2">
                        Example: Author → Books (one author writes many books)
                      </p>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="text-purple-500">N:M</span>{" "}
                        Many-to-Many
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Multiple rows in Table A can relate to multiple rows in
                        Table B, and vice versa. Usually implemented with a
                        junction table.
                      </p>
                      <p className="text-muted-foreground text-xs mt-2">
                        Example: Students ↔ Courses (students take many
                        courses, courses have many students)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Referential Actions
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Define what happens when the referenced row is updated or
                    deleted:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>CASCADE:</strong> Automatically update/delete
                      related rows
                      <p className="text-muted-foreground text-xs mt-1">
                        Deleting a user also deletes all their posts
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>SET NULL:</strong> Set foreign key to NULL
                      <p className="text-muted-foreground text-xs mt-1">
                        Deleting a category sets post.category_id to NULL
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>RESTRICT:</strong> Prevent the action if related
                      rows exist
                      <p className="text-muted-foreground text-xs mt-1">
                        Cannot delete a user if they have posts
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>NO ACTION:</strong> Similar to RESTRICT
                      (database-specific behavior)
                      <p className="text-muted-foreground text-xs mt-1">
                        Depends on database implementation
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Editing Relationships
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Click on a relationship line to select it</li>
                    <li>• Right-click for options: Edit, Delete</li>
                    <li>
                      • Edit to change relationship type or referential actions
                    </li>
                    <li>
                      • Visual indicators show relationship type (line style
                      varies)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Deleting Relationships
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Click on a relationship line to select it</li>
                    <li>• Press Delete or Backspace key</li>
                    <li>
                      • Or right-click and select "Delete" from context menu
                    </li>
                    <li>
                      • This removes the visual connection and foreign key
                      constraint
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Using Areas */}
            <section id="areas" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  6
                </span>
                Using Areas
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    What are Areas?
                  </h3>
                  <p className="text-muted-foreground">
                    Areas are colored rectangular regions that help you visually
                    organize and group related tables. They're purely visual
                    elements that don't affect the exported SQL but greatly
                    improve schema readability.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Creating an Area
                  </h3>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      1. Click the <strong>"Area"</strong> button in the toolbar
                    </li>
                    <li>2. A colored rectangle appears on the canvas</li>
                    <li>
                      3. The area appears behind tables (in the background
                      layer)
                    </li>
                    <li>
                      4. Drag it to position and resize using the corner handles
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Area Properties
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Title:</strong> Give your area a descriptive
                      name (e.g., "User Management", "E-commerce")
                    </li>
                    <li>
                      • <strong>Color:</strong> Choose from preset colors or
                      customize with any hex color
                    </li>
                    <li>
                      • <strong>Size:</strong> Resize by dragging corner handles
                      to encompass related tables
                    </li>
                    <li>
                      • <strong>Position:</strong> Move by clicking and dragging
                      the title bar
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Common Use Cases
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Domain Grouping:</strong> Group tables by business
                      domain
                      <p className="text-muted-foreground text-xs mt-1">
                        Example: Authentication area, Payment area, Analytics
                        area
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Module Organization:</strong> Organize by
                      application modules
                      <p className="text-muted-foreground text-xs mt-1">
                        Example: Admin module, API module, Frontend module
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Stage Marking:</strong> Indicate implementation
                      stages
                      <p className="text-muted-foreground text-xs mt-1">
                        Example: MVP (green), Phase 2 (blue), Future (gray)
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Team Assignment:</strong> Show ownership
                      <p className="text-muted-foreground text-xs mt-1">
                        Example: Team A (red), Team B (blue)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Working with Areas
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • Areas stay in the background - tables always appear on
                      top
                    </li>
                    <li>
                      • Multiple areas can overlap for complex categorization
                    </li>
                    <li>
                      • Areas are saved with your diagram and visible to
                      collaborators
                    </li>
                    <li>
                      • Use semi-transparent colors for better table visibility
                    </li>
                    <li>
                      • Consider using consistent colors across projects for
                      similar domains
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Deleting Areas</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Click on an area to select it</li>
                    <li>• Press Delete or Backspace key</li>
                    <li>
                      • Or right-click and select "Delete" from context menu
                    </li>
                    <li>
                      • Deleting an area doesn't affect the tables inside it
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Adding Notes */}
            <section id="notes" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  7
                </span>
                Adding Notes
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    What are Notes?
                  </h3>
                  <p className="text-muted-foreground">
                    Notes are sticky note-style annotations you can place
                    anywhere on the canvas to document design decisions, add
                    reminders, or explain complex relationships. They support
                    rich text formatting.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Creating a Note
                  </h3>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      1. Click the <strong>"Note"</strong> button in the toolbar
                    </li>
                    <li>2. A colored note appears on the canvas</li>
                    <li>3. Click inside to start typing your content</li>
                    <li>4. The note automatically saves as you type</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Note Features</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Rich Text:</strong> Format text with markdown or
                      plain text
                    </li>
                    <li>
                      • <strong>Colors:</strong> Choose from multiple pastel
                      colors to categorize notes
                    </li>
                    <li>
                      • <strong>Resizable:</strong> Drag corners to adjust width
                      and height
                    </li>
                    <li>
                      • <strong>Moveable:</strong> Click and drag to reposition
                      anywhere on canvas
                    </li>
                    <li>
                      • <strong>Connections:</strong> Optionally connect a note
                      to a specific table
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Best Practices for Notes
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Document Decisions:</strong>
                      <p className="text-muted-foreground text-xs mt-1">
                        "Using UUID instead of auto-increment for distributed
                        system compatibility"
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Migration Reminders:</strong>
                      <p className="text-muted-foreground text-xs mt-1">
                        "TODO: Add index on email column before production
                        deployment"
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Business Rules:</strong>
                      <p className="text-muted-foreground text-xs mt-1">
                        "Order status must be 'pending' → 'processing' →
                        'completed'"
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Performance Notes:</strong>
                      <p className="text-muted-foreground text-xs mt-1">
                        "This table will have 100M+ rows - ensure proper
                        indexing strategy"
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Team Communication:</strong>
                      <p className="text-muted-foreground text-xs mt-1">
                        "Discussed with backend team - need to add caching layer
                        here"
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Connecting Notes to Tables
                  </h3>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>1. Create or select a note</li>
                    <li>
                      2. Look for the "Connect to table" option in the note's
                      menu
                    </li>
                    <li>3. Select a table from the dropdown</li>
                    <li>
                      4. A visual connector line appears between note and table
                    </li>
                    <li>
                      5. The connection moves with the table when repositioned
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Deleting Notes</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Click on a note to select it</li>
                    <li>• Press Delete or Backspace key</li>
                    <li>
                      • Or right-click and select "Delete" from context menu
                    </li>
                    <li>• Notes don't affect exported SQL code</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Code Editor Mode */}
            <section id="code-mode" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  8
                </span>
                Code Editor Mode
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Overview</h3>
                  <p className="text-muted-foreground">
                    The code editor lets you work with your schema in text
                    format using SQL or DBML. Changes in the code editor
                    instantly sync with the visual canvas, and vice versa.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Accessing the Code Editor
                  </h3>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>1. Open the left sidebar if it's closed</li>
                    <li>
                      2. Switch to <strong>"Code View"</strong> using the view
                      selector or View menu
                    </li>
                    <li>
                      3. Choose between <strong>SQL</strong> or{" "}
                      <strong>DBML</strong> tabs
                    </li>
                    <li>4. The current schema appears as editable code</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">SQL Mode</h3>
                  <p className="text-muted-foreground mb-3">
                    View and edit your schema as SQL CREATE TABLE statements.
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • Full syntax highlighting for SQL keywords and
                      identifiers
                    </li>
                    <li>• Auto-completion for table and column names</li>
                    <li>• Real-time parsing and validation</li>
                    <li>• Errors highlighted inline with helpful messages</li>
                    <li>• Supports PostgreSQL, MySQL, SQLite syntax</li>
                  </ul>

                  <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
                    <h4 className="font-semibold mb-2 text-sm">Example SQL:</h4>
                    <pre className="text-xs text-muted-foreground overflow-x-auto">
                      {`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">DBML Mode</h3>
                  <p className="text-muted-foreground mb-3">
                    View and edit your schema using Database Markup Language
                    (DBML) - a simpler, more readable syntax designed
                    specifically for database documentation.
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Cleaner, more concise syntax than SQL</li>
                    <li>• Easier to read and maintain</li>
                    <li>• Built-in relationship syntax</li>
                    <li>• Supports notes and documentation inline</li>
                    <li>• Can be converted to any SQL dialect</li>
                  </ul>

                  <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
                    <h4 className="font-semibold mb-2 text-sm">
                      Example DBML:
                    </h4>
                    <pre className="text-xs text-muted-foreground overflow-x-auto">
                      {`Table users {
  id integer [pk, increment]
  email varchar(255) [not null, unique]
  username varchar(100) [not null]
  created_at timestamp [default: \`now()\`]
  
  Note: 'Stores user account information'
}

Table posts {
  id integer [pk, increment]
  user_id integer [not null, ref: > users.id]
  title varchar(255) [not null]
  content text
}

Ref: posts.user_id > users.id [delete: cascade]`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Editing Code</h3>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>1. Click in the code editor to start editing</li>
                    <li>
                      2. Make your changes using proper SQL or DBML syntax
                    </li>
                    <li>
                      3. The visual canvas updates automatically as you type
                    </li>
                    <li>
                      4. Syntax errors are highlighted with error messages
                    </li>
                    <li>
                      5. Press <strong>Cmd/Ctrl + S</strong> to manually save
                      (auto-save is enabled)
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Importing Existing Schemas
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Paste your existing database schema code to visualize it:
                  </p>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>1. Switch to code editor (SQL or DBML)</li>
                    <li>
                      2. Select all existing code (Cmd/Ctrl + A) and delete it
                    </li>
                    <li>3. Paste your schema code</li>
                    <li>
                      4. The parser automatically converts it to visual diagrams
                    </li>
                    <li>
                      5. Tables, relationships, and constraints appear on canvas
                    </li>
                    <li>6. Any errors are flagged in the Issues panel</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Code Editor Features
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Syntax Highlighting:</strong> Different colors
                      for keywords, strings, comments
                    </li>
                    <li>
                      • <strong>Line Numbers:</strong> Easy reference and
                      navigation
                    </li>
                    <li>
                      • <strong>Auto-Indentation:</strong> Keeps code properly
                      formatted
                    </li>
                    <li>
                      • <strong>Bracket Matching:</strong> Highlights matching
                      parentheses and braces
                    </li>
                    <li>
                      • <strong>Find & Replace:</strong> Press Cmd/Ctrl + F to
                      search code
                    </li>
                    <li>
                      • <strong>Multi-cursor:</strong> Hold Alt/Option and click
                      to add cursors
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Navigation & Search */}
            <section id="navigation" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  9
                </span>
                Navigation & Search
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Command Palette
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    The command palette provides quick access to all actions and
                    a powerful search interface.
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • Press <strong>Cmd/Ctrl + K</strong> to open the command
                      palette
                    </li>
                    <li>
                      • Press <strong>?</strong> key to open help dialog
                    </li>
                    <li>
                      • Type to search tables, columns, areas, relationships,
                      and notes
                    </li>
                    <li>• Execute quick actions without leaving keyboard</li>
                    <li>• Navigate to any element instantly</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Searching Elements
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Find any element in your schema quickly:
                  </p>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>1. Open command palette (Cmd/Ctrl + K)</li>
                    <li>2. Start typing the name of what you're looking for</li>
                    <li>3. Results appear instantly, grouped by type</li>
                    <li>4. Use arrow keys to navigate results</li>
                    <li>5. Press Enter to jump to the selected element</li>
                    <li>
                      6. The canvas pans automatically to show the element
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Quick Actions in Command Palette
                  </h3>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2">
                      <Plus className="h-4 w-4 text-primary" />
                      <span>Add Table / Area / Note</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2">
                      <ZoomIn className="h-4 w-4 text-primary" />
                      <span>Zoom In / Out / Fit</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2">
                      <Grid3x3 className="h-4 w-4 text-primary" />
                      <span>Toggle Grid / Snap</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2">
                      <AlignLeft className="h-4 w-4 text-primary" />
                      <span>Align Selected Elements</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2">
                      <Save className="h-4 w-4 text-primary" />
                      <span>Save Diagram</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Canvas Navigation
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Pan:</strong> Click and drag on empty space
                    </li>
                    <li>
                      • <strong>Zoom:</strong> Mouse wheel or trackpad pinch
                      gesture
                    </li>
                    <li>
                      • <strong>Zoom to Fit:</strong> Click zoom fit button or
                      use command palette
                    </li>
                    <li>
                      • <strong>Zoom to Selection:</strong> Select elements and
                      use zoom to selection
                    </li>
                    <li>
                      • <strong>Reset View:</strong> Press zoom reset button to
                      return to 100%
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Minimap</h3>
                  <p className="text-muted-foreground mb-3">
                    A miniature overview of your entire schema appears in the
                    bottom-right corner.
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Shows all tables and areas as small rectangles</li>
                    <li>
                      • Indicates your current viewport with a highlighted box
                    </li>
                    <li>
                      • Click anywhere on minimap to jump to that location
                    </li>
                    <li>• Drag the viewport box to pan around</li>
                    <li>
                      • Especially useful for large schemas with many tables
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Left Sidebar Navigation
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    The sidebar provides a structured view of your entire
                    schema.
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Tables Tab:</strong> Hierarchical tree of all
                      tables and their columns
                    </li>
                    <li>
                      • Click any table or column to navigate to it on canvas
                    </li>
                    <li>• Expand/collapse tables to show/hide their columns</li>
                    <li>
                      • Visual indicators for primary keys, foreign keys, and
                      indexes
                    </li>
                    <li>• Quick access to table and column properties</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Focus Mode</h3>
                  <p className="text-muted-foreground mb-3">
                    Temporarily highlight specific tables and dim everything
                    else:
                  </p>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>1. Select one or more tables</li>
                    <li>
                      2. Right-click and choose "Focus" or use focus keyboard
                      shortcut
                    </li>
                    <li>3. Selected tables remain at full opacity</li>
                    <li>4. All other tables become semi-transparent</li>
                    <li>
                      5. Press Escape or click "Exit Focus" to return to normal
                      view
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Export & Import */}
            <section id="export-import" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  10
                </span>
                Export & Import
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Exporting Your Schema
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Export your schema in multiple formats for use in different
                    databases and tools.
                  </p>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      1. Click <strong>File → Export</strong> in the toolbar
                    </li>
                    <li>2. Choose your target format from the dropdown</li>
                    <li>3. The code is generated instantly</li>
                    <li>4. Click "Copy to Clipboard" or "Download File"</li>
                    <li>
                      5. Use the exported code in your database management tool
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Supported Export Formats
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">PostgreSQL</h4>
                      <p className="text-muted-foreground text-sm">
                        CREATE TABLE statements compatible with PostgreSQL
                        syntax. Includes SERIAL types, array columns, and
                        PostgreSQL-specific features.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">MySQL</h4>
                      <p className="text-muted-foreground text-sm">
                        MySQL-compatible syntax with AUTO_INCREMENT, engine
                        specifications, and character set definitions.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">SQLite</h4>
                      <p className="text-muted-foreground text-sm">
                        Lightweight SQLite syntax perfect for mobile apps and
                        small databases. Includes AUTOINCREMENT and WITHOUT
                        ROWID support.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">SQL Server (T-SQL)</h4>
                      <p className="text-muted-foreground text-sm">
                        Microsoft SQL Server syntax with IDENTITY columns,
                        schemas, and T-SQL specific constructs.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">Oracle</h4>
                      <p className="text-muted-foreground text-sm">
                        Oracle Database syntax with sequences for auto-increment
                        and Oracle-specific data types.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">DBML</h4>
                      <p className="text-muted-foreground text-sm">
                        Database Markup Language format for documentation and
                        sharing. Platform-agnostic and human-readable.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Importing Schemas
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Import existing database schemas from SQL or DBML files:
                  </p>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      1. Click <strong>File → Import</strong> in the toolbar
                    </li>
                    <li>2. Select a .sql or .dbml file from your computer</li>
                    <li>3. The parser analyzes the file structure</li>
                    <li>4. Tables are automatically created on the canvas</li>
                    <li>5. Relationships are detected and visualized</li>
                    <li>6. Any parsing errors appear in the Issues panel</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    JSON Export/Import
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Save your entire diagram with all visual elements (tables,
                    areas, notes, positions):
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Export JSON:</strong> File → Export JSON - saves
                      complete diagram state
                    </li>
                    <li>
                      • <strong>Import JSON:</strong> File → Import JSON -
                      restores exact diagram layout
                    </li>
                    <li>
                      • Preserves table positions, colors, areas, notes, camera
                      position
                    </li>
                    <li>
                      • Perfect for sharing full diagram files with team members
                    </li>
                    <li>
                      • Can be version controlled in Git for collaboration
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Export Options</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Include DROP statements:</strong> Add DROP TABLE
                      IF EXISTS before CREATE
                    </li>
                    <li>
                      • <strong>Include comments:</strong> Export table and
                      column comments as SQL comments
                    </li>
                    <li>
                      • <strong>Schema prefix:</strong> Add schema/database name
                      prefix to table names
                    </li>
                    <li>
                      • <strong>Formatting:</strong> Choose between compact or
                      formatted/indented output
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    What Gets Exported
                  </h3>
                  <div className="grid gap-3 text-sm">
                    <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                      <strong className="text-green-600 dark:text-green-400">
                        ✓ Included in SQL Export:
                      </strong>
                      <ul className="mt-2 space-y-1 text-muted-foreground text-xs ml-4">
                        <li>• Table definitions with all columns</li>
                        <li>
                          • Data types and constraints (PK, FK, NOT NULL,
                          UNIQUE, etc.)
                        </li>
                        <li>
                          • Foreign key relationships with referential actions
                        </li>
                        <li>• Default values and auto-increment settings</li>
                        <li>• Table and column comments/notes</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
                      <strong className="text-yellow-600 dark:text-yellow-400">
                        ○ Not Included in SQL Export:
                      </strong>
                      <ul className="mt-2 space-y-1 text-muted-foreground text-xs ml-4">
                        <li>
                          • Visual elements (table positions, areas, sticky
                          notes)
                        </li>
                        <li>• Canvas layout and zoom level</li>
                        <li>• Color assignments</li>
                      </ul>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Use JSON export to preserve visual elements
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Using Templates */}
            <section id="templates" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  11
                </span>
                Using Templates
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    What are Templates?
                  </h3>
                  <p className="text-muted-foreground">
                    Templates are pre-built database schemas for common use
                    cases. They provide a starting point that you can customize
                    for your specific needs, saving hours of design work.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Accessing Templates
                  </h3>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>1. Open the left sidebar</li>
                    <li>
                      2. Click the <strong>"Templates"</strong> tab
                    </li>
                    <li>3. Browse available templates by category</li>
                    <li>4. Click on a template to preview its structure</li>
                    <li>
                      5. Click "Use Template" to load it into your diagram
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Available Template Categories
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>E-commerce:</strong> Online store with products,
                      orders, customers, and payments
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Social Network:</strong> Users, posts, comments,
                      likes, and follows
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Blog/CMS:</strong> Articles, authors, categories,
                      and tags
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Project Management:</strong> Projects, tasks,
                      teams, and milestones
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Authentication:</strong> Users, roles,
                      permissions, and sessions
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>SaaS:</strong> Multi-tenant with organizations,
                      subscriptions, and billing
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Educational:</strong> Students, courses,
                      enrollments, and grades
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <strong>Healthcare:</strong> Patients, appointments,
                      medications, and records
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Customizing Templates
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Once you load a template, you can modify it freely:
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Add or remove tables as needed</li>
                    <li>• Modify column names and data types</li>
                    <li>• Add new relationships or remove existing ones</li>
                    <li>• Adjust table positions and visual layout</li>
                    <li>• Add areas and notes for documentation</li>
                    <li>• Export in your target database format</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Merging Templates
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Combine multiple templates to create complex schemas:
                  </p>
                  <ol className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      1. Start with your base template or existing diagram
                    </li>
                    <li>
                      2. Load another template - it adds to existing tables
                    </li>
                    <li>3. Connect the two schemas with new relationships</li>
                    <li>
                      4. Example: Combine "Authentication" + "E-commerce"
                      templates
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Best Practices with Templates
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Review the entire template before making changes</li>
                    <li>
                      • Understand the relationships and why they're structured
                      that way
                    </li>
                    <li>• Keep template naming conventions for consistency</li>
                    <li>
                      • Add timestamps (created_at, updated_at) if not included
                    </li>
                    <li>
                      • Consider soft deletes (deleted_at) for data retention
                    </li>
                    <li>
                      • Adjust data types for your specific scale requirements
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Keyboard Shortcuts */}
            <section id="keyboard" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  12
                </span>
                Keyboard Shortcuts
              </h2>

              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Master these keyboard shortcuts to work faster and more
                  efficiently.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">General</h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Open Command Palette / Help</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Cmd/Ctrl + K
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Quick Help</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          ?
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Save Diagram</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Cmd/Ctrl + S
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Clear Selection</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Esc
                        </kbd>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Editing</h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Undo</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Cmd/Ctrl + Z
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Redo</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Cmd/Ctrl + Shift + Z
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Copy Selected</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Cmd/Ctrl + C
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Paste</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Cmd/Ctrl + V
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Delete Selected</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Delete / Backspace
                        </kbd>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Selection</h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Multi-Select (add to selection)</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Shift + Click
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Box Select</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Click + Drag
                        </kbd>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Movement</h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Nudge Selected (1px)</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Arrow Keys
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Nudge Selected (10px)</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Shift + Arrow Keys
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Pan Canvas</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Click + Drag (empty space)
                        </kbd>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">View</h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Zoom In/Out</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Mouse Wheel
                        </kbd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                        <span>Zoom with Trackpad</span>
                        <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                          Pinch Gesture
                        </kbd>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">💡 Pro Tip:</strong>{" "}
                    Press{" "}
                    <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">
                      ?
                    </kbd>{" "}
                    anytime to see a complete list of keyboard shortcuts in a
                    helpful dialog.
                  </p>
                </div>
              </div>
            </section>

            {/* Tips & Best Practices */}
            <section id="tips" className="mb-16 scroll-mt-20">
              <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  13
                </span>
                Tips & Best Practices
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Schema Design Principles
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">
                        1. Normalize Your Data
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Avoid redundant data by properly organizing tables. Each
                        piece of information should be stored in only one place.
                        Use foreign keys to link related data.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">
                        2. Use Meaningful Names
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Table and column names should be descriptive and follow
                        a consistent naming convention. Use snake_case or
                        camelCase consistently throughout your schema.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">
                        3. Always Add Indexes
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Primary keys are automatically indexed, but add indexes
                        on foreign keys and frequently searched columns for
                        better query performance.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">
                        4. Include Timestamps
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Add created_at and updated_at columns to most tables.
                        They're invaluable for debugging, auditing, and sorting
                        records.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h4 className="font-semibold mb-2">
                        5. Consider Soft Deletes
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Instead of hard deletes, add a deleted_at column. This
                        allows data recovery and maintains referential integrity
                        for historical records.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Visual Organization Tips
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>Group related tables:</strong> Use areas to
                      visually organize tables by domain or module
                    </li>
                    <li>
                      • <strong>Keep it clean:</strong> Don't overcrowd the
                      canvas - use multiple diagrams for large systems
                    </li>
                    <li>
                      • <strong>Consistent positioning:</strong> Place related
                      tables near each other, parent tables above children
                    </li>
                    <li>
                      • <strong>Color coding:</strong> Use table colors to
                      indicate table types (core, auxiliary, historical)
                    </li>
                    <li>
                      • <strong>Minimize crossing lines:</strong> Arrange tables
                      to reduce relationship line crossings
                    </li>
                    <li>
                      • <strong>Use notes liberally:</strong> Document complex
                      business rules and design decisions
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Performance Considerations
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • Use appropriate data types - don't use VARCHAR(255) for
                      everything
                    </li>
                    <li>
                      • Add indexes on foreign keys and frequently queried
                      columns
                    </li>
                    <li>
                      • Consider composite indexes for multi-column queries
                    </li>
                    <li>
                      • Use UNIQUE constraints to enforce data integrity at
                      database level
                    </li>
                    <li>
                      • Avoid nullable foreign keys when possible - they
                      complicate queries
                    </li>
                    <li>
                      • Plan for scale - use BIGINT for IDs if you expect
                      millions of records
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Collaboration Best Practices
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Export to JSON regularly for version control</li>
                    <li>
                      • Use consistent naming conventions across your team
                    </li>
                    <li>• Document breaking changes in notes on the canvas</li>
                    <li>• Share workspace with appropriate access levels</li>
                    <li>
                      • Review schema changes before deploying to production
                    </li>
                    <li>• Use templates as starting points for new features</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Common Mistakes to Avoid
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                      <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
                        ❌ Missing Constraints
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Always define NOT NULL, UNIQUE, and foreign key
                        constraints. Don't rely on application logic alone -
                        enforce rules at the database level.
                      </p>
                    </div>
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                      <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
                        ❌ Poor Naming
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Avoid generic names like "data", "value", "type". Be
                        specific. Instead of "status", use "order_status" or
                        "payment_status".
                      </p>
                    </div>
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                      <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
                        ❌ Missing Relationships
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Don't just add foreign key columns - define the actual
                        relationship with proper referential actions (CASCADE,
                        SET NULL, etc.).
                      </p>
                    </div>
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                      <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
                        ❌ Over-Engineering
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Don't create 50 tables for an MVP. Start simple and
                        refactor as you learn your actual requirements.
                        Premature optimization is real.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Workflow Recommendations
                  </h3>
                  <ol className="space-y-3 text-muted-foreground text-sm">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        1
                      </span>
                      <span>
                        <strong>Start with core entities:</strong> Identify your
                        main business objects (users, products, orders)
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        2
                      </span>
                      <span>
                        <strong>Add relationships:</strong> Connect tables with
                        proper foreign keys
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        3
                      </span>
                      <span>
                        <strong>Refine data types:</strong> Choose appropriate
                        types and add constraints
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        4
                      </span>
                      <span>
                        <strong>Add auxiliary tables:</strong> Supporting tables
                        for lookups, many-to-many, etc.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        5
                      </span>
                      <span>
                        <strong>Review and document:</strong> Check for issues,
                        add notes, organize visually
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        6
                      </span>
                      <span>
                        <strong>Export and test:</strong> Generate SQL and test
                        in your target database
                      </span>
                    </li>
                  </ol>
                </div>

                <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-6">
                  <h3 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-400">
                    🎯 Quick Wins for Better Schemas
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      ✓ Always use primary keys (even if you think you don't
                      need them)
                    </li>
                    <li>
                      ✓ Add created_at/updated_at timestamps to every table
                    </li>
                    <li>
                      ✓ Use UUID for distributed systems, auto-increment for
                      simple ones
                    </li>
                    <li>
                      ✓ Plural table names (users, not user) or singular - pick
                      one and be consistent
                    </li>
                    <li>
                      ✓ Foreign key columns should match their reference:
                      user_id → users.id
                    </li>
                    <li>
                      ✓ Add comments to complex columns explaining their purpose
                    </li>
                    <li>
                      ✓ Review the Issues panel before exporting - fix all
                      warnings
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-20 rounded-lg border border-border bg-panel p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Still have questions? Check out our FAQ section or reach out to
                our support team. We're here to help you create amazing database
                schemas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  <Link href="/#faqs">View FAQ</Link>
                </Button>
                <Button>
                  <a href="mailto:support@example.com">Contact Support</a>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
