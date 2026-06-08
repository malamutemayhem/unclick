export class BloomFilter {
  private bits: Uint8Array;
  private readonly size: number;
  private readonly hashCount: number;
  private count = 0;

  constructor(size: number, hashCount: number) {
    this.size = size;
    this.hashCount = hashCount;
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  add(item: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const idx = this.hash(item, i);
      this.bits[Math.floor(idx / 8)] |= 1 << (idx % 8);
    }
    this.count++;
  }

  has(item: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const idx = this.hash(item, i);
      if (!(this.bits[Math.floor(idx / 8)] & (1 << (idx % 8)))) return false;
    }
    return true;
  }

  get itemCount(): number {
    return this.count;
  }

  falsePositiveRate(): number {
    const m = this.size;
    const k = this.hashCount;
    const n = this.count;
    return Math.pow(1 - Math.exp(-k * n / m), k);
  }

  clear(): void {
    this.bits = new Uint8Array(Math.ceil(this.size / 8));
    this.count = 0;
  }

  private hash(item: string, seed: number): number {
    let h = seed * 0x811c9dc5;
    for (let i = 0; i < item.length; i++) {
      h ^= item.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return Math.abs(h) % this.size;
  }
}

export function createBloomFilter(expectedItems: number, falsePositiveRate: number): BloomFilter {
  const m = Math.ceil(-expectedItems * Math.log(falsePositiveRate) / (Math.log(2) ** 2));
  const k = Math.ceil((m / expectedItems) * Math.log(2));
  return new BloomFilter(m, k);
}
