export interface RleRun<T> {
  value: T;
  count: number;
}

export class RleCodec {
  static encode(input: string): string {
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

  static decode(input: string): string {
    let result = "";
    let numStr = "";
    for (const ch of input) {
      if (ch >= "0" && ch <= "9") {
        numStr += ch;
      } else {
        const count = numStr.length > 0 ? parseInt(numStr, 10) : 1;
        result += ch.repeat(count);
        numStr = "";
      }
    }
    return result;
  }

  static encodeArray<T>(input: T[]): RleRun<T>[] {
    if (input.length === 0) return [];
    const runs: RleRun<T>[] = [];
    let current = input[0];
    let count = 1;

    for (let i = 1; i < input.length; i++) {
      if (input[i] === current) {
        count++;
      } else {
        runs.push({ value: current, count });
        current = input[i];
        count = 1;
      }
    }
    runs.push({ value: current, count });
    return runs;
  }

  static decodeArray<T>(runs: RleRun<T>[]): T[] {
    const result: T[] = [];
    for (const run of runs) {
      for (let i = 0; i < run.count; i++) {
        result.push(run.value);
      }
    }
    return result;
  }

  static compressionRatio(original: string): number {
    if (original.length === 0) return 1;
    const encoded = RleCodec.encode(original);
    return encoded.length / original.length;
  }

  static runCount(input: string): number {
    if (input.length === 0) return 0;
    let runs = 1;
    for (let i = 1; i < input.length; i++) {
      if (input[i] !== input[i - 1]) runs++;
    }
    return runs;
  }

  static longestRun(input: string): { char: string; length: number } | null {
    if (input.length === 0) return null;
    let maxChar = input[0];
    let maxLen = 1;
    let curLen = 1;
    for (let i = 1; i < input.length; i++) {
      if (input[i] === input[i - 1]) {
        curLen++;
        if (curLen > maxLen) {
          maxLen = curLen;
          maxChar = input[i];
        }
      } else {
        curLen = 1;
      }
    }
    return { char: maxChar, length: maxLen };
  }
}
