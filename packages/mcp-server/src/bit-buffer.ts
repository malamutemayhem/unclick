export class BitBuffer {
  private bytes: Uint8Array;
  private _bitLength = 0;

  constructor(initialCapacity = 16) {
    this.bytes = new Uint8Array(initialCapacity);
  }

  get bitLength(): number {
    return this._bitLength;
  }

  get byteLength(): number {
    return Math.ceil(this._bitLength / 8);
  }

  writeBit(bit: 0 | 1): void {
    const byteIdx = this._bitLength >>> 3;
    const bitIdx = 7 - (this._bitLength & 7);
    this.ensureCapacity(byteIdx + 1);
    if (bit) {
      this.bytes[byteIdx] |= 1 << bitIdx;
    } else {
      this.bytes[byteIdx] &= ~(1 << bitIdx);
    }
    this._bitLength++;
  }

  writeBits(value: number, count: number): void {
    for (let i = count - 1; i >= 0; i--) {
      this.writeBit(((value >>> i) & 1) as 0 | 1);
    }
  }

  readBit(position: number): 0 | 1 {
    if (position >= this._bitLength) throw new RangeError("Out of bounds");
    const byteIdx = position >>> 3;
    const bitIdx = 7 - (position & 7);
    return ((this.bytes[byteIdx] >>> bitIdx) & 1) as 0 | 1;
  }

  readBits(position: number, count: number): number {
    let value = 0;
    for (let i = 0; i < count; i++) {
      value = (value << 1) | this.readBit(position + i);
    }
    return value;
  }

  toUint8Array(): Uint8Array {
    return this.bytes.slice(0, this.byteLength);
  }

  toBinaryString(): string {
    let s = "";
    for (let i = 0; i < this._bitLength; i++) {
      s += this.readBit(i);
    }
    return s;
  }

  static fromBinaryString(str: string): BitBuffer {
    const buf = new BitBuffer(Math.ceil(str.length / 8));
    for (const ch of str) {
      buf.writeBit(ch === "1" ? 1 : 0);
    }
    return buf;
  }

  private ensureCapacity(needed: number): void {
    if (needed <= this.bytes.length) return;
    let newSize = this.bytes.length * 2;
    while (newSize < needed) newSize *= 2;
    const newBytes = new Uint8Array(newSize);
    newBytes.set(this.bytes);
    this.bytes = newBytes;
  }
}
