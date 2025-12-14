import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

const LeftSidebar = () => {
  return (
    <SidebarProvider>
      <ResizablePanelGroup direction="horizontal" className="h-dvh">
        {/* Left: Sidebar pane */}
        <ResizablePanel defaultSize={18} minSize={14} maxSize={30}>
          <Sidebar />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: Main content pane */}
        <ResizablePanel defaultSize={82} minSize={50}>
          <SidebarInset className="h-full">
            {/* Your header / page content */}
            <div className="p-4">Main content</div>
          </SidebarInset>
        </ResizablePanel>
      </ResizablePanelGroup>
    </SidebarProvider>
  );
};

export default LeftSidebar;
