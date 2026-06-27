export class KMPSearch {
  private pattern: string;
  private failure: number[];

  constructor(pattern: string) {
    this.pattern = pattern;
    this.failure = KMPSearch.buildFailure(pattern);
  }

  static buildFailure(pattern: string): number[] {
    const m = pattern.length;
    const fail = new Array(m).fill(0);
    let k = 0;
    for (let i = 1; i < m; i++) {
      while (k > 0 && pattern[k] !== pattern[i]) {
        k = fail[k - 1];
      }
      if (pattern[k] === pattern[i]) k++;
      fail[i] = k;
    }
    return fail;
  }

  search(text: string): number[] {
    const results: number[] = [];
    const m = this.pattern.length;
    const n = text.length;
    if (m === 0) return results;
    let q = 0;
    for (let i = 0; i < n; i++) {
      while (q > 0 && this.pattern[q] !== text[i]) {
        q = this.failure[q - 1];
      }
      if (this.pattern[q] === text[i]) q++;
      if (q === m) {
        results.push(i - m + 1);
        q = this.failure[q - 1];
      }
    }
    return results;
  }

  firstMatch(text: string): number {
    const m = this.pattern.length;
    const n = text.length;
    if (m === 0) return -1;
    let q = 0;
    for (let i = 0; i < n; i++) {
      while (q > 0 && this.pattern[q] !== text[i]) {
        q = this.failure[q - 1];
      }
      if (this.pattern[q] === text[i]) q++;
      if (q === m) return i - m + 1;
    }
    return -1;
  }

  count(text: string): number {
    return this.search(text).length;
  }

  getFailureTable(): number[] {
    return [...this.failure];
  }

  static findAll(text: string, pattern: string): number[] {
    return new KMPSearch(pattern).search(text);
  }

  static contains(text: string, pattern: string): boolean {
    return new KMPSearch(pattern).firstMatch(text) >= 0;
  }

  static longestPrefixSuffix(s: string): number {
    const fail = KMPSearch.buildFailure(s);
    return fail[s.length - 1];
  }
}
