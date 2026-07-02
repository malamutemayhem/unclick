import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.citybik.es/v2";
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

export async function citybikesNetworks(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/networks`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "citybik.es", fetched_at: new Date().toISOString(), next_steps: ["Returns all bike-sharing networks worldwide with id, name, city, and country.", "Use the network id to get station details."] });
}

export async function citybikesNetwork(args: Record<string, unknown>) {
  const id = String(args.id || "");
  if (!id) return { error: "id is required (e.g. 'citi-bike-nyc', 'velib-metropole')." };
  const data = await fetchJson(`${BASE}/networks/${encodeURIComponent(id)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "citybik.es", fetched_at: new Date().toISOString(), next_steps: ["Includes all stations with available bikes, empty slots, and coordinates.", "Use citybikes_networks to browse all networks."] });
}
