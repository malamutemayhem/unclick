export class BloomFilter2D {
  private bits: Uint8Array;
  private width: number;
  private height: number;
  private hashCount: number;
  private count: number = 0;

  constructor(width: number, height: number, hashCount = 3) {
    this.width = width;
    this.height = height;
    this.hashCount = hashCount;
    this.bits = new Uint8Array(width * height);
  }

  private hashes(x: number, y: number): number[] {
    const indices: number[] = [];
    for (let i = 0; i < this.hashCount; i++) {
      const h1 = ((x * 2654435761 + i * 1234567) >>> 0) % this.width;
      const h2 = ((y * 2246822519 + i * 7654321) >>> 0) % this.height;
      indices.push(h2 * this.width + h1);
    }
    return indices;
  }

  add(x: number, y: number): void {
    for (const idx of this.hashes(x, y)) {
      this.bits[idx] = 1;
    }
    this.count++;
  }

  test(x: number, y: number): boolean {
    for (const idx of this.hashes(x, y)) {
      if (!this.bits[idx]) return false;
    }
    return true;
  }

  falsePositiveRate(): number {
    const m = this.width * this.height;
    const k = this.hashCount;
    const n = this.count;
    const rate = Math.pow(1 - Math.exp(-k * n / m), k);
    return Math.round(rate * 10000) / 10000;
  }

  clear(): void {
    this.bits.fill(0);
    this.count = 0;
  }

  fillRatio(): number {
    let set = 0;
    for (let i = 0; i < this.bits.length; i++) {
      if (this.bits[i]) set++;
    }
    return Math.round((set / this.bits.length) * 10000) / 10000;
  }

  size(): number {
    return this.count;
  }

  union(other: BloomFilter2D): BloomFilter2D {
    const result = new BloomFilter2D(this.width, this.height, this.hashCount);
    for (let i = 0; i < this.bits.length; i++) {
      result.bits[i] = this.bits[i] | other.bits[i];
    }
    result.count = this.count + other.count;
    return result;
  }

  intersection(other: BloomFilter2D): BloomFilter2D {
    const result = new BloomFilter2D(this.width, this.height, this.hashCount);
    for (let i = 0; i < this.bits.length; i++) {
      result.bits[i] = this.bits[i] & other.bits[i];
    }
    return result;
  }
}
