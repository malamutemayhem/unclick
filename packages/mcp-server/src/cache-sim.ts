export type CachePolicy = "direct-mapped" | "fully-associative" | "set-associative";
export type ReplacementPolicy = "LRU" | "FIFO" | "random";

export interface CacheLine {
  tag: number;
  valid: boolean;
  dirty: boolean;
  data: number;
  lastUsed: number;
  insertOrder: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  reads: number;
  writes: number;
  evictions: number;
}

export class CacheSim {
  private lines: CacheLine[][];
  private numSets: number;
  private associativity: number;
  private blockSize: number;
  private replacement: ReplacementPolicy;
  private stats: CacheStats;
  private accessCount = 0;
  private insertCount = 0;
  private rng: () => number;

  constructor(
    totalLines: number,
    associativity: number,
    blockSize = 64,
    replacement: ReplacementPolicy = "LRU",
    seed = 42
  ) {
    this.associativity = associativity;
    this.numSets = Math.floor(totalLines / associativity);
    this.blockSize = blockSize;
    this.replacement = replacement;
    this.rng = this.seededRandom(seed);

    this.lines = [];
    for (let s = 0; s < this.numSets; s++) {
      const set: CacheLine[] = [];
      for (let w = 0; w < associativity; w++) {
        set.push({ tag: -1, valid: false, dirty: false, data: 0, lastUsed: 0, insertOrder: 0 });
      }
      this.lines.push(set);
    }

    this.stats = { hits: 0, misses: 0, hitRate: 0, reads: 0, writes: 0, evictions: 0 };
  }

  read(address: number): { hit: boolean; data: number } {
    this.stats.reads++;
    this.accessCount++;

    const { setIndex, tag } = this.decode(address);
    const set = this.lines[setIndex];

    for (const line of set) {
      if (line.valid && line.tag === tag) {
        this.stats.hits++;
        line.lastUsed = this.accessCount;
        this.updateHitRate();
        return { hit: true, data: line.data };
      }
    }

    this.stats.misses++;
    this.loadLine(setIndex, tag, 0, false);
    this.updateHitRate();
    return { hit: false, data: 0 };
  }

  write(address: number, data: number): { hit: boolean; evicted: boolean } {
    this.stats.writes++;
    this.accessCount++;

    const { setIndex, tag } = this.decode(address);
    const set = this.lines[setIndex];

    for (const line of set) {
      if (line.valid && line.tag === tag) {
        this.stats.hits++;
        line.data = data;
        line.dirty = true;
        line.lastUsed = this.accessCount;
        this.updateHitRate();
        return { hit: true, evicted: false };
      }
    }

    this.stats.misses++;
    const evicted = this.loadLine(setIndex, tag, data, true);
    this.updateHitRate();
    return { hit: false, evicted };
  }

  private loadLine(setIndex: number, tag: number, data: number, dirty: boolean): boolean {
    const set = this.lines[setIndex];

    for (const line of set) {
      if (!line.valid) {
        line.tag = tag;
        line.valid = true;
        line.dirty = dirty;
        line.data = data;
        line.lastUsed = this.accessCount;
        line.insertOrder = this.insertCount++;
        return false;
      }
    }

    const victim = this.selectVictim(set);
    this.stats.evictions++;
    victim.tag = tag;
    victim.dirty = dirty;
    victim.data = data;
    victim.lastUsed = this.accessCount;
    victim.insertOrder = this.insertCount++;
    return true;
  }

  private selectVictim(set: CacheLine[]): CacheLine {
    switch (this.replacement) {
      case "LRU": {
        let oldest = set[0];
        for (let i = 1; i < set.length; i++) {
          if (set[i].lastUsed < oldest.lastUsed) oldest = set[i];
        }
        return oldest;
      }
      case "FIFO": {
        let first = set[0];
        for (let i = 1; i < set.length; i++) {
          if (set[i].insertOrder < first.insertOrder) first = set[i];
        }
        return first;
      }
      case "random": {
        return set[Math.floor(this.rng() * set.length)];
      }
    }
  }

  private decode(address: number): { setIndex: number; tag: number } {
    const blockOffset = Math.floor(Math.log2(this.blockSize));
    const setIndex = (address >>> blockOffset) % this.numSets;
    const tag = (address >>> blockOffset) >>> Math.ceil(Math.log2(this.numSets || 1));
    return { setIndex, tag };
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? this.stats.hits / total : 0;
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  flush(): number {
    let flushed = 0;
    for (const set of this.lines) {
      for (const line of set) {
        if (line.valid && line.dirty) {
          line.dirty = false;
          flushed++;
        }
      }
    }
    return flushed;
  }

  invalidate(): void {
    for (const set of this.lines) {
      for (const line of set) {
        line.valid = false;
        line.dirty = false;
        line.tag = -1;
      }
    }
  }

  resetStats(): void {
    this.stats = { hits: 0, misses: 0, hitRate: 0, reads: 0, writes: 0, evictions: 0 };
  }

  get setCount(): number {
    return this.numSets;
  }

  get ways(): number {
    return this.associativity;
  }

  get totalCapacity(): number {
    return this.numSets * this.associativity * this.blockSize;
  }

  private seededRandom(seed: number): () => number {
    let s = seed;
    return () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
  }
}
