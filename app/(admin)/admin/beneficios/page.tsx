import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function BeneficiosPage() {
  const data = await getSection("benefits");
  return (
    <SectionEditor
      section="benefits"
      title="Beneficios"
      description="Por qué elegirnos: tarjetas con ícono, título y descripción."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título", span: "full" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
      ]}
      list={{
        listKey: "items",
        label: "Beneficios",
        itemLabel: "Beneficio",
        fields: [
          {
            key: "icon",
            label: "Ícono",
            hint: "shield, zap, wrench, users, award, heart, target, clock…",
          },
          { key: "title", label: "Título" },
          { key: "description", label: "Descripción", multiline: true, span: "full" },
        ],
        defaultItem: { icon: "shield", title: "", description: "" },
      }}
    />
  );
}
