import { stampMeta } from "./connector-meta.js";

const BASE = "https://archive.org/wayback/available";
const TIMEOUT = 10_000;

export async function waybackCheck(args: Record<string, unknown>) {
  const url = String(args.url ?? "").trim();
  if (!url) return { error: "url is required" };
  const timestamp = String(args.timestamp ?? "").trim();
  const params = new URLSearchParams({ url });
  if (timestamp) params.set("timestamp", timestamp);
  const endpoint = `${BASE}?${params.toString()}`;
  const res = await fetch(endpoint, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`Wayback Machine ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `archive.org/wayback url=${url}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check archived_snapshots.closest for the nearest snapshot", "use the snapshot URL to view the archived page"],
  });
}
