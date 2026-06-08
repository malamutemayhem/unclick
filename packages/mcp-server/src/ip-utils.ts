export function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const n = parseInt(p, 10);
    return String(n) === p && n >= 0 && n <= 255;
  });
}

export function isValidIPv6(ip: string): boolean {
  if (ip.includes("::")) {
    const halves = ip.split("::");
    if (halves.length > 2) return false;
    const left = halves[0] ? halves[0].split(":") : [];
    const right = halves[1] ? halves[1].split(":") : [];
    if (left.length + right.length > 7) return false;
    return [...left, ...right].every(isValidHextet);
  }
  const parts = ip.split(":");
  if (parts.length !== 8) return false;
  return parts.every(isValidHextet);
}

export function isPrivateIPv4(ip: string): boolean {
  if (!isValidIPv4(ip)) return false;
  const parts = ip.split(".").map(Number);
  if (parts[0] === 10) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  if (parts[0] === 127) return true;
  return false;
}

export function ipv4ToNumber(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function numberToIPv4(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".");
}

export function isInSubnet(ip: string, cidr: string): boolean {
  const [subnet, bits] = cidr.split("/");
  const mask = ~((1 << (32 - parseInt(bits, 10))) - 1) >>> 0;
  return (ipv4ToNumber(ip) & mask) === (ipv4ToNumber(subnet) & mask);
}

function isValidHextet(h: string): boolean {
  return /^[0-9a-fA-F]{1,4}$/.test(h);
}
