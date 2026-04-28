import { getSection } from "@/lib/db";
import { GalleryAdminEditor } from "@/components/features/admin/gallery-admin-editor";
import type { GalleryContent } from "@/types/content";

export default async function GaleriaPage() {
  const data = await getSection("gallery") as GalleryContent;
  return <GalleryAdminEditor initialData={data} />;
}
