import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.artic.edu/api/v1";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function articSearchArtworks(args: Record<string, unknown>) {
  const query = String(args.query || "");
  if (!query) return { error: "query is required (e.g. 'monet', 'sunflowers', 'impressionism')." };
  const limit = Math.min(Number(args.limit) || 10, 50);
  const data = await fetchJson(`${BASE}/artworks/search?q=${encodeURIComponent(query)}&limit=${limit}&fields=id,title,artist_display,date_display,medium_display,dimensions,image_id`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "api.artic.edu (Art Institute of Chicago)", fetched_at: new Date().toISOString(), next_steps: ["Each artwork includes title, artist, date, medium, and image_id.", "Use image_id to build image URLs: https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg"] });
}

export async function articGetArtwork(args: Record<string, unknown>) {
  const id = Number(args.id);
  if (!id) return { error: "id is required (numeric artwork ID)." };
  const data = await fetchJson(`${BASE}/artworks/${id}?fields=id,title,artist_display,date_display,medium_display,dimensions,credit_line,publication_history,exhibition_history,image_id`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "api.artic.edu (Art Institute of Chicago)", fetched_at: new Date().toISOString(), next_steps: ["Includes title, artist, date, medium, credit line, and exhibition history.", "Build image URL: https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg"] });
}
