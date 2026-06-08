export interface CacheEntry<T> {
  key: string;
  value: T;
  expiresAt: number;
  createdAt: number;
  hitCount: number;
  tags: string[];
}

export class SemanticCache<T = unknown> {
  private entries = new Map<string, CacheEntry<T>>();
  private defaultTtlMs: number;

  constructor(defaultTtlMs = 300_000) {
    this.defaultTtlMs = defaultTtlMs;
  }

  set(key: string, value: T, options: { ttlMs?: number; tags?: string[] } = {}): void {
    const now = Date.now();
    this.entries.set(key, {
      key,
      value,
      expiresAt: now + (options.ttlMs ?? this.defaultTtlMs),
      createdAt: now,
      hitCount: 0,
      tags: options.tags ?? [],
    });
  }

  get(key: string): T | undefined {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    if (Date.now() >= entry.expiresAt) {
      this.entries.delete(key);
      return undefined;
    }
    entry.hitCount++;
    return entry.value;
  }

  has(key: string): boolean {
    const entry = this.entries.get(key);
    if (!entry) return false;
    if (Date.now() >= entry.expiresAt) {
      this.entries.delete(key);
      return false;
    }
    return true;
  }

  delete(key: string): boolean {
    return this.entries.delete(key);
  }

  findSimilar(query: string, threshold = 0.5): CacheEntry<T> | undefined {
    const queryTokens = new Set(query.toLowerCase().split(/\s+/));
    let best: CacheEntry<T> | undefined;
    let bestScore = 0;

    for (const entry of this.entries.values()) {
      if (Date.now() >= entry.expiresAt) continue;
      const keyTokens = new Set(entry.key.toLowerCase().split(/\s+/));
      const intersection = new Set([...queryTokens].filter((t) => keyTokens.has(t)));
      const union = new Set([...queryTokens, ...keyTokens]);
      const score = union.size > 0 ? intersection.size / union.size : 0;
      if (score > bestScore && score >= threshold) {
        bestScore = score;
        best = entry;
      }
    }

    return best;
  }

  getByTag(tag: string): CacheEntry<T>[] {
    const now = Date.now();
    return [...this.entries.values()].filter(
      (e) => e.expiresAt > now && e.tags.includes(tag),
    );
  }

  invalidateByTag(tag: string): number {
    let count = 0;
    for (const [key, entry] of this.entries) {
      if (entry.tags.includes(tag)) {
        this.entries.delete(key);
        count++;
      }
    }
    return count;
  }

  prune(): number {
    const now = Date.now();
    let pruned = 0;
    for (const [key, entry] of this.entries) {
      if (now >= entry.expiresAt) {
        this.entries.delete(key);
        pruned++;
      }
    }
    return pruned;
  }

  get size(): number {
    return this.entries.size;
  }

  stats(): { size: number; hitCount: number; avgHits: number } {
    const entries = [...this.entries.values()];
    const hitCount = entries.reduce((s, e) => s + e.hitCount, 0);
    return {
      size: entries.length,
      hitCount,
      avgHits: entries.length > 0 ? hitCount / entries.length : 0,
    };
  }

  clear(): void {
    this.entries.clear();
  }
}
