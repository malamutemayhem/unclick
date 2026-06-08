export class BoyerMoore {
  private badChar: Map<string, number>;
  private pattern: string;
  private goodSuffix: number[];

  constructor(pattern: string) {
    this.pattern = pattern;
    this.badChar = this.buildBadCharTable(pattern);
    this.goodSuffix = this.buildGoodSuffixTable(pattern);
  }

  private buildBadCharTable(pattern: string): Map<string, number> {
    const table = new Map<string, number>();
    for (let i = 0; i < pattern.length; i++) {
      table.set(pattern[i], i);
    }
    return table;
  }

  private buildGoodSuffixTable(pattern: string): number[] {
    const m = pattern.length;
    const table = new Array(m + 1).fill(0);
    const suffix = new Array(m + 1).fill(0);
    suffix[m] = m + 1;

    let g = m + 1;
    for (let i = m - 1; i >= 0; i--) {
      if (i + 1 > g && suffix[i + m - g] < i + 1 - g) {
        suffix[i] = suffix[i + m - g];
      } else {
        if (i + 1 < g) g = i + 1;
        let j = g;
        while (j > 0 && pattern[j - 1] === pattern[j + m - i - 2]) {
          j--;
        }
        suffix[i] = g - j;
        g = j;
      }
    }

    for (let i = 0; i <= m; i++) table[i] = m;
    for (let i = m - 1; i >= 0; i--) {
      if (suffix[i] === i + 1) {
        for (let j = 0; j < m - i - 1; j++) {
          if (table[j] === m) table[j] = m - i - 1;
        }
      }
    }
    for (let i = 0; i < m - 1; i++) {
      table[m - 1 - suffix[i]] = m - 1 - i;
    }
    return table;
  }

  search(text: string): number[] {
    const results: number[] = [];
    const m = this.pattern.length;
    const n = text.length;
    if (m === 0 || n < m) return results;

    let i = 0;
    while (i <= n - m) {
      let j = m - 1;
      while (j >= 0 && this.pattern[j] === text[i + j]) j--;
      if (j < 0) {
        results.push(i);
        i += this.goodSuffix[0];
      } else {
        const bc = j - (this.badChar.get(text[i + j]) ?? -1);
        const gs = this.goodSuffix[j];
        i += Math.max(bc, gs);
      }
    }
    return results;
  }

  firstMatch(text: string): number {
    const matches = this.search(text);
    return matches.length > 0 ? matches[0] : -1;
  }

  count(text: string): number {
    return this.search(text).length;
  }

  static findAll(text: string, pattern: string): number[] {
    return new BoyerMoore(pattern).search(text);
  }

  static contains(text: string, pattern: string): boolean {
    return new BoyerMoore(pattern).firstMatch(text) >= 0;
  }
}
