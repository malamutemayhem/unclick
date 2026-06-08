export interface Interval {
  start: number;
  end: number;
}

interface IntervalNode<T> {
  interval: Interval;
  data: T;
  max: number;
  left: IntervalNode<T> | null;
  right: IntervalNode<T> | null;
}

export class IntervalTree<T = unknown> {
  private root: IntervalNode<T> | null = null;
  private _size = 0;

  get size(): number { return this._size; }

  insert(interval: Interval, data: T): void {
    this.root = this.insertNode(this.root, interval, data);
    this._size++;
  }

  search(point: number): { interval: Interval; data: T }[] {
    const results: { interval: Interval; data: T }[] = [];
    this.searchNode(this.root, point, results);
    return results;
  }

  overlap(interval: Interval): { interval: Interval; data: T }[] {
    const results: { interval: Interval; data: T }[] = [];
    this.overlapNode(this.root, interval, results);
    return results;
  }

  all(): { interval: Interval; data: T }[] {
    const results: { interval: Interval; data: T }[] = [];
    this.inorder(this.root, results);
    return results;
  }

  clear(): void {
    this.root = null;
    this._size = 0;
  }

  private insertNode(node: IntervalNode<T> | null, interval: Interval, data: T): IntervalNode<T> {
    if (!node) {
      return { interval, data, max: interval.end, left: null, right: null };
    }

    if (interval.start < node.interval.start) {
      node.left = this.insertNode(node.left, interval, data);
    } else {
      node.right = this.insertNode(node.right, interval, data);
    }

    if (node.max < interval.end) node.max = interval.end;
    return node;
  }

  private searchNode(node: IntervalNode<T> | null, point: number, results: { interval: Interval; data: T }[]): void {
    if (!node) return;
    if (node.interval.start <= point && point <= node.interval.end) {
      results.push({ interval: node.interval, data: node.data });
    }
    if (node.left && node.left.max >= point) {
      this.searchNode(node.left, point, results);
    }
    if (node.interval.start <= point) {
      this.searchNode(node.right, point, results);
    }
  }

  private overlapNode(node: IntervalNode<T> | null, interval: Interval, results: { interval: Interval; data: T }[]): void {
    if (!node) return;
    if (node.interval.start <= interval.end && interval.start <= node.interval.end) {
      results.push({ interval: node.interval, data: node.data });
    }
    if (node.left && node.left.max >= interval.start) {
      this.overlapNode(node.left, interval, results);
    }
    if (node.interval.start <= interval.end) {
      this.overlapNode(node.right, interval, results);
    }
  }

  private inorder(node: IntervalNode<T> | null, results: { interval: Interval; data: T }[]): void {
    if (!node) return;
    this.inorder(node.left, results);
    results.push({ interval: node.interval, data: node.data });
    this.inorder(node.right, results);
  }
}
