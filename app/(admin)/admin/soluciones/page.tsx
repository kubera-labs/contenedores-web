import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function SolucionesPage() {
  const data = await getSection("solutions");
  return (
    <SectionEditor
      section="solutions"
      title="Cómo trabajamos"
      description="Pasos del proceso de trabajo. El orden importa — usá ▲▼ para reordenarlos."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título", span: "full" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
      ]}
      list={{
        listKey: "steps",
        label: "Pasos",
        itemLabel: "Paso",
        fields: [
          { key: "number", label: "Número (01, 02…)" },
          {
            key: "icon",
            label: "Ícono",
            hint: "phone, target, wrench, truck, clock, check…",
          },
          { key: "title", label: "Título del paso" },
          { key: "description", label: "Descripción", multiline: true, span: "full" },
        ],
        defaultItem: { number: "0X", icon: "target", title: "", description: "" },
      }}
    />
  );
}
