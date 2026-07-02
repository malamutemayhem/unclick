import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.le-systeme-solaire.net/rest";
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

export async function solarsystemBodies(args: Record<string, unknown>) {
  const filter = String(args.filter || "");
  let url = `${BASE}/bodies/`;
  if (filter) url += `?filter[]=bodyType,eq,${encodeURIComponent(filter)}`;
  const data = await fetchJson(url);
  if (data && typeof data === "object" && "error" in data) return data;
  const obj = data as Record<string, unknown>;
  let bodies = obj.bodies ?? data;
  if (Array.isArray(bodies) && args.limit) bodies = bodies.slice(0, Number(args.limit));
  return stampMeta({ bodies }, { source: "api.le-systeme-solaire.net", fetched_at: new Date().toISOString(), next_steps: ["Filter by bodyType: Star, Planet, Dwarf Planet, Asteroid, Comet, Moon.", "Use solarsystem_body for detailed info on a specific body."] });
}

export async function solarsystemBody(args: Record<string, unknown>) {
  const id = String(args.id || "");
  if (!id) return { error: "id is required (e.g. 'terre' for Earth, 'mars', 'jupiter')." };
  const data = await fetchJson(`${BASE}/bodies/${encodeURIComponent(id)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ body: data }, { source: "api.le-systeme-solaire.net", fetched_at: new Date().toISOString(), next_steps: ["Use solarsystem_bodies to list all bodies or filter by type."] });
}
