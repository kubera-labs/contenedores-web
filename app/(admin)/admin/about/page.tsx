import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function AboutPage() {
  const data = await getSection("about");
  return (
    <SectionEditor
      section="about"
      title="Nosotros"
      description="Sección que presenta la misión de la empresa y sus pilares de valor."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título" },
        { key: "titleAccent", label: "Título — parte dorada" },
        { key: "subtitle", label: "Subtítulo principal", multiline: true, span: "full" },
        { key: "closing", label: "Frase de cierre", multiline: true, span: "full" },
        { key: "closingStrong", label: "Cierre — parte destacada en negrita" },
        { key: "ctaLabel", label: "Texto del botón CTA" },
      ]}
      list={{
        listKey: "pillars",
        label: "Pilares de valor",
        itemLabel: "Pilar",
        fields: [
          {
            key: "icon",
            label: "Ícono",
            hint: "target, zap, sparkles, shield, clock, truck, wrench, heart, award…",
          },
          { key: "title", label: "Título del pilar" },
          { key: "description", label: "Descripción", multiline: true, span: "full" },
        ],
        defaultItem: { icon: "target", title: "", description: "" },
      }}
    />
  );
}
