import { stampMeta } from "./connector-meta.js";

const BASE = "https://isitup.org";
const TIMEOUT = 10_000;

export async function isupCheck(args: Record<string, unknown>) {
  const domain = String(args.domain ?? "").trim();
  if (!domain) return { error: "domain is required" };
  const url = `${BASE}/${encodeURIComponent(domain)}.json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`isitup.org ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `isitup.org/${domain}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["status_code 1 means up, 2 means down, 3 means domain not valid", "check response_time for latency"],
  });
}
