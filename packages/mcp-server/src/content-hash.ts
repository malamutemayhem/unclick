// Content hashing and fingerprinting.
// Provides fast, deterministic hashes for content-addressable caching,
// deduplication, and change detection without pulling in heavy crypto libs.

// FNV-1a 32-bit hash - fast, good distribution, no dependencies.
export function fnv1a32(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function fnv1aHex(input: string): string {
  return fnv1a32(input).toString(16).padStart(8, "0");
}

// Deterministic JSON fingerprint: sorts keys, strips whitespace.
export function jsonFingerprint(obj: unknown): string {
  return fnv1aHex(stableStringify(obj));
}

function stableStringify(val: unknown): string {
  if (val === null || val === undefined) return "null";
  if (typeof val === "string") return JSON.stringify(val);
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (Array.isArray(val)) {
    return "[" + val.map(stableStringify).join(",") + "]";
  }
  if (typeof val === "object") {
    const keys = Object.keys(val as Record<string, unknown>).sort();
    const parts = keys.map((k) => JSON.stringify(k) + ":" + stableStringify((val as Record<string, unknown>)[k]));
    return "{" + parts.join(",") + "}";
  }
  return String(val);
}

// Content-addressable cache using fingerprints.
export class FingerprintCache<T> {
  private cache = new Map<string, { value: T; addedAt: number }>();
  private readonly maxSize: number;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  getOrSet(key: unknown, factory: () => T): T {
    const fp = jsonFingerprint(key);
    const existing = this.cache.get(fp);
    if (existing) return existing.value;

    const value = factory();
    this.evictIfNeeded();
    this.cache.set(fp, { value, addedAt: Date.now() });
    return value;
  }

  has(key: unknown): boolean {
    return this.cache.has(jsonFingerprint(key));
  }

  get(key: unknown): T | undefined {
    return this.cache.get(jsonFingerprint(key))?.value;
  }

  set(key: unknown, value: T): void {
    this.evictIfNeeded();
    this.cache.set(jsonFingerprint(key), { value, addedAt: Date.now() });
  }

  get size(): number {
    return this.cache.size;
  }

  clear(): void {
    this.cache.clear();
  }

  private evictIfNeeded(): void {
    if (this.cache.size < this.maxSize) return;
    let oldestKey: string | undefined;
    let oldestTime = Infinity;
    for (const [key, entry] of this.cache) {
      if (entry.addedAt < oldestTime) {
        oldestTime = entry.addedAt;
        oldestKey = key;
      }
    }
    if (oldestKey) this.cache.delete(oldestKey);
  }
}
