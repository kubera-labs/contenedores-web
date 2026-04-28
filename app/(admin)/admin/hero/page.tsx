import { getSection } from "@/lib/db";
import { SectionEditor } from "@/components/features/admin/section-editor";

export default async function HeroPage() {
  const data = await getSection("hero");
  return (
    <SectionEditor
      section="hero"
      title="Hero"
      description="La sección principal visible al entrar al sitio."
      initialData={data as unknown as Record<string, unknown>}
      fields={[
        { key: "eyebrow", label: "Eyebrow (texto pequeño sobre el título)" },
        { key: "title", label: "Título" },
        { key: "titleAccent", label: "Título — parte dorada" },
        { key: "subtitle", label: "Subtítulo", multiline: true, span: "full" },
        { key: "subtitleStrong", label: "Subtítulo — parte en negrita" },
        { key: "ctaPrimary", label: "Botón principal" },
        { key: "ctaSecondary", label: "Botón secundario" },
        {
          key: "microtrust",
          label: "Micro-texto de confianza",
          span: "full",
          hint: "Ej: Sin compromiso · Respondemos en menos de 24 hs · Garantía escrita",
        },
        {
          key: "image",
          label: "Ruta de imagen",
          span: "full",
          hint: "Ej: /hero/mi-foto.png — la imagen debe estar en la carpeta /public/hero/",
        },
      ]}
    />
  );
}
