"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export type MediaFile = { name: string; src: string; size: number };
export type MediaState = { files: MediaFile[]; totalBytes: number; maxBytes: number };

const MAX_BYTES = 500 * 1024 * 1024;

export function fmtBytes(n: number) {
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${n} B`;
}

export function UsageBar({ used, max }: { used: number; max: number }) {
  const pct = Math.min(100, (used / max) * 100);
  const color = pct > 90 ? "#DC2626" : pct > 70 ? "#D97706" : "#16A34A";
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex items-center justify-between text-xs"
        style={{ color: "var(--foreground-secondary)" }}
      >
        <span>Almacenamiento usado</span>
        <span style={{ fontWeight: 600 }}>
          {fmtBytes(used)} / {fmtBytes(max)}
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: 8, background: "var(--background-tertiary)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   useMediaLibrary — shared logic hook
──────────────────────────────────────────────────── */
export function useMediaLibrary() {
  const [state, setState] = useState<MediaState>({
    files: [],
    totalBytes: 0,
    maxBytes: MAX_BYTES,
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/media");
      if (res.ok) setState(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const uploadFiles = useCallback(
    async (files: FileList | null, inputRef?: React.RefObject<HTMLInputElement | null>) => {
      if (!files || files.length === 0) return;
      setUploadError("");
      setUploading(true);
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/media", { method: "POST", body: form });
        const json = await res.json();
        if (!res.ok) {
          setUploadError(json.error ?? "Error al subir.");
          break;
        }
      }
      setUploading(false);
      await refresh();
      if (inputRef?.current) inputRef.current.value = "";
    },
    [refresh],
  );

  const deleteFile = useCallback(
    async (name: string) => {
      const res = await fetch(`/api/media?file=${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      if (res.ok) await refresh();
      return res.ok;
    },
    [refresh],
  );

  return { state, loading, uploading, uploadError, refresh, uploadFiles, deleteFile };
}

