import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.nationalize.io";
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

export async function nationalizePredict(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required." };
  const data = await fetchJson(`${BASE}?name=${encodeURIComponent(name)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ prediction: data }, { source: "api.nationalize.io", fetched_at: new Date().toISOString(), next_steps: ["Results include country codes and probability scores.", "Pair with genderize_predict for gender prediction from the same name."] });
}
