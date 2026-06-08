export interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

export type VisitOrder = "pre" | "post" | "bfs";

export class TreeWalker {
  static walk<T>(root: TreeNode<T>, order: VisitOrder, visitor: (node: TreeNode<T>, depth: number) => void): void {
    switch (order) {
      case "pre":
        this.preOrder(root, visitor, 0);
        break;
      case "post":
        this.postOrder(root, visitor, 0);
        break;
      case "bfs":
        this.breadthFirst(root, visitor);
        break;
    }
  }

  private static preOrder<T>(node: TreeNode<T>, visitor: (node: TreeNode<T>, depth: number) => void, depth: number): void {
    visitor(node, depth);
    for (const child of node.children) {
      this.preOrder(child, visitor, depth + 1);
    }
  }

  private static postOrder<T>(node: TreeNode<T>, visitor: (node: TreeNode<T>, depth: number) => void, depth: number): void {
    for (const child of node.children) {
      this.postOrder(child, visitor, depth + 1);
    }
    visitor(node, depth);
  }

  private static breadthFirst<T>(root: TreeNode<T>, visitor: (node: TreeNode<T>, depth: number) => void): void {
    const queue: { node: TreeNode<T>; depth: number }[] = [{ node: root, depth: 0 }];
    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;
      visitor(node, depth);
      for (const child of node.children) {
        queue.push({ node: child, depth: depth + 1 });
      }
    }
  }

  static find<T>(root: TreeNode<T>, predicate: (value: T) => boolean): TreeNode<T> | null {
    if (predicate(root.value)) return root;
    for (const child of root.children) {
      const found = this.find(child, predicate);
      if (found) return found;
    }
    return null;
  }

  static findAll<T>(root: TreeNode<T>, predicate: (value: T) => boolean): TreeNode<T>[] {
    const results: TreeNode<T>[] = [];
    this.walk(root, "pre", (node) => {
      if (predicate(node.value)) results.push(node);
    });
    return results;
  }

  static map<T, U>(root: TreeNode<T>, fn: (value: T) => U): TreeNode<U> {
    return {
      value: fn(root.value),
      children: root.children.map((child) => this.map(child, fn)),
    };
  }

  static reduce<T, U>(root: TreeNode<T>, fn: (acc: U, value: T) => U, initial: U): U {
    let acc = fn(initial, root.value);
    for (const child of root.children) {
      acc = this.reduce(child, fn, acc);
    }
    return acc;
  }

  static height<T>(root: TreeNode<T>): number {
    if (root.children.length === 0) return 0;
    return 1 + Math.max(...root.children.map((c) => this.height(c)));
  }

  static size<T>(root: TreeNode<T>): number {
    return this.reduce(root, (acc) => acc + 1, 0);
  }

  static leaves<T>(root: TreeNode<T>): T[] {
    const result: T[] = [];
    this.walk(root, "pre", (node) => {
      if (node.children.length === 0) result.push(node.value);
    });
    return result;
  }

  static path<T>(root: TreeNode<T>, predicate: (value: T) => boolean): T[] | null {
    if (predicate(root.value)) return [root.value];
    for (const child of root.children) {
      const childPath = this.path(child, predicate);
      if (childPath) return [root.value, ...childPath];
    }
    return null;
  }
}
