export class BitSet {
  private words: Uint32Array;
  private _size: number;

  constructor(size: number) {
    this._size = size;
    this.words = new Uint32Array(Math.ceil(size / 32));
  }

  get size(): number { return this._size; }

  set(index: number): void {
    this.checkBounds(index);
    this.words[index >>> 5] |= 1 << (index & 31);
  }

  clear(index: number): void {
    this.checkBounds(index);
    this.words[index >>> 5] &= ~(1 << (index & 31));
  }

  get(index: number): boolean {
    this.checkBounds(index);
    return (this.words[index >>> 5] & (1 << (index & 31))) !== 0;
  }

  toggle(index: number): void {
    this.checkBounds(index);
    this.words[index >>> 5] ^= 1 << (index & 31);
  }

  count(): number {
    let total = 0;
    for (const word of this.words) {
      let w = word;
      while (w) { w &= w - 1; total++; }
    }
    return total;
  }

  and(other: BitSet): BitSet {
    const result = new BitSet(Math.min(this._size, other._size));
    for (let i = 0; i < result.words.length; i++) {
      result.words[i] = (this.words[i] ?? 0) & (other.words[i] ?? 0);
    }
    return result;
  }

  or(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this._size, other._size));
    for (let i = 0; i < result.words.length; i++) {
      result.words[i] = (this.words[i] ?? 0) | (other.words[i] ?? 0);
    }
    return result;
  }

  xor(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this._size, other._size));
    for (let i = 0; i < result.words.length; i++) {
      result.words[i] = (this.words[i] ?? 0) ^ (other.words[i] ?? 0);
    }
    return result;
  }

  clearAll(): void {
    this.words.fill(0);
  }

  toArray(): number[] {
    const result: number[] = [];
    for (let i = 0; i < this._size; i++) {
      if (this.get(i)) result.push(i);
    }
    return result;
  }

  private checkBounds(index: number): void {
    if (index < 0 || index >= this._size) throw new RangeError(`Index ${index} out of bounds [0, ${this._size})`);
  }
}
