import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://amiiboapi.com/api";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: ac.signal,
    });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return (await res.json()) as Record<string, unknown>;
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function amiiboSearch(args: Record<string, unknown>) {
  const name = String(args.name ?? "").trim();
  if (!name) return { error: "name is required." };
  const data = await fetchJson(`${BASE}/amiibo/?name=${encodeURIComponent(name)}`);
  if (data.error) return data;
  return stampMeta(data, { source: "amiiboapi.com", fetched_at: new Date().toISOString(), next_steps: ["Use amiibo_by_series to filter by game series."] });
}

export async function amiiboBySeries(args: Record<string, unknown>) {
  const series = String(args.series ?? "").trim();
  if (!series) return { error: "series is required (e.g. Super Mario, Zelda)." };
  const data = await fetchJson(`${BASE}/amiibo/?amiiboSeries=${encodeURIComponent(series)}`);
  if (data.error) return data;
  return stampMeta(data, { source: "amiiboapi.com", fetched_at: new Date().toISOString(), next_steps: ["Use amiibo_search to find by character name."] });
}

export async function amiiboTypes(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/type`);
  if (data.error) return data;
  return stampMeta(data, { source: "amiiboapi.com", fetched_at: new Date().toISOString(), next_steps: ["Use amiibo_search to find specific amiibos."] });
}
