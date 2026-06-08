export type RecordType = "A" | "AAAA" | "CNAME" | "MX" | "NS" | "TXT" | "SOA" | "PTR";

export interface DNSRecord {
  name: string;
  type: RecordType;
  value: string;
  ttl: number;
  priority?: number;
  expires: number;
}

export interface CacheEntry {
  record: DNSRecord;
  insertedAt: number;
}

export class DNSZone {
  readonly domain: string;
  private records: DNSRecord[] = [];

  constructor(domain: string) {
    this.domain = domain;
  }

  addRecord(name: string, type: RecordType, value: string, ttl = 3600, priority?: number): void {
    this.records.push({ name, type, value, ttl, priority, expires: Date.now() + ttl * 1000 });
  }

  query(name: string, type: RecordType): DNSRecord[] {
    return this.records.filter((r) => r.name === name && r.type === type);
  }

  allRecords(): DNSRecord[] {
    return [...this.records];
  }

  removeRecord(name: string, type: RecordType): boolean {
    const before = this.records.length;
    this.records = this.records.filter((r) => !(r.name === name && r.type === type));
    return this.records.length < before;
  }

  recordCount(): number {
    return this.records.length;
  }
}

export class DNSCache {
  private entries = new Map<string, CacheEntry[]>();
  private maxSize: number;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  private key(name: string, type: RecordType): string {
    return `${name}:${type}`;
  }

  put(record: DNSRecord): void {
    const k = this.key(record.name, record.type);
    const existing = this.entries.get(k) ?? [];
    existing.push({ record, insertedAt: Date.now() });
    this.entries.set(k, existing);
    if (this.totalEntries() > this.maxSize) {
      this.evictOldest();
    }
  }

  get(name: string, type: RecordType): DNSRecord[] {
    const k = this.key(name, type);
    const entries = this.entries.get(k);
    if (!entries) return [];
    return entries.map((e) => e.record);
  }

  invalidate(name: string, type: RecordType): void {
    this.entries.delete(this.key(name, type));
  }

  clear(): void {
    this.entries.clear();
  }

  totalEntries(): number {
    let count = 0;
    for (const entries of this.entries.values()) {
      count += entries.length;
    }
    return count;
  }

  private evictOldest(): void {
    let oldestKey = "";
    let oldestTime = Infinity;
    for (const [key, entries] of this.entries) {
      for (const entry of entries) {
        if (entry.insertedAt < oldestTime) {
          oldestTime = entry.insertedAt;
          oldestKey = key;
        }
      }
    }
    if (oldestKey) this.entries.delete(oldestKey);
  }
}

export class DNSResolver {
  private zones: DNSZone[] = [];
  private cache: DNSCache;
  private maxDepth: number;

  constructor(cacheSize = 1000, maxDepth = 10) {
    this.cache = new DNSCache(cacheSize);
    this.maxDepth = maxDepth;
  }

  addZone(zone: DNSZone): void {
    this.zones.push(zone);
  }

  resolve(name: string, type: RecordType): DNSRecord[] {
    return this.resolveRecursive(name, type, 0);
  }

  private resolveRecursive(name: string, type: RecordType, depth: number): DNSRecord[] {
    if (depth > this.maxDepth) return [];

    const cached = this.cache.get(name, type);
    if (cached.length > 0) return cached;

    for (const zone of this.zones) {
      const records = zone.query(name, type);
      if (records.length > 0) {
        for (const r of records) this.cache.put(r);
        return records;
      }

      if (type !== "CNAME") {
        const cnames = zone.query(name, "CNAME");
        if (cnames.length > 0) {
          return this.resolveRecursive(cnames[0].value, type, depth + 1);
        }
      }
    }

    return [];
  }

  clearCache(): void {
    this.cache.clear();
  }

  cacheSize(): number {
    return this.cache.totalEntries();
  }
}
