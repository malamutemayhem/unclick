export class BloomFilter {
  private bits: Uint8Array;
  private readonly size: number;
  private readonly hashCount: number;
  private itemCount = 0;

  constructor(size: number, hashCount: number = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  add(value: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const pos = this.hash(value, i);
      this.bits[pos >>> 3] |= 1 << (pos & 7);
    }
    this.itemCount++;
  }

  mightContain(value: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const pos = this.hash(value, i);
      if ((this.bits[pos >>> 3] & (1 << (pos & 7))) === 0) return false;
    }
    return true;
  }

  get count(): number {
    return this.itemCount;
  }

  get falsePositiveRate(): number {
    const m = this.size;
    const k = this.hashCount;
    const n = this.itemCount;
    return Math.pow(1 - Math.exp(-k * n / m), k);
  }

  clear(): void {
    this.bits.fill(0);
    this.itemCount = 0;
  }

  private hash(value: string, seed: number): number {
    let h = seed * 0x9747b28c;
    for (let i = 0; i < value.length; i++) {
      h = Math.imul(h ^ value.charCodeAt(i), 0x5bd1e995);
      h ^= h >>> 15;
    }
    return ((h >>> 0) % this.size);
  }
}
