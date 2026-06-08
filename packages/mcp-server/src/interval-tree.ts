export interface Interval {
  low: number;
  high: number;
}

interface IntervalNode {
  interval: Interval;
  max: number;
  left: IntervalNode | null;
  right: IntervalNode | null;
  data?: unknown;
}

export class IntervalTree<T = undefined> {
  private root: IntervalNode | null = null;
  private _size = 0;

  insert(interval: Interval, data?: T): void {
    this.root = this.insertNode(this.root, interval, data);
    this._size++;
  }

  search(point: number): Array<{ interval: Interval; data?: T }> {
    const results: Array<{ interval: Interval; data?: T }> = [];
    this.searchNode(this.root, point, results);
    return results;
  }

  overlap(query: Interval): Array<{ interval: Interval; data?: T }> {
    const results: Array<{ interval: Interval; data?: T }> = [];
    this.overlapNode(this.root, query, results);
    return results;
  }

  get size(): number {
    return this._size;
  }

  all(): Array<{ interval: Interval; data?: T }> {
    const results: Array<{ interval: Interval; data?: T }> = [];
    this.collectAll(this.root, results);
    return results;
  }

  private insertNode(node: IntervalNode | null, interval: Interval, data?: unknown): IntervalNode {
    if (node === null) {
      return { interval, max: interval.high, left: null, right: null, data };
    }
    if (interval.low < node.interval.low) {
      node.left = this.insertNode(node.left, interval, data);
    } else {
      node.right = this.insertNode(node.right, interval, data);
    }
    if (node.max < interval.high) node.max = interval.high;
    return node;
  }

  private searchNode(node: IntervalNode | null, point: number, results: Array<{ interval: Interval; data?: T }>): void {
    if (node === null) return;
    if (point > node.max) return;
    this.searchNode(node.left, point, results);
    if (node.interval.low <= point && point <= node.interval.high) {
      results.push({ interval: node.interval, data: node.data as T });
    }
    if (point >= node.interval.low) {
      this.searchNode(node.right, point, results);
    }
  }

  private overlapNode(node: IntervalNode | null, query: Interval, results: Array<{ interval: Interval; data?: T }>): void {
    if (node === null) return;
    if (query.low > node.max) return;
    this.overlapNode(node.left, query, results);
    if (node.interval.low <= query.high && query.low <= node.interval.high) {
      results.push({ interval: node.interval, data: node.data as T });
    }
    if (query.high >= node.interval.low) {
      this.overlapNode(node.right, query, results);
    }
  }

  private collectAll(node: IntervalNode | null, results: Array<{ interval: Interval; data?: T }>): void {
    if (node === null) return;
    this.collectAll(node.left, results);
    results.push({ interval: node.interval, data: node.data as T });
    this.collectAll(node.right, results);
  }
}
