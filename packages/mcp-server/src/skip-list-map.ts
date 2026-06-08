interface SkipNode<K, V> {
  key: K;
  value: V;
  next: (SkipNode<K, V> | null)[];
}

export class SkipListMap<K extends number | string, V> {
  private head: SkipNode<K, V>;
  private maxLevel: number;
  private level: number = 0;
  private _size: number = 0;
  private probability: number;

  constructor(maxLevel = 16, probability = 0.5) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.head = {
      key: null as unknown as K,
      value: null as unknown as V,
      next: new Array(maxLevel).fill(null),
    };
  }

  private randomLevel(): number {
    let lvl = 0;
    while (lvl < this.maxLevel - 1 && Math.random() < this.probability) {
      lvl++;
    }
    return lvl;
  }

  private compare(a: K, b: K): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  set(key: K, value: V): void {
    const update: (SkipNode<K, V> | null)[] = new Array(this.maxLevel).fill(null);
    let current: SkipNode<K, V> = this.head;

    for (let i = this.level; i >= 0; i--) {
      while (current.next[i] && this.compare(current.next[i]!.key, key) < 0) {
        current = current.next[i]!;
      }
      update[i] = current;
    }

    const target = current.next[0];
    if (target && this.compare(target.key, key) === 0) {
      target.value = value;
      return;
    }

    const newLevel = this.randomLevel();
    if (newLevel > this.level) {
      for (let i = this.level + 1; i <= newLevel; i++) {
        update[i] = this.head;
      }
      this.level = newLevel;
    }

    const newNode: SkipNode<K, V> = {
      key, value, next: new Array(newLevel + 1).fill(null),
    };

    for (let i = 0; i <= newLevel; i++) {
      newNode.next[i] = update[i]!.next[i];
      update[i]!.next[i] = newNode;
    }
    this._size++;
  }

  get(key: K): V | undefined {
    let current: SkipNode<K, V> = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (current.next[i] && this.compare(current.next[i]!.key, key) < 0) {
        current = current.next[i]!;
      }
    }
    const target = current.next[0];
    if (target && this.compare(target.key, key) === 0) return target.value;
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const update: (SkipNode<K, V> | null)[] = new Array(this.maxLevel).fill(null);
    let current: SkipNode<K, V> = this.head;

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

    while (this.level > 0 && !this.head.next[this.level]) {
      this.level--;
    }
    this._size--;
    return true;
  }

  size(): number {
    return this._size;
  }

  keys(): K[] {
    const result: K[] = [];
    let current = this.head.next[0];
    while (current) {
      result.push(current.key);
      current = current.next[0];
    }
    return result;
  }

  values(): V[] {
    const result: V[] = [];
    let current = this.head.next[0];
    while (current) {
      result.push(current.value);
      current = current.next[0];
    }
    return result;
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

  clear(): void {
    this.head.next.fill(null);
    this.level = 0;
    this._size = 0;
  }
}
