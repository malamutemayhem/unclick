interface BTreeNode<K, V> {
  keys: K[];
  values: V[];
  children: BTreeNode<K, V>[];
  leaf: boolean;
}

export class BTree<K, V> {
  private root: BTreeNode<K, V>;
  private _size = 0;

  constructor(private order: number = 3, private compare: (a: K, b: K) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
    this.root = { keys: [], values: [], children: [], leaf: true };
  }

  get size(): number {
    return this._size;
  }

  get(key: K): V | undefined {
    return this.search(this.root, key);
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  insert(key: K, value: V): void {
    const root = this.root;
    if (root.keys.length === 2 * this.order - 1) {
      const newRoot: BTreeNode<K, V> = { keys: [], values: [], children: [root], leaf: false };
      this.splitChild(newRoot, 0);
      this.root = newRoot;
      this.insertNonFull(newRoot, key, value);
    } else {
      this.insertNonFull(root, key, value);
    }
    this._size++;
  }

  inOrder(): [K, V][] {
    const result: [K, V][] = [];
    this.inOrderTraverse(this.root, result);
    return result;
  }

  min(): [K, V] | undefined {
    if (this._size === 0) return undefined;
    let node = this.root;
    while (!node.leaf) node = node.children[0];
    return [node.keys[0], node.values[0]];
  }

  max(): [K, V] | undefined {
    if (this._size === 0) return undefined;
    let node = this.root;
    while (!node.leaf) node = node.children[node.children.length - 1];
    return [node.keys[node.keys.length - 1], node.values[node.values.length - 1]];
  }

  height(): number {
    let h = 0;
    let node = this.root;
    while (!node.leaf) {
      h++;
      node = node.children[0];
    }
    return h;
  }

  private search(node: BTreeNode<K, V>, key: K): V | undefined {
    let i = 0;
    while (i < node.keys.length && this.compare(key, node.keys[i]) > 0) i++;
    if (i < node.keys.length && this.compare(key, node.keys[i]) === 0) {
      return node.values[i];
    }
    if (node.leaf) return undefined;
    return this.search(node.children[i], key);
  }

  private insertNonFull(node: BTreeNode<K, V>, key: K, value: V): void {
    let i = node.keys.length - 1;
    if (node.leaf) {
      while (i >= 0 && this.compare(key, node.keys[i]) < 0) i--;
      if (i >= 0 && this.compare(key, node.keys[i]) === 0) {
        node.values[i] = value;
        this._size--;
        return;
      }
      node.keys.splice(i + 1, 0, key);
      node.values.splice(i + 1, 0, value);
    } else {
      while (i >= 0 && this.compare(key, node.keys[i]) < 0) i--;
      if (i >= 0 && this.compare(key, node.keys[i]) === 0) {
        node.values[i] = value;
        this._size--;
        return;
      }
      i++;
      if (node.children[i].keys.length === 2 * this.order - 1) {
        this.splitChild(node, i);
        if (this.compare(key, node.keys[i]) > 0) i++;
      }
      this.insertNonFull(node.children[i], key, value);
    }
  }

  private splitChild(parent: BTreeNode<K, V>, index: number): void {
    const child = parent.children[index];
    const mid = this.order - 1;
    const newNode: BTreeNode<K, V> = {
      keys: child.keys.splice(mid + 1),
      values: child.values.splice(mid + 1),
      children: child.leaf ? [] : child.children.splice(mid + 1),
      leaf: child.leaf,
    };
    const midKey = child.keys.splice(mid)[0];
    const midVal = child.values.splice(mid)[0];
    parent.keys.splice(index, 0, midKey);
    parent.values.splice(index, 0, midVal);
    parent.children.splice(index + 1, 0, newNode);
  }

  private inOrderTraverse(node: BTreeNode<K, V>, result: [K, V][]): void {
    for (let i = 0; i < node.keys.length; i++) {
      if (!node.leaf) this.inOrderTraverse(node.children[i], result);
      result.push([node.keys[i], node.values[i]]);
    }
    if (!node.leaf) this.inOrderTraverse(node.children[node.keys.length], result);
  }
}
