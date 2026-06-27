export interface MemoryEntry<T = unknown> {
  key: string;
  value: T;
  tier: "hot" | "warm" | "cold";
  accessCount: number;
  lastAccessed: number;
  createdAt: number;
}

export interface TierConfig {
  hotCapacity: number;
  warmCapacity: number;
  promotionThreshold: number;
  demotionIntervalMs: number;
}

const DEFAULT_CONFIG: TierConfig = {
  hotCapacity: 100,
  warmCapacity: 500,
  promotionThreshold: 3,
  demotionIntervalMs: 60_000,
};

export class MemoryTier<T = unknown> {
  private entries = new Map<string, MemoryEntry<T>>();
  private config: TierConfig;

  constructor(config: Partial<TierConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  put(key: string, value: T): void {
    const now = Date.now();
    const existing = this.entries.get(key);
    if (existing) {
      existing.value = value;
      existing.accessCount++;
      existing.lastAccessed = now;
      this.maybePromote(existing);
      return;
    }
    this.entries.set(key, {
      key,
      value,
      tier: "warm",
      accessCount: 1,
      lastAccessed: now,
      createdAt: now,
    });
    this.enforceCapacity();
  }

  get(key: string): T | undefined {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    this.maybePromote(entry);
    return entry.value;
  }

  has(key: string): boolean {
    return this.entries.has(key);
  }

  delete(key: string): boolean {
    return this.entries.delete(key);
  }

  getTier(key: string): "hot" | "warm" | "cold" | undefined {
    return this.entries.get(key)?.tier;
  }

  getByTier(tier: "hot" | "warm" | "cold"): MemoryEntry<T>[] {
    return [...this.entries.values()].filter((e) => e.tier === tier);
  }

  demote(): number {
    const now = Date.now();
    let demoted = 0;
    for (const entry of this.entries.values()) {
      const age = now - entry.lastAccessed;
      if (entry.tier === "hot" && age >= this.config.demotionIntervalMs) {
        entry.tier = "warm";
        demoted++;
      } else if (entry.tier === "warm" && age >= this.config.demotionIntervalMs) {
        entry.tier = "cold";
        demoted++;
      }
    }
    return demoted;
  }

  prune(): number {
    const cold = this.getByTier("cold");
    cold.sort((a, b) => a.lastAccessed - b.lastAccessed);
    const total = this.entries.size;
    const maxTotal = this.config.hotCapacity + this.config.warmCapacity + this.config.warmCapacity;
    const overflow = total - maxTotal;
    let pruned = 0;
    if (overflow > 0) {
      for (let i = 0; i < Math.min(overflow, cold.length); i++) {
        this.entries.delete(cold[i].key);
        pruned++;
      }
    }
    return pruned;
  }

  get size(): number {
    return this.entries.size;
  }

  stats(): { hot: number; warm: number; cold: number; total: number } {
    let hot = 0, warm = 0, cold = 0;
    for (const e of this.entries.values()) {
      if (e.tier === "hot") hot++;
      else if (e.tier === "warm") warm++;
      else cold++;
    }
    return { hot, warm, cold, total: this.entries.size };
  }

  clear(): void {
    this.entries.clear();
  }

  private maybePromote(entry: MemoryEntry<T>): void {
    if (entry.tier === "cold" && entry.accessCount >= this.config.promotionThreshold) {
      entry.tier = "warm";
    } else if (entry.tier === "warm" && entry.accessCount >= this.config.promotionThreshold * 2) {
      const hotCount = this.getByTier("hot").length;
      if (hotCount < this.config.hotCapacity) {
        entry.tier = "hot";
      }
    }
  }

  private enforceCapacity(): void {
    const warm = this.getByTier("warm");
    if (warm.length > this.config.warmCapacity) {
      warm.sort((a, b) => a.lastAccessed - b.lastAccessed);
      for (let i = 0; i < warm.length - this.config.warmCapacity; i++) {
        warm[i].tier = "cold";
      }
    }
  }
}
