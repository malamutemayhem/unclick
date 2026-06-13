import { stampMeta } from "./connector-meta.js";

const BASE = "https://rdap.org";
const TIMEOUT = 10_000;

async function rdapFetch(path: string, label: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/rdap+json" },
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`RDAP ${label} ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `rdap.org${path}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["inspect nameservers and registrant info", "check domain expiry dates"],
  });
}

export async function rdapDomain(args: Record<string, unknown>) {
  const domain = String(args.domain ?? "").trim();
  if (!domain) return { error: "domain is required" };
  return rdapFetch(`/domain/${encodeURIComponent(domain)}`, "domain");
}

export async function rdapIp(args: Record<string, unknown>) {
  const ip = String(args.ip ?? "").trim();
  if (!ip) return { error: "ip is required" };
  return rdapFetch(`/ip/${encodeURIComponent(ip)}`, "ip");
}
