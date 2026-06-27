export class SparseVector {
  private data = new Map<number, number>();

  static fromArray(arr: number[]): SparseVector {
    const v = new SparseVector();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) v.data.set(i, arr[i]);
    }
    return v;
  }

  static fromEntries(entries: Array<[number, number]>): SparseVector {
    const v = new SparseVector();
    for (const [idx, val] of entries) {
      if (val !== 0) v.data.set(idx, val);
    }
    return v;
  }

  get(index: number): number {
    return this.data.get(index) ?? 0;
  }

  set(index: number, value: number): void {
    if (value === 0) this.data.delete(index);
    else this.data.set(index, value);
  }

  get nonZeroCount(): number {
    return this.data.size;
  }

  indices(): number[] {
    return [...this.data.keys()].sort((a, b) => a - b);
  }

  dot(other: SparseVector): number {
    let sum = 0;
    for (const [idx, val] of this.data) {
      const otherVal = other.data.get(idx);
      if (otherVal !== undefined) sum += val * otherVal;
    }
    return sum;
  }

  magnitude(): number {
    let sum = 0;
    for (const val of this.data.values()) sum += val * val;
    return Math.sqrt(sum);
  }

  cosineSimilarity(other: SparseVector): number {
    const magA = this.magnitude();
    const magB = other.magnitude();
    if (magA === 0 || magB === 0) return 0;
    return this.dot(other) / (magA * magB);
  }

  add(other: SparseVector): SparseVector {
    const result = new SparseVector();
    const allKeys = new Set([...this.data.keys(), ...other.data.keys()]);
    for (const key of allKeys) {
      const val = (this.data.get(key) ?? 0) + (other.data.get(key) ?? 0);
      if (val !== 0) result.data.set(key, val);
    }
    return result;
  }

  scale(factor: number): SparseVector {
    const result = new SparseVector();
    for (const [idx, val] of this.data) {
      const scaled = val * factor;
      if (scaled !== 0) result.data.set(idx, scaled);
    }
    return result;
  }

  toArray(length: number): number[] {
    const arr = new Array(length).fill(0);
    for (const [idx, val] of this.data) {
      if (idx < length) arr[idx] = val;
    }
    return arr;
  }
}
