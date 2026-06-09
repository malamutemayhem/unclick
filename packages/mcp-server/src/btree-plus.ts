interface BPlusNode<K, V> {
  keys: K[];
  isLeaf: boolean;
  children: BPlusNode<K, V>[];
  values: V[];
  next: BPlusNode<K, V> | null;
}

export class BPlusTree<K extends number | string, V> {
  private root: BPlusNode<K, V>;
  private order: number;
  private _size = 0;

  constructor(order = 4) {
    this.order = Math.max(3, order);
    this.root = this.createLeaf();
  }

  private createLeaf(): BPlusNode<K, V> {
    return { keys: [], isLeaf: true, children: [], values: [], next: null };
  }

  private createInternal(): BPlusNode<K, V> {
    return { keys: [], isLeaf: false, children: [], values: [], next: null };
  }

  insert(key: K, value: V): void {
    const result = this.insertInto(this.root, key, value);
    if (result) {
      const newRoot = this.createInternal();
      newRoot.keys.push(result.key);
      newRoot.children.push(this.root, result.node);
      this.root = newRoot;
    }
    this._size++;
  }

  private insertInto(node: BPlusNode<K, V>, key: K, value: V): { key: K; node: BPlusNode<K, V> } | null {
    if (node.isLeaf) {
      let i = 0;
      while (i < node.keys.length && node.keys[i] < key) i++;

      if (i < node.keys.length && node.keys[i] === key) {
        node.values[i] = value;
        this._size--;
        return null;
      }

      node.keys.splice(i, 0, key);
      node.values.splice(i, 0, value);

      if (node.keys.length >= this.order) {
        return this.splitLeaf(node);
      }
      return null;
    }

    let i = 0;
    while (i < node.keys.length && key >= node.keys[i]) i++;

    const result = this.insertInto(node.children[i], key, value);
    if (result) {
      node.keys.splice(i, 0, result.key);
      node.children.splice(i + 1, 0, result.node);

      if (node.keys.length >= this.order) {
        return this.splitInternal(node);
      }
    }
    return null;
  }

  private splitLeaf(node: BPlusNode<K, V>): { key: K; node: BPlusNode<K, V> } {
    const mid = Math.ceil(node.keys.length / 2);
    const newLeaf = this.createLeaf();
    newLeaf.keys = node.keys.splice(mid);
    newLeaf.values = node.values.splice(mid);
    newLeaf.next = node.next;
    node.next = newLeaf;
    return { key: newLeaf.keys[0], node: newLeaf };
  }

  private splitInternal(node: BPlusNode<K, V>): { key: K; node: BPlusNode<K, V> } {
    const mid = Math.floor(node.keys.length / 2);
    const upKey = node.keys[mid];
    const newInternal = this.createInternal();
    newInternal.keys = node.keys.splice(mid + 1);
    newInternal.children = node.children.splice(mid + 1);
    node.keys.pop();
    return { key: upKey, node: newInternal };
  }

  search(key: K): V | null {
    let node = this.root;
    while (!node.isLeaf) {
      let i = 0;
      while (i < node.keys.length && key >= node.keys[i]) i++;
      node = node.children[i];
    }

    for (let i = 0; i < node.keys.length; i++) {
      if (node.keys[i] === key) return node.values[i];
    }
    return null;
  }

  range(low: K, high: K): Array<{ key: K; value: V }> {
    const results: Array<{ key: K; value: V }> = [];
    let node = this.root;
    while (!node.isLeaf) {
      let i = 0;
      while (i < node.keys.length && low >= node.keys[i]) i++;
      node = node.children[i];
    }

    let current: BPlusNode<K, V> | null = node;
    while (current) {
      for (let i = 0; i < current.keys.length; i++) {
        if (current.keys[i] >= low && current.keys[i] <= high) {
          results.push({ key: current.keys[i], value: current.values[i] });
        }
        if (current.keys[i] > high) return results;
      }
      current = current.next;
    }

    return results;
  }

  min(): { key: K; value: V } | null {
    let node = this.root;
    while (!node.isLeaf) node = node.children[0];
    if (node.keys.length === 0) return null;
    return { key: node.keys[0], value: node.values[0] };
  }

  max(): { key: K; value: V } | null {
    let node = this.root;
    while (!node.isLeaf) node = node.children[node.children.length - 1];
    if (node.keys.length === 0) return null;
    return { key: node.keys[node.keys.length - 1], value: node.values[node.values.length - 1] };
  }

  all(): Array<{ key: K; value: V }> {
    const results: Array<{ key: K; value: V }> = [];
    let node = this.root;
    while (!node.isLeaf) node = node.children[0];

    let current: BPlusNode<K, V> | null = node;
    while (current) {
      for (let i = 0; i < current.keys.length; i++) {
        results.push({ key: current.keys[i], value: current.values[i] });
      }
      current = current.next;
    }
    return results;
  }

  get size(): number {
    return this._size;
  }

  get height(): number {
    let h = 1;
    let node = this.root;
    while (!node.isLeaf) {
      h++;
      node = node.children[0];
    }
    return h;
  }
}
