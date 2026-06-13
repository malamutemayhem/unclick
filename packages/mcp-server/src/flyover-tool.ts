import { stampMeta } from "./connector-meta.js";

const BASE = "https://iss-flyover.herokuapp.com/json";
const TIMEOUT = 10_000;

export async function issFlyover(args: Record<string, unknown>) {
  const lat = Number(args.lat);
  const lon = Number(args.lon);
  if (isNaN(lat) || isNaN(lon)) return { error: "lat and lon are required" };
  const n = Math.min(Number(args.count) || 5, 20);
  const url = `${BASE}/?lat=${lat}&lon=${lon}&n=${n}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`ISS Flyover ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `iss-flyover lat=${lat}&lon=${lon}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check response array for risetime and duration", "convert risetime from Unix timestamp"],
  });
}
