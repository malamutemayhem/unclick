import { stampMeta } from "./connector-meta.js";

function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every(p => {
    const n = Number(p);
    return /^\d{1,3}$/.test(p) && n >= 0 && n <= 255;
  });
}

function isValidIPv6(ip: string): boolean {
  const expanded = ip.replace("::", ":PLACEHOLDER:");
  const groups = expanded.split(":");
  if (groups.length > 8) return false;
  const placeholderCount = groups.filter(g => g === "PLACEHOLDER").length;
  if (placeholderCount > 1) return false;
  if (placeholderCount === 1) {
    const idx = groups.indexOf("PLACEHOLDER");
    const fill = 8 - (groups.length - 1);
    if (fill < 1) return false;
    groups.splice(idx, 1, ...Array(fill).fill("0"));
  }
  if (groups.length !== 8) return false;
  return groups.every(g => /^[0-9a-fA-F]{1,4}$/.test(g));
}

function classifyIPv4(ip: string): string {
  const [a, b] = ip.split(".").map(Number);
  if (a === 10) return "private (RFC 1918)";
  if (a === 172 && b >= 16 && b <= 31) return "private (RFC 1918)";
  if (a === 192 && b === 168) return "private (RFC 1918)";
  if (a === 127) return "loopback";
  if (a === 0) return "current network";
  if (a >= 224 && a <= 239) return "multicast";
  if (a >= 240) return "reserved";
  if (a === 169 && b === 254) return "link-local";
  return "public";
}

export async function ipValidate(args: Record<string, unknown>) {
  const ip = String(args.ip ?? "").trim();
  if (!ip) return { error: "ip is required" };
  const v4 = isValidIPv4(ip);
  const v6 = isValidIPv6(ip);
  if (!v4 && !v6) {
    return stampMeta({ ip, valid: false, version: null, classification: null }, {
      source: "local IP validator",
      fetched_at: new Date().toISOString(),
      next_steps: ["check format - expected dotted decimal (IPv4) or colon hex (IPv6)"],
    });
  }
  const version = v4 ? 4 : 6;
  const classification = v4 ? classifyIPv4(ip) : "IPv6";
  return stampMeta({ ip, valid: true, version, classification }, {
    source: "local IP validator",
    fetched_at: new Date().toISOString(),
    next_steps: ["check classification for private/public/loopback status", "use ip_lookup for geolocation data"],
  });
}
