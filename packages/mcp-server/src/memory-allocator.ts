export interface Block {
  offset: number;
  size: number;
  free: boolean;
  tag?: string;
}

export class BuddyAllocator {
  private totalSize: number;
  private minBlock: number;
  private blocks: Block[] = [];

  constructor(totalSize: number, minBlock = 1) {
    this.totalSize = totalSize;
    this.minBlock = minBlock;
    this.blocks = [{ offset: 0, size: totalSize, free: true }];
  }

  alloc(size: number, tag?: string): number | null {
    const needed = this.nextPow2(Math.max(size, this.minBlock));
    const idx = this.findFreeBlock(needed);
    if (idx === -1) return null;

    while (this.blocks[idx].size > needed && this.blocks[idx].size / 2 >= this.minBlock) {
      const block = this.blocks[idx];
      const half = block.size / 2;
      this.blocks.splice(idx, 1, { offset: block.offset, size: half, free: true }, { offset: block.offset + half, size: half, free: true });
    }

    const finalIdx = this.findFreeBlock(needed);
    if (finalIdx === -1) return null;

    this.blocks[finalIdx].free = false;
    this.blocks[finalIdx].tag = tag;
    return this.blocks[finalIdx].offset;
  }

  free(offset: number): boolean {
    const idx = this.blocks.findIndex((b) => b.offset === offset && !b.free);
    if (idx === -1) return false;

    this.blocks[idx].free = true;
    this.blocks[idx].tag = undefined;
    this.coalesce();
    return true;
  }

  private coalesce(): void {
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < this.blocks.length - 1; i++) {
        const a = this.blocks[i];
        const b = this.blocks[i + 1];
        if (a.free && b.free && a.size === b.size && a.offset % (a.size * 2) === 0) {
          this.blocks.splice(i, 2, { offset: a.offset, size: a.size * 2, free: true });
          changed = true;
          break;
        }
      }
    }
  }

  private findFreeBlock(size: number): number {
    let bestIdx = -1;
    let bestSize = Infinity;
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].free && this.blocks[i].size >= size && this.blocks[i].size < bestSize) {
        bestIdx = i;
        bestSize = this.blocks[i].size;
      }
    }
    return bestIdx;
  }

  private nextPow2(n: number): number {
    let p = 1;
    while (p < n) p *= 2;
    return p;
  }

  getBlocks(): Block[] {
    return this.blocks.map((b) => ({ ...b }));
  }

  usedMemory(): number {
    return this.blocks.filter((b) => !b.free).reduce((sum, b) => sum + b.size, 0);
  }

  freeMemory(): number {
    return this.blocks.filter((b) => b.free).reduce((sum, b) => sum + b.size, 0);
  }

  fragmentation(): number {
    const freeBlocks = this.blocks.filter((b) => b.free);
    if (freeBlocks.length <= 1) return 0;
    const largest = Math.max(...freeBlocks.map((b) => b.size));
    const totalFree = freeBlocks.reduce((s, b) => s + b.size, 0);
    return 1 - largest / totalFree;
  }

  dump(): string {
    return this.blocks.map((b) => `[${b.offset}:${b.size}${b.free ? " free" : ` used${b.tag ? "=" + b.tag : ""}`}]`).join(" ");
  }
}

export class FirstFitAllocator {
  private blocks: Block[] = [];
  private totalSize: number;

  constructor(totalSize: number) {
    this.totalSize = totalSize;
    this.blocks = [{ offset: 0, size: totalSize, free: true }];
  }

  alloc(size: number, tag?: string): number | null {
    for (let i = 0; i < this.blocks.length; i++) {
      const b = this.blocks[i];
      if (b.free && b.size >= size) {
        if (b.size > size) {
          this.blocks.splice(i, 1, { offset: b.offset, size, free: false, tag }, { offset: b.offset + size, size: b.size - size, free: true });
        } else {
          b.free = false;
          b.tag = tag;
        }
        return b.offset;
      }
    }
    return null;
  }

  free(offset: number): boolean {
    const idx = this.blocks.findIndex((b) => b.offset === offset && !b.free);
    if (idx === -1) return false;
    this.blocks[idx].free = true;
    this.blocks[idx].tag = undefined;
    this.mergeFree();
    return true;
  }

  private mergeFree(): void {
    for (let i = 0; i < this.blocks.length - 1;) {
      if (this.blocks[i].free && this.blocks[i + 1].free) {
        this.blocks[i].size += this.blocks[i + 1].size;
        this.blocks.splice(i + 1, 1);
      } else {
        i++;
      }
    }
  }

  getBlocks(): Block[] {
    return this.blocks.map((b) => ({ ...b }));
  }

  usedMemory(): number {
    return this.blocks.filter((b) => !b.free).reduce((sum, b) => sum + b.size, 0);
  }

  freeMemory(): number {
    return this.blocks.filter((b) => b.free).reduce((sum, b) => sum + b.size, 0);
  }
}
