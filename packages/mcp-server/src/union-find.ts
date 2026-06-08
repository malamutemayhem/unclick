export class UnionFind<T extends string | number = number> {
  private parent = new Map<T, T>();
  private rank = new Map<T, number>();
  private componentCount = 0;

  makeSet(x: T): void {
    if (this.parent.has(x)) return;
    this.parent.set(x, x);
    this.rank.set(x, 0);
    this.componentCount++;
  }

  find(x: T): T {
    if (!this.parent.has(x)) throw new Error(`Element ${String(x)} not in set`);
    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)!));
    }
    return this.parent.get(x)!;
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

    this.componentCount--;
    return true;
  }

  connected(x: T, y: T): boolean {
    return this.find(x) === this.find(y);
  }

  get components(): number {
    return this.componentCount;
  }

  get size(): number {
    return this.parent.size;
  }

  componentMembers(x: T): T[] {
    const root = this.find(x);
    const members: T[] = [];
    for (const key of this.parent.keys()) {
      if (this.find(key) === root) members.push(key);
    }
    return members;
  }

  allComponents(): T[][] {
    const groups = new Map<T, T[]>();
    for (const key of this.parent.keys()) {
      const root = this.find(key);
      if (!groups.has(root)) groups.set(root, []);
      groups.get(root)!.push(key);
    }
    return [...groups.values()];
  }
}
