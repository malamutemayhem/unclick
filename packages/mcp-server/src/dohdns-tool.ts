import { stampMeta } from "./connector-meta.js";

const BASE = "https://dns.google/resolve";
const TIMEOUT = 8_000;

export async function dohdnsResolve(args: Record<string, unknown>) {
  const name = String(args.name ?? "").trim();
  if (!name) return { error: "name (domain) is required" };
  const type = String(args.type ?? "A").toUpperCase();
  const url = `${BASE}?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`;
  const res = await fetch(url, {
    headers: { Accept: "application/dns-json" },
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`DoH DNS ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `dns.google/resolve?name=${name}&type=${type}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check Answer array for resolved records", "try other record types (AAAA, MX, TXT, CNAME)"],
  });
}
