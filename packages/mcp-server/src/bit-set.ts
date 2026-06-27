export class BitSet {
  private words: Uint32Array;
  private _size: number;

  constructor(size: number) {
    this._size = size;
    this.words = new Uint32Array(Math.ceil(size / 32));
  }

  get size(): number {
    return this._size;
  }

  set(index: number): void {
    if (index < 0 || index >= this._size) return;
    this.words[index >>> 5] |= 1 << (index & 31);
  }

  clear(index: number): void {
    if (index < 0 || index >= this._size) return;
    this.words[index >>> 5] &= ~(1 << (index & 31));
  }

  get(index: number): boolean {
    if (index < 0 || index >= this._size) return false;
    return (this.words[index >>> 5] & (1 << (index & 31))) !== 0;
  }

  toggle(index: number): void {
    if (index < 0 || index >= this._size) return;
    this.words[index >>> 5] ^= 1 << (index & 31);
  }

  count(): number {
    let total = 0;
    for (let i = 0; i < this.words.length; i++) {
      total += popcount(this.words[i]);
    }
    return total;
  }

  and(other: BitSet): BitSet {
    const len = Math.min(this.words.length, other.words.length);
    const result = new BitSet(Math.min(this._size, other._size));
    for (let i = 0; i < len; i++) {
      result.words[i] = this.words[i] & other.words[i];
    }
    return result;
  }

  or(other: BitSet): BitSet {
    const maxSize = Math.max(this._size, other._size);
    const result = new BitSet(maxSize);
    const len = Math.max(this.words.length, other.words.length);
    for (let i = 0; i < len; i++) {
      const a = i < this.words.length ? this.words[i] : 0;
      const b = i < other.words.length ? other.words[i] : 0;
      result.words[i] = a | b;
    }
    return result;
  }

  xor(other: BitSet): BitSet {
    const maxSize = Math.max(this._size, other._size);
    const result = new BitSet(maxSize);
    const len = Math.max(this.words.length, other.words.length);
    for (let i = 0; i < len; i++) {
      const a = i < this.words.length ? this.words[i] : 0;
      const b = i < other.words.length ? other.words[i] : 0;
      result.words[i] = a ^ b;
    }
    return result;
  }

  not(): BitSet {
    const result = new BitSet(this._size);
    for (let i = 0; i < this.words.length; i++) {
      result.words[i] = ~this.words[i];
    }
    return result;
  }

  isEmpty(): boolean {
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i] !== 0) return false;
    }
    return true;
  }

  clearAll(): void {
    this.words.fill(0);
  }

  setAll(): void {
    this.words.fill(0xFFFFFFFF);
  }

  toArray(): number[] {
    const indices: number[] = [];
    for (let i = 0; i < this._size; i++) {
      if (this.get(i)) indices.push(i);
    }
    return indices;
  }

  *[Symbol.iterator](): Iterator<number> {
    for (let i = 0; i < this._size; i++) {
      if (this.get(i)) yield i;
    }
  }
}

function popcount(n: number): number {
  n = n - ((n >>> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
  return (((n + (n >>> 4)) & 0x0F0F0F0F) * 0x01010101) >>> 24;
}
