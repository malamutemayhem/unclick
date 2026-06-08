function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export class ConsistentHash<T = string> {
  private ring: Map<number, T> = new Map();
  private sortedKeys: number[] = [];
  private readonly replicas: number;
  private readonly nodeSet: Set<T> = new Set();

  constructor(replicas = 150) {
    this.replicas = replicas;
  }

  add(node: T): void {
    if (this.nodeSet.has(node)) return;
    this.nodeSet.add(node);
    for (let i = 0; i < this.replicas; i++) {
      const key = hashString(`${String(node)}:${i}`);
      this.ring.set(key, node);
      this.sortedKeys.push(key);
    }
    this.sortedKeys.sort((a, b) => a - b);
  }

  remove(node: T): void {
    if (!this.nodeSet.has(node)) return;
    this.nodeSet.delete(node);
    for (let i = 0; i < this.replicas; i++) {
      const key = hashString(`${String(node)}:${i}`);
      this.ring.delete(key);
    }
    this.sortedKeys = this.sortedKeys.filter((k) => this.ring.has(k));
  }

  get(key: string): T | undefined {
    if (this.sortedKeys.length === 0) return undefined;
    const hash = hashString(key);
    let idx = this.binarySearch(hash);
    if (idx >= this.sortedKeys.length) idx = 0;
    return this.ring.get(this.sortedKeys[idx]);
  }

  getN(key: string, count: number): T[] {
    if (this.sortedKeys.length === 0) return [];
    const hash = hashString(key);
    let idx = this.binarySearch(hash);
    const result: T[] = [];
    const seen = new Set<T>();
    const total = Math.min(count, this.nodeSet.size);
    let checked = 0;
    while (result.length < total && checked < this.sortedKeys.length) {
      if (idx >= this.sortedKeys.length) idx = 0;
      const node = this.ring.get(this.sortedKeys[idx])!;
      if (!seen.has(node)) {
        seen.add(node);
        result.push(node);
      }
      idx++;
      checked++;
    }
    return result;
  }

  get nodes(): T[] {
    return [...this.nodeSet];
  }

  get size(): number {
    return this.nodeSet.size;
  }

  private binarySearch(hash: number): number {
    let lo = 0;
    let hi = this.sortedKeys.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.sortedKeys[mid] < hash) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  }
}
