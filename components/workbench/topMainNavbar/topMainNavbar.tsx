"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/general/modeToggle";
import { Logo2 } from "@/components/uiAssets/logo2";
import { DiagramSelector } from "./diagramSelector";
import { DiagramCloudStatus } from "./diagramCloudStatus";
import { DivideY } from "@/components/general/divideY";
import Members from "@/components/general/members";
import { HamburgerIcon } from "@/components/uiAssets/hamburgerIcon";
import { CloseIcon } from "@/components/uiAssets/closeIcon";

const TopMainNavbar = () => {
  return (
    <div className="w-full h-[7vh] flex items-center justify-center">
      <DesktopDiv />
      <MobileDiv />
    </div>
  );
};

export default TopMainNavbar;

const DesktopDiv = () => {
  return (
    <div className="hidden items-center justify-between px-4 md:flex w-full">
      <div className="flex items-center justify-start gap-3">
        <Logo2 />
        <DivideY className="ml-2.5" />
        <DiagramSelector />
        <DiagramCloudStatus />
      </div>
      <div className="flex items-center justify-start gap-3">
        <ModeToggle />
        <Members />
      </div>
    </div>
  );
};

export const MobileDiv = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar (mobile only) */}
      <div className="flex items-center justify-between px-3 py-2 md:hidden w-full bg-white dark:bg-neutral-900">
        <div className="flex items-center gap-3">
          <Logo2 />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex size-7 items-center justify-center rounded-md"
          aria-label="Open menu"
        >
          <HamburgerIcon className="size-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Overlay menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-900 md:hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-300 dark:border-neutral-800">
            <Logo2 />

            <button
              onClick={() => setOpen(false)}
              className="flex size-7 items-center justify-center rounded-md"
              aria-label="Close menu"
            >
              <CloseIcon className="size-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-6 px-4 py-6">
            {/* Diagram Section */}
            <div className="flex flex-col gap-3">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Diagram
              </div>

              <DiagramSelector />
              <DiagramCloudStatus />
            </div>

            {/* Members Section */}
            <div className="flex flex-col gap-3">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Members
              </div>

              <Members />
            </div>
          </div>

          {/* Bottom ModeToggle */}
          <div className="absolute bottom-4 right-4">
            <ModeToggle />
          </div>
        </div>
      )}
    </>
  );
};
