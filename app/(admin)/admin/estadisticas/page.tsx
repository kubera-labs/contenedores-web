import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function EstadisticasPage() {
  const data = await getSection("socialProof");
  return (
    <SectionEditor
      section="socialProof"
      title="Estadísticas"
      description="Cifras clave que generan confianza en el visitante."
      initialData={data as unknown as Record<string, unknown>}
      list={{
        listKey: "stats",
        label: "Estadísticas",
        itemLabel: "Estadística",
        fields: [
          {
            key: "value",
            label: "Valor",
            hint: "Ej: USD 13.900 · 20 días · 3 meses · 60 cuotas",
          },
          { key: "label", label: "Etiqueta principal" },
          { key: "detail", label: "Detalle complementario" },
        ],
        defaultItem: { value: "", label: "", detail: "" },
      }}
    />
  );
}
