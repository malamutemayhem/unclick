export function compress(input: string): string {
  if (input === "") return "";

  const dict = new Map<string, number>();
  let dictSize = 256;
  let w = "";
  const result: number[] = [];

  for (let i = 0; i < 256; i++) {
    dict.set(String.fromCharCode(i), i);
  }

  for (const c of input) {
    const wc = w + c;
    if (dict.has(wc)) {
      w = wc;
    } else {
      result.push(dict.get(w)!);
      dict.set(wc, dictSize++);
      w = c;
    }
  }
  if (w !== "") result.push(dict.get(w)!);

  return result.map((code) => String.fromCharCode(code)).join("");
}

export function decompress(compressed: string): string {
  if (compressed === "") return "";

  const dict = new Map<number, string>();
  let dictSize = 256;
  for (let i = 0; i < 256; i++) {
    dict.set(i, String.fromCharCode(i));
  }

  let w = String.fromCharCode(compressed.charCodeAt(0));
  const result = [w];

  for (let i = 1; i < compressed.length; i++) {
    const code = compressed.charCodeAt(i);
    let entry: string;
    if (dict.has(code)) {
      entry = dict.get(code)!;
    } else if (code === dictSize) {
      entry = w + w[0];
    } else {
      throw new Error(`Invalid compressed data at index ${i}`);
    }
    result.push(entry);
    dict.set(dictSize++, w + entry[0]);
    w = entry;
  }

  return result.join("");
}

export function compressToBase64(input: string): string {
  const compressed = compress(input);
  const bytes: number[] = [];
  for (let i = 0; i < compressed.length; i++) {
    const code = compressed.charCodeAt(i);
    bytes.push(code >> 8, code & 0xff);
  }
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    result += chars[(b0 >> 2) & 63];
    result += chars[((b0 << 4) | (b1 >> 4)) & 63];
    result += i + 1 < bytes.length ? chars[((b1 << 2) | (b2 >> 6)) & 63] : "=";
    result += i + 2 < bytes.length ? chars[b2 & 63] : "=";
  }
  return result;
}

export function ratio(input: string): number {
  if (input.length === 0) return 0;
  const compressed = compress(input);
  return compressed.length / input.length;
}
