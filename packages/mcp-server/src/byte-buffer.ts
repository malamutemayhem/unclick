export class ByteBuffer {
  private data: DataView;
  private buffer: ArrayBuffer;
  private _offset = 0;
  private _size: number;

  constructor(sizeOrBuffer: number | ArrayBuffer = 256) {
    if (typeof sizeOrBuffer === "number") {
      this.buffer = new ArrayBuffer(sizeOrBuffer);
      this._size = 0;
    } else {
      this.buffer = sizeOrBuffer;
      this._size = sizeOrBuffer.byteLength;
    }
    this.data = new DataView(this.buffer);
  }

  get offset(): number { return this._offset; }
  get size(): number { return this._size; }
  get capacity(): number { return this.buffer.byteLength; }
  get remaining(): number { return this._size - this._offset; }

  seek(offset: number): this {
    this._offset = offset;
    return this;
  }

  private grow(needed: number): void {
    if (this._offset + needed <= this.buffer.byteLength) return;
    let newSize = this.buffer.byteLength * 2;
    while (newSize < this._offset + needed) newSize *= 2;
    const newBuf = new ArrayBuffer(newSize);
    new Uint8Array(newBuf).set(new Uint8Array(this.buffer));
    this.buffer = newBuf;
    this.data = new DataView(this.buffer);
  }

  writeUint8(value: number): this {
    this.grow(1);
    this.data.setUint8(this._offset, value);
    this._offset += 1;
    if (this._offset > this._size) this._size = this._offset;
    return this;
  }

  readUint8(): number {
    const v = this.data.getUint8(this._offset);
    this._offset += 1;
    return v;
  }

  writeUint16(value: number, littleEndian = false): this {
    this.grow(2);
    this.data.setUint16(this._offset, value, littleEndian);
    this._offset += 2;
    if (this._offset > this._size) this._size = this._offset;
    return this;
  }

  readUint16(littleEndian = false): number {
    const v = this.data.getUint16(this._offset, littleEndian);
    this._offset += 2;
    return v;
  }

  writeUint32(value: number, littleEndian = false): this {
    this.grow(4);
    this.data.setUint32(this._offset, value, littleEndian);
    this._offset += 4;
    if (this._offset > this._size) this._size = this._offset;
    return this;
  }

  readUint32(littleEndian = false): number {
    const v = this.data.getUint32(this._offset, littleEndian);
    this._offset += 4;
    return v;
  }

  writeFloat32(value: number, littleEndian = false): this {
    this.grow(4);
    this.data.setFloat32(this._offset, value, littleEndian);
    this._offset += 4;
    if (this._offset > this._size) this._size = this._offset;
    return this;
  }

  readFloat32(littleEndian = false): number {
    const v = this.data.getFloat32(this._offset, littleEndian);
    this._offset += 4;
    return v;
  }

  writeFloat64(value: number, littleEndian = false): this {
    this.grow(8);
    this.data.setFloat64(this._offset, value, littleEndian);
    this._offset += 8;
    if (this._offset > this._size) this._size = this._offset;
    return this;
  }

  readFloat64(littleEndian = false): number {
    const v = this.data.getFloat64(this._offset, littleEndian);
    this._offset += 8;
    return v;
  }

  writeString(str: string): this {
    const encoded = new TextEncoder().encode(str);
    this.writeUint32(encoded.length);
    this.grow(encoded.length);
    new Uint8Array(this.buffer).set(encoded, this._offset);
    this._offset += encoded.length;
    if (this._offset > this._size) this._size = this._offset;
    return this;
  }

  readString(): string {
    const len = this.readUint32();
    const bytes = new Uint8Array(this.buffer, this._offset, len);
    this._offset += len;
    return new TextDecoder().decode(bytes);
  }

  writeBytes(bytes: Uint8Array): this {
    this.grow(bytes.length);
    new Uint8Array(this.buffer).set(bytes, this._offset);
    this._offset += bytes.length;
    if (this._offset > this._size) this._size = this._offset;
    return this;
  }

  readBytes(length: number): Uint8Array {
    const result = new Uint8Array(this.buffer.slice(this._offset, this._offset + length));
    this._offset += length;
    return result;
  }

  toUint8Array(): Uint8Array {
    return new Uint8Array(this.buffer, 0, this._size);
  }

  static from(data: Uint8Array): ByteBuffer {
    const copy = new ArrayBuffer(data.byteLength);
    new Uint8Array(copy).set(data);
    const buf = new ByteBuffer(copy);
    return buf;
  }
}
