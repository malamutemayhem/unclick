interface PairingNode<T> {
  key: number;
  value: T;
  child: PairingNode<T> | null;
  sibling: PairingNode<T> | null;
}

export class PairingHeap<T> {
  private root: PairingNode<T> | null = null;
  private _size = 0;

  private makeNode(key: number, value: T): PairingNode<T> {
    return { key, value, child: null, sibling: null };
  }

  private meld(a: PairingNode<T> | null, b: PairingNode<T> | null): PairingNode<T> | null {
    if (!a) return b;
    if (!b) return a;
    if (a.key <= b.key) {
      b.sibling = a.child;
      a.child = b;
      a.sibling = null;
      return a;
    }
    a.sibling = b.child;
    b.child = a;
    b.sibling = null;
    return b;
  }

  private mergePairs(node: PairingNode<T> | null): PairingNode<T> | null {
    if (!node || !node.sibling) return node;
    const a = node;
    const b = node.sibling;
    const rest = b.sibling;
    a.sibling = null;
    b.sibling = null;
    return this.meld(this.meld(a, b), this.mergePairs(rest));
  }

  insert(key: number, value: T): void {
    this.root = this.meld(this.root, this.makeNode(key, value));
    this._size++;
  }

  peekMin(): { key: number; value: T } | undefined {
    if (!this.root) return undefined;
    return { key: this.root.key, value: this.root.value };
  }

  extractMin(): { key: number; value: T } | undefined {
    if (!this.root) return undefined;
    const min = this.root;
    this.root = this.mergePairs(min.child);
    this._size--;
    return { key: min.key, value: min.value };
  }

  merge(other: PairingHeap<T>): void {
    this.root = this.meld(this.root, other.root);
    this._size += other._size;
    other.root = null;
    other._size = 0;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  toSortedArray(): { key: number; value: T }[] {
    const result: { key: number; value: T }[] = [];
    const copy = new PairingHeap<T>();
    copy.root = this.cloneTree(this.root);
    copy._size = this._size;
    while (!copy.isEmpty()) {
      result.push(copy.extractMin()!);
    }
    return result;
  }

  private cloneTree(node: PairingNode<T> | null): PairingNode<T> | null {
    if (!node) return null;
    return {
      key: node.key,
      value: node.value,
      child: this.cloneTree(node.child),
      sibling: this.cloneTree(node.sibling),
    };
  }
}
