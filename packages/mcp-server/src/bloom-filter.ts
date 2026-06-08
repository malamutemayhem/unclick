export class BloomFilter {
  private bits: Uint8Array;
  private numHashes: number;
  private bitCount: number;
  private _count = 0;

  constructor(expectedItems: number, falsePositiveRate = 0.01) {
    this.bitCount = Math.ceil(
      -(expectedItems * Math.log(falsePositiveRate)) / (Math.log(2) ** 2)
    );
    this.numHashes = Math.ceil((this.bitCount / expectedItems) * Math.log(2));
    this.bits = new Uint8Array(Math.ceil(this.bitCount / 8));
  }

  add(item: string): void {
    const hashes = this.getHashes(item);
    for (const h of hashes) {
      const idx = h % this.bitCount;
      this.bits[idx >> 3] |= 1 << (idx & 7);
    }
    this._count++;
  }

  has(item: string): boolean {
    const hashes = this.getHashes(item);
    for (const h of hashes) {
      const idx = h % this.bitCount;
      if (!(this.bits[idx >> 3] & (1 << (idx & 7)))) return false;
    }
    return true;
  }

  get count(): number { return this._count; }
  get sizeInBytes(): number { return this.bits.length; }

  estimatedFalsePositiveRate(): number {
    const m = this.bitCount;
    const k = this.numHashes;
    const n = this._count;
    return Math.pow(1 - Math.exp((-k * n) / m), k);
  }

  clear(): void {
    this.bits.fill(0);
    this._count = 0;
  }

  private getHashes(item: string): number[] {
    const h1 = this.hash1(item);
    const h2 = this.hash2(item);
    const hashes: number[] = [];
    for (let i = 0; i < this.numHashes; i++) {
      hashes.push(Math.abs((h1 + i * h2) % this.bitCount));
    }
    return hashes;
  }

  private hash1(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return hash >>> 0;
  }

  private hash2(str: string): number {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }
}
