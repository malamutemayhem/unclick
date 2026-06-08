import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const TIMEOUT_MS = 8_000;

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
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

export async function ipInfoLookup(args: Record<string, unknown>) {
  const ip = String(args.ip ?? "").trim();
  const url = ip ? `https://ipinfo.io/${encodeURIComponent(ip)}/json` : "https://ipinfo.io/json";
  const data = await fetchJson(url);
  if (data.error) return data;
  return stampMeta(data, { source: "ipinfo.io", fetched_at: new Date().toISOString(), next_steps: ["Pass an IP address for detailed geolocation info."] });
}
