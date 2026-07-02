import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.genderize.io";
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

export async function genderizePredict(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required." };
  const params = [`name=${encodeURIComponent(name)}`];
  if (args.country_id) params.push(`country_id=${encodeURIComponent(String(args.country_id))}`);
  const data = await fetchJson(`${BASE}?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ prediction: data }, { source: "api.genderize.io", fetched_at: new Date().toISOString(), next_steps: ["Add country_id (ISO 3166-1 alpha-2) for country-specific prediction.", "Pair with nationalize_predict for nationality prediction."] });
}
