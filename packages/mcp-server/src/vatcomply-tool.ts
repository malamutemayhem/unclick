import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.vatcomply.com";
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

export async function vatcomplyRates(args: Record<string, unknown>) {
  const country = args.country_code ? `?country_code=${encodeURIComponent(String(args.country_code))}` : "";
  const data = await fetchJson(`${BASE}/rates${country}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "vatcomply.com", fetched_at: new Date().toISOString(), next_steps: ["Returns EU VAT rates: standard, reduced, and super-reduced rates per country.", "Filter by country_code (ISO 2-letter) or get all EU countries."] });
}

export async function vatcomplyCountries(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/countries`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "vatcomply.com", fetched_at: new Date().toISOString(), next_steps: ["Returns EU member states with country name and code.", "Use the country code with vatcomply_rates for specific VAT rates."] });
}
