import { stampMeta } from "./connector-meta.js";

const BASE = "https://stat.ripe.net/data";
const TIMEOUT = 10_000;

export async function ripeNetworkInfo(args: Record<string, unknown>) {
  const resource = String(args.resource ?? "").trim();
  if (!resource) return { error: "resource (IP or prefix) is required" };
  const url = `${BASE}/network-info/data.json?resource=${encodeURIComponent(resource)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`RIPEstat network-info ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `stat.ripe.net network-info/${resource}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check ASN ownership", "look up prefix details"],
  });
}

export async function ripeAsnNeighbours(args: Record<string, unknown>) {
  const asn = String(args.asn ?? "").trim();
  if (!asn) return { error: "asn is required" };
  const url = `${BASE}/asn-neighbours/data.json?resource=${encodeURIComponent(asn)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`RIPEstat asn-neighbours ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `stat.ripe.net asn-neighbours/${asn}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["map peering relationships", "check upstream providers"],
  });
}
