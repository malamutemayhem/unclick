export interface Interval {
  low: number;
  high: number;
}

interface IntervalNode<T> {
  interval: Interval;
  value: T;
  max: number;
  left: IntervalNode<T> | null;
  right: IntervalNode<T> | null;
}

export class IntervalTree<T> {
  private root: IntervalNode<T> | null = null;
  private count = 0;

  insert(interval: Interval, value: T): void {
    this.root = this.insertNode(this.root, interval, value);
    this.count++;
  }

  search(point: number): { interval: Interval; value: T }[] {
    const results: { interval: Interval; value: T }[] = [];
    this.searchNode(this.root, point, results);
    return results;
  }

  overlap(query: Interval): { interval: Interval; value: T }[] {
    const results: { interval: Interval; value: T }[] = [];
    this.overlapNode(this.root, query, results);
    return results;
  }

  get size(): number {
    return this.count;
  }

  all(): { interval: Interval; value: T }[] {
    const results: { interval: Interval; value: T }[] = [];
    this.inOrder(this.root, results);
    return results;
  }

  private insertNode(node: IntervalNode<T> | null, interval: Interval, value: T): IntervalNode<T> {
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

  private searchNode(node: IntervalNode<T> | null, point: number, results: { interval: Interval; value: T }[]): void {
    if (!node) return;
    if (point > node.max) return;

    this.searchNode(node.left, point, results);

    if (point >= node.interval.low && point <= node.interval.high) {
      results.push({ interval: node.interval, value: node.value });
    }

    if (point >= node.interval.low) {
      this.searchNode(node.right, point, results);
    }
  }

  private overlapNode(node: IntervalNode<T> | null, query: Interval, results: { interval: Interval; value: T }[]): void {
    if (!node) return;
    if (query.low > node.max) return;

    this.overlapNode(node.left, query, results);

    if (node.interval.low <= query.high && node.interval.high >= query.low) {
      results.push({ interval: node.interval, value: node.value });
    }

    if (query.high >= node.interval.low) {
      this.overlapNode(node.right, query, results);
    }
  }

  private inOrder(node: IntervalNode<T> | null, results: { interval: Interval; value: T }[]): void {
    if (!node) return;
    this.inOrder(node.left, results);
    results.push({ interval: node.interval, value: node.value });
    this.inOrder(node.right, results);
  }
}
