import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://jisho.org/api/v1";
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

export async function jishoSearch(args: Record<string, unknown>) {
  const keyword = String(args.keyword || "");
  if (!keyword) return { error: "keyword is required (English or Japanese)." };
  const data = await fetchJson(`${BASE}/search/words?keyword=${encodeURIComponent(keyword)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ results: data }, { source: "jisho.org", fetched_at: new Date().toISOString(), next_steps: ["Search with English words, Japanese kanji, hiragana, or romaji.", "Use #kanji tag for kanji details (e.g. '#kanji water')."] });
}
