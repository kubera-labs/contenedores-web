import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSection, setSection } from "@/lib/db";
import type { ContentSection } from "@/types/content";

const VALID_SECTIONS: ContentSection[] = [
  "hero",
  "about",
  "gallery",
  "solutions",
  "socialProof",
  "testimonials",
  "faq",
  "cta",
  "services",
  "benefits",
];

type Ctx = { params: Promise<{ section: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { section } = await params;
  if (!VALID_SECTIONS.includes(section as ContentSection)) {
    return NextResponse.json({ error: "Sección inválida" }, { status: 400 });
  }
  try {
    const data = await getSection(section as ContentSection);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error al leer contenido" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { section } = await params;
  if (!VALID_SECTIONS.includes(section as ContentSection)) {
    return NextResponse.json({ error: "Sección inválida" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  try {
    await setSection(section as ContentSection, body as never);
    revalidateTag("content", "default");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
