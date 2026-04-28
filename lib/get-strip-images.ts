import { readdir } from "node:fs/promises";
import path from "node:path";

const ALLOWED = /\.(jpe?g|png|webp|avif)$/i;

/** Natural sort: c1 < c2 < c10 < c11 */
function naturalCmp(a: string, b: string) {
  const numA = parseInt(a.replace(/\D/g, ""), 10) || 0;
  const numB = parseInt(b.replace(/\D/g, ""), 10) || 0;
  return numA - numB;
}

export async function getStripImages(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), "public", "contenedores");
    const files = await readdir(dir);
    return files
      .filter((f) => ALLOWED.test(f))
      .sort(naturalCmp)
      .map((f) => `/contenedores/${f}`);
  } catch {
    return [];
  }
}
