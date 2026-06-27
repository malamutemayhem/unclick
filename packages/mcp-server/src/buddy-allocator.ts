export interface Block {
  start: number;
  size: number;
  allocated: boolean;
}

export class BuddyAllocator {
  private totalSize: number;
  private minBlockSize: number;
  private blocks = new Map<number, Block>();
  private freeLists = new Map<number, number[]>();

  constructor(totalSize: number, minBlockSize = 1) {
    this.totalSize = this.nextPow2(totalSize);
    this.minBlockSize = this.nextPow2(minBlockSize);
    this.blocks.set(0, { start: 0, size: this.totalSize, allocated: false });
    this.addToFreeList(this.totalSize, 0);
  }

  private nextPow2(n: number): number {
    let v = 1;
    while (v < n) v <<= 1;
    return v;
  }

  private addToFreeList(size: number, start: number): void {
    if (!this.freeLists.has(size)) this.freeLists.set(size, []);
    this.freeLists.get(size)!.push(start);
  }

  private removeFromFreeList(size: number, start: number): boolean {
    const list = this.freeLists.get(size);
    if (!list) return false;
    const idx = list.indexOf(start);
    if (idx === -1) return false;
    list.splice(idx, 1);
    return true;
  }

  alloc(requestSize: number): number | null {
    const size = Math.max(this.nextPow2(requestSize), this.minBlockSize);
    let blockSize = size;

    while (blockSize <= this.totalSize) {
      const freeList = this.freeLists.get(blockSize);
      if (freeList && freeList.length > 0) {
        const start = freeList.shift()!;
        this.split(start, blockSize, size);
        const block = this.blocks.get(start)!;
        block.allocated = true;
        block.size = size;
        return start;
      }
      blockSize <<= 1;
    }
    return null;
  }

  private split(start: number, currentSize: number, targetSize: number): void {
    while (currentSize > targetSize) {
      const halfSize = currentSize >> 1;
      const buddyStart = start + halfSize;
      this.blocks.set(buddyStart, { start: buddyStart, size: halfSize, allocated: false });
      this.addToFreeList(halfSize, buddyStart);
      currentSize = halfSize;
    }
    this.blocks.set(start, { start, size: targetSize, allocated: false });
  }

  free(start: number): boolean {
    const block = this.blocks.get(start);
    if (!block || !block.allocated) return false;
    block.allocated = false;
    this.merge(start, block.size);
    return true;
  }

  private merge(start: number, size: number): void {
    let currentStart = start;
    let currentSize = size;

    while (currentSize < this.totalSize) {
      const buddyStart = currentStart ^ currentSize;
      const buddy = this.blocks.get(buddyStart);

      if (!buddy || buddy.allocated || buddy.size !== currentSize) {
        this.addToFreeList(currentSize, currentStart);
        return;
      }

      this.removeFromFreeList(currentSize, buddyStart);
      this.blocks.delete(buddyStart);

      currentStart = Math.min(currentStart, buddyStart);
      currentSize <<= 1;
      this.blocks.set(currentStart, { start: currentStart, size: currentSize, allocated: false });
    }

    this.addToFreeList(currentSize, currentStart);
  }

  isAllocated(start: number): boolean {
    const block = this.blocks.get(start);
    return !!block && block.allocated;
  }

  getBlock(start: number): Block | undefined {
    return this.blocks.get(start);
  }

  get allocatedCount(): number {
    let count = 0;
    for (const [, block] of this.blocks) {
      if (block.allocated) count++;
    }
    return count;
  }

  get freeCount(): number {
    let count = 0;
    for (const [, list] of this.freeLists) {
      count += list.length;
    }
    return count;
  }

  get size(): number {
    return this.totalSize;
  }

  stats(): { total: number; allocated: number; free: number; fragmentation: number } {
    let allocatedBytes = 0;
    let freeBytes = 0;
    for (const [, block] of this.blocks) {
      if (block.allocated) allocatedBytes += block.size;
      else freeBytes += block.size;
    }
    const fragmentation = freeBytes > 0 ? 1 - (this.largestFree() / freeBytes) : 0;
    return { total: this.totalSize, allocated: allocatedBytes, free: freeBytes, fragmentation };
  }

  private largestFree(): number {
    let max = 0;
    for (const [size, list] of this.freeLists) {
      if (list.length > 0 && size > max) max = size;
    }
    return max;
  }
}
