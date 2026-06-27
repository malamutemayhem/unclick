export class BitArray {
  private data: Uint32Array;
  private _length: number;

  constructor(length: number) {
    this._length = length;
    this.data = new Uint32Array(Math.ceil(length / 32));
  }

  get length(): number {
    return this._length;
  }

  set(index: number): void {
    if (index < 0 || index >= this._length) return;
    this.data[index >>> 5] |= 1 << (index & 31);
  }

  clear(index: number): void {
    if (index < 0 || index >= this._length) return;
    this.data[index >>> 5] &= ~(1 << (index & 31));
  }

  get(index: number): boolean {
    if (index < 0 || index >= this._length) return false;
    return (this.data[index >>> 5] & (1 << (index & 31))) !== 0;
  }

  toggle(index: number): void {
    if (index < 0 || index >= this._length) return;
    this.data[index >>> 5] ^= 1 << (index & 31);
  }

  setAll(): void {
    this.data.fill(0xFFFFFFFF);
    const remainder = this._length & 31;
    if (remainder > 0) {
      this.data[this.data.length - 1] &= (1 << remainder) - 1;
    }
  }

  clearAll(): void {
    this.data.fill(0);
  }

  popcount(): number {
    let count = 0;
    for (let i = 0; i < this.data.length; i++) {
      let v = this.data[i];
      v = v - ((v >>> 1) & 0x55555555);
      v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
      count += (((v + (v >>> 4)) & 0x0F0F0F0F) * 0x01010101) >>> 24;
    }
    return count;
  }

  and(other: BitArray): BitArray {
    const len = Math.min(this._length, other._length);
    const result = new BitArray(len);
    const words = Math.ceil(len / 32);
    for (let i = 0; i < words; i++) {
      result.data[i] = this.data[i] & other.data[i];
    }
    return result;
  }

  or(other: BitArray): BitArray {
    const len = Math.max(this._length, other._length);
    const result = new BitArray(len);
    const words = Math.ceil(len / 32);
    for (let i = 0; i < words; i++) {
      result.data[i] = (this.data[i] ?? 0) | (other.data[i] ?? 0);
    }
    return result;
  }

  xor(other: BitArray): BitArray {
    const len = Math.max(this._length, other._length);
    const result = new BitArray(len);
    const words = Math.ceil(len / 32);
    for (let i = 0; i < words; i++) {
      result.data[i] = (this.data[i] ?? 0) ^ (other.data[i] ?? 0);
    }
    return result;
  }

  not(): BitArray {
    const result = new BitArray(this._length);
    for (let i = 0; i < this.data.length; i++) {
      result.data[i] = ~this.data[i];
    }
    return result;
  }

  equals(other: BitArray): boolean {
    if (this._length !== other._length) return false;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] !== other.data[i]) return false;
    }
    return true;
  }

  toString(): string {
    let s = "";
    for (let i = 0; i < this._length; i++) {
      s += this.get(i) ? "1" : "0";
    }
    return s;
  }

  static fromString(bits: string): BitArray {
    const arr = new BitArray(bits.length);
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] === "1") arr.set(i);
    }
    return arr;
  }
}
