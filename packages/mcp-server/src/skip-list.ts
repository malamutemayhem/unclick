interface SkipNode<K, V> {
  key: K;
  value: V;
  next: (SkipNode<K, V> | null)[];
}

export class SkipList<K extends number | string, V> {
  private head: SkipNode<K, V>;
  private maxLevel: number;
  private level = 0;
  private _size = 0;
  private compare: (a: K, b: K) => number;

  constructor(maxLevel = 16) {
    this.maxLevel = maxLevel;
    this.head = { key: null as unknown as K, value: null as unknown as V, next: new Array(maxLevel).fill(null) };
    this.compare = (a: K, b: K) => (a < b ? -1 : a > b ? 1 : 0);
  }

  private randomLevel(): number {
    let lvl = 0;
    while (lvl < this.maxLevel - 1 && Math.random() < 0.5) lvl++;
    return lvl;
  }

  insert(key: K, value: V): void {
    const update: (SkipNode<K, V> | null)[] = new Array(this.maxLevel).fill(null);
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.next[i] && this.compare(current.next[i]!.key, key) < 0) {
        current = current.next[i]!;
      }
      update[i] = current;
    }
    const next = current.next[0];
    if (next && this.compare(next.key, key) === 0) {
      next.value = value;
      return;
    }
    const newLevel = this.randomLevel();
    if (newLevel > this.level) {
      for (let i = this.level + 1; i <= newLevel; i++) update[i] = this.head;
      this.level = newLevel;
    }
    const node: SkipNode<K, V> = { key, value, next: new Array(newLevel + 1).fill(null) };
    for (let i = 0; i <= newLevel; i++) {
      node.next[i] = update[i]!.next[i];
      update[i]!.next[i] = node;
    }
    this._size++;
  }

  get(key: K): V | undefined {
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.next[i] && this.compare(current.next[i]!.key, key) < 0) {
        current = current.next[i]!;
      }
    }
    const candidate = current.next[0];
    return candidate && this.compare(candidate.key, key) === 0 ? candidate.value : undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const update: (SkipNode<K, V> | null)[] = new Array(this.maxLevel).fill(null);
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.next[i] && this.compare(current.next[i]!.key, key) < 0) {
        current = current.next[i]!;
      }
      update[i] = current;
    }
    const target = current.next[0];
    if (!target || this.compare(target.key, key) !== 0) return false;
    for (let i = 0; i <= this.level; i++) {
      if (update[i]!.next[i] !== target) break;
      update[i]!.next[i] = target.next[i];
    }
    while (this.level > 0 && !this.head.next[this.level]) this.level--;
    this._size--;
    return true;
  }

  get size(): number {
    return this._size;
  }

  entries(): [K, V][] {
    const result: [K, V][] = [];
    let current = this.head.next[0];
    while (current) {
      result.push([current.key, current.value]);
      current = current.next[0];
    }
    return result;
  }
}
