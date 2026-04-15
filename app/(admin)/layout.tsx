export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Admin shell — placeholder */}
      <aside className="fixed top-0 left-0 bottom-0 w-60 bg-background border-r border-border hidden lg:block">
        <div className="p-5 border-b border-border">
          <p className="font-bold text-sm">Panel Admin</p>
        </div>
        <nav className="p-4">
          <p className="text-xs text-foreground-muted">Menú próximamente</p>
        </nav>
      </aside>
      <main className="lg:ml-60 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
