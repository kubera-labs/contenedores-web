import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function TestimoniosPage() {
  const data = await getSection("testimonials");
  return (
    <SectionEditor
      section="testimonials"
      title="Testimonios"
      description="Reseñas de clientes reales. Reemplazá los placeholders por testimonios reales cuando los tengas."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título", span: "full" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
      ]}
      list={{
        listKey: "items",
        label: "Testimonios",
        itemLabel: "Testimonio",
        fields: [
          { key: "name", label: "Nombre del cliente" },
          { key: "role", label: "Cargo · Empresa" },
          { key: "rating", label: "Puntuación (1–5)", type: "number" },
          {
            key: "quote",
            label: "Texto del testimonio",
            multiline: true,
            span: "full",
          },
        ],
        defaultItem: { name: "", role: "", quote: "", rating: 5 },
      }}
    />
  );
}
