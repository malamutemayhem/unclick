interface AVLNode<K, V> {
  key: K;
  value: V;
  left: AVLNode<K, V> | null;
  right: AVLNode<K, V> | null;
  height: number;
}

export class AVLTree<K, V> {
  private root: AVLNode<K, V> | null = null;
  private _size = 0;
  private compare: (a: K, b: K) => number;

  constructor(compare?: (a: K, b: K) => number) {
    this.compare = compare ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  }

  get size(): number {
    return this._size;
  }

  set(key: K, value: V): void {
    const existed = this.has(key);
    this.root = this._insert(this.root, key, value);
    if (!existed) this._size++;
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
    let node = this.root;
    while (node) {
      const cmp = this.compare(key, node.key);
      if (cmp === 0) return true;
      node = cmp < 0 ? node.left : node.right;
    }
    return false;
  }

  delete(key: K): boolean {
    if (!this.has(key)) return false;
    this.root = this._delete(this.root!, key);
    this._size--;
    return true;
  }

  min(): K | undefined {
    if (!this.root) return undefined;
    let node = this.root;
    while (node.left) node = node.left;
    return node.key;
  }

  max(): K | undefined {
    if (!this.root) return undefined;
    let node = this.root;
    while (node.right) node = node.right;
    return node.key;
  }

  keys(): K[] {
    const result: K[] = [];
    this._inOrder(this.root, (n) => result.push(n.key));
    return result;
  }

  values(): V[] {
    const result: V[] = [];
    this._inOrder(this.root, (n) => result.push(n.value));
    return result;
  }

  private _height(node: AVLNode<K, V> | null): number {
    return node ? node.height : 0;
  }

  private _balance(node: AVLNode<K, V>): number {
    return this._height(node.left) - this._height(node.right);
  }

  private _updateHeight(node: AVLNode<K, V>): void {
    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  private _rotateRight(y: AVLNode<K, V>): AVLNode<K, V> {
    const x = y.left!;
    y.left = x.right;
    x.right = y;
    this._updateHeight(y);
    this._updateHeight(x);
    return x;
  }

  private _rotateLeft(x: AVLNode<K, V>): AVLNode<K, V> {
    const y = x.right!;
    x.right = y.left;
    y.left = x;
    this._updateHeight(x);
    this._updateHeight(y);
    return y;
  }

  private _rebalance(node: AVLNode<K, V>): AVLNode<K, V> {
    this._updateHeight(node);
    const bal = this._balance(node);
    if (bal > 1) {
      if (this._balance(node.left!) < 0) node.left = this._rotateLeft(node.left!);
      return this._rotateRight(node);
    }
    if (bal < -1) {
      if (this._balance(node.right!) > 0) node.right = this._rotateRight(node.right!);
      return this._rotateLeft(node);
    }
    return node;
  }

  private _insert(node: AVLNode<K, V> | null, key: K, value: V): AVLNode<K, V> {
    if (!node) return { key, value, left: null, right: null, height: 1 };
    const cmp = this.compare(key, node.key);
    if (cmp === 0) { node.value = value; return node; }
    if (cmp < 0) node.left = this._insert(node.left, key, value);
    else node.right = this._insert(node.right, key, value);
    return this._rebalance(node);
  }

  private _delete(node: AVLNode<K, V>, key: K): AVLNode<K, V> | null {
    const cmp = this.compare(key, node.key);
    if (cmp < 0) { node.left = this._delete(node.left!, key); }
    else if (cmp > 0) { node.right = this._delete(node.right!, key); }
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let successor = node.right;
      while (successor.left) successor = successor.left;
      node.key = successor.key;
      node.value = successor.value;
      node.right = this._delete(node.right, successor.key);
    }
    return this._rebalance(node);
  }

  private _inOrder(node: AVLNode<K, V> | null, fn: (n: AVLNode<K, V>) => void): void {
    if (!node) return;
    this._inOrder(node.left, fn);
    fn(node);
    this._inOrder(node.right, fn);
  }
}
