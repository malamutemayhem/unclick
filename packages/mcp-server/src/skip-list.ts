interface SkipNode<K, V> {
  key: K;
  value: V;
  forward: Array<SkipNode<K, V> | null>;
}

export class SkipList<K, V> {
  private head: SkipNode<K, V>;
  private maxLevel: number;
  private level = 0;
  private _size = 0;
  private compare: (a: K, b: K) => number;

  constructor(compare: (a: K, b: K) => number, maxLevel = 16) {
    this.compare = compare;
    this.maxLevel = maxLevel;
    this.head = this.createNode(null as unknown as K, null as unknown as V, maxLevel);
  }

  insert(key: K, value: V): void {
    const update: Array<SkipNode<K, V>> = new Array(this.maxLevel);
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
    const node = this.createNode(key, value, newLevel);
    for (let i = 0; i <= newLevel; i++) {
      node.forward[i] = update[i].forward[i];
      update[i].forward[i] = node;
    }
    this._size++;
  }

  get(key: K): V | undefined {
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && this.compare(current.forward[i]!.key, key) < 0) {
        current = current.forward[i]!;
      }
    }
    const node = current.forward[0];
    if (node && this.compare(node.key, key) === 0) return node.value;
    return undefined;
  }

  delete(key: K): boolean {
    const update: Array<SkipNode<K, V>> = new Array(this.maxLevel);
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
    this._size--;
    return true;
  }

  get size(): number {
    return this._size;
  }

  toArray(): Array<{ key: K; value: V }> {
    const result: Array<{ key: K; value: V }> = [];
    let node = this.head.forward[0];
    while (node) {
      result.push({ key: node.key, value: node.value });
      node = node.forward[0];
    }
    return result;
  }

  private createNode(key: K, value: V, level: number): SkipNode<K, V> {
    return { key, value, forward: new Array(level + 1).fill(null) };
  }

  private randomLevel(): number {
    let lvl = 0;
    while (lvl < this.maxLevel - 1 && Math.random() < 0.5) lvl++;
    return lvl;
  }
}
