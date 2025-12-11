import { ModeToggle } from "@/components/general/modeToggle";
import { Logo2 } from "@/components/uiAssets/logo2";
import { DiagramSelector } from "./diagramSelector";
import { DiagramCloudStatus } from "./diagramCloudStatus";
import { DivideY } from "@/components/general/divideY";
import Members from "@/components/general/members";

const TopMainNavbar = () => {
  return (
    <div className="w-full h-[7vh] flex items-center justify-center">
      <DesktopDiv />
    </div>
  );
};

export default TopMainNavbar;

const DesktopDiv = () => {
  return (
    <div className="hidden items-center justify-between px-4 md:flex w-full">
      <div className="flex items-center  justify-start gap-3">
        <Logo2 />
        <DivideY className="ml-2.5" />
        <DiagramSelector />
        <DiagramCloudStatus />
      </div>
      <div className="flex items-center  justify-start gap-3">
        <ModeToggle />
        <Members />
      </div>
    </div>
  );
};
