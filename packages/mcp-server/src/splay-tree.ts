interface SplayNode<K, V> {
  key: K;
  value: V;
  left: SplayNode<K, V> | null;
  right: SplayNode<K, V> | null;
}

export class SplayTree<K, V> {
  private root: SplayNode<K, V> | null = null;
  private _size = 0;
  private compare: (a: K, b: K) => number;

  constructor(compare?: (a: K, b: K) => number) {
    this.compare = compare || ((a: K, b: K) => (a < b ? -1 : a > b ? 1 : 0));
  }

  private splay(key: K): void {
    if (!this.root) return;
    const dummy: SplayNode<K, V> = { key: null as any, value: null as any, left: null, right: null };
    let left = dummy;
    let right = dummy;
    let current = this.root;

    while (true) {
      const cmp = this.compare(key, current.key);
      if (cmp < 0) {
        if (!current.left) break;
        if (this.compare(key, current.left.key) < 0) {
          const temp = current.left;
          current.left = temp.right;
          temp.right = current;
          current = temp;
          if (!current.left) break;
        }
        right.left = current;
        right = current;
        current = current.left;
      } else if (cmp > 0) {
        if (!current.right) break;
        if (this.compare(key, current.right.key) > 0) {
          const temp = current.right;
          current.right = temp.left;
          temp.left = current;
          current = temp;
          if (!current.right) break;
        }
        left.right = current;
        left = current;
        current = current.right;
      } else {
        break;
      }
    }
    left.right = current.left;
    right.left = current.right;
    current.left = dummy.right;
    current.right = dummy.left;
    this.root = current;
  }

  set(key: K, value: V): void {
    if (!this.root) {
      this.root = { key, value, left: null, right: null };
      this._size++;
      return;
    }
    this.splay(key);
    const cmp = this.compare(key, this.root.key);
    if (cmp === 0) {
      this.root.value = value;
      return;
    }
    const node: SplayNode<K, V> = { key, value, left: null, right: null };
    if (cmp < 0) {
      node.left = this.root.left;
      node.right = this.root;
      this.root.left = null;
    } else {
      node.right = this.root.right;
      node.left = this.root;
      this.root.right = null;
    }
    this.root = node;
    this._size++;
  }

  get(key: K): V | undefined {
    if (!this.root) return undefined;
    this.splay(key);
    return this.compare(key, this.root.key) === 0 ? this.root.value : undefined;
  }

  has(key: K): boolean {
    if (!this.root) return false;
    this.splay(key);
    return this.compare(key, this.root.key) === 0;
  }

  delete(key: K): boolean {
    if (!this.root) return false;
    this.splay(key);
    if (this.compare(key, this.root.key) !== 0) return false;
    if (!this.root.left) {
      this.root = this.root.right;
    } else {
      const right = this.root.right;
      this.root = this.root.left;
      this.splay(key);
      this.root.right = right;
    }
    this._size--;
    return true;
  }

  min(): { key: K; value: V } | undefined {
    if (!this.root) return undefined;
    let node = this.root;
    while (node.left) node = node.left;
    this.splay(node.key);
    return { key: node.key, value: node.value };
  }

  max(): { key: K; value: V } | undefined {
    if (!this.root) return undefined;
    let node = this.root;
    while (node.right) node = node.right;
    this.splay(node.key);
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

  private inOrder(node: SplayNode<K, V> | null, fn: (n: SplayNode<K, V>) => void): void {
    if (!node) return;
    this.inOrder(node.left, fn);
    fn(node);
    this.inOrder(node.right, fn);
  }
}
