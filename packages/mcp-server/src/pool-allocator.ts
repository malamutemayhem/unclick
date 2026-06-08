export class PoolAllocator {
  private buffer: ArrayBuffer;
  private view: DataView;
  private freeList: number[] = [];
  private readonly blockSize: number;
  private readonly blockCount: number;
  private allocated = 0;

  constructor(blockSize: number, blockCount: number) {
    this.blockSize = blockSize;
    this.blockCount = blockCount;
    this.buffer = new ArrayBuffer(blockSize * blockCount);
    this.view = new DataView(this.buffer);
    for (let i = blockCount - 1; i >= 0; i--) {
      this.freeList.push(i);
    }
  }

  alloc(): number {
    if (this.freeList.length === 0) return -1;
    const block = this.freeList.pop()!;
    this.allocated++;
    return block;
  }

  free(block: number): boolean {
    if (block < 0 || block >= this.blockCount) return false;
    this.freeList.push(block);
    this.allocated--;
    return true;
  }

  write(block: number, offset: number, value: number): void {
    this.view.setUint8(block * this.blockSize + offset, value);
  }

  read(block: number, offset: number): number {
    return this.view.getUint8(block * this.blockSize + offset);
  }

  writeFloat(block: number, offset: number, value: number): void {
    this.view.setFloat64(block * this.blockSize + offset, value);
  }

  readFloat(block: number, offset: number): number {
    return this.view.getFloat64(block * this.blockSize + offset);
  }

  get available(): number {
    return this.freeList.length;
  }

  get used(): number {
    return this.allocated;
  }

  get capacity(): number {
    return this.blockCount;
  }

  reset(): void {
    this.freeList = [];
    for (let i = this.blockCount - 1; i >= 0; i--) {
      this.freeList.push(i);
    }
    this.allocated = 0;
  }
}
