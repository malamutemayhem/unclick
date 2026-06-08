export function isIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const n = parseInt(p, 10);
    return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p;
  });
}

export function isIPv6(ip: string): boolean {
  const groups = ip.split(":");
  if (groups.length < 2 || groups.length > 8) return false;
  const emptyCount = groups.filter((g) => g === "").length;
  if (emptyCount > 1 && !(emptyCount === 2 && ip.includes("::"))) return false;
  return groups.every((g) => g === "" || /^[0-9a-fA-F]{1,4}$/.test(g));
}

export function isPrivateIP(ip: string): boolean {
  if (!isIPv4(ip)) return false;
  const parts = ip.split(".").map(Number);
  if (parts[0] === 10) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  if (parts[0] === 127) return true;
  return false;
}

export function ipToNumber(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function numberToIp(num: number): string {
  return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join(".");
}

export function isInSubnet(ip: string, cidr: string): boolean {
  const [subnetIp, bits] = cidr.split("/");
  const mask = ~((1 << (32 - parseInt(bits, 10))) - 1) >>> 0;
  return (ipToNumber(ip) & mask) === (ipToNumber(subnetIp) & mask);
}

export function subnetRange(cidr: string): { start: string; end: string; count: number } {
  const [subnetIp, bits] = cidr.split("/");
  const prefixLen = parseInt(bits, 10);
  const mask = ~((1 << (32 - prefixLen)) - 1) >>> 0;
  const network = ipToNumber(subnetIp) & mask;
  const broadcast = network | (~mask >>> 0);
  return {
    start: numberToIp(network),
    end: numberToIp(broadcast),
    count: broadcast - network + 1,
  };
}

export function expandIPv6(ip: string): string {
  let groups = ip.split(":");
  const emptyIdx = groups.indexOf("");
  if (emptyIdx >= 0) {
    const fill = 8 - groups.filter((g) => g !== "").length;
    const before = groups.slice(0, emptyIdx);
    const after = groups.slice(groups.lastIndexOf("") + 1);
    groups = [...before, ...Array(fill).fill("0000"), ...after];
  }
  return groups.map((g) => g.padStart(4, "0")).join(":");
}
