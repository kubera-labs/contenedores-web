import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function ServiciosPage() {
  const data = await getSection("services");
  return (
    <SectionEditor
      section="services"
      title="Servicios"
      description="Tarjetas de servicios con título, tagline y lista de características."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título", span: "full" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
      ]}
      list={{
        listKey: "items",
        label: "Servicios",
        itemLabel: "Servicio",
        fields: [
          {
            key: "icon",
            label: "Ícono",
            hint: "container, clock, wrench, truck, shield, zap…",
          },
          { key: "title", label: "Título del servicio" },
          { key: "tagline", label: "Tagline (frase corta bajo el título)", span: "full" },
          {
            key: "bullets",
            label: "Características",
            type: "bullets",
            span: "full",
            hint: "Una característica por línea",
          },
        ],
        defaultItem: { icon: "container", title: "", tagline: "", bullets: [] },
      }}
    />
  );
}
