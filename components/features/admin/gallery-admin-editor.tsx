"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { QuickUpload } from "@/components/features/admin/media-library";

type GalleryItem = {
  id: string;
  label: string;
  description: string;
  tag: string;
  image?: string;
};

type GalleryData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  items: GalleryItem[];
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

/* ── Image Picker Modal ── */
function ImagePickerModal({
  availableImages,
  onSelect,
  onClose,
  onRefreshImages,
}: {
  availableImages: string[];
  onSelect: (src: string) => void;
  onClose: () => void;
  onRefreshImages: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[80vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: "var(--background)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="font-semibold text-base" style={{ color: "var(--foreground)" }}>
            Elegir imagen
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 text-lg leading-none"
            aria-label="Cerrar selector"
          >
            ×
          </button>
        </div>

        {/* Quick upload inside picker */}
        <div className="px-5 pt-4 pb-2 shrink-0 border-b" style={{ borderColor: "var(--border)" }}>
          <QuickUpload onUploaded={onRefreshImages} inputId="gallery-picker-upload" />
        </div>

        {/* Grid */}
        <div className="overflow-y-auto p-5 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {availableImages.map((src) => (
            <button
              key={src}
              onClick={() => { onSelect(src); onClose(); }}
              className="relative overflow-hidden rounded-xl aspect-video group transition-all duration-200 hover:ring-2 hover:ring-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
              aria-label={`Seleccionar imagen ${src}`}
            >
              <Image
                src={src}
                alt={src}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="160px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <span
                className="absolute bottom-1 left-1 right-1 text-[9px] text-center font-medium text-white leading-tight px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
              >
                {src.split("/").pop()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Gallery Item Card ── */
function GalleryItemCard({
  item,
  index,
  total,
  availableImages,
  onChange,
  onMove,
  onDelete,
  onRefreshImages,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  availableImages: string[];
  onChange: (updated: GalleryItem) => void;
  onMove: (dir: -1 | 1) => void;
  onDelete: () => void;
  onRefreshImages: () => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const inputClass =
    "w-full px-3 py-2 rounded-md border text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors";
  const inputStyle: React.CSSProperties = {
    borderColor: "var(--border)",
    background: "var(--background)",
    color: "var(--foreground)",
  };
  const ctrlBtn =
    "px-2 py-1 text-xs rounded font-medium transition-colors disabled:opacity-25 disabled:cursor-not-allowed";

  return (
    <>
      {pickerOpen && (
        <ImagePickerModal
          availableImages={availableImages}
          onSelect={(src) => onChange({ ...item, image: src })}
          onClose={() => setPickerOpen(false)}
          onRefreshImages={onRefreshImages}
        />
      )}

      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--border)", background: "var(--background-secondary)" }}
      >
        {/* Top: image preview */}
        <div className="relative w-full bg-gray-900" style={{ aspectRatio: "16/7" }}>
          {item.image ? (
            <Image
              src={item.image}
              alt={item.label || "Imagen del proyecto"}
              fill
              className="object-cover"
              sizes="700px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: "#111827" }}>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Sin imagen
              </span>
            </div>
          )}

          {/* Overlay with change button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors group">
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              {item.image ? "Cambiar imagen" : "Elegir imagen"}
            </button>
          </div>

          {/* Index badge */}
          <div className="absolute top-3 left-3">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "rgba(0,0,0,0.7)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}
            >
              #{index + 1}
            </span>
          </div>

          {/* Controls top right */}
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <button
              type="button"
              onClick={() => onMove(-1)}
              disabled={index === 0}
              className={ctrlBtn}
              style={{ background: "rgba(0,0,0,0.65)", color: "#fff", backdropFilter: "blur(4px)" }}
              title="Mover arriba"
            >▲</button>
            <button
              type="button"
              onClick={() => onMove(1)}
              disabled={index === total - 1}
              className={ctrlBtn}
              style={{ background: "rgba(0,0,0,0.65)", color: "#fff", backdropFilter: "blur(4px)" }}
              title="Mover abajo"
            >▼</button>
            <button
              type="button"
              onClick={onDelete}
              className={ctrlBtn}
              style={{ background: "#DC2626", color: "#fff" }}
              title="Eliminar"
            >Eliminar</button>
          </div>
        </div>

        {/* Bottom: text fields */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--foreground-secondary)" }}>
              Título del proyecto
            </label>
            <input
              value={item.label}
              onChange={(e) => onChange({ ...item, label: e.target.value })}
              className={inputClass}
              style={inputStyle}
              placeholder="Ej. Vivienda Unifamiliar · 40 pies"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--foreground-secondary)" }}>
              Imagen asignada
            </label>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="text-left px-3 py-2 rounded-md border text-sm transition-colors hover:bg-gray-50 truncate"
              style={{ borderColor: "var(--border)", color: item.image ? "var(--foreground)" : "var(--foreground-muted)" }}
            >
              {item.image ? item.image.split("/").pop() : "Clic para elegir imagen…"}
            </button>
          </div>
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--foreground-secondary)" }}>
              Descripción breve
            </label>
            <textarea
              value={item.description}
              onChange={(e) => onChange({ ...item, description: e.target.value })}
              rows={2}
              className={`${inputClass} resize-y`}
              style={inputStyle}
              placeholder="Descripción corta del proyecto"
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Main Editor ── */
export function GalleryAdminEditor({ initialData }: { initialData: GalleryData }) {
  const [data, setData] = useState<GalleryData>(initialData);
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [status, setStatus] = useState<SaveStatus>("idle");

  const refreshImages = useCallback(() => {
    fetch("/api/media")
      .then((r) => r.json())
      .then((d) => setAvailableImages((d.files ?? []).map((f: { src: string }) => f.src)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshImages();
  }, [refreshImages]);

  const setField = (key: keyof GalleryData, val: string) => {
    setData((prev) => ({ ...prev, [key]: val }));
    setStatus("idle");
  };

  const updateItem = (index: number, updated: GalleryItem) => {
    setData((prev) => {
      const items = [...prev.items];
      items[index] = updated;
      return { ...prev, items };
    });
    setStatus("idle");
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    setData((prev) => {
      const items = [...prev.items];
      const target = index + dir;
      if (target < 0 || target >= items.length) return prev;
      [items[index], items[target]] = [items[target], items[index]];
      return { ...prev, items };
    });
    setStatus("idle");
  };

  const deleteItem = (index: number) => {
    setData((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
    setStatus("idle");
  };

  const addItem = () => {
    const newItem: GalleryItem = {
      id: `gal-${Date.now().toString(36)}`,
      label: "",
      description: "",
      tag: "Vivienda",
      image: "",
    };
    setData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    setStatus("idle");
  };

  const save = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/content/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  };

  const saveLabel =
    status === "saving" ? "Guardando…" :
    status === "saved" ? "✓ Guardado" :
    status === "error" ? "✗ Error — reintentar" :
    "Guardar cambios";

  const saveBg =
    status === "saved" ? "#16A34A" :
    status === "error" ? "#DC2626" :
    "#2563EB";

  const inputClass = "w-full px-3 py-2 rounded-md border text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors";
  const inputStyle: React.CSSProperties = { borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            Galería de proyectos
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--foreground-secondary)" }}>
            Asigná imágenes a cada proyecto y editá los textos. El primer item se muestra destacado.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={status === "saving"}
          className="shrink-0 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60 whitespace-nowrap"
          style={{ background: saveBg }}
        >
          {saveLabel}
        </button>
      </div>

      {/* Text fields */}
      <div
        className="rounded-xl border p-6 mb-6"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: "var(--foreground-secondary)" }}>
          Textos de la sección
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(["eyebrow", "title", "titleAccent"] as const).map((key) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--foreground-secondary)" }}>
                {key === "eyebrow" ? "Eyebrow" : key === "title" ? "Título" : "Título — parte dorada"}
              </label>
              <input value={data[key]} onChange={(e) => setField(key, e.target.value)} className={inputClass} style={inputStyle} />
            </div>
          ))}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--foreground-secondary)" }}>Subtítulo</label>
            <textarea value={data.subtitle} onChange={(e) => setField("subtitle", e.target.value)} rows={3} className={`${inputClass} resize-y`} style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Items */}
      <div
        className="rounded-xl border p-6"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--foreground-secondary)" }}>
            Proyectos{" "}
            <span className="ml-1 px-1.5 py-0.5 rounded text-xs font-normal" style={{ background: "var(--background-tertiary)", color: "var(--foreground-muted)" }}>
              {data.items.length}
            </span>
          </p>
          <button
            type="button"
            onClick={addItem}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={{ background: "#DBEAFE", color: "#1D4ED8" }}
          >
            + Agregar proyecto
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {data.items.map((item, i) => (
            <GalleryItemCard
              key={item.id}
              item={item}
              index={i}
              total={data.items.length}
              availableImages={availableImages}
              onChange={(updated) => updateItem(i, updated)}
              onMove={(dir) => moveItem(i, dir)}
              onDelete={() => deleteItem(i)}
              onRefreshImages={refreshImages}
            />
          ))}
          {data.items.length === 0 && (
            <p className="text-center py-12 text-sm" style={{ color: "var(--foreground-muted)" }}>
              No hay proyectos todavía. Hacé clic en &quot;Agregar proyecto&quot; para empezar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
