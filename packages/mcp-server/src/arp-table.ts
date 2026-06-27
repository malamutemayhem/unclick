export interface ArpEntry {
  ip: string;
  mac: string;
  type: "static" | "dynamic";
  timestamp: number;
  ttl: number;
}

export class ArpTable {
  private entries = new Map<string, ArpEntry>();
  private defaultTtl: number;
  private maxEntries: number;

  constructor(defaultTtl = 300, maxEntries = 1024) {
    this.defaultTtl = defaultTtl;
    this.maxEntries = maxEntries;
  }

  add(ip: string, mac: string, type: "static" | "dynamic" = "dynamic", ttl?: number): void {
    if (this.entries.size >= this.maxEntries && !this.entries.has(ip)) {
      this.evictOldest();
    }
    this.entries.set(ip, {
      ip,
      mac: mac.toLowerCase(),
      type,
      timestamp: Date.now(),
      ttl: ttl ?? this.defaultTtl,
    });
  }

  lookup(ip: string): string | null {
    const entry = this.entries.get(ip);
    if (!entry) return null;
    if (entry.type === "dynamic" && this.isExpired(entry)) {
      this.entries.delete(ip);
      return null;
    }
    return entry.mac;
  }

  resolve(ip: string): ArpEntry | null {
    const entry = this.entries.get(ip);
    if (!entry) return null;
    if (entry.type === "dynamic" && this.isExpired(entry)) {
      this.entries.delete(ip);
      return null;
    }
    return { ...entry };
  }

  remove(ip: string): boolean {
    return this.entries.delete(ip);
  }

  clear(type?: "static" | "dynamic"): void {
    if (!type) {
      this.entries.clear();
      return;
    }
    for (const [ip, entry] of this.entries) {
      if (entry.type === type) this.entries.delete(ip);
    }
  }

  private isExpired(entry: ArpEntry): boolean {
    return (Date.now() - entry.timestamp) / 1000 > entry.ttl;
  }

  private evictOldest(): void {
    let oldest: string | null = null;
    let oldestTime = Infinity;
    for (const [ip, entry] of this.entries) {
      if (entry.type === "dynamic" && entry.timestamp < oldestTime) {
        oldest = ip;
        oldestTime = entry.timestamp;
      }
    }
    if (oldest) this.entries.delete(oldest);
  }

  get size(): number {
    return this.entries.size;
  }

  list(): ArpEntry[] {
    return [...this.entries.values()].map((e) => ({ ...e }));
  }

  has(ip: string): boolean {
    return this.entries.has(ip);
  }

  reverseLookup(mac: string): string[] {
    const normalized = mac.toLowerCase();
    const results: string[] = [];
    for (const [, entry] of this.entries) {
      if (entry.mac === normalized) results.push(entry.ip);
    }
    return results;
  }

  getSubnet(prefix: string): ArpEntry[] {
    return this.list().filter((e) => e.ip.startsWith(prefix));
  }
}
