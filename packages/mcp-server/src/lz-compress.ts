export function lzwEncode(input: string): number[] {
  if (input.length === 0) return [];

  const dict = new Map<string, number>();
  let nextCode = 256;
  for (let i = 0; i < 256; i++) {
    dict.set(String.fromCharCode(i), i);
  }

  const result: number[] = [];
  let w = "";
  for (const c of input) {
    const wc = w + c;
    if (dict.has(wc)) {
      w = wc;
    } else {
      result.push(dict.get(w)!);
      dict.set(wc, nextCode++);
      w = c;
    }
  }
  if (w.length > 0) {
    result.push(dict.get(w)!);
  }
  return result;
}

export function lzwDecode(codes: number[]): string {
  if (codes.length === 0) return "";

  const dict = new Map<number, string>();
  let nextCode = 256;
  for (let i = 0; i < 256; i++) {
    dict.set(i, String.fromCharCode(i));
  }

  let w = dict.get(codes[0])!;
  let result = w;

  for (let i = 1; i < codes.length; i++) {
    const code = codes[i];
    let entry: string;
    if (dict.has(code)) {
      entry = dict.get(code)!;
    } else if (code === nextCode) {
      entry = w + w[0];
    } else {
      throw new Error(`Invalid LZW code: ${code}`);
    }
    result += entry;
    dict.set(nextCode++, w + entry[0]);
    w = entry;
  }

  return result;
}

export interface LZ77Token {
  offset: number;
  length: number;
  next: string;
}

export function lz77Encode(
  input: string,
  windowSize = 256,
  lookAheadSize = 16,
): LZ77Token[] {
  if (input.length === 0) return [];
  const tokens: LZ77Token[] = [];
  let pos = 0;

  while (pos < input.length) {
    let bestOffset = 0;
    let bestLength = 0;
    const searchStart = Math.max(0, pos - windowSize);
    const maxLen = Math.min(lookAheadSize, input.length - pos - 1);

    for (let offset = pos - searchStart; offset >= 1; offset--) {
      let len = 0;
      while (
        len < maxLen &&
        pos + len < input.length &&
        input[pos - offset + (len % offset)] === input[pos + len]
      ) {
        len++;
      }
      if (len > bestLength) {
        bestLength = len;
        bestOffset = offset;
      }
    }

    const nextChar = pos + bestLength < input.length ? input[pos + bestLength] : "";
    tokens.push({ offset: bestOffset, length: bestLength, next: nextChar });
    pos += bestLength + 1;
  }

  return tokens;
}

export function lz77Decode(tokens: LZ77Token[]): string {
  let result = "";
  for (const token of tokens) {
    if (token.length > 0) {
      const start = result.length - token.offset;
      for (let i = 0; i < token.length; i++) {
        result += result[start + (i % token.offset)];
      }
    }
    result += token.next;
  }
  return result;
}

export function compressionRatio(original: string, compressed: number[]): number {
  if (original.length === 0) return 1;
  const compressedSize = compressed.length * 2;
  return compressedSize / original.length;
}
