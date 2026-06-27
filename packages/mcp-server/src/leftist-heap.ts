interface LeftistNode<T> {
  key: number;
  value: T;
  rank: number;
  left: LeftistNode<T> | null;
  right: LeftistNode<T> | null;
}

export class LeftistHeap<T> {
  private root: LeftistNode<T> | null = null;
  private _size: number = 0;

  private makeNode(key: number, value: T): LeftistNode<T> {
    return { key, value, rank: 1, left: null, right: null };
  }

  private mergeNodes(a: LeftistNode<T> | null, b: LeftistNode<T> | null): LeftistNode<T> | null {
    if (!a) return b;
    if (!b) return a;
    if (a.key > b.key) [a, b] = [b, a];
    a.right = this.mergeNodes(a.right, b);
    if (!a.left || (a.right && a.right.rank > a.left.rank)) {
      [a.left, a.right] = [a.right, a.left];
    }
    a.rank = (a.right?.rank ?? 0) + 1;
    return a;
  }

  insert(key: number, value: T): void {
    const node = this.makeNode(key, value);
    this.root = this.mergeNodes(this.root, node);
    this._size++;
  }

  peekMin(): { key: number; value: T } | undefined {
    if (!this.root) return undefined;
    return { key: this.root.key, value: this.root.value };
  }

  extractMin(): { key: number; value: T } | undefined {
    if (!this.root) return undefined;
    const { key, value } = this.root;
    this.root = this.mergeNodes(this.root.left, this.root.right);
    this._size--;
    return { key, value };
  }

  merge(other: LeftistHeap<T>): LeftistHeap<T> {
    const result = new LeftistHeap<T>();
    result.root = this.mergeNodes(this.root, other.root);
    result._size = this._size + other._size;
    return result;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  toSortedArray(): { key: number; value: T }[] {
    const result: { key: number; value: T }[] = [];
    const copy = new LeftistHeap<T>();
    copy.root = this.cloneNode(this.root);
    copy._size = this._size;
    while (!copy.isEmpty()) {
      result.push(copy.extractMin()!);
    }
    return result;
  }

  private cloneNode(node: LeftistNode<T> | null): LeftistNode<T> | null {
    if (!node) return null;
    return {
      key: node.key,
      value: node.value,
      rank: node.rank,
      left: this.cloneNode(node.left),
      right: this.cloneNode(node.right),
    };
  }
}
