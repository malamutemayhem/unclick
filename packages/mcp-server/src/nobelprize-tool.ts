import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.nobelprize.org/2.1";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: ac.signal });
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

export async function nobelPrizes(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.year) params.push(`nobelPrizeYear=${encodeURIComponent(String(args.year))}`);
  if (args.category) params.push(`nobelPrizeCategory=${encodeURIComponent(String(args.category))}`);
  params.push(`limit=${Number(args.limit) || 10}`);
  const data = await fetchJson(`${BASE}/nobelPrizes?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.nobelprize.org", fetched_at: new Date().toISOString(), next_steps: ["Filter by category: che, eco, lit, pea, phy, med.", "Use nobel_laureates to look up a specific laureate."] });
}

export async function nobelLaureates(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.name) params.push(`name=${encodeURIComponent(String(args.name))}`);
  if (args.year) params.push(`nobelPrizeYear=${encodeURIComponent(String(args.year))}`);
  if (args.category) params.push(`nobelPrizeCategory=${encodeURIComponent(String(args.category))}`);
  params.push(`limit=${Number(args.limit) || 10}`);
  const data = await fetchJson(`${BASE}/laureates?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.nobelprize.org", fetched_at: new Date().toISOString(), next_steps: ["Search by name, year, or category.", "Use nobel_prizes to see all prizes in a given year."] });
}
