export interface TreeNode<T> {
  data: T;
  children: TreeNode<T>[];
}

export function createNode<T>(data: T, children: TreeNode<T>[] = []): TreeNode<T> {
  return { data, children };
}

export function addChild<T>(parent: TreeNode<T>, child: TreeNode<T>): void {
  parent.children.push(child);
}

export function findBFS<T>(root: TreeNode<T>, predicate: (data: T) => boolean): TreeNode<T> | null {
  const queue: TreeNode<T>[] = [root];
  while (queue.length > 0) {
    const node = queue.shift()!;
    if (predicate(node.data)) return node;
    queue.push(...node.children);
  }
  return null;
}

export function findDFS<T>(root: TreeNode<T>, predicate: (data: T) => boolean): TreeNode<T> | null {
  if (predicate(root.data)) return root;
  for (const child of root.children) {
    const found = findDFS(child, predicate);
    if (found) return found;
  }
  return null;
}

export function mapTree<T, R>(root: TreeNode<T>, fn: (data: T) => R): TreeNode<R> {
  return {
    data: fn(root.data),
    children: root.children.map((c) => mapTree(c, fn)),
  };
}

export function filterTree<T>(root: TreeNode<T>, predicate: (data: T) => boolean): TreeNode<T> | null {
  if (!predicate(root.data)) return null;
  return {
    data: root.data,
    children: root.children
      .map((c) => filterTree(c, predicate))
      .filter((c): c is TreeNode<T> => c !== null),
  };
}

export function depth<T>(root: TreeNode<T>): number {
  if (root.children.length === 0) return 1;
  return 1 + Math.max(...root.children.map(depth));
}

export function size<T>(root: TreeNode<T>): number {
  return 1 + root.children.reduce((acc, c) => acc + size(c), 0);
}

export function leaves<T>(root: TreeNode<T>): T[] {
  if (root.children.length === 0) return [root.data];
  return root.children.flatMap(leaves);
}

export function flatten<T>(root: TreeNode<T>): T[] {
  return [root.data, ...root.children.flatMap(flatten)];
}

export function path<T>(root: TreeNode<T>, predicate: (data: T) => boolean): T[] | null {
  if (predicate(root.data)) return [root.data];
  for (const child of root.children) {
    const p = path(child, predicate);
    if (p) return [root.data, ...p];
  }
  return null;
}

export function reduce<T, R>(root: TreeNode<T>, fn: (acc: R, data: T) => R, initial: R): R {
  let acc = fn(initial, root.data);
  for (const child of root.children) {
    acc = reduce(child, fn, acc);
  }
  return acc;
}
