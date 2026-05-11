import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function WhyModularPage() {
  const data = await getSection("whyModular");
  return (
    <SectionEditor
      section="whyModular"
      title="Por qué modular"
      description="Bloque de beneficios del sistema constructivo modular."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título" },
        { key: "titleAccent", label: "Título destacado" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
      ]}
      list={{
        listKey: "items",
        label: "Razones",
        itemLabel: "Razón",
        fields: [
          { key: "icon", label: "Ícono" },
          { key: "title", label: "Título" },
          { key: "description", label: "Descripción", multiline: true, span: "full" },
        ],
        defaultItem: { icon: "", title: "", description: "" },
      }}
    />
  );
}
