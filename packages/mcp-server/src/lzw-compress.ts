export class LZWCompress {
  static compress(input: string): number[] {
    if (input.length === 0) return [];

    const dict = new Map<string, number>();
    for (let i = 0; i < 256; i++) dict.set(String.fromCharCode(i), i);

    let nextCode = 256;
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

    if (w.length > 0) result.push(dict.get(w)!);
    return result;
  }

  static decompress(codes: number[]): string {
    if (codes.length === 0) return "";

    const dict = new Map<number, string>();
    for (let i = 0; i < 256; i++) dict.set(i, String.fromCharCode(i));

    let nextCode = 256;
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
        throw new Error(`Invalid code: ${code}`);
      }

      result += entry;
      dict.set(nextCode++, w + entry[0]);
      w = entry;
    }

    return result;
  }

  static compressionRatio(input: string): number {
    if (input.length === 0) return 0;
    const compressed = this.compress(input);
    return compressed.length / input.length;
  }

  static dictionarySize(input: string): number {
    const compressed = this.compress(input);
    return 256 + compressed.length;
  }
}
