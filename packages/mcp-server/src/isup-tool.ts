import { stampMeta } from "./connector-meta.js";

const BASE = "https://isitup.org";
const TIMEOUT = 10_000;

export async function isupCheck(args: Record<string, unknown>) {
  const domain = String(args.domain ?? "").trim();
  if (!domain) return { error: "domain is required" };
  const url = `${BASE}/${encodeURIComponent(domain)}.json`;
  // isitup.org rejects requests without a custom User-Agent (returns 404).
  const res = await fetch(url, {
    headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.world)" },
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`isitup.org ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `isitup.org/${domain}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["status_code 1 means up, 2 means down, 3 means domain not valid", "check response_time for latency"],
  });
}
