export class BloomFilter {
  private bits: Uint8Array;
  private size: number;
  private hashCount: number;
  private count = 0;

  constructor(size: number, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  add(item: string): void {
    const hashes = this.getHashes(item);
    for (const h of hashes) {
      const idx = h % this.size;
      this.bits[Math.floor(idx / 8)] |= 1 << (idx % 8);
    }
    this.count++;
  }

  has(item: string): boolean {
    const hashes = this.getHashes(item);
    for (const h of hashes) {
      const idx = h % this.size;
      if (!(this.bits[Math.floor(idx / 8)] & (1 << (idx % 8)))) return false;
    }
    return true;
  }

  get itemCount(): number { return this.count; }

  get falsePositiveRate(): number {
    const m = this.size;
    const k = this.hashCount;
    const n = this.count;
    return Math.pow(1 - Math.exp(-k * n / m), k);
  }

  clear(): void {
    this.bits.fill(0);
    this.count = 0;
  }

  private getHashes(item: string): number[] {
    let h1 = 0;
    let h2 = 0;
    for (let i = 0; i < item.length; i++) {
      const c = item.charCodeAt(i);
      h1 = (h1 * 31 + c) >>> 0;
      h2 = (h2 * 37 + c) >>> 0;
    }
    const result: number[] = [];
    for (let i = 0; i < this.hashCount; i++) {
      result.push((h1 + i * h2) >>> 0);
    }
    return result;
  }

  static optimal(expectedItems: number, fpRate: number): BloomFilter {
    const m = Math.ceil(-expectedItems * Math.log(fpRate) / (Math.log(2) ** 2));
    const k = Math.round((m / expectedItems) * Math.log(2));
    return new BloomFilter(m, k);
  }
}
