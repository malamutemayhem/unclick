export class DisjointSetAdvanced<T = number> {
  private parent: Map<T, T> = new Map();
  private rank: Map<T, number> = new Map();
  private sizeMap: Map<T, number> = new Map();
  private componentCount = 0;
  private history: Array<{ type: "make" | "union"; a: T; b?: T }> = [];

  makeSet(x: T): void {
    if (this.parent.has(x)) return;
    this.parent.set(x, x);
    this.rank.set(x, 0);
    this.sizeMap.set(x, 1);
    this.componentCount++;
    this.history.push({ type: "make", a: x });
  }

  find(x: T): T {
    if (!this.parent.has(x)) return x;
    let root = x;
    while (this.parent.get(root) !== root) {
      root = this.parent.get(root)!;
    }
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

    const rankA = this.rank.get(rootA) ?? 0;
    const rankB = this.rank.get(rootB) ?? 0;

    if (rankA < rankB) {
      this.parent.set(rootA, rootB);
      this.sizeMap.set(rootB, (this.sizeMap.get(rootA) ?? 1) + (this.sizeMap.get(rootB) ?? 1));
    } else if (rankA > rankB) {
      this.parent.set(rootB, rootA);
      this.sizeMap.set(rootA, (this.sizeMap.get(rootA) ?? 1) + (this.sizeMap.get(rootB) ?? 1));
    } else {
      this.parent.set(rootB, rootA);
      this.sizeMap.set(rootA, (this.sizeMap.get(rootA) ?? 1) + (this.sizeMap.get(rootB) ?? 1));
      this.rank.set(rootA, rankA + 1);
    }

    this.componentCount--;
    this.history.push({ type: "union", a, b });
    return true;
  }

  connected(a: T, b: T): boolean {
    return this.find(a) === this.find(b);
  }

  componentSize(x: T): number {
    const root = this.find(x);
    return this.sizeMap.get(root) ?? 0;
  }

  components(): number {
    return this.componentCount;
  }

  elements(): T[] {
    return [...this.parent.keys()];
  }

  getComponents(): Map<T, T[]> {
    const result = new Map<T, T[]>();
    for (const x of this.parent.keys()) {
      const root = this.find(x);
      if (!result.has(root)) result.set(root, []);
      result.get(root)!.push(x);
    }
    return result;
  }

  largestComponent(): T[] {
    const comps = this.getComponents();
    let largest: T[] = [];
    for (const members of comps.values()) {
      if (members.length > largest.length) largest = members;
    }
    return largest;
  }

  getHistory(): Array<{ type: "make" | "union"; a: T; b?: T }> {
    return [...this.history];
  }

  totalElements(): number {
    return this.parent.size;
  }
}
