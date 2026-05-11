"use client";

import { useCallback, useState } from "react";

export type FieldType = "text" | "number" | "bullets";

export type FieldDef = {
  key: string;
  label: string;
  multiline?: boolean;
  hint?: string;
  type?: FieldType;
  span?: "full";
};

export type ListDef = {
  listKey: string;
  label: string;
  itemLabel: string;
  fields: FieldDef[];
  defaultItem: Record<string, unknown>;
};

type Props = {
  section: string;
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: Record<string, any>;
  fields?: FieldDef[];
  list?: ListDef;
  lists?: ListDef[];
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

function Field({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (raw: unknown) => void;
}) {
  const isBullets = def.type === "bullets";
  const isMultiline = def.multiline || isBullets;
  const displayValue =
    isBullets && Array.isArray(value) ? (value as string[]).join("\n") : String(value ?? "");

  function handleChange(str: string) {
    if (isBullets) onChange(str.split("\n"));
    else if (def.type === "number") onChange(str === "" ? "" : Number(str));
    else onChange(str);
  }

  const inputStyle: React.CSSProperties = {
    borderColor: "var(--border)",
    background: "var(--background)",
    color: "var(--foreground)",
  };
  const inputClass =
    "w-full px-3 py-2 rounded-md border text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={def.key} className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--foreground-secondary)" }}>
        {def.label}
        {isBullets && <span className="ml-1 font-normal normal-case opacity-60">(una por línea)</span>}
      </label>
      {isMultiline ? (
        <textarea
          id={def.key}
          value={displayValue}
          onChange={(e) => handleChange(e.target.value)}
          rows={isBullets ? 4 : 3}
          className={`${inputClass} resize-y`}
          style={inputStyle}
        />
      ) : (
        <input
          id={def.key}
          type={def.type === "number" ? "number" : "text"}
          value={displayValue}
          onChange={(e) => handleChange(e.target.value)}
          className={inputClass}
          style={inputStyle}
        />
      )}
      {def.hint && <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>{def.hint}</p>}
    </div>
  );
}

function ItemCard({
  item,
  index,
  total,
  fields,
  onChangeField,
  onMove,
  onDelete,
}: {
  item: Record<string, unknown>;
  index: number;
  total: number;
  fields: FieldDef[];
  onChangeField: (key: string, val: unknown) => void;
  onMove: (dir: -1 | 1) => void;
  onDelete: () => void;
}) {
  const ctrlBtn = "px-2 py-1 text-xs rounded font-medium transition-colors disabled:opacity-25 disabled:cursor-not-allowed";
  return (
    <div className="rounded-lg border p-4" style={{ borderColor: "var(--border)", background: "var(--background-secondary)" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "var(--background-tertiary)", color: "var(--foreground-muted)" }}>
          #{index + 1}
        </span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0} className={ctrlBtn} style={{ background: "var(--background-tertiary)", color: "var(--foreground-secondary)" }}>
            ▲
          </button>
          <button type="button" onClick={() => onMove(1)} disabled={index === total - 1} className={ctrlBtn} style={{ background: "var(--background-tertiary)", color: "var(--foreground-secondary)" }}>
            ▼
          </button>
          <button type="button" onClick={onDelete} className={ctrlBtn} style={{ background: "#FEE2E2", color: "#DC2626" }}>
            Eliminar
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map((f) => (
          <div key={f.key} className={f.span === "full" || f.multiline || f.type === "bullets" ? "md:col-span-2" : ""}>
            <Field def={{ ...f, key: `item-${index}-${f.key}` }} value={item[f.key]} onChange={(val) => onChangeField(f.key, val)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SaveButton({
  label,
  bg,
  disabled,
  onClick,
}: {
  label: string;
  bg: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="shrink-0 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60 whitespace-nowrap" style={{ background: bg }}>
      {label}
    </button>
  );
}

export function SectionEditor({ section, title, description, initialData, fields, list, lists }: Props) {
  const [data, setData] = useState<Record<string, unknown>>(initialData);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const allLists = lists ?? (list ? [list] : []);

  const setScalarField = useCallback((key: string, value: unknown) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }, []);

  const getItems = useCallback((listDef: ListDef) => (data[listDef.listKey] as Record<string, unknown>[]) ?? [], [data]);

  const writeItems = (listDef: ListDef, items: Record<string, unknown>[]) => {
    setData((prev) => ({ ...prev, [listDef.listKey]: items }));
    setStatus("idle");
  };

  const updateItem = (listDef: ListDef, index: number, key: string, val: unknown) => {
    const items = [...getItems(listDef)];
    items[index] = { ...items[index], [key]: val };
    writeItems(listDef, items);
  };

  const moveItem = (listDef: ListDef, index: number, dir: -1 | 1) => {
    const items = [...getItems(listDef)];
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    writeItems(listDef, items);
  };

  const deleteItem = (listDef: ListDef, index: number) => writeItems(listDef, getItems(listDef).filter((_, i) => i !== index));

  const addItem = (listDef: ListDef) => {
    const newId = `${section}-${Date.now().toString(36)}`;
    writeItems(listDef, [...getItems(listDef), { id: newId, ...listDef.defaultItem }]);
  };

  const save = async () => {
    setStatus("saving");
    try {
      const res = await fetch(`/api/content/${section}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  };

  const saveLabel = status === "saving" ? "Guardando…" : status === "saved" ? "✓ Guardado" : status === "error" ? "✕ Error — reintentar" : "Guardar cambios";
  const saveBg = status === "saved" ? "#16A34A" : status === "error" ? "#DC2626" : "#2563EB";

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{title}</h1>
          {description && <p className="mt-1 text-sm" style={{ color: "var(--foreground-secondary)" }}>{description}</p>}
        </div>
        <SaveButton label={saveLabel} bg={saveBg} disabled={status === "saving"} onClick={save} />
      </div>

      {fields && fields.length > 0 && (
        <div className="rounded-xl border p-6 mb-6" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: "var(--foreground-secondary)" }}>
            Textos y configuracion
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((f) => (
              <div key={f.key} className={f.span === "full" || f.multiline ? "md:col-span-2" : ""}>
                <Field def={f} value={data[f.key]} onChange={(val) => setScalarField(f.key, val)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {allLists.map((listDef) => {
        const items = getItems(listDef);
        return (
          <div key={listDef.listKey} className="rounded-xl border p-6 mb-6" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--foreground-secondary)" }}>
                {listDef.label}{" "}
                <span className="ml-1 px-1.5 py-0.5 rounded text-xs font-normal" style={{ background: "var(--background-tertiary)", color: "var(--foreground-muted)" }}>
                  {items.length}
                </span>
              </p>
              <button type="button" onClick={() => addItem(listDef)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors" style={{ background: "#DBEAFE", color: "#1D4ED8" }}>
                + Agregar {listDef.itemLabel}
              </button>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-10 text-sm rounded-lg border-2 border-dashed" style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}>
                No hay {listDef.label.toLowerCase()} todavía. Hacé clic en "+" para agregar.
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, index) => (
                  <ItemCard
                    key={String(item.id ?? index)}
                    item={item}
                    index={index}
                    total={items.length}
                    fields={listDef.fields}
                    onChangeField={(key, val) => updateItem(listDef, index, key, val)}
                    onMove={(dir) => moveItem(listDef, index, dir)}
                    onDelete={() => deleteItem(listDef, index)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-6 flex justify-end">
        <SaveButton label={saveLabel} bg={saveBg} disabled={status === "saving"} onClick={save} />
      </div>
    </div>
  );
}
