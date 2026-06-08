class SkipNode<K, V> {
  key: K;
  value: V;
  forward: Array<SkipNode<K, V> | null>;
  constructor(key: K, value: V, level: number) {
    this.key = key;
    this.value = value;
    this.forward = new Array(level + 1).fill(null);
  }
}

export class SkipList<K, V> {
  private maxLevel: number;
  private probability: number;
  private level = 0;
  private head: SkipNode<K, V>;
  private compareFn: (a: K, b: K) => number;
  private _size = 0;

  constructor(compareFn: (a: K, b: K) => number, maxLevel = 16, probability = 0.5) {
    this.compareFn = compareFn;
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.head = new SkipNode<K, V>(undefined as any, undefined as any, maxLevel);
  }

  get size(): number { return this._size; }

  set(key: K, value: V): void {
    const update: Array<SkipNode<K, V>> = new Array(this.maxLevel + 1);
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && this.compareFn(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }
    const next = current.forward[0];
    if (next && this.compareFn(next.key, key) === 0) {
      next.value = value;
      return;
    }
    const newLevel = this.randomLevel();
    if (newLevel > this.level) {
      for (let i = this.level + 1; i <= newLevel; i++) update[i] = this.head;
      this.level = newLevel;
    }
    const node = new SkipNode(key, value, newLevel);
    for (let i = 0; i <= newLevel; i++) {
      node.forward[i] = update[i].forward[i];
      update[i].forward[i] = node;
    }
    this._size++;
  }

  get(key: K): V | undefined {
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && this.compareFn(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
    }
    const next = current.forward[0];
    if (next && this.compareFn(next.key, key) === 0) return next.value;
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const update: Array<SkipNode<K, V>> = new Array(this.maxLevel + 1);
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && this.compareFn(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }
    const target = current.forward[0];
    if (!target || this.compareFn(target.key, key) !== 0) return false;
    for (let i = 0; i <= this.level; i++) {
      if (update[i].forward[i] !== target) break;
      update[i].forward[i] = target.forward[i];
    }
    while (this.level > 0 && !this.head.forward[this.level]) this.level--;
    this._size--;
    return true;
  }

  keys(): K[] {
    const result: K[] = [];
    let node = this.head.forward[0];
    while (node) { result.push(node.key); node = node.forward[0]; }
    return result;
  }

  entries(): [K, V][] {
    const result: [K, V][] = [];
    let node = this.head.forward[0];
    while (node) { result.push([node.key, node.value]); node = node.forward[0]; }
    return result;
  }

  private randomLevel(): number {
    let lvl = 0;
    while (Math.random() < this.probability && lvl < this.maxLevel) lvl++;
    return lvl;
  }
}
