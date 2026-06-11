import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const TIMEOUT_MS = 8_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
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

export async function excuserRandom(args: Record<string, unknown>) {
  const category = String(args.category ?? "").trim();
  const url = category
    ? `https://excuser-three.vercel.app/v1/excuse/${encodeURIComponent(category)}`
    : "https://excuser-three.vercel.app/v1/excuse";
  const data = await fetchJson(url);
  if (data && typeof data === "object" && "error" in data) return data;
  const arr = Array.isArray(data) ? data : [data];
  return stampMeta({ excuse: arr[0] }, { source: "excuser-three.vercel.app", fetched_at: new Date().toISOString(), next_steps: ["Try category=family, office, college, party, or unspecified."] });
}
