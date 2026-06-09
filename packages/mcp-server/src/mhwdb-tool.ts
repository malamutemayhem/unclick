import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://mhw-db.com";
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

export async function mhwMonsters(args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/monsters`);
  if (data && typeof data === "object" && "error" in data) return data;
  let items = Array.isArray(data) ? data : [];
  if (args.name) {
    const q = String(args.name).toLowerCase();
    items = items.filter((m: Record<string, unknown>) => String(m.name || "").toLowerCase().includes(q));
  }
  items = items.slice(0, Number(args.limit) || 10);
  return stampMeta({ monsters: items }, { source: "mhw-db.com", fetched_at: new Date().toISOString(), next_steps: ["Search by name to find a specific monster.", "Use mhw_weapons or mhw_armor to browse equipment."] });
}

export async function mhwWeapons(args: Record<string, unknown>) {
  const type = String(args.type || "great-sword");
  const data = await fetchJson(`${BASE}/weapons?q={"type":"${type}"}`);
  if (data && typeof data === "object" && "error" in data) return data;
  const items = Array.isArray(data) ? data.slice(0, Number(args.limit) || 10) : data;
  return stampMeta({ weapons: items }, { source: "mhw-db.com", fetched_at: new Date().toISOString(), next_steps: ["Weapon types: great-sword, long-sword, sword-and-shield, dual-blades, hammer, hunting-horn, lance, gunlance, switch-axe, charge-blade, insect-glaive, bow, light-bowgun, heavy-bowgun."] });
}
