interface BinomialNode<T> {
  key: number;
  value: T;
  degree: number;
  child: BinomialNode<T> | null;
  sibling: BinomialNode<T> | null;
}

export class BinomialHeap<T> {
  private head: BinomialNode<T> | null = null;
  private _size: number = 0;

  private makeNode(key: number, value: T): BinomialNode<T> {
    return { key, value, degree: 0, child: null, sibling: null };
  }

  private linkTrees(y: BinomialNode<T>, z: BinomialNode<T>): void {
    y.sibling = z.child;
    z.child = y;
    z.degree++;
  }

  private mergeHeaps(h1: BinomialNode<T> | null, h2: BinomialNode<T> | null): BinomialNode<T> | null {
    if (!h1) return h2;
    if (!h2) return h1;
    let head: BinomialNode<T>;
    let a: BinomialNode<T> | null = h1;
    let b: BinomialNode<T> | null = h2;
    if (a.degree <= b.degree) { head = a; a = a.sibling; }
    else { head = b; b = b.sibling; }
    let tail = head;
    while (a && b) {
      if (a.degree <= b.degree) { tail.sibling = a; a = a.sibling; }
      else { tail.sibling = b; b = b.sibling; }
      tail = tail.sibling!;
    }
    tail.sibling = a ?? b;
    return head;
  }

  private unionHeaps(h1: BinomialNode<T> | null, h2: BinomialNode<T> | null): BinomialNode<T> | null {
    let merged = this.mergeHeaps(h1, h2);
    if (!merged) return null;
    let prev: BinomialNode<T> | null = null;
    let curr: BinomialNode<T> | null = merged;
    let next: BinomialNode<T> | null = curr.sibling;
    while (next) {
      if (curr.degree !== next.degree || (next.sibling && next.sibling.degree === curr.degree)) {
        prev = curr;
        curr = next;
      } else if (curr.key <= next.key) {
        curr.sibling = next.sibling;
        this.linkTrees(next, curr);
      } else {
        if (!prev) merged = next;
        else prev.sibling = next;
        this.linkTrees(curr, next);
        curr = next;
      }
      next = curr.sibling;
    }
    return merged;
  }

  insert(key: number, value: T): void {
    const node = this.makeNode(key, value);
    this.head = this.unionHeaps(this.head, node);
    this._size++;
  }

  peekMin(): { key: number; value: T } | undefined {
    if (!this.head) return undefined;
    let min = this.head;
    let curr = this.head.sibling;
    while (curr) {
      if (curr.key < min.key) min = curr;
      curr = curr.sibling;
    }
    return { key: min.key, value: min.value };
  }

  extractMin(): { key: number; value: T } | undefined {
    if (!this.head) return undefined;
    let minPrev: BinomialNode<T> | null = null;
    let min = this.head;
    let prev: BinomialNode<T> | null = null;
    let curr: BinomialNode<T> | null = this.head;
    while (curr) {
      if (curr.key < min.key) { min = curr; minPrev = prev; }
      prev = curr;
      curr = curr.sibling;
    }
    if (minPrev) minPrev.sibling = min.sibling;
    else this.head = min.sibling;

    let child = min.child;
    let reversed: BinomialNode<T> | null = null;
    while (child) {
      const next = child.sibling;
      child.sibling = reversed;
      reversed = child;
      child = next;
    }
    this.head = this.unionHeaps(this.head, reversed);
    this._size--;
    return { key: min.key, value: min.value };
  }

  merge(other: BinomialHeap<T>): void {
    this.head = this.unionHeaps(this.head, other.head);
    this._size += other._size;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }
}
