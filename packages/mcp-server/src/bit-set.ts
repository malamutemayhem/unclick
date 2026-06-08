export class BitSet {
  private words: Uint32Array;
  private bitCount: number;

  constructor(size: number) {
    this.bitCount = size;
    this.words = new Uint32Array(Math.ceil(size / 32));
  }

  set(index: number): void {
    if (index < 0 || index >= this.bitCount) return;
    this.words[index >>> 5] |= 1 << (index & 31);
  }

  clear(index: number): void {
    if (index < 0 || index >= this.bitCount) return;
    this.words[index >>> 5] &= ~(1 << (index & 31));
  }

  has(index: number): boolean {
    if (index < 0 || index >= this.bitCount) return false;
    return (this.words[index >>> 5] & (1 << (index & 31))) !== 0;
  }

  toggle(index: number): void {
    if (index < 0 || index >= this.bitCount) return;
    this.words[index >>> 5] ^= 1 << (index & 31);
  }

  count(): number {
    let n = 0;
    for (const word of this.words) {
      n += popcount(word);
    }
    return n;
  }

  clearAll(): void {
    this.words.fill(0);
  }

  get size(): number {
    return this.bitCount;
  }

  toArray(): number[] {
    const result: number[] = [];
    for (let i = 0; i < this.bitCount; i++) {
      if (this.has(i)) result.push(i);
    }
    return result;
  }
}

function popcount(x: number): number {
  x = x - ((x >> 1) & 0x55555555);
  x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
  return (((x + (x >> 4)) & 0x0f0f0f0f) * 0x01010101) >> 24;
}
