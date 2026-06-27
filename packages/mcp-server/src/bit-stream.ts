export class BitWriter {
  private buffer: number[] = [];
  private current = 0;
  private bitPos = 0;

  writeBit(bit: 0 | 1): void {
    this.current |= bit << (7 - this.bitPos);
    this.bitPos++;
    if (this.bitPos === 8) {
      this.buffer.push(this.current);
      this.current = 0;
      this.bitPos = 0;
    }
  }

  writeBits(value: number, count: number): void {
    for (let i = count - 1; i >= 0; i--) {
      this.writeBit(((value >> i) & 1) as 0 | 1);
    }
  }

  writeByte(byte: number): void {
    this.writeBits(byte & 0xff, 8);
  }

  writeUint16(value: number): void {
    this.writeBits((value >> 8) & 0xff, 8);
    this.writeBits(value & 0xff, 8);
  }

  writeUint32(value: number): void {
    this.writeBits((value >>> 24) & 0xff, 8);
    this.writeBits((value >>> 16) & 0xff, 8);
    this.writeBits((value >>> 8) & 0xff, 8);
    this.writeBits(value & 0xff, 8);
  }

  flush(): number[] {
    if (this.bitPos > 0) {
      this.buffer.push(this.current);
      this.current = 0;
      this.bitPos = 0;
    }
    return [...this.buffer];
  }

  get byteLength(): number {
    return this.buffer.length + (this.bitPos > 0 ? 1 : 0);
  }

  get bitLength(): number {
    return this.buffer.length * 8 + this.bitPos;
  }
}

export class BitReader {
  private data: number[];
  private bytePos = 0;
  private bitPos = 0;

  constructor(data: number[]) {
    this.data = data;
  }

  readBit(): 0 | 1 {
    if (this.bytePos >= this.data.length) throw new Error("End of stream");
    const bit = ((this.data[this.bytePos] >> (7 - this.bitPos)) & 1) as 0 | 1;
    this.bitPos++;
    if (this.bitPos === 8) {
      this.bytePos++;
      this.bitPos = 0;
    }
    return bit;
  }

  readBits(count: number): number {
    let value = 0;
    for (let i = 0; i < count; i++) {
      value = (value << 1) | this.readBit();
    }
    return value;
  }

  readByte(): number {
    return this.readBits(8);
  }

  readUint16(): number {
    return this.readBits(16);
  }

  readUint32(): number {
    return this.readBits(32) >>> 0;
  }

  get remaining(): number {
    return (this.data.length - this.bytePos) * 8 - this.bitPos;
  }

  get position(): number {
    return this.bytePos * 8 + this.bitPos;
  }

  seek(bitOffset: number): void {
    this.bytePos = Math.floor(bitOffset / 8);
    this.bitPos = bitOffset % 8;
  }
}
