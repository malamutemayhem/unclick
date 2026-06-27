export class PacketBuilder {
  private data: number[] = [];

  writeUint8(value: number): this {
    this.data.push(value & 0xFF);
    return this;
  }

  writeUint16BE(value: number): this {
    this.data.push((value >> 8) & 0xFF, value & 0xFF);
    return this;
  }

  writeUint16LE(value: number): this {
    this.data.push(value & 0xFF, (value >> 8) & 0xFF);
    return this;
  }

  writeUint32BE(value: number): this {
    this.data.push(
      (value >>> 24) & 0xFF,
      (value >>> 16) & 0xFF,
      (value >>> 8) & 0xFF,
      value & 0xFF,
    );
    return this;
  }

  writeUint32LE(value: number): this {
    this.data.push(
      value & 0xFF,
      (value >>> 8) & 0xFF,
      (value >>> 16) & 0xFF,
      (value >>> 24) & 0xFF,
    );
    return this;
  }

  writeString(str: string, length?: number): this {
    const len = length ?? str.length;
    for (let i = 0; i < len; i++) {
      this.data.push(i < str.length ? str.charCodeAt(i) : 0);
    }
    return this;
  }

  writeBytes(bytes: number[]): this {
    for (const b of bytes) this.data.push(b & 0xFF);
    return this;
  }

  writePadding(count: number, value = 0): this {
    for (let i = 0; i < count; i++) this.data.push(value & 0xFF);
    return this;
  }

  build(): number[] {
    return [...this.data];
  }

  length(): number {
    return this.data.length;
  }

  reset(): this {
    this.data = [];
    return this;
  }

  toHex(): string {
    return this.data.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  static fromHex(hex: string): number[] {
    const bytes: number[] = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substring(i, i + 2), 16));
    }
    return bytes;
  }

  static readUint8(data: number[], offset: number): number {
    return data[offset];
  }

  static readUint16BE(data: number[], offset: number): number {
    return (data[offset] << 8) | data[offset + 1];
  }

  static readUint16LE(data: number[], offset: number): number {
    return data[offset] | (data[offset + 1] << 8);
  }

  static readUint32BE(data: number[], offset: number): number {
    return ((data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]) >>> 0;
  }

  static readUint32LE(data: number[], offset: number): number {
    return (data[offset] | (data[offset + 1] << 8) | (data[offset + 2] << 16) | (data[offset + 3] << 24)) >>> 0;
  }

  static readString(data: number[], offset: number, length: number): string {
    let str = "";
    for (let i = 0; i < length; i++) {
      if (data[offset + i] !== 0) str += String.fromCharCode(data[offset + i]);
    }
    return str;
  }
}
