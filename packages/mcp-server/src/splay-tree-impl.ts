interface SplayNode<K, V> {
  key: K;
  value: V;
  left: SplayNode<K, V> | null;
  right: SplayNode<K, V> | null;
}

export class SplayTree<K extends number | string, V> {
  private root: SplayNode<K, V> | null = null;
  private count = 0;

  private compare(a: K, b: K): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  private rotateRight(node: SplayNode<K, V>): SplayNode<K, V> {
    const left = node.left!;
    node.left = left.right;
    left.right = node;
    return left;
  }

  private rotateLeft(node: SplayNode<K, V>): SplayNode<K, V> {
    const right = node.right!;
    node.right = right.left;
    right.left = node;
    return right;
  }

  private splay(node: SplayNode<K, V> | null, key: K): SplayNode<K, V> | null {
    if (node === null) return null;
    const cmp = this.compare(key, node.key);
    if (cmp < 0) {
      if (node.left === null) return node;
      const cmp2 = this.compare(key, node.left.key);
      if (cmp2 < 0) {
        node.left.left = this.splay(node.left.left, key);
        node = this.rotateRight(node);
      } else if (cmp2 > 0) {
        node.left.right = this.splay(node.left.right, key);
        if (node.left.right !== null) node.left = this.rotateLeft(node.left);
      }
      return node.left === null ? node : this.rotateRight(node);
    } else if (cmp > 0) {
      if (node.right === null) return node;
      const cmp2 = this.compare(key, node.right.key);
      if (cmp2 < 0) {
        node.right.left = this.splay(node.right.left, key);
        if (node.right.left !== null) node.right = this.rotateRight(node.right);
      } else if (cmp2 > 0) {
        node.right.right = this.splay(node.right.right, key);
        node = this.rotateLeft(node);
      }
      return node.right === null ? node : this.rotateLeft(node);
    }
    return node;
  }

  insert(key: K, value: V): void {
    if (this.root === null) {
      this.root = { key, value, left: null, right: null };
      this.count++;
      return;
    }
    this.root = this.splay(this.root, key);
    const cmp = this.compare(key, this.root!.key);
    if (cmp === 0) {
      this.root!.value = value;
      return;
    }
    const node: SplayNode<K, V> = { key, value, left: null, right: null };
    if (cmp < 0) {
      node.left = this.root!.left;
      node.right = this.root;
      this.root!.left = null;
    } else {
      node.right = this.root!.right;
      node.left = this.root;
      this.root!.right = null;
    }
    this.root = node;
    this.count++;
  }

  get(key: K): V | undefined {
    if (this.root === null) return undefined;
    this.root = this.splay(this.root, key);
    if (this.compare(key, this.root!.key) === 0) return this.root!.value;
    return undefined;
  }

  delete(key: K): boolean {
    if (this.root === null) return false;
    this.root = this.splay(this.root, key);
    if (this.compare(key, this.root!.key) !== 0) return false;
    if (this.root!.left === null) {
      this.root = this.root!.right;
    } else {
      const right = this.root!.right;
      this.root = this.splay(this.root!.left, key);
      this.root!.right = right;
    }
    this.count--;
    return true;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  get size(): number {
    return this.count;
  }

  min(): [K, V] | null {
    if (this.root === null) return null;
    let node = this.root;
    while (node.left !== null) node = node.left;
    this.root = this.splay(this.root, node.key);
    return [node.key, node.value];
  }

  max(): [K, V] | null {
    if (this.root === null) return null;
    let node = this.root;
    while (node.right !== null) node = node.right;
    this.root = this.splay(this.root, node.key);
    return [node.key, node.value];
  }

  inOrder(): [K, V][] {
    const result: [K, V][] = [];
    const traverse = (node: SplayNode<K, V> | null): void => {
      if (node === null) return;
      traverse(node.left);
      result.push([node.key, node.value]);
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }
}
