export interface NatEntry {
  internalIp: string;
  internalPort: number;
  externalIp: string;
  externalPort: number;
  protocol: "tcp" | "udp";
  timestamp: number;
  ttl: number;
}

export class NatTable {
  private entries = new Map<string, NatEntry>();
  private reverseMap = new Map<string, string>();
  private nextPort: number;
  private externalIp: string;
  private defaultTtl: number;

  constructor(externalIp: string, startPort = 10000, defaultTtl = 300) {
    this.externalIp = externalIp;
    this.nextPort = startPort;
    this.defaultTtl = defaultTtl;
  }

  translate(internalIp: string, internalPort: number, protocol: "tcp" | "udp" = "tcp"): NatEntry {
    const key = `${internalIp}:${internalPort}:${protocol}`;
    const existing = this.entries.get(key);
    if (existing) {
      existing.timestamp = Date.now();
      return { ...existing };
    }

    const externalPort = this.nextPort++;
    const entry: NatEntry = {
      internalIp,
      internalPort,
      externalIp: this.externalIp,
      externalPort,
      protocol,
      timestamp: Date.now(),
      ttl: this.defaultTtl,
    };
    this.entries.set(key, entry);
    this.reverseMap.set(`${this.externalIp}:${externalPort}:${protocol}`, key);
    return { ...entry };
  }

  reverseTranslate(
    externalIp: string,
    externalPort: number,
    protocol: "tcp" | "udp" = "tcp"
  ): { internalIp: string; internalPort: number } | null {
    const reverseKey = `${externalIp}:${externalPort}:${protocol}`;
    const forwardKey = this.reverseMap.get(reverseKey);
    if (!forwardKey) return null;
    const entry = this.entries.get(forwardKey);
    if (!entry) return null;
    return { internalIp: entry.internalIp, internalPort: entry.internalPort };
  }

  remove(internalIp: string, internalPort: number, protocol: "tcp" | "udp" = "tcp"): boolean {
    const key = `${internalIp}:${internalPort}:${protocol}`;
    const entry = this.entries.get(key);
    if (!entry) return false;
    this.reverseMap.delete(`${entry.externalIp}:${entry.externalPort}:${protocol}`);
    this.entries.delete(key);
    return true;
  }

  addStaticMapping(
    internalIp: string,
    internalPort: number,
    externalPort: number,
    protocol: "tcp" | "udp" = "tcp"
  ): void {
    const key = `${internalIp}:${internalPort}:${protocol}`;
    const entry: NatEntry = {
      internalIp,
      internalPort,
      externalIp: this.externalIp,
      externalPort,
      protocol,
      timestamp: Date.now(),
      ttl: Infinity,
    };
    this.entries.set(key, entry);
    this.reverseMap.set(`${this.externalIp}:${externalPort}:${protocol}`, key);
  }

  get size(): number {
    return this.entries.size;
  }

  list(): NatEntry[] {
    return [...this.entries.values()].map((e) => ({ ...e }));
  }

  getEntry(internalIp: string, internalPort: number, protocol: "tcp" | "udp" = "tcp"): NatEntry | null {
    const key = `${internalIp}:${internalPort}:${protocol}`;
    const entry = this.entries.get(key);
    return entry ? { ...entry } : null;
  }

  clear(): void {
    this.entries.clear();
    this.reverseMap.clear();
  }

  byInternalIp(ip: string): NatEntry[] {
    return this.list().filter((e) => e.internalIp === ip);
  }
}
