export function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    if (!/^\d{1,3}$/.test(p)) return false;
    const n = parseInt(p, 10);
    return n >= 0 && n <= 255 && String(n) === p;
  });
}

export function isValidIPv6(ip: string): boolean {
  const groups = ip.split(":");
  if (groups.length < 3 || groups.length > 8) return false;
  const emptyCount = groups.filter((g) => g === "").length;
  if (emptyCount > 1 && !(emptyCount <= 3 && ip.includes("::"))) return false;
  for (const g of groups) {
    if (g === "") continue;
    if (!/^[0-9a-fA-F]{1,4}$/.test(g)) return false;
  }
  return true;
}

export function ipv4ToLong(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function longToIPv4(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".");
}

export function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts[0] === 10) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  return false;
}

export function ipInCIDR(ip: string, cidr: string): boolean {
  const [network, bits] = cidr.split("/");
  const mask = ~((1 << (32 - parseInt(bits, 10))) - 1) >>> 0;
  return (ipv4ToLong(ip) & mask) === (ipv4ToLong(network) & mask);
}

export function expandCIDR(cidr: string): { first: string; last: string; count: number } {
  const [network, bits] = cidr.split("/");
  const prefix = parseInt(bits, 10);
  const mask = ~((1 << (32 - prefix)) - 1) >>> 0;
  const net = ipv4ToLong(network) & mask;
  const broadcast = net | (~mask >>> 0);
  return {
    first: longToIPv4(net),
    last: longToIPv4(broadcast),
    count: broadcast - net + 1,
  };
}
