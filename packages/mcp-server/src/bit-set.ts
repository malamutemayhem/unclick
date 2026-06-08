export class BitSet {
  private data: Uint32Array;
  readonly size: number;

  constructor(size: number) {
    this.size = size;
    this.data = new Uint32Array(Math.ceil(size / 32));
  }

  set(index: number): void {
    if (index < 0 || index >= this.size) return;
    this.data[index >>> 5] |= 1 << (index & 31);
  }

  clear(index: number): void {
    if (index < 0 || index >= this.size) return;
    this.data[index >>> 5] &= ~(1 << (index & 31));
  }

  get(index: number): boolean {
    if (index < 0 || index >= this.size) return false;
    return (this.data[index >>> 5] & (1 << (index & 31))) !== 0;
  }

  toggle(index: number): void {
    if (index < 0 || index >= this.size) return;
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

  and(other: BitSet): BitSet {
    const result = new BitSet(Math.min(this.size, other.size));
    const len = Math.min(this.data.length, other.data.length);
    for (let i = 0; i < len; i++) result.data[i] = this.data[i] & other.data[i];
    return result;
  }

  or(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this.size, other.size));
    for (let i = 0; i < this.data.length; i++) result.data[i] |= this.data[i];
    for (let i = 0; i < other.data.length; i++) result.data[i] |= other.data[i];
    return result;
  }

  xor(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this.size, other.size));
    for (let i = 0; i < this.data.length; i++) result.data[i] ^= this.data[i];
    for (let i = 0; i < other.data.length; i++) result.data[i] ^= other.data[i];
    return result;
  }

  toArray(): number[] {
    const indices: number[] = [];
    for (let i = 0; i < this.size; i++) {
      if (this.get(i)) indices.push(i);
    }
    return indices;
  }
}
