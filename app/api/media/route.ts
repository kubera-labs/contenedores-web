import { NextRequest, NextResponse } from "next/server";
import { readdir, stat, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

const MEDIA_DIR = path.join(process.cwd(), "public", "contenedores");
const MAX_BYTES = 500 * 1024 * 1024; // 500 MB
const ALLOWED_MIME = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"]);
const ALLOWED_EXT = /\.(jpe?g|png|webp|avif)$/i;
const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB per file

function naturalCmp(a: string, b: string) {
  const na = parseInt(a.replace(/\D/g, ""), 10) || 0;
  const nb = parseInt(b.replace(/\D/g, ""), 10) || 0;
  return na - nb;
}

async function getDirStats() {
  const files = await readdir(MEDIA_DIR);
  const valid = files.filter((f) => ALLOWED_EXT.test(f)).sort(naturalCmp);
  const statsArr = await Promise.all(
    valid.map(async (f) => {
      const s = await stat(path.join(MEDIA_DIR, f));
      return { name: f, src: `/contenedores/${f}`, size: s.size };
    })
  );
  const totalBytes = statsArr.reduce((sum, f) => sum + f.size, 0);
  return { files: statsArr, totalBytes, maxBytes: MAX_BYTES };
}

/* ── GET /api/media — list files with sizes ── */
export async function GET() {
  try {
    const result = await getDirStats();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ files: [], totalBytes: 0, maxBytes: MAX_BYTES });
  }
}

/* ── POST /api/media — upload a file ── */
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
    }

    // Validate MIME type
    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Usá JPEG, PNG, WebP o AVIF." },
        { status: 415 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `El archivo supera el límite por archivo de 25 MB.` },
        { status: 413 }
      );
    }

    // Validate total storage
    const { totalBytes } = await getDirStats();
    if (totalBytes + file.size > MAX_BYTES) {
      const availableMB = ((MAX_BYTES - totalBytes) / 1024 / 1024).toFixed(1);
      return NextResponse.json(
        { error: `Sin espacio. Espacio disponible: ${availableMB} MB.` },
        { status: 507 }
      );
    }

    // Sanitize filename: strip traversal, keep only safe chars
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const ext = path.extname(originalName).toLowerCase() || ".jpg";
    const baseName = path.basename(originalName, ext).slice(0, 80);
    const safeName = `${baseName}${ext}`;
    const destPath = path.join(MEDIA_DIR, safeName);

    // Prevent path traversal
    if (!destPath.startsWith(MEDIA_DIR)) {
      return NextResponse.json({ error: "Nombre de archivo inválido." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    await writeFile(destPath, Buffer.from(bytes));

    return NextResponse.json({ success: true, src: `/contenedores/${safeName}` });
  } catch (err) {
    console.error("[media POST]", err);
    return NextResponse.json({ error: "Error interno al subir el archivo." }, { status: 500 });
  }
}

/* ── DELETE /api/media?file=c1.jpeg — delete a file ── */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("file");

    if (!fileName) {
      return NextResponse.json({ error: "Parámetro 'file' requerido." }, { status: 400 });
    }

    // Security: ensure no path traversal and valid extension
    if (fileName.includes("/") || fileName.includes("..") || !ALLOWED_EXT.test(fileName)) {
      return NextResponse.json({ error: "Nombre de archivo inválido." }, { status: 400 });
    }

    const filePath = path.join(MEDIA_DIR, fileName);

    // Double-check the resolved path is inside MEDIA_DIR
    if (!filePath.startsWith(MEDIA_DIR)) {
      return NextResponse.json({ error: "Acceso denegado." }, { status: 403 });
    }

    await unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json({ error: "Archivo no encontrado." }, { status: 404 });
    }
    return NextResponse.json({ error: "Error al eliminar el archivo." }, { status: 500 });
  }
}
