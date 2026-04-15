import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  SiteContent,
  ContentSection,
  ContentOf,
} from "@/types/content";

/**
 * Absolute path to the JSON content database.
 * Lives in the project root so admin writes persist across deploys
 * (for self-hosted setups; on Vercel the file is read-only at runtime).
 */
const DB_PATH = path.join(process.cwd(), "data", "content.json");

// ---------------------------------------------------------------------------
// Read helpers
// ---------------------------------------------------------------------------

/** Read the full content database. */
export async function getContent(): Promise<SiteContent> {
  const raw = await readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

/** Read a single section by key. */
export async function getSection<K extends ContentSection>(
  section: K,
): Promise<ContentOf<K>> {
  const content = await getContent();
  return content[section];
}

// ---------------------------------------------------------------------------
// Write helpers
// ---------------------------------------------------------------------------

/** Overwrite a full section. */
export async function setSection<K extends ContentSection>(
  section: K,
  data: ContentOf<K>,
): Promise<void> {
  const content = await getContent();
  (content[section] as ContentOf<K>) = data;
  await writeFile(DB_PATH, JSON.stringify(content, null, 2), "utf-8");
}

/** Partially update a section (shallow merge for objects, full replace for arrays). */
export async function updateSection<K extends ContentSection>(
  section: K,
  partial: Partial<ContentOf<K>>,
): Promise<ContentOf<K>> {
  const content = await getContent();
  const current = content[section];

  if (Array.isArray(current)) {
    // Arrays are replaced entirely — the caller should send the full list.
    (content[section] as ContentOf<K>) = partial as ContentOf<K>;
  } else if (typeof current === "object" && current !== null) {
    (content[section] as ContentOf<K>) = { ...current, ...partial } as ContentOf<K>;
  } else {
    (content[section] as ContentOf<K>) = partial as ContentOf<K>;
  }

  await writeFile(DB_PATH, JSON.stringify(content, null, 2), "utf-8");
  return content[section];
}

// ---------------------------------------------------------------------------
// Array-item CRUD (for sections that are arrays: features, services, etc.)
// ---------------------------------------------------------------------------

type ArraySection = {
  [K in ContentSection]: ContentOf<K> extends Array<infer _> ? K : never;
}[ContentSection];

type ItemOf<K extends ArraySection> = ContentOf<K> extends Array<infer T> ? T : never;

/** Add an item to an array section. */
export async function addItem<K extends ArraySection>(
  section: K,
  item: ItemOf<K>,
): Promise<void> {
  const content = await getContent();
  const arr = content[section] as ItemOf<K>[];
  arr.push(item);
  await writeFile(DB_PATH, JSON.stringify(content, null, 2), "utf-8");
}

/** Update an item by `id` in an array section. */
export async function updateItem<K extends ArraySection>(
  section: K,
  id: string,
  partial: Partial<ItemOf<K>>,
): Promise<ItemOf<K> | null> {
  const content = await getContent();
  const arr = content[section] as unknown as (ItemOf<K> & { id: string })[];
  const idx = arr.findIndex((item) => item.id === id);
  if (idx === -1) return null;

  arr[idx] = { ...arr[idx], ...partial };
  await writeFile(DB_PATH, JSON.stringify(content, null, 2), "utf-8");
  return arr[idx] as ItemOf<K>;
}

/** Remove an item by `id` from an array section. */
export async function removeItem<K extends ArraySection>(
  section: K,
  id: string,
): Promise<boolean> {
  const content = await getContent();
  const arr = content[section] as unknown as (ItemOf<K> & { id: string })[];
  const idx = arr.findIndex((item) => item.id === id);
  if (idx === -1) return false;

  arr.splice(idx, 1);
  await writeFile(DB_PATH, JSON.stringify(content, null, 2), "utf-8");
  return true;
}
