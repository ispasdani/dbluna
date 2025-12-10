import { DivideX } from "@/components/general/divideX";
import TopMainNavbar from "@/components/workbench/topMainNavbar/topMainNavbar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full overflow-hidden">
      <TopMainNavbar />
      <DivideX />
      {children}
    </section>
  );
}
