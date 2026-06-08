class SkipNode<K, V> {
  next: Array<SkipNode<K, V> | null>;
  constructor(public key: K, public value: V, level: number) {
    this.next = new Array(level + 1).fill(null);
  }
}

export class SkipList<V = unknown> {
  private head: SkipNode<number, V>;
  private maxLevel: number;
  private level = 0;
  private length = 0;

  constructor(maxLevel = 16) {
    this.maxLevel = maxLevel;
    this.head = new SkipNode<number, V>(-Infinity as number, undefined as V, maxLevel);
  }

  private randomLevel(): number {
    let lvl = 0;
    while (Math.random() < 0.5 && lvl < this.maxLevel) lvl++;
    return lvl;
  }

  insert(key: number, value: V): void {
    const update: Array<SkipNode<number, V>> = new Array(this.maxLevel + 1);
    let current = this.head;

    for (let i = this.level; i >= 0; i--) {
      while (current.next[i] && current.next[i]!.key < key) {
        current = current.next[i]!;
      }
      update[i] = current;
    }

    const next = current.next[0];
    if (next && next.key === key) {
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

    const node = new SkipNode<number, V>(key, value, newLevel);
    for (let i = 0; i <= newLevel; i++) {
      node.next[i] = update[i].next[i];
      update[i].next[i] = node;
    }
    this.length++;
  }

  get(key: number): V | undefined {
    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.next[i] && current.next[i]!.key < key) {
        current = current.next[i]!;
      }
    }
    const node = current.next[0];
    if (node && node.key === key) return node.value;
    return undefined;
  }

  has(key: number): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: number): boolean {
    const update: Array<SkipNode<number, V>> = new Array(this.maxLevel + 1);
    let current = this.head;

    for (let i = this.level; i >= 0; i--) {
      while (current.next[i] && current.next[i]!.key < key) {
        current = current.next[i]!;
      }
      update[i] = current;
    }

    const target = current.next[0];
    if (!target || target.key !== key) return false;

    for (let i = 0; i <= this.level; i++) {
      if (update[i].next[i] !== target) break;
      update[i].next[i] = target.next[i];
    }

    while (this.level > 0 && !this.head.next[this.level]) {
      this.level--;
    }
    this.length--;
    return true;
  }

  get size(): number {
    return this.length;
  }

  toArray(): Array<{ key: number; value: V }> {
    const result: Array<{ key: number; value: V }> = [];
    let current = this.head.next[0];
    while (current) {
      result.push({ key: current.key, value: current.value });
      current = current.next[0];
    }
    return result;
  }
}
