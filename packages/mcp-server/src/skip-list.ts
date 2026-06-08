interface SkipNode<K, V> {
  key: K;
  value: V;
  forward: (SkipNode<K, V> | null)[];
}

export class SkipList<K extends number | string, V> {
  private head: SkipNode<K, V>;
  private maxLevel: number;
  private level = 0;
  private count = 0;
  private readonly compareFn: (a: K, b: K) => number;

  constructor(maxLevel = 16, compareFn?: (a: K, b: K) => number) {
    this.maxLevel = maxLevel;
    this.compareFn = compareFn || ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    this.head = this.createNode(null as unknown as K, null as unknown as V, maxLevel);
  }

  insert(key: K, value: V): void {
    const update: (SkipNode<K, V> | null)[] = new Array(this.maxLevel).fill(null);
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
      for (let i = this.level + 1; i <= newLevel; i++) {
        update[i] = this.head;
      }
      this.level = newLevel;
    }

    const node = this.createNode(key, value, newLevel + 1);
    for (let i = 0; i <= newLevel; i++) {
      node.forward[i] = update[i]!.forward[i];
      update[i]!.forward[i] = node;
    }
    this.count++;
  }

  get(key: K): V | undefined {
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && this.compareFn(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
    }
    const node = current.forward[0];
    if (node && this.compareFn(node.key, key) === 0) return node.value;
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const update: (SkipNode<K, V> | null)[] = new Array(this.maxLevel).fill(null);
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
      if (update[i]!.forward[i] !== target) break;
      update[i]!.forward[i] = target.forward[i];
    }

    while (this.level > 0 && !this.head.forward[this.level]) {
      this.level--;
    }

    this.count--;
    return true;
  }

  get size(): number {
    return this.count;
  }

  entries(): [K, V][] {
    const result: [K, V][] = [];
    let node = this.head.forward[0];
    while (node) {
      result.push([node.key, node.value]);
      node = node.forward[0];
    }
    return result;
  }

  private createNode(key: K, value: V, level: number): SkipNode<K, V> {
    return { key, value, forward: new Array(level).fill(null) };
  }

  private randomLevel(): number {
    let lvl = 0;
    while (lvl < this.maxLevel - 1 && Math.random() < 0.5) lvl++;
    return lvl;
  }
}
