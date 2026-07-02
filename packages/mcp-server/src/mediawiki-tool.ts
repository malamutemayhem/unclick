import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return (await res.json()) as Record<string, unknown>;
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function wiktionaryLookup(args: Record<string, unknown>) {
  const word = String(args.word ?? "").trim();
  if (!word) return { error: "word is required." };
  const lang = String(args.language ?? "en");
  const url = `https://${lang}.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`;
  const data = await fetchJson(url);
  if (data.error) return data;
  return stampMeta(data, { source: `${lang}.wiktionary.org`, fetched_at: new Date().toISOString(), next_steps: ["Try language=fr, de, es, etc. for other languages."] });
}
