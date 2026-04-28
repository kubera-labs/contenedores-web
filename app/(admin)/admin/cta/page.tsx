import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function CtaPage() {
  const data = await getSection("cta");
  return (
    <SectionEditor
      section="cta"
      title="CTA Final"
      description="Llamada a la acción al final de la página."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "badge", label: "Badge (pastilla sobre el título)" },
        { key: "title", label: "Título", span: "full" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
        { key: "ctaWhatsapp", label: "Texto del botón WhatsApp" },
        { key: "ctaEmail", label: "Texto del botón Email" },
      ]}
    />
  );
}
