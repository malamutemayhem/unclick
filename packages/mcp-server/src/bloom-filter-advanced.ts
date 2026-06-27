export class BloomFilter {
  private bits: Uint8Array;
  private bitCount: number;
  private hashCount: number;
  private insertCount = 0;

  constructor(expectedItems: number, falsePositiveRate: number = 0.01) {
    this.bitCount = Math.max(1, Math.ceil(-expectedItems * Math.log(falsePositiveRate) / (Math.LN2 * Math.LN2)));
    this.hashCount = Math.max(1, Math.round((this.bitCount / expectedItems) * Math.LN2));
    this.bits = new Uint8Array(Math.ceil(this.bitCount / 8));
  }

  private hashes(value: string): number[] {
    const h1 = this.hash1(value);
    const h2 = this.hash2(value);
    const result: number[] = [];
    for (let i = 0; i < this.hashCount; i++) {
      result.push(Math.abs((h1 + i * h2) % this.bitCount));
    }
    return result;
  }

  private hash1(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
  }

  private hash2(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash) || 1;
  }

  private setBit(pos: number): void {
    this.bits[pos >> 3] |= 1 << (pos & 7);
  }

  private getBit(pos: number): boolean {
    return (this.bits[pos >> 3] & (1 << (pos & 7))) !== 0;
  }

  add(value: string): void {
    for (const pos of this.hashes(value)) {
      this.setBit(pos);
    }
    this.insertCount++;
  }

  mightContain(value: string): boolean {
    return this.hashes(value).every((pos) => this.getBit(pos));
  }

  count(): number {
    return this.insertCount;
  }

  estimatedFalsePositiveRate(): number {
    const bitsSet = this.bitsFilled();
    const ratio = bitsSet / this.bitCount;
    return Math.pow(ratio, this.hashCount);
  }

  private bitsFilled(): number {
    let count = 0;
    for (const byte of this.bits) {
      let b = byte;
      while (b) {
        count += b & 1;
        b >>= 1;
      }
    }
    return count;
  }

  bitSize(): number {
    return this.bitCount;
  }

  hashFunctions(): number {
    return this.hashCount;
  }

  clear(): void {
    this.bits.fill(0);
    this.insertCount = 0;
  }

  merge(other: BloomFilter): BloomFilter {
    if (this.bitCount !== other.bitCount || this.hashCount !== other.hashCount) {
      throw new Error("Cannot merge filters with different parameters");
    }
    const result = new BloomFilter(1, 0.5);
    result.bits = new Uint8Array(this.bits.length);
    (result as any).bitCount = this.bitCount;
    (result as any).hashCount = this.hashCount;
    for (let i = 0; i < this.bits.length; i++) {
      result.bits[i] = this.bits[i] | other.bits[i];
    }
    result.insertCount = this.insertCount + other.insertCount;
    return result;
  }
}

export class CountingBloomFilter {
  private counters: Uint8Array;
  private size: number;
  private hashCount: number;
  private insertCount = 0;

  constructor(expectedItems: number, falsePositiveRate: number = 0.01) {
    this.size = Math.max(1, Math.ceil(-expectedItems * Math.log(falsePositiveRate) / (Math.LN2 * Math.LN2)));
    this.hashCount = Math.max(1, Math.round((this.size / expectedItems) * Math.LN2));
    this.counters = new Uint8Array(this.size);
  }

  private hashes(value: string): number[] {
    let h1 = 0;
    for (let i = 0; i < value.length; i++) {
      h1 = ((h1 << 5) - h1 + value.charCodeAt(i)) | 0;
    }
    let h2 = 5381;
    for (let i = 0; i < value.length; i++) {
      h2 = ((h2 << 5) + h2 + value.charCodeAt(i)) | 0;
    }
    h1 = Math.abs(h1);
    h2 = Math.abs(h2) || 1;
    const result: number[] = [];
    for (let i = 0; i < this.hashCount; i++) {
      result.push(Math.abs((h1 + i * h2) % this.size));
    }
    return result;
  }

  add(value: string): void {
    for (const pos of this.hashes(value)) {
      if (this.counters[pos] < 255) this.counters[pos]++;
    }
    this.insertCount++;
  }

  remove(value: string): boolean {
    const positions = this.hashes(value);
    if (!positions.every((pos) => this.counters[pos] > 0)) return false;
    for (const pos of positions) {
      this.counters[pos]--;
    }
    this.insertCount--;
    return true;
  }

  mightContain(value: string): boolean {
    return this.hashes(value).every((pos) => this.counters[pos] > 0);
  }

  count(): number {
    return this.insertCount;
  }
}
