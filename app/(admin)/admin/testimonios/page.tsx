import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function TestimonialsPage() {
  const data = await getSection("testimonials");
  return (
    <SectionEditor
      section="testimonials"
      title="Testimonios"
      description="Opiniones de clientes, ordenadas como se muestran en la web."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
      ]}
      list={{
        listKey: "items",
        label: "Testimonios",
        itemLabel: "Testimonio",
        fields: [
          { key: "name", label: "Nombre" },
          { key: "role", label: "Cargo / ubicación" },
          { key: "quote", label: "Texto", multiline: true, span: "full" },
          { key: "rating", label: "Rating", type: "number" },
        ],
        defaultItem: { name: "", role: "", quote: "", rating: 5 },
      }}
    />
  );
}
