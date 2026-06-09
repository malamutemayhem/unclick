export interface PageTableEntry {
  frameNumber: number;
  valid: boolean;
  dirty: boolean;
  referenced: boolean;
  protection: "r" | "rw" | "rx" | "rwx";
}

export type PageReplacementAlgo = "fifo" | "lru" | "clock" | "optimal";

export class PageTable {
  private entries = new Map<number, PageTableEntry>();
  private framePool: number[];
  private totalFrames: number;
  private pageSize: number;
  private pageFaults = 0;
  private pageHits = 0;
  private loadOrder: number[] = [];
  private accessOrder: number[] = [];

  constructor(totalFrames = 16, pageSize = 4096) {
    this.totalFrames = totalFrames;
    this.pageSize = pageSize;
    this.framePool = Array.from({ length: totalFrames }, (_, i) => i);
  }

  access(pageNumber: number, algo: PageReplacementAlgo = "lru"): PageTableEntry {
    const existing = this.entries.get(pageNumber);
    if (existing && existing.valid) {
      this.pageHits++;
      existing.referenced = true;
      this.accessOrder = this.accessOrder.filter(p => p !== pageNumber);
      this.accessOrder.push(pageNumber);
      return existing;
    }

    this.pageFaults++;

    let frame: number;
    if (this.framePool.length > 0) {
      frame = this.framePool.shift()!;
    } else {
      const victim = this.selectVictim(algo, pageNumber);
      const victimEntry = this.entries.get(victim)!;
      frame = victimEntry.frameNumber;
      victimEntry.valid = false;
      this.loadOrder = this.loadOrder.filter(p => p !== victim);
      this.accessOrder = this.accessOrder.filter(p => p !== victim);
    }

    const entry: PageTableEntry = {
      frameNumber: frame,
      valid: true,
      dirty: false,
      referenced: true,
      protection: "rw",
    };
    this.entries.set(pageNumber, entry);
    this.loadOrder.push(pageNumber);
    this.accessOrder.push(pageNumber);
    return entry;
  }

  private selectVictim(algo: PageReplacementAlgo, _currentPage?: number): number {
    switch (algo) {
      case "fifo":
        return this.loadOrder[0];
      case "lru":
        return this.accessOrder[0];
      case "clock":
        return this.clockSelect();
      default:
        return this.loadOrder[0];
    }
  }

  private clockSelect(): number {
    while (true) {
      const candidate = this.loadOrder[0];
      const entry = this.entries.get(candidate)!;
      if (!entry.referenced) {
        return candidate;
      }
      entry.referenced = false;
      this.loadOrder.push(this.loadOrder.shift()!);
    }
  }

  translate(virtualAddress: number): number | null {
    const pageNumber = Math.floor(virtualAddress / this.pageSize);
    const offset = virtualAddress % this.pageSize;
    const entry = this.entries.get(pageNumber);
    if (!entry || !entry.valid) return null;
    return entry.frameNumber * this.pageSize + offset;
  }

  setDirty(pageNumber: number): void {
    const entry = this.entries.get(pageNumber);
    if (entry && entry.valid) entry.dirty = true;
  }

  setProtection(pageNumber: number, protection: PageTableEntry["protection"]): void {
    const entry = this.entries.get(pageNumber);
    if (entry) entry.protection = protection;
  }

  invalidate(pageNumber: number): boolean {
    const entry = this.entries.get(pageNumber);
    if (!entry || !entry.valid) return false;
    entry.valid = false;
    this.framePool.push(entry.frameNumber);
    this.loadOrder = this.loadOrder.filter(p => p !== pageNumber);
    this.accessOrder = this.accessOrder.filter(p => p !== pageNumber);
    return true;
  }

  get faults(): number { return this.pageFaults; }
  get hits(): number { return this.pageHits; }
  get hitRate(): number {
    const total = this.pageHits + this.pageFaults;
    return total > 0 ? this.pageHits / total : 0;
  }
  get usedFrames(): number { return this.totalFrames - this.framePool.length; }
  get freeFrames(): number { return this.framePool.length; }

  reset(): void {
    this.entries.clear();
    this.framePool = Array.from({ length: this.totalFrames }, (_, i) => i);
    this.pageFaults = 0;
    this.pageHits = 0;
    this.loadOrder = [];
    this.accessOrder = [];
  }
}
