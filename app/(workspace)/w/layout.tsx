export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full overflow-hidden">
      <nav style={{ backgroundColor: "red", width: "100%", height: "10vh" }}>
        workspace nav
      </nav>
      {children}
    </section>
  );
}
