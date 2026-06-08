interface TreapNode<K, V> {
  key: K;
  value: V;
  priority: number;
  left: TreapNode<K, V> | null;
  right: TreapNode<K, V> | null;
}

export class Treap<K, V> {
  private root: TreapNode<K, V> | null = null;
  private _size = 0;
  private compare: (a: K, b: K) => number;

  constructor(compare?: (a: K, b: K) => number) {
    this.compare = compare || ((a: K, b: K) => (a < b ? -1 : a > b ? 1 : 0));
  }

  private rotateRight(node: TreapNode<K, V>): TreapNode<K, V> {
    const left = node.left!;
    node.left = left.right;
    left.right = node;
    return left;
  }

  private rotateLeft(node: TreapNode<K, V>): TreapNode<K, V> {
    const right = node.right!;
    node.right = right.left;
    right.left = node;
    return right;
  }

  set(key: K, value: V): void {
    this.root = this.insertNode(this.root, key, value);
  }

  private insertNode(node: TreapNode<K, V> | null, key: K, value: V): TreapNode<K, V> {
    if (!node) {
      this._size++;
      return { key, value, priority: Math.random(), left: null, right: null };
    }
    const cmp = this.compare(key, node.key);
    if (cmp === 0) {
      node.value = value;
      return node;
    }
    if (cmp < 0) {
      node.left = this.insertNode(node.left, key, value);
      if (node.left.priority > node.priority) {
        node = this.rotateRight(node);
      }
    } else {
      node.right = this.insertNode(node.right, key, value);
      if (node.right.priority > node.priority) {
        node = this.rotateLeft(node);
      }
    }
    return node;
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

  delete(key: K): boolean {
    const prev = this._size;
    this.root = this.deleteNode(this.root, key);
    return this._size < prev;
  }

  private deleteNode(node: TreapNode<K, V> | null, key: K): TreapNode<K, V> | null {
    if (!node) return null;
    const cmp = this.compare(key, node.key);
    if (cmp < 0) {
      node.left = this.deleteNode(node.left, key);
    } else if (cmp > 0) {
      node.right = this.deleteNode(node.right, key);
    } else {
      if (!node.left && !node.right) {
        this._size--;
        return null;
      }
      if (!node.left) {
        node = this.rotateLeft(node);
        node.left = this.deleteNode(node.left, key);
      } else if (!node.right) {
        node = this.rotateRight(node);
        node.right = this.deleteNode(node.right, key);
      } else if (node.left.priority > node.right.priority) {
        node = this.rotateRight(node);
        node.right = this.deleteNode(node.right, key);
      } else {
        node = this.rotateLeft(node);
        node.left = this.deleteNode(node.left, key);
      }
    }
    return node;
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

  get size(): number {
    return this._size;
  }

  keys(): K[] {
    const result: K[] = [];
    this.inOrder(this.root, (n) => result.push(n.key));
    return result;
  }

  private inOrder(node: TreapNode<K, V> | null, fn: (n: TreapNode<K, V>) => void): void {
    if (!node) return;
    this.inOrder(node.left, fn);
    fn(node);
    this.inOrder(node.right, fn);
  }
}
