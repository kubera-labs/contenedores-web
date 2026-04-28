/**
 * Content persistence layer.
 *
 * Storage strategy (priority order):
 *  1. Upstash Redis — when UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set.
 *     Required in production (Vercel's filesystem is read-only outside /tmp).
 *  2. Local JSON file — fallback for dev/self-hosted. Writes fail on Vercel.
 *
 * All public reads go through unstable_cache so Next.js can ISR-invalidate them
 * via revalidateTag("content") after admin edits.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { unstable_cache } from "next/cache";
import { SiteContentSchema } from "@/types/content.schema";
import type { SiteContent, ContentSection, ContentOf } from "@/types/content";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const DB_PATH = path.join(process.cwd(), "data", "content.json");
const REDIS_KEY = "contenedores:content";

// ---------------------------------------------------------------------------
// Redis helpers (optional — only active when env vars are set)
// ---------------------------------------------------------------------------
type KVClient = {
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, value: unknown) => Promise<unknown>;
};

let _redis: KVClient | null = null;

function isRedisAvailable(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function getRedis(): Promise<KVClient | null> {
  if (!isRedisAvailable()) return null;
  if (!_redis) {
    const { Redis } = await import("@upstash/redis");
    _redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return _redis;
}

// ---------------------------------------------------------------------------
// Raw read — bypasses Next.js cache, used internally for writes
// ---------------------------------------------------------------------------
async function readFromSource(): Promise<SiteContent> {
  const redis = await getRedis();

  if (redis) {
    const raw = await redis.get<unknown>(REDIS_KEY);
    if (raw != null) return SiteContentSchema.parse(raw);
    // First deploy: seed Redis from the bundled JSON
    const seed = SiteContentSchema.parse(JSON.parse(await readFile(DB_PATH, "utf-8")));
    await redis.set(REDIS_KEY, seed);
    return seed;
  }

  // Local filesystem fallback
  return SiteContentSchema.parse(JSON.parse(await readFile(DB_PATH, "utf-8")));
}

// ---------------------------------------------------------------------------
// Cached read — used by Server Components and GET route handlers
// ---------------------------------------------------------------------------
export const getContent = unstable_cache(
  readFromSource,
  ["site-content"],
  { tags: ["content"] },
);

export async function getSection<K extends ContentSection>(section: K): Promise<ContentOf<K>> {
  const content = await getContent();
  return content[section];
}

// ---------------------------------------------------------------------------
// Write helpers — always write to source, then the caller invalidates the cache
// ---------------------------------------------------------------------------
async function writeToSource(content: SiteContent): Promise<void> {
  const redis = await getRedis();
  if (redis) {
    await redis.set(REDIS_KEY, content);
    return;
  }
  // Filesystem fallback (works locally, read-only on Vercel without Redis)
  await writeFile(DB_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function setSection<K extends ContentSection>(
  section: K,
  data: ContentOf<K>,
): Promise<void> {
  const content = await readFromSource();
  (content[section] as ContentOf<K>) = data;
  await writeToSource(content);
}

export async function updateSection<K extends ContentSection>(
  section: K,
  partial: Partial<ContentOf<K>>,
): Promise<ContentOf<K>> {
  const content = await readFromSource();
  const current = content[section];

  if (Array.isArray(current)) {
    (content[section] as ContentOf<K>) = partial as ContentOf<K>;
  } else if (typeof current === "object" && current !== null) {
    (content[section] as ContentOf<K>) = { ...current, ...partial } as ContentOf<K>;
  } else {
    (content[section] as ContentOf<K>) = partial as ContentOf<K>;
  }

  await writeToSource(content);
  return content[section];
}

// ---------------------------------------------------------------------------
// Array-item CRUD
// ---------------------------------------------------------------------------
type ArraySection = {
  [K in ContentSection]: ContentOf<K> extends Array<unknown> ? K : never;
}[ContentSection];

type ItemOf<K extends ArraySection> = ContentOf<K> extends Array<infer T> ? T : never;

export async function addItem<K extends ArraySection>(section: K, item: ItemOf<K>): Promise<void> {
  const content = await readFromSource();
  (content[section] as ItemOf<K>[]).push(item);
  await writeToSource(content);
}

export async function updateItem<K extends ArraySection>(
  section: K,
  id: string,
  partial: Partial<ItemOf<K>>,
): Promise<ItemOf<K> | null> {
  const content = await readFromSource();
  const arr = content[section] as unknown as (ItemOf<K> & { id: string })[];
  const idx = arr.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  arr[idx] = { ...arr[idx], ...partial };
  await writeToSource(content);
  return arr[idx] as ItemOf<K>;
}

export async function removeItem<K extends ArraySection>(section: K, id: string): Promise<boolean> {
  const content = await readFromSource();
  const arr = content[section] as unknown as (ItemOf<K> & { id: string })[];
  const idx = arr.findIndex((item) => item.id === id);
  if (idx === -1) return false;
  arr.splice(idx, 1);
  await writeToSource(content);
  return true;
}
