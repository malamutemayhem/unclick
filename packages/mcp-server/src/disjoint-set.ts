export class DisjointSet<T> {
  private parent = new Map<T, T>();
  private rank = new Map<T, number>();
  private _componentCount = 0;

  makeSet(x: T): void {
    if (this.parent.has(x)) return;
    this.parent.set(x, x);
    this.rank.set(x, 0);
    this._componentCount++;
  }

  find(x: T): T {
    if (!this.parent.has(x)) throw new Error("Element not in set");
    let current = x;
    while (this.parent.get(current) !== current) {
      const grandparent = this.parent.get(this.parent.get(current)!)!;
      this.parent.set(current, grandparent);
      current = grandparent;
    }
    return current;
  }

  union(x: T, y: T): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;
    const rankX = this.rank.get(rootX)!;
    const rankY = this.rank.get(rootY)!;
    if (rankX < rankY) {
      this.parent.set(rootX, rootY);
    } else if (rankX > rankY) {
      this.parent.set(rootY, rootX);
    } else {
      this.parent.set(rootY, rootX);
      this.rank.set(rootX, rankX + 1);
    }
    this._componentCount--;
    return true;
  }

  connected(x: T, y: T): boolean {
    return this.find(x) === this.find(y);
  }

  get componentCount(): number {
    return this._componentCount;
  }

  get size(): number {
    return this.parent.size;
  }

  components(): Map<T, T[]> {
    const groups = new Map<T, T[]>();
    for (const item of this.parent.keys()) {
      const root = this.find(item);
      if (!groups.has(root)) groups.set(root, []);
      groups.get(root)!.push(item);
    }
    return groups;
  }
}
