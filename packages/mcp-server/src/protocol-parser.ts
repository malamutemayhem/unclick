export interface ProtocolField {
  name: string;
  type: "uint8" | "uint16" | "uint32" | "int8" | "int16" | "int32" | "string" | "bytes";
  length?: number;
}

export class ProtocolParser {
  static sizeOf(type: ProtocolField["type"]): number {
    switch (type) {
      case "uint8": case "int8": return 1;
      case "uint16": case "int16": return 2;
      case "uint32": case "int32": return 4;
      default: return 0;
    }
  }

  static encode(fields: ProtocolField[], values: Record<string, number | string | number[]>): number[] {
    const bytes: number[] = [];

    for (const field of fields) {
      const val = values[field.name];
      switch (field.type) {
        case "uint8":
          bytes.push((val as number) & 0xFF);
          break;
        case "uint16":
          bytes.push(((val as number) >> 8) & 0xFF, (val as number) & 0xFF);
          break;
        case "uint32":
          bytes.push(
            ((val as number) >>> 24) & 0xFF,
            ((val as number) >>> 16) & 0xFF,
            ((val as number) >>> 8) & 0xFF,
            (val as number) & 0xFF,
          );
          break;
        case "int8":
          bytes.push((val as number) & 0xFF);
          break;
        case "int16": {
          const v = (val as number) < 0 ? 0x10000 + (val as number) : (val as number);
          bytes.push((v >> 8) & 0xFF, v & 0xFF);
          break;
        }
        case "int32": {
          const v = (val as number) < 0 ? 0x100000000 + (val as number) : (val as number);
          bytes.push((v >>> 24) & 0xFF, (v >>> 16) & 0xFF, (v >>> 8) & 0xFF, v & 0xFF);
          break;
        }
        case "string": {
          const str = val as string;
          const len = field.length ?? str.length;
          for (let i = 0; i < len; i++) {
            bytes.push(i < str.length ? str.charCodeAt(i) : 0);
          }
          break;
        }
        case "bytes": {
          const arr = val as number[];
          const len = field.length ?? arr.length;
          for (let i = 0; i < len; i++) {
            bytes.push(i < arr.length ? arr[i] & 0xFF : 0);
          }
          break;
        }
      }
    }
    return bytes;
  }

  static decode(fields: ProtocolField[], data: number[]): Record<string, number | string | number[]> {
    const result: Record<string, number | string | number[]> = {};
    let offset = 0;

    for (const field of fields) {
      switch (field.type) {
        case "uint8":
          result[field.name] = data[offset++];
          break;
        case "uint16":
          result[field.name] = (data[offset] << 8) | data[offset + 1];
          offset += 2;
          break;
        case "uint32":
          result[field.name] = ((data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]) >>> 0;
          offset += 4;
          break;
        case "int8": {
          const v = data[offset++];
          result[field.name] = v > 127 ? v - 256 : v;
          break;
        }
        case "int16": {
          const v = (data[offset] << 8) | data[offset + 1];
          result[field.name] = v > 32767 ? v - 65536 : v;
          offset += 2;
          break;
        }
        case "int32": {
          const v = ((data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]) | 0;
          result[field.name] = v;
          offset += 4;
          break;
        }
        case "string": {
          const len = field.length ?? 0;
          let str = "";
          for (let i = 0; i < len; i++) {
            if (data[offset + i] !== 0) str += String.fromCharCode(data[offset + i]);
          }
          result[field.name] = str;
          offset += len;
          break;
        }
        case "bytes": {
          const len = field.length ?? 0;
          result[field.name] = data.slice(offset, offset + len);
          offset += len;
          break;
        }
      }
    }
    return result;
  }

  static totalSize(fields: ProtocolField[]): number {
    let size = 0;
    for (const field of fields) {
      const s = ProtocolParser.sizeOf(field.type);
      size += s > 0 ? s : (field.length ?? 0);
    }
    return size;
  }

  static checksum(data: number[]): number {
    let sum = 0;
    for (const b of data) sum = (sum + b) & 0xFF;
    return (256 - sum) & 0xFF;
  }
}
