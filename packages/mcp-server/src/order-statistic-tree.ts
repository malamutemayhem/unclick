interface OSTNode<K, V> {
  key: K;
  value: V;
  left: OSTNode<K, V> | null;
  right: OSTNode<K, V> | null;
  size: number;
  height: number;
}

export class OrderStatisticTree<K, V> {
  private root: OSTNode<K, V> | null = null;
  private compare: (a: K, b: K) => number;

  constructor(compare?: (a: K, b: K) => number) {
    this.compare = compare || ((a: K, b: K) => (a < b ? -1 : a > b ? 1 : 0));
  }

  private nodeSize(n: OSTNode<K, V> | null): number {
    return n ? n.size : 0;
  }

  private nodeHeight(n: OSTNode<K, V> | null): number {
    return n ? n.height : 0;
  }

  private update(n: OSTNode<K, V>): void {
    n.size = 1 + this.nodeSize(n.left) + this.nodeSize(n.right);
    n.height = 1 + Math.max(this.nodeHeight(n.left), this.nodeHeight(n.right));
  }

  private rotateRight(y: OSTNode<K, V>): OSTNode<K, V> {
    const x = y.left!;
    y.left = x.right;
    x.right = y;
    this.update(y);
    this.update(x);
    return x;
  }

  private rotateLeft(x: OSTNode<K, V>): OSTNode<K, V> {
    const y = x.right!;
    x.right = y.left;
    y.left = x;
    this.update(x);
    this.update(y);
    return y;
  }

  private balance(n: OSTNode<K, V>): OSTNode<K, V> {
    this.update(n);
    const bf = this.nodeHeight(n.left) - this.nodeHeight(n.right);
    if (bf > 1) {
      if (this.nodeHeight(n.left!.left) < this.nodeHeight(n.left!.right)) {
        n.left = this.rotateLeft(n.left!);
      }
      return this.rotateRight(n);
    }
    if (bf < -1) {
      if (this.nodeHeight(n.right!.right) < this.nodeHeight(n.right!.left)) {
        n.right = this.rotateRight(n.right!);
      }
      return this.rotateLeft(n);
    }
    return n;
  }

  private insertNode(node: OSTNode<K, V> | null, key: K, value: V): OSTNode<K, V> {
    if (!node) return { key, value, left: null, right: null, size: 1, height: 1 };
    const cmp = this.compare(key, node.key);
    if (cmp === 0) {
      node.value = value;
      return node;
    }
    if (cmp < 0) node.left = this.insertNode(node.left, key, value);
    else node.right = this.insertNode(node.right, key, value);
    return this.balance(node);
  }

  insert(key: K, value: V): void {
    this.root = this.insertNode(this.root, key, value);
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

  kth(k: number): { key: K; value: V } | undefined {
    if (k < 0 || k >= this.nodeSize(this.root)) return undefined;
    return this.kthNode(this.root!, k);
  }

  private kthNode(node: OSTNode<K, V>, k: number): { key: K; value: V } {
    const leftSize = this.nodeSize(node.left);
    if (k < leftSize) return this.kthNode(node.left!, k);
    if (k === leftSize) return { key: node.key, value: node.value };
    return this.kthNode(node.right!, k - leftSize - 1);
  }

  rank(key: K): number {
    let r = 0;
    let node = this.root;
    while (node) {
      const cmp = this.compare(key, node.key);
      if (cmp < 0) {
        node = node.left;
      } else if (cmp > 0) {
        r += this.nodeSize(node.left) + 1;
        node = node.right;
      } else {
        return r + this.nodeSize(node.left);
      }
    }
    return r;
  }

  size(): number {
    return this.nodeSize(this.root);
  }

  keys(): K[] {
    const result: K[] = [];
    const collect = (n: OSTNode<K, V> | null): void => {
      if (!n) return;
      collect(n.left);
      result.push(n.key);
      collect(n.right);
    };
    collect(this.root);
    return result;
  }
}
