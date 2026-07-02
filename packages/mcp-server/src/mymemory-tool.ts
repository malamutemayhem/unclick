import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.mymemory.translated.net";
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

export async function mymemoryTranslate(args: Record<string, unknown>) {
  const text = String(args.text || "");
  if (!text) return { error: "text is required." };
  const source = String(args.source || "en");
  const target = String(args.target || "es");
  const langpair = `${source}|${target}`;
  const data = await fetchJson(`${BASE}/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langpair)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "mymemory.translated.net", fetched_at: new Date().toISOString(), next_steps: ["Returns translated text and match quality score.", "Use ISO 639-1 language codes (en, es, fr, de, ja, zh, etc.)."] });
}
