import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.lyrics.ovh/v1";
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

export async function lyricsGet(args: Record<string, unknown>) {
  const artist = String(args.artist || "");
  const title = String(args.title || "");
  if (!artist || !title) return { error: "Both artist and title are required." };
  const data = await fetchJson(`${BASE}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "lyrics.ovh", fetched_at: new Date().toISOString(), next_steps: ["Search for lyrics from other artists and songs."] });
}
