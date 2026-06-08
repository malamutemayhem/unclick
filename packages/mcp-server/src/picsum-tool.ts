// Lorem Picsum - random placeholder photos.
// No API key required - completely free and open.
// Base URL: https://picsum.photos/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://picsum.photos";
const TIMEOUT_MS = Number(process.env.PICSUM_TIMEOUT_MS) || 10000;

async function picsumFetch<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Picsum request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Picsum network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Picsum rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Picsum HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "picsum.photos" };

export async function picsumList(args: Record<string, unknown>): Promise<unknown> {
  const page = Number(args.page ?? 1);
  const limit = Number(args.limit ?? 20);
  try {
    const data = await picsumFetch(`${BASE}/v2/list?page=${page}&limit=${limit}`);
    return stampMeta({ photos: data }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use picsum_get to get a specific photo by ID.", "Use picsum_random_url to generate a random image URL."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function picsumGet(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "");
  if (!id) return { error: "id is required." };
  try {
    const data = await picsumFetch(`${BASE}/id/${id}/info`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Image URL: picsum.photos/id/{id}/{width}/{height}"] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function picsumRandomUrl(args: Record<string, unknown>): Promise<unknown> {
  const width = Number(args.width ?? 800);
  const height = Number(args.height ?? 600);
  const grayscale = args.grayscale === true;
  const blur = args.blur ? Number(args.blur) : undefined;
  let url = `${BASE}/${width}/${height}`;
  const params: string[] = [];
  if (grayscale) params.push("grayscale");
  if (blur && blur >= 1 && blur <= 10) params.push(`blur=${blur}`);
  if (params.length) url += `?${params.join("&")}`;
  return stampMeta({ url, width, height, grayscale, blur: blur ?? null }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use picsum_list to browse available photos."] });
}
