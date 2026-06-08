export function encode(input: string): string {
  if (input.length === 0) return "";
  let result = "";
  let count = 1;
  for (let i = 1; i <= input.length; i++) {
    if (i < input.length && input[i] === input[i - 1]) {
      count++;
    } else {
      result += count > 1 ? `${count}${input[i - 1]}` : input[i - 1];
      count = 1;
    }
  }
  return result;
}

export function decode(input: string): string {
  let result = "";
  let numStr = "";
  for (const ch of input) {
    if (ch >= "0" && ch <= "9") {
      numStr += ch;
    } else {
      const count = numStr ? parseInt(numStr, 10) : 1;
      result += ch.repeat(count);
      numStr = "";
    }
  }
  return result;
}

export function encodeBytes(data: Uint8Array): Uint8Array {
  if (data.length === 0) return new Uint8Array(0);
  const out: number[] = [];
  let count = 1;
  for (let i = 1; i <= data.length; i++) {
    if (i < data.length && data[i] === data[i - 1]) {
      count++;
      if (count === 255) {
        out.push(count, data[i - 1]);
        count = 0;
      }
    } else {
      if (count > 0) {
        out.push(count, data[i - 1]);
      }
      count = 1;
    }
  }
  return new Uint8Array(out);
}

export function decodeBytes(data: Uint8Array): Uint8Array {
  const out: number[] = [];
  for (let i = 0; i < data.length; i += 2) {
    const count = data[i];
    const value = data[i + 1];
    for (let j = 0; j < count; j++) out.push(value);
  }
  return new Uint8Array(out);
}

export function compressionRatio(original: string, encoded: string): number {
  if (original.length === 0) return 1;
  return encoded.length / original.length;
}
