"use client";

import { DivideX } from "@/components/general/divideX";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Toolbar from "@/components/workbench/toolbar/toolbar";

const Workspace = () => {
  return (
    <div className="">
      <Toolbar />
      <DivideX />
      <ResizablePanelGroup direction="horizontal">
        <>
          <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
            <div>left sidevar here</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
        </>
        <ResizablePanel defaultSize={80} minSize={50}>
          <div>Canvas here</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Workspace;
