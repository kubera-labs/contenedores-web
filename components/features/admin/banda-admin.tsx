"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  QuickUpload,
  useMediaLibrary,
  UsageBar,
} from "@/components/features/admin/media-library";

export function BandaAdminEditor() {
  const { state, loading, refresh } = useMediaLibrary();
  const [, setRefreshKey] = useState(0);

  const handleUploaded = () => {
    setRefreshKey((k) => k + 1);
    refresh();
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Banda infinita de im&aacute;genes
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--foreground-secondary)" }}>
          El strip animado que aparece bajo el hero muestra{" "}
          <strong>todas las im&aacute;genes de la Galer&iacute;a de medios</strong> autom&aacute;ticamente.
          Sub&iacute; im&aacute;genes ac&aacute; o administr&aacute; la colecci&oacute;n completa desde la galer&iacute;a central.
        </p>
      </div>

      {/* Info card + link */}
      <div
        className="rounded-xl border p-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{ borderColor: "#BFDBFE", background: "#EFF6FF" }}
      >
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: "#1E40AF" }}>
            Fuente: Galer&iacute;a de medios central
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#3B82F6" }}>
            Cualquier imagen en la galer&iacute;a de medios aparece en el strip. Para eliminar
            im&aacute;genes, us&aacute; la galer&iacute;a central.
          </p>
        </div>
        <Link
          href="/admin/media"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
          style={{ background: "#2563EB" }}
        >
          Gestionar galer&iacute;a &rarr;
        </Link>
      </div>

      {/* Storage summary */}
      <div
        className="rounded-xl border p-5 mb-6"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <UsageBar used={state.totalBytes} max={state.maxBytes} />
        <p className="mt-2 text-xs" style={{ color: "var(--foreground-muted)" }}>
          {state.files.length} imagen{state.files.length !== 1 ? "es" : ""} en la galer&iacute;a de medios
        </p>
      </div>

      {/* Quick upload */}
      <div className="mb-6">
        <p
          className="text-xs font-semibold uppercase tracking-wide mb-3"
          style={{ color: "var(--foreground-secondary)" }}
        >
          Subida r&aacute;pida
        </p>
        <QuickUpload onUploaded={handleUploaded} inputId="banda-quick-upload" />
      </div>

      {/* Preview grid */}
      <div
        className="rounded-xl border p-6"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-wide mb-5"
          style={{ color: "var(--foreground-secondary)" }}
        >
          Im&aacute;genes en el strip{" "}
          <span
            className="ml-1 px-1.5 py-0.5 rounded font-normal"
            style={{ background: "var(--background-tertiary)", color: "var(--foreground-muted)" }}
          >
            {state.files.length}
          </span>
        </p>

        {loading ? (
          <p className="text-sm py-8 text-center" style={{ color: "var(--foreground-muted)" }}>
            Cargando&hellip;
          </p>
        ) : state.files.length === 0 ? (
          <p className="text-sm py-8 text-center" style={{ color: "var(--foreground-muted)" }}>
            No hay im&aacute;genes todav&iacute;a. Sub&iacute; la primera usando la zona de arriba.
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {state.files.map((file) => (
              <div
                key={file.name}
                className="relative overflow-hidden rounded-lg"
                style={{ aspectRatio: "4/3", background: "#111" }}
              >
                <Image
                  src={file.src}
                  alt={file.name}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </div>
            ))}
          </div>
        )}

        {state.files.length > 0 && (
          <div className="mt-5 flex justify-end">
            <Link
              href="/admin/media"
              className="text-xs font-semibold hover:underline"
              style={{ color: "#2563EB" }}
            >
              Administrar todas las im&aacute;genes &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}