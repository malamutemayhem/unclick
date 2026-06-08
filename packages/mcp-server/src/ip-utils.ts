export function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p: string) => {
    const n = Number(p);
    return /^\d{1,3}$/.test(p) && n >= 0 && n <= 255;
  });
}

export function isValidIPv6(ip: string): boolean {
  const expanded = expandIPv6(ip);
  if (!expanded) return false;
  const groups = expanded.split(":");
  return groups.length === 8 && groups.every((g: string) => /^[0-9a-f]{1,4}$/i.test(g));
}

export function expandIPv6(ip: string): string | null {
  if (ip.includes("::")) {
    const parts = ip.split("::");
    if (parts.length > 2) return null;
    const left = parts[0] ? parts[0].split(":") : [];
    const right = parts[1] ? parts[1].split(":") : [];
    const missing = 8 - left.length - right.length;
    if (missing < 0) return null;
    const middle = Array(missing).fill("0");
    return [...left, ...middle, ...right].join(":");
  }
  return ip;
}

export function ipToNumber(ip: string): number {
  const parts = ip.split(".");
  return parts.reduce((acc: number, part: string) => (acc << 8) + Number(part), 0) >>> 0;
}

export function numberToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".");
}

export function isInCIDR(ip: string, cidr: string): boolean {
  const [network, maskStr] = cidr.split("/");
  const mask = parseInt(maskStr, 10);
  const ipNum = ipToNumber(ip);
  const netNum = ipToNumber(network);
  const bitmask = mask === 0 ? 0 : (~0 << (32 - mask)) >>> 0;
  return (ipNum & bitmask) === (netNum & bitmask);
}

export function isPrivate(ip: string): boolean {
  return isInCIDR(ip, "10.0.0.0/8") ||
    isInCIDR(ip, "172.16.0.0/12") ||
    isInCIDR(ip, "192.168.0.0/16") ||
    isInCIDR(ip, "127.0.0.0/8");
}
