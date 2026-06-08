export class BitSet {
  private data: Uint32Array;
  private readonly capacity: number;

  constructor(size: number) {
    this.capacity = size;
    this.data = new Uint32Array(Math.ceil(size / 32));
  }

  set(index: number): this {
    if (index < 0 || index >= this.capacity) return this;
    this.data[index >>> 5] |= 1 << (index & 31);
    return this;
  }

  clear(index: number): this {
    if (index < 0 || index >= this.capacity) return this;
    this.data[index >>> 5] &= ~(1 << (index & 31));
    return this;
  }

  get(index: number): boolean {
    if (index < 0 || index >= this.capacity) return false;
    return (this.data[index >>> 5] & (1 << (index & 31))) !== 0;
  }

  toggle(index: number): this {
    if (index < 0 || index >= this.capacity) return this;
    this.data[index >>> 5] ^= 1 << (index & 31);
    return this;
  }

  clearAll(): void {
    this.data.fill(0);
  }

  get size(): number {
    return this.capacity;
  }

  get count(): number {
    let total = 0;
    for (let i = 0; i < this.data.length; i++) {
      let v = this.data[i];
      v = v - ((v >>> 1) & 0x55555555);
      v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
      total += ((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101 >>> 24;
    }
    return total;
  }

  and(other: BitSet): BitSet {
    const result = new BitSet(Math.min(this.capacity, other.capacity));
    const len = Math.min(this.data.length, other.data.length);
    for (let i = 0; i < len; i++) result.data[i] = this.data[i] & other.data[i];
    return result;
  }

  or(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this.capacity, other.capacity));
    for (let i = 0; i < this.data.length; i++) result.data[i] |= this.data[i];
    for (let i = 0; i < other.data.length; i++) result.data[i] |= other.data[i];
    return result;
  }

  toArray(): number[] {
    const result: number[] = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.get(i)) result.push(i);
    }
    return result;
  }
}
