export interface PageEntry {
  frameNumber: number;
  valid: boolean;
  dirty: boolean;
  referenced: boolean;
  lastAccess: number;
}

export class VirtualMemory {
  private pageTable = new Map<number, PageEntry>();
  private frames: (number | null)[];
  private frameCount: number;
  private nextFrame = 0;
  private clock = 0;
  private pageFaults = 0;
  private hits = 0;
  private policy: "fifo" | "lru" | "clock";
  private clockHand = 0;

  constructor(frameCount: number, policy: "fifo" | "lru" | "clock" = "lru") {
    this.frameCount = frameCount;
    this.frames = new Array(frameCount).fill(null);
    this.policy = policy;
  }

  access(pageNumber: number, write = false): { hit: boolean; frame: number } {
    this.clock++;
    const entry = this.pageTable.get(pageNumber);

    if (entry && entry.valid) {
      this.hits++;
      entry.referenced = true;
      entry.lastAccess = this.clock;
      if (write) entry.dirty = true;
      return { hit: true, frame: entry.frameNumber };
    }

    this.pageFaults++;
    const frame = this.allocateFrame(pageNumber);
    this.pageTable.set(pageNumber, {
      frameNumber: frame,
      valid: true,
      dirty: write,
      referenced: true,
      lastAccess: this.clock,
    });
    this.frames[frame] = pageNumber;
    return { hit: false, frame };
  }

  private allocateFrame(newPage: number): number {
    for (let i = 0; i < this.frameCount; i++) {
      if (this.frames[i] === null) return i;
    }
    return this.evict();
  }

  private evict(): number {
    switch (this.policy) {
      case "fifo": return this.evictFIFO();
      case "lru": return this.evictLRU();
      case "clock": return this.evictClock();
    }
  }

  private evictFIFO(): number {
    const frame = this.nextFrame % this.frameCount;
    this.nextFrame++;
    this.invalidatePage(frame);
    return frame;
  }

  private evictLRU(): number {
    let oldest = Infinity;
    let victim = 0;
    for (let i = 0; i < this.frameCount; i++) {
      const page = this.frames[i];
      if (page === null) continue;
      const entry = this.pageTable.get(page);
      if (entry && entry.lastAccess < oldest) {
        oldest = entry.lastAccess;
        victim = i;
      }
    }
    this.invalidatePage(victim);
    return victim;
  }

  private evictClock(): number {
    while (true) {
      const page = this.frames[this.clockHand];
      if (page !== null) {
        const entry = this.pageTable.get(page);
        if (entry && !entry.referenced) {
          const frame = this.clockHand;
          this.clockHand = (this.clockHand + 1) % this.frameCount;
          this.invalidatePage(frame);
          return frame;
        }
        if (entry) entry.referenced = false;
      }
      this.clockHand = (this.clockHand + 1) % this.frameCount;
    }
  }

  private invalidatePage(frame: number): void {
    const page = this.frames[frame];
    if (page !== null) {
      const entry = this.pageTable.get(page);
      if (entry) entry.valid = false;
    }
  }

  getPageEntry(page: number): PageEntry | undefined {
    return this.pageTable.get(page);
  }

  isResident(page: number): boolean {
    const entry = this.pageTable.get(page);
    return !!entry && entry.valid;
  }

  get faultCount(): number {
    return this.pageFaults;
  }

  get hitCount(): number {
    return this.hits;
  }

  get hitRate(): number {
    const total = this.hits + this.pageFaults;
    return total === 0 ? 0 : this.hits / total;
  }

  get residentPages(): number {
    return this.frames.filter((f) => f !== null).length;
  }

  get totalFrames(): number {
    return this.frameCount;
  }

  reset(): void {
    this.pageTable.clear();
    this.frames.fill(null);
    this.nextFrame = 0;
    this.clock = 0;
    this.pageFaults = 0;
    this.hits = 0;
    this.clockHand = 0;
  }
}
