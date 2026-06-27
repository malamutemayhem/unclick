export type WireType = 0 | 1 | 2 | 5;

export interface Field {
  fieldNumber: number;
  wireType: WireType;
  value: number | bigint | Uint8Array;
}

export class ProtoWriter {
  private data: number[] = [];

  writeVarint(value: number): this {
    let v = value >>> 0;
    while (v > 0x7f) {
      this.data.push((v & 0x7f) | 0x80);
      v >>>= 7;
    }
    this.data.push(v);
    return this;
  }

  writeTag(fieldNumber: number, wireType: WireType): this {
    return this.writeVarint((fieldNumber << 3) | wireType);
  }

  writeInt32(fieldNumber: number, value: number): this {
    this.writeTag(fieldNumber, 0);
    return this.writeVarint(value);
  }

  writeString(fieldNumber: number, value: string): this {
    const encoded = new TextEncoder().encode(value);
    this.writeTag(fieldNumber, 2);
    this.writeVarint(encoded.length);
    for (let i = 0; i < encoded.length; i++) this.data.push(encoded[i]);
    return this;
  }

  writeBytes(fieldNumber: number, value: Uint8Array): this {
    this.writeTag(fieldNumber, 2);
    this.writeVarint(value.length);
    for (let i = 0; i < value.length; i++) this.data.push(value[i]);
    return this;
  }

  writeBool(fieldNumber: number, value: boolean): this {
    this.writeTag(fieldNumber, 0);
    this.data.push(value ? 1 : 0);
    return this;
  }

  writeFixed32(fieldNumber: number, value: number): this {
    this.writeTag(fieldNumber, 5);
    this.data.push(value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff, (value >> 24) & 0xff);
    return this;
  }

  writeFloat(fieldNumber: number, value: number): this {
    this.writeTag(fieldNumber, 5);
    const buf = new ArrayBuffer(4);
    new DataView(buf).setFloat32(0, value, true);
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < 4; i++) this.data.push(bytes[i]);
    return this;
  }

  writeDouble(fieldNumber: number, value: number): this {
    this.writeTag(fieldNumber, 1);
    const buf = new ArrayBuffer(8);
    new DataView(buf).setFloat64(0, value, true);
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < 8; i++) this.data.push(bytes[i]);
    return this;
  }

  writeEmbedded(fieldNumber: number, writer: ProtoWriter): this {
    const bytes = writer.finish();
    this.writeTag(fieldNumber, 2);
    this.writeVarint(bytes.length);
    for (let i = 0; i < bytes.length; i++) this.data.push(bytes[i]);
    return this;
  }

  finish(): Uint8Array {
    return new Uint8Array(this.data);
  }
}

export class ProtoReader {
  private data: Uint8Array;
  private pos = 0;

  constructor(data: Uint8Array) {
    this.data = data;
  }

  get remaining(): number {
    return this.data.length - this.pos;
  }

  readVarint(): number {
    let result = 0;
    let shift = 0;
    while (this.pos < this.data.length) {
      const byte = this.data[this.pos++];
      result |= (byte & 0x7f) << shift;
      if ((byte & 0x80) === 0) break;
      shift += 7;
    }
    return result >>> 0;
  }

  readField(): Field | null {
    if (this.pos >= this.data.length) return null;
    const tag = this.readVarint();
    const fieldNumber = tag >>> 3;
    const wireType = (tag & 0x07) as WireType;

    switch (wireType) {
      case 0:
        return { fieldNumber, wireType, value: this.readVarint() };
      case 1: {
        const bytes = this.data.slice(this.pos, this.pos + 8);
        this.pos += 8;
        return { fieldNumber, wireType, value: bytes };
      }
      case 2: {
        const len = this.readVarint();
        const bytes = this.data.slice(this.pos, this.pos + len);
        this.pos += len;
        return { fieldNumber, wireType, value: bytes };
      }
      case 5: {
        const bytes = this.data.slice(this.pos, this.pos + 4);
        this.pos += 4;
        return { fieldNumber, wireType, value: bytes };
      }
      default:
        throw new Error(`Unknown wire type: ${wireType}`);
    }
  }

  readAllFields(): Field[] {
    const fields: Field[] = [];
    while (this.pos < this.data.length) {
      const field = this.readField();
      if (field) fields.push(field);
    }
    return fields;
  }
}

export function fieldToString(field: Field): string {
  if (field.wireType === 2 && field.value instanceof Uint8Array) {
    return new TextDecoder().decode(field.value);
  }
  return String(field.value);
}

export function fieldToFloat(field: Field): number {
  if (field.wireType === 5 && field.value instanceof Uint8Array) {
    return new DataView(field.value.buffer, field.value.byteOffset).getFloat32(0, true);
  }
  if (field.wireType === 1 && field.value instanceof Uint8Array) {
    return new DataView(field.value.buffer, field.value.byteOffset).getFloat64(0, true);
  }
  return Number(field.value);
}
