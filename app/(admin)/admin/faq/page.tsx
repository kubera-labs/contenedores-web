import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function FaqPage() {
  const data = await getSection("faq");
  return (
    <SectionEditor
      section="faq"
      title="FAQ"
      description="Preguntas frecuentes que aparecen al final de la home."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título", span: "full" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
      ]}
      list={{
        listKey: "items",
        label: "Preguntas",
        itemLabel: "Pregunta",
        fields: [
          { key: "question", label: "Pregunta", span: "full" },
          { key: "answer", label: "Respuesta", multiline: true, span: "full" },
        ],
        defaultItem: { question: "", answer: "" },
      }}
    />
  );
}
