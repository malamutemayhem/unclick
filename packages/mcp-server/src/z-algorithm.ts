export class ZAlgorithm {
  static compute(s: string): number[] {
    const n = s.length;
    const z = new Array(n).fill(0);
    z[0] = n;
    let l = 0;
    let r = 0;
    for (let i = 1; i < n; i++) {
      if (i < r) {
        z[i] = Math.min(r - i, z[i - l]);
      }
      while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
        z[i]++;
      }
      if (i + z[i] > r) {
        l = i;
        r = i + z[i];
      }
    }
    return z;
  }

  static search(text: string, pattern: string): number[] {
    if (pattern.length === 0 || text.length < pattern.length) return [];
    const concat = pattern + "$" + text;
    const z = ZAlgorithm.compute(concat);
    const results: number[] = [];
    const pLen = pattern.length;
    for (let i = pLen + 1; i < concat.length; i++) {
      if (z[i] === pLen) {
        results.push(i - pLen - 1);
      }
    }
    return results;
  }

  static contains(text: string, pattern: string): boolean {
    return ZAlgorithm.search(text, pattern).length > 0;
  }

  static count(text: string, pattern: string): number {
    return ZAlgorithm.search(text, pattern).length;
  }

  static longestRepeatedPrefix(s: string): number {
    if (s.length <= 1) return 0;
    const z = ZAlgorithm.compute(s);
    let max = 0;
    for (let i = 1; i < z.length; i++) {
      if (z[i] > max) max = z[i];
    }
    return max;
  }

  static matchLengths(s: string): number[] {
    return ZAlgorithm.compute(s);
  }

  static distinctSubstringCount(s: string): number {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
      const suffix = s.slice(i);
      const z = ZAlgorithm.compute(suffix);
      let maxZ = 0;
      for (let j = 1; j < z.length; j++) {
        if (z[j] > maxZ) maxZ = z[j];
      }
      count += suffix.length - maxZ;
    }
    return count;
  }
}
