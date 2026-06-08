export class BloomFilter {
  private bits: Uint8Array;
  private numHashes: number;
  private _size: number;

  constructor(size: number, numHashes = 3) {
    this._size = size;
    this.numHashes = numHashes;
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  add(item: string): void {
    for (let i = 0; i < this.numHashes; i++) {
      const index = this.hash(item, i) % this._size;
      this.bits[index >>> 3] |= 1 << (index & 7);
    }
  }

  test(item: string): boolean {
    for (let i = 0; i < this.numHashes; i++) {
      const index = this.hash(item, i) % this._size;
      if ((this.bits[index >>> 3] & (1 << (index & 7))) === 0) return false;
    }
    return true;
  }

  clear(): void {
    this.bits.fill(0);
  }

  get size(): number {
    return this._size;
  }

  private hash(item: string, seed: number): number {
    let h = seed;
    for (let i = 0; i < item.length; i++) {
      h = ((h << 5) - h + item.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }
}
