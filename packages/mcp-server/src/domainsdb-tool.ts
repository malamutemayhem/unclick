import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.domainsdb.info/v1";
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

export async function domainsdbSearch(args: Record<string, unknown>) {
  const domain = String(args.domain || "");
  if (!domain) return { error: "domain search term is required (e.g. 'google', 'shop.com')." };
  const params: string[] = [`domain=${encodeURIComponent(domain)}`];
  if (args.zone) params.push(`zone=${encodeURIComponent(String(args.zone))}`);
  params.push(`limit=${Number(args.limit) || 20}`);
  const data = await fetchJson(`${BASE}/domains/search?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.domainsdb.info", fetched_at: new Date().toISOString(), next_steps: ["Filter by zone (e.g. 'com', 'org', 'io').", "Results include domain name, create/update dates, and country."] });
}

export async function domainsdbTlds(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/info/tld`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.domainsdb.info", fetched_at: new Date().toISOString(), next_steps: ["Use a TLD zone with domainsdb_search to narrow results."] });
}
