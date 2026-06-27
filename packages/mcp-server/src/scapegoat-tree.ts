interface SGNode<K, V> {
  key: K;
  value: V;
  left: SGNode<K, V> | null;
  right: SGNode<K, V> | null;
  size: number;
}

export class ScapegoatTree<K, V> {
  private root: SGNode<K, V> | null = null;
  private _size = 0;
  private maxSize = 0;
  private alpha: number;
  private compare: (a: K, b: K) => number;

  constructor(alpha = 0.7, compare?: (a: K, b: K) => number) {
    this.alpha = alpha;
    this.compare = compare || ((a: K, b: K) => (a < b ? -1 : a > b ? 1 : 0));
  }

  private nodeSize(node: SGNode<K, V> | null): number {
    return node ? node.size : 0;
  }

  private updateSize(node: SGNode<K, V>): void {
    node.size = 1 + this.nodeSize(node.left) + this.nodeSize(node.right);
  }

  insert(key: K, value: V): void {
    const path: SGNode<K, V>[] = [];
    let parent: SGNode<K, V> | null = null;
    let current = this.root;
    let dir: "left" | "right" = "left";

    while (current) {
      path.push(current);
      const cmp = this.compare(key, current.key);
      if (cmp === 0) {
        current.value = value;
        return;
      }
      parent = current;
      if (cmp < 0) {
        dir = "left";
        current = current.left;
      } else {
        dir = "right";
        current = current.right;
      }
    }

    const node: SGNode<K, V> = { key, value, left: null, right: null, size: 1 };
    if (!parent) {
      this.root = node;
    } else if (dir === "left") {
      parent.left = node;
    } else {
      parent.right = node;
    }
    this._size++;
    this.maxSize = Math.max(this.maxSize, this._size);

    for (let i = path.length - 1; i >= 0; i--) {
      this.updateSize(path[i]);
    }

    for (let i = path.length - 1; i >= 0; i--) {
      const n = path[i];
      if (this.nodeSize(n.left) > this.alpha * n.size ||
          this.nodeSize(n.right) > this.alpha * n.size) {
        const rebuilt = this.rebuild(n);
        if (i === 0) {
          this.root = rebuilt;
        } else {
          const p = path[i - 1];
          if (p.left === n) p.left = rebuilt;
          else p.right = rebuilt;
        }
        for (let j = i - 1; j >= 0; j--) {
          this.updateSize(path[j]);
        }
        break;
      }
    }
  }

  private flatten(node: SGNode<K, V> | null, arr: SGNode<K, V>[]): void {
    if (!node) return;
    this.flatten(node.left, arr);
    arr.push(node);
    this.flatten(node.right, arr);
  }

  private buildBalanced(arr: SGNode<K, V>[], lo: number, hi: number): SGNode<K, V> | null {
    if (lo > hi) return null;
    const mid = (lo + hi) >> 1;
    const node = arr[mid];
    node.left = this.buildBalanced(arr, lo, mid - 1);
    node.right = this.buildBalanced(arr, mid + 1, hi);
    this.updateSize(node);
    return node;
  }

  private rebuild(node: SGNode<K, V>): SGNode<K, V> {
    const arr: SGNode<K, V>[] = [];
    this.flatten(node, arr);
    return this.buildBalanced(arr, 0, arr.length - 1)!;
  }

  get(key: K): V | undefined {
    let node = this.root;
    while (node) {
      const cmp = this.compare(key, node.key);
      if (cmp === 0) return node.value;
      node = cmp < 0 ? node.left : node.right;
    }
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  size(): number {
    return this._size;
  }

  keys(): K[] {
    const result: K[] = [];
    const collect = (node: SGNode<K, V> | null): void => {
      if (!node) return;
      collect(node.left);
      result.push(node.key);
      collect(node.right);
    };
    collect(this.root);
    return result;
  }

  min(): { key: K; value: V } | undefined {
    if (!this.root) return undefined;
    let node = this.root;
    while (node.left) node = node.left;
    return { key: node.key, value: node.value };
  }

  max(): { key: K; value: V } | undefined {
    if (!this.root) return undefined;
    let node = this.root;
    while (node.right) node = node.right;
    return { key: node.key, value: node.value };
  }
}
