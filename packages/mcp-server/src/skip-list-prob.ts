interface SkipNode<K, V> {
  key: K;
  value: V;
  forward: (SkipNode<K, V> | null)[];
}

export class SkipList<K extends number | string, V> {
  private head: SkipNode<K, V>;
  private level = 0;
  private readonly maxLevel: number;
  private readonly p: number;
  private count = 0;
  private seed: number;

  constructor(maxLevel: number = 16, p: number = 0.5) {
    this.maxLevel = maxLevel;
    this.p = p;
    this.seed = 42;
    this.head = this.createNode(null as unknown as K, null as unknown as V, maxLevel);
  }

  private createNode(key: K, value: V, level: number): SkipNode<K, V> {
    return { key, value, forward: new Array(level + 1).fill(null) };
  }

  private randomLevel(): number {
    let lvl = 0;
    while (lvl < this.maxLevel && this.nextRandom() < this.p) lvl++;
    return lvl;
  }

  private nextRandom(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  private compare(a: K, b: K): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  insert(key: K, value: V): void {
    const update: (SkipNode<K, V> | null)[] = new Array(this.maxLevel + 1).fill(null);
    let current: SkipNode<K, V> = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] !== null && this.compare(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }
    const next = current.forward[0];
    if (next !== null && this.compare(next.key, key) === 0) {
      next.value = value;
      return;
    }
    const lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level + 1; i <= lvl; i++) update[i] = this.head;
      this.level = lvl;
    }
    const node = this.createNode(key, value, lvl);
    for (let i = 0; i <= lvl; i++) {
      node.forward[i] = update[i]!.forward[i];
      update[i]!.forward[i] = node;
    }
    this.count++;
  }

  get(key: K): V | undefined {
    let current: SkipNode<K, V> = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] !== null && this.compare(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
    }
    const next = current.forward[0];
    if (next !== null && this.compare(next.key, key) === 0) return next.value;
    return undefined;
  }

  delete(key: K): boolean {
    const update: (SkipNode<K, V> | null)[] = new Array(this.maxLevel + 1).fill(null);
    let current: SkipNode<K, V> = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] !== null && this.compare(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }
    const target = current.forward[0];
    if (target === null || this.compare(target.key, key) !== 0) return false;
    for (let i = 0; i <= this.level; i++) {
      if (update[i]!.forward[i] !== target) break;
      update[i]!.forward[i] = target.forward[i];
    }
    while (this.level > 0 && this.head.forward[this.level] === null) this.level--;
    this.count--;
    return true;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  get size(): number {
    return this.count;
  }

  keys(): K[] {
    const result: K[] = [];
    let node = this.head.forward[0];
    while (node !== null) {
      result.push(node.key);
      node = node.forward[0];
    }
    return result;
  }

  entries(): [K, V][] {
    const result: [K, V][] = [];
    let node = this.head.forward[0];
    while (node !== null) {
      result.push([node.key, node.value]);
      node = node.forward[0];
    }
    return result;
  }

  range(from: K, to: K): [K, V][] {
    const result: [K, V][] = [];
    let current: SkipNode<K, V> = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] !== null && this.compare(current.forward[i]!.key, from) < 0) {
        current = current.forward[i]!;
      }
    }
    let node = current.forward[0];
    while (node !== null && this.compare(node.key, to) <= 0) {
      result.push([node.key, node.value]);
      node = node.forward[0];
    }
    return result;
  }
}
