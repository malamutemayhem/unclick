export class SuffixArray {
  private sa: number[];
  private text: string;

  constructor(text: string) {
    this.text = text;
    this.sa = this.build(text);
  }

  get length(): number {
    return this.sa.length;
  }

  at(index: number): string {
    return this.text.slice(this.sa[index]);
  }

  indexOf(index: number): number {
    return this.sa[index];
  }

  search(pattern: string): number[] {
    const lo = this.lowerBound(pattern);
    const hi = this.upperBound(pattern);
    const results: number[] = [];
    for (let i = lo; i < hi; i++) {
      results.push(this.sa[i]);
    }
    return results.sort((a, b) => a - b);
  }

  contains(pattern: string): boolean {
    return this.lowerBound(pattern) < this.upperBound(pattern);
  }

  count(pattern: string): number {
    return this.upperBound(pattern) - this.lowerBound(pattern);
  }

  private lowerBound(pattern: string): number {
    let lo = 0;
    let hi = this.sa.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      const suffix = this.text.slice(this.sa[mid], this.sa[mid] + pattern.length);
      if (suffix < pattern) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  private upperBound(pattern: string): number {
    let lo = 0;
    let hi = this.sa.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      const suffix = this.text.slice(this.sa[mid], this.sa[mid] + pattern.length);
      if (suffix <= pattern) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  private build(text: string): number[] {
    const n = text.length;
    const indices = Array.from({ length: n }, (_, i) => i);
    indices.sort((a, b) => {
      const sa = text.slice(a);
      const sb = text.slice(b);
      if (sa < sb) return -1;
      if (sa > sb) return 1;
      return 0;
    });
    return indices;
  }
}
