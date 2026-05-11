import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function ServicesPage() {
  const data = await getSection("services");
  return (
    <SectionEditor
      section="services"
      title="Servicios"
      description="Soluciones que se muestran en la home con tarjetas e íconos."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow" },
        { key: "title", label: "Título" },
        { key: "titleAccent", label: "Título destacado" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
      ]}
      list={{
        listKey: "items",
        label: "Servicios",
        itemLabel: "Servicio",
        fields: [
          { key: "icon", label: "Ícono" },
          { key: "title", label: "Título" },
          { key: "tagline", label: "Tagline" },
          { key: "bullets", label: "Bullets", type: "bullets", multiline: true, span: "full" },
        ],
        defaultItem: { icon: "", title: "", tagline: "", bullets: [] },
      }}
    />
  );
}
