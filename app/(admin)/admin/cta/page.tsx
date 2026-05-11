import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function CtaPage() {
  const data = await getSection("cta");
  return (
    <SectionEditor
      section="cta"
      title="CTA final"
      description="Bloque final con el llamado a la acción."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "badge", label: "Badge" },
        { key: "title", label: "Título", span: "full" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
        { key: "ctaWhatsapp", label: "Texto WhatsApp" },
        { key: "ctaEmail", label: "Texto email" },
      ]}
    />
  );
}
