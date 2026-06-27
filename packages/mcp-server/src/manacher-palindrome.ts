export class ManacherPalindrome {
  static longestPalindrome(s: string): string {
    if (s.length === 0) return "";
    const t = "#" + s.split("").join("#") + "#";
    const n = t.length;
    const p = new Array(n).fill(0);
    let c = 0;
    let r = 0;

    for (let i = 0; i < n; i++) {
      const mirror = 2 * c - i;
      if (i < r) p[i] = Math.min(r - i, p[mirror]);

      while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 && t[i + p[i] + 1] === t[i - p[i] - 1]) {
        p[i]++;
      }

      if (i + p[i] > r) {
        c = i;
        r = i + p[i];
      }
    }

    let maxLen = 0;
    let center = 0;
    for (let i = 0; i < n; i++) {
      if (p[i] > maxLen) {
        maxLen = p[i];
        center = i;
      }
    }

    const start = (center - maxLen) / 2;
    return s.substring(start, start + maxLen);
  }

  static allPalindromes(s: string, minLen: number = 2): string[] {
    const result = new Set<string>();
    const t = "#" + s.split("").join("#") + "#";
    const n = t.length;
    const p = new Array(n).fill(0);
    let c = 0;
    let r = 0;

    for (let i = 0; i < n; i++) {
      const mirror = 2 * c - i;
      if (i < r) p[i] = Math.min(r - i, p[mirror]);
      while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 && t[i + p[i] + 1] === t[i - p[i] - 1]) p[i]++;
      if (i + p[i] > r) { c = i; r = i + p[i]; }

      for (let len = p[i]; len >= 1; len--) {
        const start = (i - len) / 2;
        const pal = s.substring(start, start + len);
        if (pal.length >= minLen) result.add(pal);
      }
    }

    return [...result];
  }

  static isPalindrome(s: string): boolean {
    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
      if (s[i] !== s[j]) return false;
    }
    return true;
  }

  static countPalindromes(s: string): number {
    return this.allPalindromes(s, 2).length;
  }
}
