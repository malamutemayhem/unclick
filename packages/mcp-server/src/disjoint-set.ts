export class DisjointSet<T> {
  private parent = new Map<T, T>();
  private rank = new Map<T, number>();
  private _size = 0;

  makeSet(x: T): void {
    if (this.parent.has(x)) return;
    this.parent.set(x, x);
    this.rank.set(x, 0);
    this._size++;
  }

  find(x: T): T {
    if (!this.parent.has(x)) throw new Error("Element not in set");
    let root = x;
    while (this.parent.get(root) !== root) root = this.parent.get(root)!;
    let current = x;
    while (current !== root) {
      const next = this.parent.get(current)!;
      this.parent.set(current, root);
      current = next;
    }
    return root;
  }

  union(a: T, b: T): boolean {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) return false;
    const rankA = this.rank.get(rootA)!;
    const rankB = this.rank.get(rootB)!;
    if (rankA < rankB) this.parent.set(rootA, rootB);
    else if (rankA > rankB) this.parent.set(rootB, rootA);
    else { this.parent.set(rootB, rootA); this.rank.set(rootA, rankA + 1); }
    this._size--;
    return true;
  }

  connected(a: T, b: T): boolean {
    return this.find(a) === this.find(b);
  }

  get setCount(): number { return this._size; }

  sets(): T[][] {
    const groups = new Map<T, T[]>();
    for (const el of this.parent.keys()) {
      const root = this.find(el);
      if (!groups.has(root)) groups.set(root, []);
      groups.get(root)!.push(el);
    }
    return [...groups.values()];
  }
}
