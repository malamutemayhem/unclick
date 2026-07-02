import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://www.freetogame.com/api";
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

export async function freetogameList(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.platform) params.push(`platform=${encodeURIComponent(String(args.platform))}`);
  if (args.category) params.push(`category=${encodeURIComponent(String(args.category))}`);
  if (args.sort_by) params.push(`sort-by=${encodeURIComponent(String(args.sort_by))}`);
  const qs = params.length ? `?${params.join("&")}` : "";
  const data = await fetchJson(`${BASE}/games${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ games: data }, { source: "freetogame.com", fetched_at: new Date().toISOString(), next_steps: ["Use freetogame_detail with a game id for full info."] });
}

export async function freetogameDetail(args: Record<string, unknown>) {
  const id = Number(args.id);
  if (!id) return { error: "id is required (numeric game id)." };
  const data = await fetchJson(`${BASE}/game?id=${id}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ game: data }, { source: "freetogame.com", fetched_at: new Date().toISOString(), next_steps: ["Use freetogame_list to browse more free games."] });
}
