export class HexDump {
  static dump(data: Uint8Array | number[], options?: { width?: number; offset?: number }): string {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    const width = options?.width ?? 16;
    const startOffset = options?.offset ?? 0;
    const lines: string[] = [];

    for (let i = 0; i < bytes.length; i += width) {
      const offset = (startOffset + i).toString(16).padStart(8, "0");
      const hexParts: string[] = [];
      const asciiParts: string[] = [];

      for (let j = 0; j < width; j++) {
        if (i + j < bytes.length) {
          hexParts.push(bytes[i + j].toString(16).padStart(2, "0"));
          const ch = bytes[i + j];
          asciiParts.push(ch >= 32 && ch < 127 ? String.fromCharCode(ch) : ".");
        } else {
          hexParts.push("  ");
          asciiParts.push(" ");
        }
      }

      const hexStr = hexParts.join(" ");
      const asciiStr = asciiParts.join("");
      lines.push(`${offset}  ${hexStr}  |${asciiStr}|`);
    }

    return lines.join("\n");
  }

  static fromHex(hexString: string): Uint8Array {
    const clean = hexString.replace(/\s+/g, "");
    const bytes = new Uint8Array(clean.length / 2);
    for (let i = 0; i < clean.length; i += 2) {
      bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
    }
    return bytes;
  }

  static toHex(data: Uint8Array | number[]): string {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  static fromString(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  static toString(data: Uint8Array): string {
    const decoder = new TextDecoder();
    return decoder.decode(data);
  }

  static compare(a: Uint8Array | number[], b: Uint8Array | number[]): { offset: number; byteA: number; byteB: number }[] {
    const bytesA = a instanceof Uint8Array ? a : new Uint8Array(a);
    const bytesB = b instanceof Uint8Array ? b : new Uint8Array(b);
    const diffs: { offset: number; byteA: number; byteB: number }[] = [];
    const len = Math.max(bytesA.length, bytesB.length);
    for (let i = 0; i < len; i++) {
      const ba = i < bytesA.length ? bytesA[i] : -1;
      const bb = i < bytesB.length ? bytesB[i] : -1;
      if (ba !== bb) diffs.push({ offset: i, byteA: ba, byteB: bb });
    }
    return diffs;
  }

  static checksum(data: Uint8Array | number[]): number {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    let sum = 0;
    for (const b of bytes) sum = (sum + b) & 0xff;
    return sum;
  }

  static byteFrequency(data: Uint8Array | number[]): Map<number, number> {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    const freq = new Map<number, number>();
    for (const b of bytes) {
      freq.set(b, (freq.get(b) ?? 0) + 1);
    }
    return freq;
  }
}
