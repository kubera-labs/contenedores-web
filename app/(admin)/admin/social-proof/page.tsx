import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function SocialProofPage() {
  const data = await getSection("socialProof");
  return (
    <SectionEditor
      section="socialProof"
      title="Estadísticas"
      description="Indicadores breves que refuerzan la confianza en la parte superior de la home."
      initialData={data as unknown as Record<string, unknown>}
      list={{
        listKey: "stats",
        label: "Estadísticas",
        itemLabel: "Indicador",
        fields: [
          { key: "value", label: "Valor" },
          { key: "label", label: "Etiqueta" },
          { key: "detail", label: "Detalle", span: "full" },
        ],
        defaultItem: { value: "", label: "", detail: "" },
      }}
    />
  );
}
