import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.imgflip.com";
const TIMEOUT_MS = 8_000;

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

export async function imgflipGetMemes(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/get_memes`) as Record<string, unknown>;
  if (data && typeof data === "object" && "error" in data && !(data as Record<string, unknown>).success) return { error: String(data.error) };
  return stampMeta({ memes: (data as Record<string, unknown>).data }, { source: "imgflip.com", fetched_at: new Date().toISOString(), next_steps: ["Returns the top 100 meme templates with id, name, url, and dimensions.", "Use the template names and URLs for meme inspiration or reference."] });
}
