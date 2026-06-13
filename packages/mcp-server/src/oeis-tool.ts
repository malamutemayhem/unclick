import { stampMeta } from "./connector-meta.js";

const BASE = "https://oeis.org/search";
const TIMEOUT = 10_000;

export async function oeisSearch(args: Record<string, unknown>) {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (sequence like '1,1,2,3,5' or keyword)" };
  const start = Number(args.start) || 0;
  const url = `${BASE}?q=${encodeURIComponent(query)}&start=${start}&fmt=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`OEIS search ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `oeis.org search "${query}"`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check results array for matching sequences", "look at the name and formula fields"],
  });
}
