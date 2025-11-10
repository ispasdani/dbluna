export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full overflow-hidden">
      <nav style={{ backgroundColor: "red", width: "100%", height: "10vh" }}>
        marketing nav
      </nav>
      {children}
    </section>
  );
}
