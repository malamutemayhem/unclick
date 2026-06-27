export interface IPv4Header {
  version: number;
  headerLength: number;
  totalLength: number;
  ttl: number;
  protocol: number;
  srcIP: string;
  dstIP: string;
  checksum: number;
}

export function parseIPv4(ip: string): number[] {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    throw new Error(`Invalid IPv4: ${ip}`);
  }
  return parts;
}

export function formatIPv4(octets: number[]): string {
  return octets.join(".");
}

export function isPrivateIP(ip: string): boolean {
  const octets = parseIPv4(ip);
  if (octets[0] === 10) return true;
  if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return true;
  if (octets[0] === 192 && octets[1] === 168) return true;
  return false;
}

export function isLoopback(ip: string): boolean {
  return parseIPv4(ip)[0] === 127;
}

export function ipToInt(ip: string): number {
  const octets = parseIPv4(ip);
  return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
}

export function intToIP(n: number): string {
  return formatIPv4([
    (n >>> 24) & 0xff,
    (n >>> 16) & 0xff,
    (n >>> 8) & 0xff,
    n & 0xff,
  ]);
}

export function cidrContains(cidr: string, ip: string): boolean {
  const [network, prefix] = cidr.split("/");
  const bits = parseInt(prefix, 10);
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  const netInt = ipToInt(network) & mask;
  const ipInt = ipToInt(ip) & mask;
  return netInt === ipInt;
}

export function cidrRange(cidr: string): { start: string; end: string; count: number } {
  const [network, prefix] = cidr.split("/");
  const bits = parseInt(prefix, 10);
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  const netInt = ipToInt(network) & mask;
  const broadcast = (netInt | ~mask) >>> 0;
  return {
    start: intToIP(netInt),
    end: intToIP(broadcast),
    count: broadcast - netInt + 1,
  };
}

export function subnetMask(prefixLength: number): string {
  if (prefixLength < 0 || prefixLength > 32) throw new Error("Prefix must be 0-32");
  const mask = prefixLength === 0 ? 0 : (~0 << (32 - prefixLength)) >>> 0;
  return intToIP(mask);
}

export class PacketBuilder {
  private srcIP = "0.0.0.0";
  private dstIP = "0.0.0.0";
  private ttl = 64;
  private protocol = 6;
  private payload: number[] = [];

  setSrc(ip: string): this { this.srcIP = ip; return this; }
  setDst(ip: string): this { this.dstIP = ip; return this; }
  setTTL(ttl: number): this { this.ttl = ttl; return this; }
  setProtocol(proto: number): this { this.protocol = proto; return this; }
  setPayload(data: number[]): this { this.payload = data; return this; }

  build(): IPv4Header {
    return {
      version: 4,
      headerLength: 20,
      totalLength: 20 + this.payload.length,
      ttl: this.ttl,
      protocol: this.protocol,
      srcIP: this.srcIP,
      dstIP: this.dstIP,
      checksum: this.computeChecksum(),
    };
  }

  private computeChecksum(): number {
    const src = ipToInt(this.srcIP);
    const dst = ipToInt(this.dstIP);
    let sum = 0x4500 + (20 + this.payload.length) + 0 + 0 +
      ((this.ttl << 8) | this.protocol) +
      ((src >>> 16) & 0xffff) + (src & 0xffff) +
      ((dst >>> 16) & 0xffff) + (dst & 0xffff);
    while (sum > 0xffff) sum = (sum & 0xffff) + (sum >>> 16);
    return (~sum) & 0xffff;
  }
}

export class RoutingTable {
  private routes: { network: string; prefix: number; gateway: string; iface: string }[] = [];

  addRoute(cidr: string, gateway: string, iface: string): void {
    const [network, prefix] = cidr.split("/");
    this.routes.push({ network, prefix: parseInt(prefix, 10), gateway, iface });
    this.routes.sort((a, b) => b.prefix - a.prefix);
  }

  lookup(ip: string): { gateway: string; iface: string } | null {
    for (const route of this.routes) {
      if (cidrContains(`${route.network}/${route.prefix}`, ip)) {
        return { gateway: route.gateway, iface: route.iface };
      }
    }
    return null;
  }

  get routeCount(): number {
    return this.routes.length;
  }
}
