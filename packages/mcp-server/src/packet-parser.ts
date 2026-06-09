export interface ParsedPacket {
  srcMac: string;
  dstMac: string;
  etherType: number;
  srcIp: string;
  dstIp: string;
  protocol: number;
  srcPort: number;
  dstPort: number;
  ttl: number;
  flags: string[];
  payloadLength: number;
  raw: number[];
}

export class PacketBuilder {
  private srcMac = "00:00:00:00:00:00";
  private dstMac = "ff:ff:ff:ff:ff:ff";
  private etherType = 0x0800;
  private srcIp = "0.0.0.0";
  private dstIp = "0.0.0.0";
  private protocol = 6;
  private srcPort = 0;
  private dstPort = 0;
  private ttl = 64;
  private flags: string[] = [];
  private payload: number[] = [];

  setSrcMac(mac: string): this { this.srcMac = mac; return this; }
  setDstMac(mac: string): this { this.dstMac = mac; return this; }
  setEtherType(t: number): this { this.etherType = t; return this; }
  setSrcIp(ip: string): this { this.srcIp = ip; return this; }
  setDstIp(ip: string): this { this.dstIp = ip; return this; }
  setProtocol(p: number): this { this.protocol = p; return this; }
  setSrcPort(p: number): this { this.srcPort = p; return this; }
  setDstPort(p: number): this { this.dstPort = p; return this; }
  setTTL(t: number): this { this.ttl = t; return this; }
  setFlags(f: string[]): this { this.flags = f; return this; }
  setPayload(data: number[]): this { this.payload = data; return this; }

  build(): ParsedPacket {
    const raw = [
      ...this.macToBytes(this.dstMac),
      ...this.macToBytes(this.srcMac),
      (this.etherType >> 8) & 0xff, this.etherType & 0xff,
      ...this.ipToBytes(this.srcIp),
      ...this.ipToBytes(this.dstIp),
      this.protocol,
      this.ttl,
      (this.srcPort >> 8) & 0xff, this.srcPort & 0xff,
      (this.dstPort >> 8) & 0xff, this.dstPort & 0xff,
      ...this.payload,
    ];

    return {
      srcMac: this.srcMac.toLowerCase(),
      dstMac: this.dstMac.toLowerCase(),
      etherType: this.etherType,
      srcIp: this.srcIp,
      dstIp: this.dstIp,
      protocol: this.protocol,
      srcPort: this.srcPort,
      dstPort: this.dstPort,
      ttl: this.ttl,
      flags: [...this.flags],
      payloadLength: this.payload.length,
      raw,
    };
  }

  private macToBytes(mac: string): number[] {
    return mac.split(":").map((h) => parseInt(h, 16));
  }

  private ipToBytes(ip: string): number[] {
    return ip.split(".").map(Number);
  }
}

export function parseEtherType(code: number): string {
  const types: Record<number, string> = {
    0x0800: "IPv4",
    0x0806: "ARP",
    0x86dd: "IPv6",
    0x8100: "VLAN",
    0x8847: "MPLS",
    0x88cc: "LLDP",
  };
  return types[code] || `Unknown(0x${code.toString(16)})`;
}

export function parseProtocol(code: number): string {
  const protocols: Record<number, string> = {
    1: "ICMP",
    6: "TCP",
    17: "UDP",
    47: "GRE",
    50: "ESP",
    89: "OSPF",
  };
  return protocols[code] || `Unknown(${code})`;
}

export function formatMac(mac: string): string {
  return mac.toLowerCase().replace(/[^a-f0-9]/g, "").replace(/(.{2})/g, "$1:").slice(0, -1);
}

export function isValidMac(mac: string): boolean {
  return /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/.test(mac);
}

export function isValidIpv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const n = Number(p);
    return Number.isInteger(n) && n >= 0 && n <= 255;
  });
}

export function ipToInt(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function intToIp(n: number): string {
  return `${(n >>> 24) & 255}.${(n >>> 16) & 255}.${(n >>> 8) & 255}.${n & 255}`;
}
