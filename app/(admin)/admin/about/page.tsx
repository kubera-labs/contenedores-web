import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function AboutPage() {
  const data = await getSection("about");
  return (
    <SectionEditor
      section="about"
      title="Nosotros"
      description="Texto de presentación, pilares y estadísticas."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título" },
        { key: "titleAccent", label: "Título destacado" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
        { key: "closing", label: "Cierre", multiline: true, span: "full" },
        { key: "closingStrong", label: "Cierre destacado" },
        { key: "ctaLabel", label: "CTA" },
        { key: "image", label: "Ruta de imagen", span: "full" },
        { key: "overlayValue", label: "Valor overlay" },
        { key: "overlayLabel", label: "Etiqueta overlay" },
      ]}
      lists={[
        {
          listKey: "stats",
          label: "Estadísticas",
          itemLabel: "Estadística",
          fields: [
            { key: "value", label: "Valor" },
            { key: "label", label: "Etiqueta" },
          ],
          defaultItem: { value: "", label: "" },
        },
        {
          listKey: "pillars",
          label: "Pilares",
          itemLabel: "Pilar",
          fields: [
            { key: "icon", label: "Ícono" },
            { key: "title", label: "Título" },
            { key: "description", label: "Descripción", multiline: true, span: "full" },
          ],
          defaultItem: { icon: "", title: "", description: "" },
        },
      ]}
    />
  );
}
