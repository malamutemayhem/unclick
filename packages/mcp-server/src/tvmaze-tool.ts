import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.tvmaze.com";
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

export async function tvmazeSearch(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required." };
  const data = await fetchJson(`${BASE}/search/shows?q=${encodeURIComponent(q)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ results: data }, { source: "api.tvmaze.com", fetched_at: new Date().toISOString(), next_steps: ["Use tvmaze_show with the show id for full details."] });
}

export async function tvmazeShow(args: Record<string, unknown>) {
  const id = Number(args.id);
  if (!id) return { error: "id is required (numeric show id)." };
  const data = await fetchJson(`${BASE}/shows/${id}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ show: data }, { source: "api.tvmaze.com", fetched_at: new Date().toISOString(), next_steps: ["Use tvmaze_search to find other shows."] });
}

export async function tvmazeSchedule(args: Record<string, unknown>) {
  const country = String(args.country || "US");
  const date = args.date ? String(args.date) : "";
  const qs = date ? `country=${country}&date=${date}` : `country=${country}`;
  const data = await fetchJson(`${BASE}/schedule?${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ schedule: data }, { source: "api.tvmaze.com", fetched_at: new Date().toISOString(), next_steps: ["Use tvmaze_search to look up a specific show."] });
}
