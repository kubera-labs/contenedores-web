import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function ImageStripPage() {
  const data = await getSection("imageStrip");
  return (
    <SectionEditor
      section="imageStrip"
      title="Banda de imágenes"
      description="Carrusel infinito debajo del hero. Editá el orden y las rutas de las imágenes."
      initialData={data as unknown as Record<string, unknown>}
      list={{
        listKey: "items",
        label: "Imágenes",
        itemLabel: "Imagen",
        fields: [{ key: "src", label: "Ruta de imagen", span: "full" }],
        defaultItem: { src: "" },
      }}
    />
  );
}
