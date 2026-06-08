export class BloomFilter {
  private bits: Uint8Array;
  private numBits: number;
  private numHashes: number;
  private _count = 0;

  constructor(expectedItems: number, falsePositiveRate = 0.01) {
    this.numBits = Math.max(8, Math.ceil(-(expectedItems * Math.log(falsePositiveRate)) / (Math.log(2) ** 2)));
    this.numHashes = Math.max(1, Math.round((this.numBits / expectedItems) * Math.log(2)));
    this.bits = new Uint8Array(Math.ceil(this.numBits / 8));
  }

  get size(): number {
    return this.numBits;
  }

  get count(): number {
    return this._count;
  }

  get hashCount(): number {
    return this.numHashes;
  }

  add(item: string): void {
    for (let i = 0; i < this.numHashes; i++) {
      const pos = this.hash(item, i) % this.numBits;
      this.bits[pos >>> 3] |= 1 << (pos & 7);
    }
    this._count++;
  }

  test(item: string): boolean {
    for (let i = 0; i < this.numHashes; i++) {
      const pos = this.hash(item, i) % this.numBits;
      if ((this.bits[pos >>> 3] & (1 << (pos & 7))) === 0) return false;
    }
    return true;
  }

  clear(): void {
    this.bits.fill(0);
    this._count = 0;
  }

  private hash(item: string, seed: number): number {
    let h = seed * 0x811c9dc5;
    for (let i = 0; i < item.length; i++) {
      h ^= item.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }
}
