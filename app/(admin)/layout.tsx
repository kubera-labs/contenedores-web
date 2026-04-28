import { AdminSidebar } from "@/components/features/admin/admin-sidebar";
import { AdminErrorBoundary } from "@/components/providers/admin-error-boundary";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: "var(--background-secondary)" }}>
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 lg:p-8" style={{ marginLeft: "14rem" }}>
        <AdminErrorBoundary>{children}</AdminErrorBoundary>
      </main>
    </div>
  );
}
