import { ModeToggle } from "@/components/general/modeToggle";
import { Logo2 } from "@/components/uiAssets/logo2";
import { DiagramSelector } from "./diagramSelector";

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
      <Logo2 />
      <DiagramSelector />
      <ModeToggle />
    </div>
  );
};
