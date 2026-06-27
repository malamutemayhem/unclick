export class SuffixArraySA {
  private text: string;
  private sa: number[];

  constructor(text: string) {
    this.text = text;
    this.sa = this.build(text);
  }

  private build(s: string): number[] {
    const n = s.length;
    const indices = Array.from({ length: n }, (_, i) => i);
    indices.sort((a, b) => {
      const sa = s.substring(a);
      const sb = s.substring(b);
      return sa < sb ? -1 : sa > sb ? 1 : 0;
    });
    return indices;
  }

  getSuffixArray(): number[] {
    return [...this.sa];
  }

  search(pattern: string): number[] {
    const results: number[] = [];
    let lo = 0;
    let hi = this.sa.length - 1;

    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const suffix = this.text.substring(this.sa[mid], this.sa[mid] + pattern.length);
      if (suffix < pattern) {
        lo = mid + 1;
      } else if (suffix > pattern) {
        hi = mid - 1;
      } else {
        let left = mid;
        while (left > 0 && this.text.substring(this.sa[left - 1], this.sa[left - 1] + pattern.length) === pattern) left--;
        let right = mid;
        while (right < this.sa.length - 1 && this.text.substring(this.sa[right + 1], this.sa[right + 1] + pattern.length) === pattern) right++;
        for (let i = left; i <= right; i++) results.push(this.sa[i]);
        break;
      }
    }

    return results.sort((a, b) => a - b);
  }

  lcpArray(): number[] {
    const n = this.text.length;
    const rank = new Array(n).fill(0);
    for (let i = 0; i < n; i++) rank[this.sa[i]] = i;

    const lcp = new Array(n).fill(0);
    let h = 0;
    for (let i = 0; i < n; i++) {
      if (rank[i] > 0) {
        const j = this.sa[rank[i] - 1];
        while (i + h < n && j + h < n && this.text[i + h] === this.text[j + h]) h++;
        lcp[rank[i]] = h;
        if (h > 0) h--;
      } else {
        h = 0;
      }
    }

    return lcp;
  }

  longestRepeatedSubstring(): string {
    const lcp = this.lcpArray();
    let maxLen = 0;
    let maxIdx = 0;
    for (let i = 1; i < lcp.length; i++) {
      if (lcp[i] > maxLen) {
        maxLen = lcp[i];
        maxIdx = this.sa[i];
      }
    }
    return this.text.substring(maxIdx, maxIdx + maxLen);
  }
}
