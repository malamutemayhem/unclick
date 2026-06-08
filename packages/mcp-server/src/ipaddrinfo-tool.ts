import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
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

export async function ipAddressLookup(args: Record<string, unknown>) {
  const ip = String(args.ip || "");
  const url = ip ? `https://ipwho.is/${encodeURIComponent(ip)}` : "https://ipwho.is/";
  const data = await fetchJson(url);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ location: data }, { source: "ipwho.is", fetched_at: new Date().toISOString(), next_steps: ["Provide an IP address, or omit to look up the current server IP.", "Results include country, city, ISP, timezone, and coordinates."] });
}
