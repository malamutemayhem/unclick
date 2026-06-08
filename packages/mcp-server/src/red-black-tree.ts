const RED = true;
const BLACK = false;
type Color = boolean;

interface RBNode<K, V> {
  key: K;
  value: V;
  left: RBNode<K, V> | null;
  right: RBNode<K, V> | null;
  color: Color;
}

function isRed<K, V>(node: RBNode<K, V> | null): boolean {
  return node !== null && node.color === RED;
}

function rotateLeft<K, V>(h: RBNode<K, V>): RBNode<K, V> {
  const x = h.right!;
  h.right = x.left;
  x.left = h;
  x.color = h.color;
  h.color = RED;
  return x;
}

function rotateRight<K, V>(h: RBNode<K, V>): RBNode<K, V> {
  const x = h.left!;
  h.left = x.right;
  x.right = h;
  x.color = h.color;
  h.color = RED;
  return x;
}

function flipColors<K, V>(h: RBNode<K, V>): void {
  h.color = !h.color;
  if (h.left) h.left.color = !h.left.color;
  if (h.right) h.right.color = !h.right.color;
}

function fixUp<K, V>(h: RBNode<K, V>): RBNode<K, V> {
  if (isRed(h.right) && !isRed(h.left)) h = rotateLeft(h);
  if (isRed(h.left) && isRed(h.left!.left)) h = rotateRight(h);
  if (isRed(h.left) && isRed(h.right)) flipColors(h);
  return h;
}

export class RedBlackTree<K, V> {
  private root: RBNode<K, V> | null = null;
  private _size = 0;
  private compare: (a: K, b: K) => number;

  constructor(compare?: (a: K, b: K) => number) {
    this.compare = compare || ((a: K, b: K) => (a < b ? -1 : a > b ? 1 : 0));
  }

  set(key: K, value: V): void {
    this.root = this.insert(this.root, key, value);
    this.root.color = BLACK;
  }

  private insert(h: RBNode<K, V> | null, key: K, value: V): RBNode<K, V> {
    if (h === null) {
      this._size++;
      return { key, value, left: null, right: null, color: RED };
    }
    const cmp = this.compare(key, h.key);
    if (cmp < 0) h.left = this.insert(h.left, key, value);
    else if (cmp > 0) h.right = this.insert(h.right, key, value);
    else h.value = value;

    return fixUp(h);
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

  values(): V[] {
    const result: V[] = [];
    this.inOrder(this.root, (n) => result.push(n.value));
    return result;
  }

  entries(): [K, V][] {
    const result: [K, V][] = [];
    this.inOrder(this.root, (n) => result.push([n.key, n.value]));
    return result;
  }

  private inOrder(node: RBNode<K, V> | null, fn: (n: RBNode<K, V>) => void): void {
    if (!node) return;
    this.inOrder(node.left, fn);
    fn(node);
    this.inOrder(node.right, fn);
  }

  range(low: K, high: K): [K, V][] {
    const result: [K, V][] = [];
    this.rangeSearch(this.root, low, high, result);
    return result;
  }

  private rangeSearch(node: RBNode<K, V> | null, low: K, high: K, result: [K, V][]): void {
    if (!node) return;
    const cmpLo = this.compare(low, node.key);
    const cmpHi = this.compare(high, node.key);
    if (cmpLo < 0) this.rangeSearch(node.left, low, high, result);
    if (cmpLo <= 0 && cmpHi >= 0) result.push([node.key, node.value]);
    if (cmpHi > 0) this.rangeSearch(node.right, low, high, result);
  }
}
