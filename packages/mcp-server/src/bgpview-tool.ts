import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.bgpview.io";
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

export async function bgpviewAsn(args: Record<string, unknown>) {
  const asn = String(args.asn || "");
  if (!asn) return { error: "asn is required (e.g. 13335 for Cloudflare)." };
  const data = await fetchJson(`${BASE}/asn/${encodeURIComponent(asn)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "bgpview.io", fetched_at: new Date().toISOString(), next_steps: ["Returns ASN details: name, description, country, and RIR allocation.", "Use bgpview_asn_prefixes for IP prefixes announced by this ASN."] });
}

export async function bgpviewAsnPrefixes(args: Record<string, unknown>) {
  const asn = String(args.asn || "");
  if (!asn) return { error: "asn is required (e.g. 13335)." };
  const data = await fetchJson(`${BASE}/asn/${encodeURIComponent(asn)}/prefixes`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "bgpview.io", fetched_at: new Date().toISOString(), next_steps: ["Returns IPv4 and IPv6 prefixes announced by the ASN.", "Use bgpview_ip to look up details for a specific IP."] });
}

export async function bgpviewIp(args: Record<string, unknown>) {
  const ip = String(args.ip || "");
  if (!ip) return { error: "ip is required." };
  const data = await fetchJson(`${BASE}/ip/${encodeURIComponent(ip)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "bgpview.io", fetched_at: new Date().toISOString(), next_steps: ["Returns IP details: PTR record, prefixes, and announcing ASN.", "Use bgpview_asn with the ASN for more details."] });
}
