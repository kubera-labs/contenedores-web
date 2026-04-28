"use client";

import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
import type { ReactNode } from "react";

function AdminFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="rounded-xl border p-10 text-center max-w-lg mx-auto mt-16"
      style={{ borderColor: "var(--border)", background: "var(--background)" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
        style={{ background: "#FEF2F2" }}
      >
        ⚠
      </div>
      <h2
        className="font-semibold text-base mb-1"
        style={{ color: "var(--foreground)" }}
      >
        Algo salió mal
      </h2>
      <p
        className="text-sm mb-6 leading-relaxed"
        style={{ color: "var(--foreground-secondary)" }}
      >
        {(error instanceof Error ? error.message : String(error)) || "Ocurrió un error inesperado en este panel."}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-5 py-2 rounded-lg text-sm font-semibold text-white"
        style={{ background: "#2563EB" }}
      >
        Reintentar
      </button>
    </div>
  );
}

export function AdminErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={AdminFallback}>
      {children}
    </ErrorBoundary>
  );
}
