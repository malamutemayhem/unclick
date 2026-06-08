export class TreeNode<T> {
  value: T;
  children: TreeNode<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  addChild(value: T): TreeNode<T> {
    const child = new TreeNode(value);
    this.children.push(child);
    return child;
  }

  addChildNode(node: TreeNode<T>): this {
    this.children.push(node);
    return this;
  }

  removeChild(value: T): boolean {
    const idx = this.children.findIndex((c: TreeNode<T>) => c.value === value);
    if (idx === -1) return false;
    this.children.splice(idx, 1);
    return true;
  }

  find(predicate: (value: T) => boolean): TreeNode<T> | null {
    if (predicate(this.value)) return this;
    for (const child of this.children) {
      const found = child.find(predicate);
      if (found) return found;
    }
    return null;
  }

  dfs(visitor: (value: T, depth: number) => void, depth: number = 0): void {
    visitor(this.value, depth);
    for (const child of this.children) child.dfs(visitor, depth + 1);
  }

  bfs(visitor: (value: T, depth: number) => void): void {
    const queue: Array<{ node: TreeNode<T>; depth: number }> = [{ node: this, depth: 0 }];
    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;
      visitor(node.value, depth);
      for (const child of node.children) queue.push({ node: child, depth: depth + 1 });
    }
  }

  map<U>(fn: (value: T) => U): TreeNode<U> {
    const mapped = new TreeNode(fn(this.value));
    for (const child of this.children) {
      mapped.addChildNode(child.map(fn));
    }
    return mapped;
  }

  get size(): number {
    return 1 + this.children.reduce((sum: number, c: TreeNode<T>) => sum + c.size, 0);
  }

  get depth(): number {
    if (this.children.length === 0) return 0;
    return 1 + Math.max(...this.children.map((c: TreeNode<T>) => c.depth));
  }

  get isLeaf(): boolean {
    return this.children.length === 0;
  }

  leaves(): T[] {
    const result: T[] = [];
    this.dfs((v: T, _: number) => {
      const node = this.find((x: T) => x === v);
      if (node && node.isLeaf) result.push(v);
    });
    return result;
  }

  toArray(): T[] {
    const result: T[] = [];
    this.dfs((v: T) => result.push(v));
    return result;
  }
}
