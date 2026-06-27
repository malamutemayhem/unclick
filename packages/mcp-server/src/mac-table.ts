export interface MacEntry {
  mac: string;
  port: number;
  vlan: number;
  type: "dynamic" | "static" | "secure";
  timestamp: number;
  ageOut: number;
}

export class MacTable {
  private entries = new Map<string, MacEntry>();
  private portToMacs = new Map<number, Set<string>>();
  private defaultAgeOut: number;
  private maxEntries: number;

  constructor(defaultAgeOut = 300, maxEntries = 8192) {
    this.defaultAgeOut = defaultAgeOut;
    this.maxEntries = maxEntries;
  }

  learn(mac: string, port: number, vlan = 1, timestamp = Date.now()): boolean {
    const key = this.key(mac, vlan);
    const normalized = mac.toLowerCase();

    if (this.entries.size >= this.maxEntries && !this.entries.has(key)) {
      return false;
    }

    const existing = this.entries.get(key);
    if (existing && existing.type === "static") return false;

    this.entries.set(key, {
      mac: normalized,
      port,
      vlan,
      type: "dynamic",
      timestamp,
      ageOut: this.defaultAgeOut,
    });

    if (!this.portToMacs.has(port)) this.portToMacs.set(port, new Set());
    this.portToMacs.get(port)!.add(key);

    return true;
  }

  addStatic(mac: string, port: number, vlan = 1): void {
    const key = this.key(mac, vlan);
    const normalized = mac.toLowerCase();
    this.entries.set(key, {
      mac: normalized,
      port,
      vlan,
      type: "static",
      timestamp: Date.now(),
      ageOut: Infinity,
    });
    if (!this.portToMacs.has(port)) this.portToMacs.set(port, new Set());
    this.portToMacs.get(port)!.add(key);
  }

  lookup(mac: string, vlan = 1): number | null {
    const entry = this.entries.get(this.key(mac, vlan));
    return entry ? entry.port : null;
  }

  getEntry(mac: string, vlan = 1): MacEntry | null {
    const entry = this.entries.get(this.key(mac, vlan));
    return entry ? { ...entry } : null;
  }

  remove(mac: string, vlan = 1): boolean {
    const key = this.key(mac, vlan);
    const entry = this.entries.get(key);
    if (!entry) return false;
    this.portToMacs.get(entry.port)?.delete(key);
    this.entries.delete(key);
    return true;
  }

  flushPort(port: number): number {
    const macs = this.portToMacs.get(port);
    if (!macs) return 0;
    let count = 0;
    for (const key of macs) {
      const entry = this.entries.get(key);
      if (entry && entry.type !== "static") {
        this.entries.delete(key);
        count++;
      }
    }
    this.portToMacs.delete(port);
    return count;
  }

  age(now: number): number {
    let removed = 0;
    for (const [key, entry] of this.entries) {
      if (entry.type === "static") continue;
      if ((now - entry.timestamp) / 1000 > entry.ageOut) {
        this.portToMacs.get(entry.port)?.delete(key);
        this.entries.delete(key);
        removed++;
      }
    }
    return removed;
  }

  getByPort(port: number): MacEntry[] {
    const result: MacEntry[] = [];
    const macs = this.portToMacs.get(port);
    if (!macs) return result;
    for (const key of macs) {
      const entry = this.entries.get(key);
      if (entry) result.push({ ...entry });
    }
    return result;
  }

  getByVlan(vlan: number): MacEntry[] {
    return [...this.entries.values()].filter((e) => e.vlan === vlan).map((e) => ({ ...e }));
  }

  clear(type?: MacEntry["type"]): void {
    if (!type) {
      this.entries.clear();
      this.portToMacs.clear();
      return;
    }
    for (const [key, entry] of this.entries) {
      if (entry.type === type) {
        this.portToMacs.get(entry.port)?.delete(key);
        this.entries.delete(key);
      }
    }
  }

  get size(): number {
    return this.entries.size;
  }

  list(): MacEntry[] {
    return [...this.entries.values()].map((e) => ({ ...e }));
  }

  private key(mac: string, vlan: number): string {
    return `${mac.toLowerCase()}:${vlan}`;
  }
}
