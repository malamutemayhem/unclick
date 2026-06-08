class SkipNode<K, V> {
  key: K;
  value: V;
  forward: Array<SkipNode<K, V> | null>;

  constructor(key: K, value: V, level: number) {
    this.key = key;
    this.value = value;
    this.forward = new Array(level + 1).fill(null) as Array<SkipNode<K, V> | null>;
  }
}

export class SkipList<K, V> {
  private head: SkipNode<K, V>;
  private level = 0;
  private count = 0;
  private readonly maxLevel: number;
  private readonly compare: (a: K, b: K) => number;

  constructor(maxLevel: number = 16, compare?: (a: K, b: K) => number) {
    this.maxLevel = maxLevel;
    this.compare = compare || ((a: K, b: K) => (a < b ? -1 : a > b ? 1 : 0));
    this.head = new SkipNode<K, V>(undefined as K, undefined as V, maxLevel);
  }

  set(key: K, value: V): void {
    const update: Array<SkipNode<K, V>> = new Array(this.maxLevel + 1);
    let current = this.head;

    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && this.compare(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }

    const next = current.forward[0];
    if (next && this.compare(next.key, key) === 0) {
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

    const node = new SkipNode(key, value, newLevel);
    for (let i = 0; i <= newLevel; i++) {
      node.forward[i] = update[i].forward[i];
      update[i].forward[i] = node;
    }
    this.count++;
  }

  get(key: K): V | undefined {
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && this.compare(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
    }
    const next = current.forward[0];
    if (next && this.compare(next.key, key) === 0) return next.value;
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const update: Array<SkipNode<K, V>> = new Array(this.maxLevel + 1);
    let current = this.head;

    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && this.compare(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }

    const target = current.forward[0];
    if (!target || this.compare(target.key, key) !== 0) return false;

    for (let i = 0; i <= this.level; i++) {
      if (update[i].forward[i] !== target) break;
      update[i].forward[i] = target.forward[i];
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

  toArray(): Array<{ key: K; value: V }> {
    const result: Array<{ key: K; value: V }> = [];
    let current = this.head.forward[0];
    while (current) {
      result.push({ key: current.key, value: current.value });
      current = current.forward[0];
    }
    return result;
  }

  private randomLevel(): number {
    let lvl = 0;
    while (lvl < this.maxLevel && Math.random() < 0.5) lvl++;
    return lvl;
  }
}