/* ────────────────────────────────────────────────────
   QuickUpload — compact upload zone (banda + gallery)
──────────────────────────────────────────────────── */
export function QuickUpload({
  onUploaded,
  inputId = "quick-upload",
}: {
  onUploaded?: () => void;
  inputId?: string;
}) {
  const { uploading, uploadError, uploadFiles } = useMediaLibrary();
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = async (files: FileList | null) => {
    await uploadFiles(files, inputRef);
    onUploaded?.();
  };

  return (
    <div
      className="rounded-xl border-2 border-dashed p-5 text-center transition-colors"
      style={{ borderColor: "var(--border-strong)", background: "var(--background-secondary)" }}
      onDrop={(e) => {
        e.preventDefault();
        handle(e.dataTransfer.files);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id={inputId}
        accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
        multiple
        className="sr-only"
        onChange={(e) => handle(e.target.files)}
      />
      <label htmlFor={inputId} className="cursor-pointer flex flex-col items-center gap-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold"
          style={{ background: "#DBEAFE", color: "#2563EB" }}
        >
          {uploading ? <span className="animate-spin inline-block">⟳</span> : "↑"}
        </div>
        <div>
          <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
            {uploading ? "Subiendo…" : "Subir imágenes rápido"}
          </span>
          <p className="text-xs mt-0.5" style={{ color: "var(--foreground-muted)" }}>
            Arrastrá o hacé clic · JPEG, PNG, WebP, AVIF · 25 MB máx
          </p>
        </div>
      </label>
      {uploadError && (
        <p className="mt-3 text-xs font-medium" style={{ color: "#DC2626" }}>
          {uploadError}
        </p>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────
   MediaLibrary — página completa de administración
──────────────────────────────────────────────────── */
export function MediaLibrary() {
  const { state, loading, uploading, uploadError, uploadFiles, deleteFile } =
    useMediaLibrary();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    uploadFiles(e.dataTransfer.files, fileInputRef);
  };

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Galería de medios
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--foreground-secondary)" }}>
          Repositorio central de imágenes. La banda animada y la galería de proyectos
          usan las imágenes que subas acá.
        </p>
      </div>

      {/* Storage bar */}
      <div
        className="rounded-xl border p-5 mb-6"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <UsageBar used={state.totalBytes} max={MAX_BYTES} />
        <p className="mt-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
          Límite total: 500 MB · Por archivo: 25 MB máx · Formatos: JPEG, PNG, WebP, AVIF
        </p>
      </div>

      {/* Upload zone */}
      <div
        className="rounded-xl border-2 border-dashed p-10 mb-6 text-center transition-colors"
        style={{ borderColor: "var(--border-strong)", background: "var(--background)" }}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="media-library-upload"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
          multiple
          className="sr-only"
          onChange={(e) => uploadFiles(e.target.files, fileInputRef)}
        />
        <label
          htmlFor="media-library-upload"
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold"
            style={{ background: "#DBEAFE", color: "#2563EB" }}
          >
            {uploading ? (
              <span className="animate-spin inline-block text-2xl">⟳</span>
            ) : (
              "↑"
            )}
          </div>
          <div>
            <span className="font-semibold text-base" style={{ color: "var(--foreground)" }}>
              {uploading
                ? "Subiendo imágenes…"
                : "Arrastrá archivos acá o hacé clic para elegir"}
            </span>
            <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>
              Podés subir múltiples archivos a la vez
            </p>
          </div>
          {!uploading && (
            <span
              className="inline-block px-5 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: "#2563EB" }}
            >
              Elegir archivos
            </span>
          )}
        </label>
        {uploadError && (
          <p className="mt-5 text-sm font-medium" style={{ color: "#DC2626" }}>
            {uploadError}
          </p>
        )}
      </div>

      {/* Image grid */}
      <div
        className="rounded-xl border p-6"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-wide mb-6"
          style={{ color: "var(--foreground-secondary)" }}
        >
          Imágenes subidas{" "}
          <span
            className="ml-1 px-1.5 py-0.5 rounded font-normal"
            style={{
              background: "var(--background-tertiary)",
              color: "var(--foreground-muted)",
            }}
          >
            {state.files.length}
          </span>
        </p>

        {loading ? (
          <p
            className="text-sm py-16 text-center"
            style={{ color: "var(--foreground-muted)" }}
          >
            Cargando…
          </p>
        ) : state.files.length === 0 ? (
          <p
            className="text-sm py-16 text-center"
            style={{ color: "var(--foreground-muted)" }}
          >
            No hay imágenes todavía. Subí la primera usando la zona de arriba.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {state.files.map((file) => (
              <div key={file.name} className="group relative">
                {/* Delete confirmation */}
                {deleteConfirm === file.name && (
                  <div
                    className="absolute inset-0 z-10 rounded-xl flex flex-col items-center justify-center gap-2 p-2"
                    style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(4px)" }}
                  >
                    <p className="text-white text-[10px] text-center font-semibold leading-tight">
                      ¿Eliminar?
                    </p>
                    <div className="flex gap-1.5">
                      <button
                        onClick={async () => {
                          const ok = await deleteFile(file.name);
                          if (ok) setDeleteConfirm(null);
                        }}
                        className="px-2.5 py-1 rounded text-[10px] font-semibold text-white"
                        style={{ background: "#DC2626" }}
                      >
                        Sí
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-2.5 py-1 rounded text-[10px] font-semibold"
                        style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}

                {/* Image */}
                <div
                  className="relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: "4/3", background: "#111" }}
                >
                  <Image
                    src={file.src}
                    alt={file.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <button
                      onClick={() => setDeleteConfirm(file.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{ background: "rgba(220,38,38,0.85)", backdropFilter: "blur(4px)" }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-1.5 px-0.5">
                  <p
                    className="text-xs font-medium truncate"
                    style={{ color: "var(--foreground)" }}
                  >
                    {file.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                    {fmtBytes(file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
