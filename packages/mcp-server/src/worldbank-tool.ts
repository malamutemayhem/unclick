import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.worldbank.org/v2";
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

export async function worldbankCountry(args: Record<string, unknown>) {
  const code = String(args.code || "all");
  const data = await fetchJson(`${BASE}/country/${encodeURIComponent(code)}?format=json&per_page=50`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.worldbank.org", fetched_at: new Date().toISOString(), next_steps: ["Use worldbank_indicator with a country code and indicator ID for economic data."] });
}

export async function worldbankIndicator(args: Record<string, unknown>) {
  const country = String(args.country || "US");
  const indicator = String(args.indicator || "");
  if (!indicator) return { error: "indicator is required (e.g. NY.GDP.MKTP.CD for GDP, SP.POP.TOTL for population)." };
  const date = args.date ? `&date=${args.date}` : "&date=2015:2023";
  const data = await fetchJson(`${BASE}/country/${encodeURIComponent(country)}/indicator/${encodeURIComponent(indicator)}?format=json&per_page=20${date}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.worldbank.org", fetched_at: new Date().toISOString(), next_steps: ["Common indicators: NY.GDP.MKTP.CD (GDP), SP.POP.TOTL (population), EN.ATM.CO2E.KT (CO2 emissions)."] });
}
