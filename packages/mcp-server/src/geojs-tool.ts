import { stampMeta } from "./connector-meta.js";

const BASE = "https://get.geojs.io/v1";
const TIMEOUT = 8_000;

export async function geojsLookup(args: Record<string, unknown>) {
  const ip = String(args.ip ?? "").trim();
  const url = ip
    ? `${BASE}/ip/geo/${encodeURIComponent(ip)}.json`
    : `${BASE}/ip/geo.json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`GeoJS ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: ip ? `get.geojs.io geo/${ip}` : "get.geojs.io geo (self)",
    fetched_at: new Date().toISOString(),
    next_steps: ["use latitude/longitude for mapping", "check country_code and region"],
  });
}
