import { Navbar } from "@/components/general/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full">
      <Navbar />
      {children}
    </section>
  );
}
