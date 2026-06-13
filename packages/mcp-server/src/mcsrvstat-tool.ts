import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
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

export async function mcServerStatus(args: Record<string, unknown>) {
  const address = String(args.address ?? "").trim();
  if (!address) return { error: "address is required (e.g. mc.hypixel.net)." };
  const edition = String(args.edition ?? "java").toLowerCase();
  const endpoint = edition === "bedrock" ? "bedrock/3" : "3";
  const data = await fetchJson(`https://api.mcsrvstat.us/${endpoint}/${encodeURIComponent(address)}`);
  if (data.error) return data;
  return stampMeta(data, { source: "api.mcsrvstat.us", fetched_at: new Date().toISOString(), next_steps: ["Try edition=bedrock for Bedrock servers."] });
}
