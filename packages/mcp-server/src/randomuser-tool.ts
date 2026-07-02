import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://randomuser.me/api";
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

export async function randomUser(args: Record<string, unknown>) {
  const params: string[] = [];
  const count = Number(args.count) || 1;
  params.push(`results=${count}`);
  if (args.gender) params.push(`gender=${encodeURIComponent(String(args.gender))}`);
  if (args.nationality) params.push(`nat=${encodeURIComponent(String(args.nationality))}`);
  const data = await fetchJson(`${BASE}/?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "randomuser.me", fetched_at: new Date().toISOString(), next_steps: ["Generate more users with different nationalities or counts."] });
}
