import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.spacexdata.com/v4";
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

export async function spacexLatestLaunch(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/launches/latest`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ launch: data }, { source: "api.spacexdata.com", fetched_at: new Date().toISOString(), next_steps: ["Use spacex_launches to list all launches.", "Use spacex_rockets for rocket specs."] });
}

export async function spacexLaunches(args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/launches`);
  if (data && typeof data === "object" && "error" in data) return data;
  const items = Array.isArray(data) ? data.slice(-(Number(args.limit) || 10)) : data;
  return stampMeta({ launches: items }, { source: "api.spacexdata.com", fetched_at: new Date().toISOString(), next_steps: ["Use spacex_latest_launch for the most recent launch.", "Use spacex_rockets for rocket details."] });
}

export async function spacexRockets(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/rockets`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ rockets: data }, { source: "api.spacexdata.com", fetched_at: new Date().toISOString(), next_steps: ["Use spacex_launches to see launch history for each rocket."] });
}
