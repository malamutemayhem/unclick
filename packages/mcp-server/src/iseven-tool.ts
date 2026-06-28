import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.isevenapi.xyz/api";
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

export async function isEven(args: Record<string, unknown>) {
  const n = args.number != null ? Number(args.number) : NaN;
  if (Number.isNaN(n)) return { error: "number is required." };
  const data = await fetchJson(`${BASE}/iseven/${encodeURIComponent(String(n))}/`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "isevenapi.xyz", fetched_at: new Date().toISOString(), next_steps: ["Try another number."] });
}
