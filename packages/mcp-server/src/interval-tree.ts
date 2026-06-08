export interface Interval {
  low: number;
  high: number;
}

interface Node<T> {
  interval: Interval;
  value: T;
  max: number;
  left: Node<T> | null;
  right: Node<T> | null;
}

export class IntervalTree<T> {
  private root: Node<T> | null = null;
  private _size = 0;

  get size(): number {
    return this._size;
  }

  insert(interval: Interval, value: T): void {
    this.root = this.insertNode(this.root, interval, value);
    this._size++;
  }

  search(point: number): Array<{ interval: Interval; value: T }> {
    const results: Array<{ interval: Interval; value: T }> = [];
    this.searchPoint(this.root, point, results);
    return results;
  }

  overlap(query: Interval): Array<{ interval: Interval; value: T }> {
    const results: Array<{ interval: Interval; value: T }> = [];
    this.searchOverlap(this.root, query, results);
    return results;
  }

  all(): Array<{ interval: Interval; value: T }> {
    const results: Array<{ interval: Interval; value: T }> = [];
    this.inOrder(this.root, results);
    return results;
  }

  private insertNode(node: Node<T> | null, interval: Interval, value: T): Node<T> {
    if (!node) {
      return { interval, value, max: interval.high, left: null, right: null };
    }
    if (interval.low <= node.interval.low) {
      node.left = this.insertNode(node.left, interval, value);
    } else {
      node.right = this.insertNode(node.right, interval, value);
    }
    if (node.max < interval.high) {
      node.max = interval.high;
    }
    return node;
  }

  private searchPoint(
    node: Node<T> | null,
    point: number,
    results: Array<{ interval: Interval; value: T }>
  ): void {
    if (!node) return;
    if (point > node.max) return;
    this.searchPoint(node.left, point, results);
    if (point >= node.interval.low && point <= node.interval.high) {
      results.push({ interval: node.interval, value: node.value });
    }
    if (point >= node.interval.low) {
      this.searchPoint(node.right, point, results);
    }
  }

  private searchOverlap(
    node: Node<T> | null,
    query: Interval,
    results: Array<{ interval: Interval; value: T }>
  ): void {
    if (!node) return;
    if (query.low > node.max) return;
    this.searchOverlap(node.left, query, results);
    if (node.interval.low <= query.high && node.interval.high >= query.low) {
      results.push({ interval: node.interval, value: node.value });
    }
    if (query.high >= node.interval.low) {
      this.searchOverlap(node.right, query, results);
    }
  }

  private inOrder(
    node: Node<T> | null,
    results: Array<{ interval: Interval; value: T }>
  ): void {
    if (!node) return;
    this.inOrder(node.left, results);
    results.push({ interval: node.interval, value: node.value });
    this.inOrder(node.right, results);
  }
}
