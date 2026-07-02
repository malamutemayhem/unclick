import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://urlhaus-api.abuse.ch/v1";
const TIMEOUT_MS = 10_000;

async function post(endpoint: string, body: Record<string, string>): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}/${endpoint}/`, {
      method: "POST",
      headers: { "User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(body).toString(),
      signal: ac.signal,
    });
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

export async function urlhausLookupUrl(args: Record<string, unknown>) {
  const url = String(args.url || "");
  if (!url) return { error: "url is required." };
  const data = await post("url", { url });
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "urlhaus-api.abuse.ch", fetched_at: new Date().toISOString(), next_steps: ["Check urlhaus_recent for latest malware URLs."] });
}

export async function urlhausRecent(_args: Record<string, unknown>) {
  const data = await post("urls/recent", {});
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "urlhaus-api.abuse.ch", fetched_at: new Date().toISOString(), next_steps: ["Use urlhaus_lookup_url to check a specific URL."] });
}
