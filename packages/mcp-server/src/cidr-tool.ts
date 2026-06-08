import { stampMeta } from "./connector-meta.js";

export async function cidrCalculate(args: Record<string, unknown>) {
  const cidr = String(args.cidr ?? "").trim();
  if (!cidr) return { error: "cidr (e.g. 192.168.1.0/24) is required" };
  const match = cidr.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)\/(\d+)$/);
  if (!match) return { error: "Invalid CIDR format. Use: x.x.x.x/prefix" };
  const octets = [+match[1], +match[2], +match[3], +match[4]];
  const prefix = +match[5];
  if (octets.some(o => o > 255) || prefix > 32) return { error: "Invalid IP or prefix length" };
  const ip = (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3];
  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | ~mask) >>> 0;
  const toIp = (n: number) => `${(n >>> 24) & 0xff}.${(n >>> 16) & 0xff}.${(n >>> 8) & 0xff}.${n & 0xff}`;
  const totalHosts = Math.pow(2, 32 - prefix);
  const usableHosts = prefix <= 30 ? totalHosts - 2 : totalHosts;
  return stampMeta({
    cidr,
    network_address: toIp(network),
    broadcast_address: toIp(broadcast),
    subnet_mask: toIp(mask),
    prefix_length: prefix,
    total_hosts: totalHosts,
    usable_hosts: Math.max(usableHosts, 0),
    first_usable: prefix <= 30 ? toIp(network + 1) : toIp(network),
    last_usable: prefix <= 30 ? toIp(broadcast - 1) : toIp(broadcast),
  }, {
    source: "local CIDR calculator",
    fetched_at: new Date().toISOString(),
    next_steps: ["use network_address and broadcast_address for subnet planning", "check usable_hosts for capacity"],
  });
}
