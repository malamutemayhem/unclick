export class BitSet {
  private data: Uint32Array;
  private _size: number;

  constructor(size: number) {
    this._size = size;
    this.data = new Uint32Array(Math.ceil(size / 32));
  }

  set(index: number): void {
    if (index < 0 || index >= this._size) return;
    this.data[index >>> 5] |= 1 << (index & 31);
  }

  clear(index: number): void {
    if (index < 0 || index >= this._size) return;
    this.data[index >>> 5] &= ~(1 << (index & 31));
  }

  get(index: number): boolean {
    if (index < 0 || index >= this._size) return false;
    return (this.data[index >>> 5] & (1 << (index & 31))) !== 0;
  }

  toggle(index: number): void {
    if (index < 0 || index >= this._size) return;
    this.data[index >>> 5] ^= 1 << (index & 31);
  }

  count(): number {
    let total = 0;
    for (let i = 0; i < this.data.length; i++) {
      let v = this.data[i];
      v = v - ((v >>> 1) & 0x55555555);
      v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
      total += (((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
    }
    return total;
  }

  get size(): number {
    return this._size;
  }

  and(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this._size, other._size));
    const len = Math.min(this.data.length, other.data.length);
    for (let i = 0; i < len; i++) {
      result.data[i] = this.data[i] & other.data[i];
    }
    return result;
  }

  or(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this._size, other._size));
    for (let i = 0; i < result.data.length; i++) {
      result.data[i] = (this.data[i] || 0) | (other.data[i] || 0);
    }
    return result;
  }

  xor(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this._size, other._size));
    for (let i = 0; i < result.data.length; i++) {
      result.data[i] = (this.data[i] || 0) ^ (other.data[i] || 0);
    }
    return result;
  }

  clearAll(): void {
    this.data.fill(0);
  }

  toArray(): number[] {
    const result: number[] = [];
    for (let i = 0; i < this._size; i++) {
      if (this.get(i)) result.push(i);
    }
    return result;
  }
}
