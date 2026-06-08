export class BloomFilter {
  private bits: Uint8Array;
  private bitCount: number;
  private hashCount: number;
  private itemCount = 0;

  constructor(expectedItems: number, falsePositiveRate = 0.01) {
    this.bitCount = Math.max(1, Math.ceil(-expectedItems * Math.log(falsePositiveRate) / (Math.log(2) ** 2)));
    this.hashCount = Math.max(1, Math.round((this.bitCount / expectedItems) * Math.log(2)));
    this.bits = new Uint8Array(Math.ceil(this.bitCount / 8));
  }

  add(item: string): void {
    for (const pos of this.getPositions(item)) {
      this.bits[Math.floor(pos / 8)] |= 1 << (pos % 8);
    }
    this.itemCount++;
  }

  mightContain(item: string): boolean {
    for (const pos of this.getPositions(item)) {
      if (!(this.bits[Math.floor(pos / 8)] & (1 << (pos % 8)))) return false;
    }
    return true;
  }

  get size(): number {
    return this.itemCount;
  }

  get capacity(): number {
    return this.bitCount;
  }

  get hashFunctions(): number {
    return this.hashCount;
  }

  fillRatio(): number {
    let set = 0;
    for (let i = 0; i < this.bitCount; i++) {
      if (this.bits[Math.floor(i / 8)] & (1 << (i % 8))) set++;
    }
    return set / this.bitCount;
  }

  clear(): void {
    this.bits.fill(0);
    this.itemCount = 0;
  }

  private getPositions(item: string): number[] {
    const h1 = this.hash1(item);
    const h2 = this.hash2(item);
    const positions: number[] = [];
    for (let i = 0; i < this.hashCount; i++) {
      positions.push(Math.abs((h1 + i * h2) % this.bitCount));
    }
    return positions;
  }

  private hash1(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0x7fffffff;
    }
    return hash;
  }

  private hash2(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) & 0x7fffffff;
    }
    return hash || 1;
  }
}
