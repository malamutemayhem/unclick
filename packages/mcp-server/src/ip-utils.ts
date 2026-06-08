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
  if (ip.includes(":::")) return false;
  const parts = ip.split(":");
  if (parts.length < 2 || parts.length > 8) return false;
  const emptyCount = parts.filter((p) => p === "").length;
  if (emptyCount > 1 && !(emptyCount === 2 && (ip.startsWith("::") || ip.endsWith("::")))) return false;
  if (emptyCount > 3) return false;
  for (const part of parts) {
    if (part === "") continue;
    if (!/^[0-9a-fA-F]{1,4}$/.test(part)) return false;
  }
  return true;
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
  const ipNum = ipv4ToNumber(ip);
  const subnetNum = ipv4ToNumber(subnet);
  return (ipNum & mask) === (subnetNum & mask);
}

export function expandIPv6(ip: string): string {
  let parts = ip.split(":");
  const emptyIdx = parts.indexOf("");
  if (emptyIdx !== -1) {
    const before = parts.slice(0, emptyIdx).filter(Boolean);
    const after = parts.slice(emptyIdx).filter(Boolean);
    const missing = 8 - before.length - after.length;
    parts = [...before, ...Array(missing).fill("0000"), ...after];
  }
  return parts.map((p) => p.padStart(4, "0")).join(":");
}

export function compressIPv6(ip: string): string {
  const expanded = expandIPv6(ip);
  const parts = expanded.split(":");
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "0000") {
      if (curStart === -1) curStart = i;
      curLen++;
      if (curLen > bestLen) {
        bestStart = curStart;
        bestLen = curLen;
      }
    } else {
      curStart = -1;
      curLen = 0;
    }
  }

  if (bestLen <= 1) {
    return parts.map((p) => p.replace(/^0+/, "") || "0").join(":");
  }

  const before = parts.slice(0, bestStart).map((p) => p.replace(/^0+/, "") || "0");
  const after = parts.slice(bestStart + bestLen).map((p) => p.replace(/^0+/, "") || "0");
  return before.join(":") + "::" + after.join(":");
}
