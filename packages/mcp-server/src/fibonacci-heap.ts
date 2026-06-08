interface FibNode<T> {
  key: number;
  value: T;
  degree: number;
  marked: boolean;
  parent: FibNode<T> | null;
  child: FibNode<T> | null;
  left: FibNode<T>;
  right: FibNode<T>;
}

export class FibonacciHeap<T> {
  private min: FibNode<T> | null = null;
  private _size: number = 0;

  private createNode(key: number, value: T): FibNode<T> {
    const node: FibNode<T> = {
      key, value, degree: 0, marked: false,
      parent: null, child: null,
      left: null as unknown as FibNode<T>,
      right: null as unknown as FibNode<T>,
    };
    node.left = node;
    node.right = node;
    return node;
  }

  insert(key: number, value: T): void {
    const node = this.createNode(key, value);
    if (!this.min) {
      this.min = node;
    } else {
      this.addToRootList(node);
      if (node.key < this.min.key) {
        this.min = node;
      }
    }
    this._size++;
  }

  peekMin(): { key: number; value: T } | undefined {
    if (!this.min) return undefined;
    return { key: this.min.key, value: this.min.value };
  }

  extractMin(): { key: number; value: T } | undefined {
    const z = this.min;
    if (!z) return undefined;

    if (z.child) {
      let child = z.child;
      const start = child;
      do {
        const next = child.right;
        child.parent = null;
        this.addToRootList(child);
        child = next;
      } while (child !== start);
    }

    this.removeFromRootList(z);

    if (z === z.right) {
      this.min = null;
    } else {
      this.min = z.right;
      this.consolidate();
    }

    this._size--;
    return { key: z.key, value: z.value };
  }

  private addToRootList(node: FibNode<T>): void {
    if (!this.min) {
      this.min = node;
      node.left = node;
      node.right = node;
      return;
    }
    node.left = this.min;
    node.right = this.min.right;
    this.min.right.left = node;
    this.min.right = node;
  }

  private removeFromRootList(node: FibNode<T>): void {
    node.left.right = node.right;
    node.right.left = node.left;
  }

  private consolidate(): void {
    const maxDegree = Math.floor(Math.log2(this._size + 1)) + 2;
    const A: (FibNode<T> | null)[] = new Array(maxDegree).fill(null);

    const roots: FibNode<T>[] = [];
    if (this.min) {
      let curr = this.min;
      do {
        roots.push(curr);
        curr = curr.right;
      } while (curr !== this.min);
    }

    for (const w of roots) {
      let x = w;
      let d = x.degree;
      while (d < maxDegree && A[d]) {
        let y = A[d]!;
        if (x.key > y.key) [x, y] = [y, x];
        this.link(y, x);
        A[d] = null;
        d++;
      }
      if (d < maxDegree) A[d] = x;
    }

    this.min = null;
    for (const node of A) {
      if (node) {
        node.left = node;
        node.right = node;
        if (!this.min) {
          this.min = node;
        } else {
          this.addToRootList(node);
          if (node.key < this.min.key) this.min = node;
        }
      }
    }
  }

  private link(y: FibNode<T>, x: FibNode<T>): void {
    this.removeFromRootList(y);
    y.parent = x;
    if (!x.child) {
      x.child = y;
      y.left = y;
      y.right = y;
    } else {
      y.left = x.child;
      y.right = x.child.right;
      x.child.right.left = y;
      x.child.right = y;
    }
    x.degree++;
    y.marked = false;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  merge(other: FibonacciHeap<T>): void {
    if (!other.min) return;
    if (!this.min) {
      this.min = other.min;
      this._size = other._size;
      return;
    }
    const thisRight = this.min.right;
    const otherLeft = other.min.left;
    this.min.right = other.min;
    other.min.left = this.min;
    thisRight.left = otherLeft;
    otherLeft.right = thisRight;
    if (other.min.key < this.min.key) {
      this.min = other.min;
    }
    this._size += other._size;
  }
}
