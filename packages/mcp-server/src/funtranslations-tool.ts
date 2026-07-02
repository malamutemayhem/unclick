import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.funtranslations.com/translate";
const TIMEOUT_MS = 10_000;

async function translate(dialect: string, text: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}/${dialect}.json?text=${encodeURIComponent(text)}`, {
      headers: { "User-Agent": UA },
      signal: ac.signal,
    });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded (5 calls/hour on free tier). Try again later." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function funTranslate(args: Record<string, unknown>) {
  const text = String(args.text || "");
  if (!text) return { error: "text is required." };
  const dialect = String(args.dialect || "yoda");
  const data = await translate(dialect, text);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "funtranslations.com", fetched_at: new Date().toISOString(), next_steps: ["Try different dialects: yoda, pirate, shakespeare, minion, dothraki, valyrian, pig-latin, morse."] });
}
