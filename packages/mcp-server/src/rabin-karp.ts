export class RabinKarp {
  private static readonly BASE = 256;
  private static readonly MOD = 1000000007;

  static search(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    if (m === 0 || m > n) return [];

    const results: number[] = [];
    let patHash = 0;
    let txtHash = 0;
    let h = 1;

    for (let i = 0; i < m - 1; i++) {
      h = (h * this.BASE) % this.MOD;
    }

    for (let i = 0; i < m; i++) {
      patHash = (this.BASE * patHash + pattern.charCodeAt(i)) % this.MOD;
      txtHash = (this.BASE * txtHash + text.charCodeAt(i)) % this.MOD;
    }

    for (let i = 0; i <= n - m; i++) {
      if (patHash === txtHash) {
        let match = true;
        for (let j = 0; j < m; j++) {
          if (text[i + j] !== pattern[j]) {
            match = false;
            break;
          }
        }
        if (match) results.push(i);
      }

      if (i < n - m) {
        txtHash = (this.BASE * (txtHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % this.MOD;
        if (txtHash < 0) txtHash += this.MOD;
      }
    }

    return results;
  }

  static searchMultiple(text: string, patterns: string[]): Map<string, number[]> {
    const result = new Map<string, number[]>();
    for (const p of patterns) {
      result.set(p, this.search(text, p));
    }
    return result;
  }

  static hash(text: string): number {
    let h = 0;
    for (let i = 0; i < text.length; i++) {
      h = (this.BASE * h + text.charCodeAt(i)) % this.MOD;
    }
    return h;
  }

  static rollingHashes(text: string, windowSize: number): number[] {
    if (windowSize > text.length) return [];
    const hashes: number[] = [];
    let h = 1;
    for (let i = 0; i < windowSize - 1; i++) {
      h = (h * this.BASE) % this.MOD;
    }

    let hash = 0;
    for (let i = 0; i < windowSize; i++) {
      hash = (this.BASE * hash + text.charCodeAt(i)) % this.MOD;
    }
    hashes.push(hash);

    for (let i = 1; i <= text.length - windowSize; i++) {
      hash = (this.BASE * (hash - text.charCodeAt(i - 1) * h) + text.charCodeAt(i + windowSize - 1)) % this.MOD;
      if (hash < 0) hash += this.MOD;
      hashes.push(hash);
    }

    return hashes;
  }
}
