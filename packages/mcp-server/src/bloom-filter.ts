export class BloomFilter {
  private bits: Uint8Array;
  private size: number;
  private hashCount: number;
  private insertedCount = 0;

  constructor(size: number, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  add(item: string): void {
    for (const pos of this.getPositions(item)) {
      this.bits[Math.floor(pos / 8)] |= 1 << (pos % 8);
    }
    this.insertedCount++;
  }

  mightContain(item: string): boolean {
    for (const pos of this.getPositions(item)) {
      if (!(this.bits[Math.floor(pos / 8)] & (1 << (pos % 8)))) return false;
    }
    return true;
  }

  private getPositions(item: string): number[] {
    const positions: number[] = [];
    for (let i = 0; i < this.hashCount; i++) {
      positions.push(this.hash(item, i) % this.size);
    }
    return positions;
  }

  private hash(item: string, seed: number): number {
    let h = seed * 0x811c9dc5;
    for (let i = 0; i < item.length; i++) {
      h ^= item.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return Math.abs(h);
  }

  get falsePositiveRate(): number {
    const m = this.size;
    const k = this.hashCount;
    const n = this.insertedCount;
    return Math.pow(1 - Math.exp(-k * n / m), k);
  }

  get count(): number {
    return this.insertedCount;
  }

  clear(): void {
    this.bits.fill(0);
    this.insertedCount = 0;
  }

  static optimal(expectedItems: number, falsePositiveRate: number): BloomFilter {
    const m = Math.ceil(-expectedItems * Math.log(falsePositiveRate) / (Math.log(2) ** 2));
    const k = Math.ceil((m / expectedItems) * Math.log(2));
    return new BloomFilter(m, k);
  }
}
