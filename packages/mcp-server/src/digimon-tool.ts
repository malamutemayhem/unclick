import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://digimon-api.vercel.app/api/digimon";
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

export async function digimonAll(_args: Record<string, unknown>) {
  const data = await fetchJson(BASE);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ digimon: data }, { source: "digimon-api.vercel.app", fetched_at: new Date().toISOString(), next_steps: ["Use digimon_by_name to look up a specific Digimon.", "Use digimon_by_level to filter by level (Rookie, Champion, etc.)."] });
}

export async function digimonByName(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required." };
  const data = await fetchJson(`${BASE}/name/${encodeURIComponent(name)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ digimon: data }, { source: "digimon-api.vercel.app", fetched_at: new Date().toISOString(), next_steps: ["Use digimon_all to browse all Digimon.", "Use digimon_by_level to filter by level."] });
}

export async function digimonByLevel(args: Record<string, unknown>) {
  const level = String(args.level || "");
  if (!level) return { error: "level is required (e.g. Fresh, In Training, Rookie, Champion, Ultimate, Mega)." };
  const data = await fetchJson(`${BASE}/level/${encodeURIComponent(level)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ digimon: data }, { source: "digimon-api.vercel.app", fetched_at: new Date().toISOString(), next_steps: ["Use digimon_by_name to look up a specific Digimon.", "Try other levels: Fresh, In Training, Rookie, Champion, Ultimate, Mega."] });
}
