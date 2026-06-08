import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://acnhapi.com/v1a";
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

export async function acnhVillagers(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/villagers/`);
  if (data && typeof data === "object" && "error" in data) return data;
  const items = Array.isArray(data) ? data : Object.values(data as Record<string, unknown>);
  return stampMeta({ villagers: items }, { source: "acnhapi.com", fetched_at: new Date().toISOString(), next_steps: ["Each villager includes name, personality, species, birthday, and catchphrase.", "Use a villager ID for detailed info."] });
}

export async function acnhFish(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/fish/`);
  if (data && typeof data === "object" && "error" in data) return data;
  const items = Array.isArray(data) ? data : Object.values(data as Record<string, unknown>);
  return stampMeta({ fish: items }, { source: "acnhapi.com", fetched_at: new Date().toISOString(), next_steps: ["Each fish includes name, availability (months, time), location, shadow size, and sell price.", "Check availability to know which fish are catchable now."] });
}

export async function acnhBugs(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/bugs/`);
  if (data && typeof data === "object" && "error" in data) return data;
  const items = Array.isArray(data) ? data : Object.values(data as Record<string, unknown>);
  return stampMeta({ bugs: items }, { source: "acnhapi.com", fetched_at: new Date().toISOString(), next_steps: ["Each bug includes name, availability, location, and sell price.", "Check availability to know which bugs are catchable in each month."] });
}
