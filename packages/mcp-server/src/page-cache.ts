export interface Page {
  id: number;
  data: Uint8Array;
  dirty: boolean;
  pinCount: number;
  lastAccess: number;
}

export class PageCache {
  private pages = new Map<number, Page>();
  private capacity: number;
  private pageSize: number;
  private hits = 0;
  private misses = 0;
  private accessCounter = 0;

  constructor(capacity = 64, pageSize = 4096) {
    this.capacity = capacity;
    this.pageSize = pageSize;
  }

  fetch(pageId: number): Page {
    const existing = this.pages.get(pageId);
    if (existing) {
      this.hits++;
      existing.lastAccess = ++this.accessCounter;
      return existing;
    }

    this.misses++;
    if (this.pages.size >= this.capacity) {
      this.evictOne();
    }

    const page: Page = {
      id: pageId,
      data: new Uint8Array(this.pageSize),
      dirty: false,
      pinCount: 0,
      lastAccess: ++this.accessCounter,
    };
    this.pages.set(pageId, page);
    return page;
  }

  pin(pageId: number): boolean {
    const page = this.pages.get(pageId);
    if (!page) return false;
    page.pinCount++;
    return true;
  }

  unpin(pageId: number): boolean {
    const page = this.pages.get(pageId);
    if (!page || page.pinCount <= 0) return false;
    page.pinCount--;
    return true;
  }

  markDirty(pageId: number): boolean {
    const page = this.pages.get(pageId);
    if (!page) return false;
    page.dirty = true;
    return true;
  }

  flush(pageId: number): boolean {
    const page = this.pages.get(pageId);
    if (!page) return false;
    page.dirty = false;
    return true;
  }

  flushAll(): number {
    let count = 0;
    for (const page of this.pages.values()) {
      if (page.dirty) {
        page.dirty = false;
        count++;
      }
    }
    return count;
  }

  private evictOne(): boolean {
    let victim: Page | null = null;
    let oldestAccess = Infinity;

    for (const page of this.pages.values()) {
      if (page.pinCount > 0) continue;
      if (page.lastAccess < oldestAccess) {
        oldestAccess = page.lastAccess;
        victim = page;
      }
    }

    if (!victim) return false;
    this.pages.delete(victim.id);
    return true;
  }

  evict(pageId: number): boolean {
    const page = this.pages.get(pageId);
    if (!page || page.pinCount > 0) return false;
    this.pages.delete(pageId);
    return true;
  }

  has(pageId: number): boolean {
    return this.pages.has(pageId);
  }

  getDirtyPages(): number[] {
    const result: number[] = [];
    for (const page of this.pages.values()) {
      if (page.dirty) result.push(page.id);
    }
    return result;
  }

  get size(): number {
    return this.pages.size;
  }

  get hitRate(): number {
    const total = this.hits + this.misses;
    return total > 0 ? this.hits / total : 0;
  }

  get stats(): { hits: number; misses: number; size: number; capacity: number; hitRate: number } {
    return {
      hits: this.hits,
      misses: this.misses,
      size: this.pages.size,
      capacity: this.capacity,
      hitRate: this.hitRate,
    };
  }

  clear(): void {
    this.pages.clear();
    this.hits = 0;
    this.misses = 0;
  }
}
