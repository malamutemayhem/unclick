type Interval = { low: number; high: number };

interface IntervalNode {
  interval: Interval;
  max: number;
  left: IntervalNode | null;
  right: IntervalNode | null;
}

export class IntervalTree {
  private root: IntervalNode | null = null;
  private count = 0;

  insert(low: number, high: number): void {
    this.root = this.insertNode(this.root, { low, high });
    this.count++;
  }

  private insertNode(node: IntervalNode | null, interval: Interval): IntervalNode {
    if (!node) return { interval, max: interval.high, left: null, right: null };
    if (interval.low < node.interval.low) {
      node.left = this.insertNode(node.left, interval);
    } else {
      node.right = this.insertNode(node.right, interval);
    }
    if (node.max < interval.high) node.max = interval.high;
    return node;
  }

  query(low: number, high: number): Array<{ low: number; high: number }> {
    const results: Array<{ low: number; high: number }> = [];
    this.queryNode(this.root, { low, high }, results);
    return results;
  }

  private queryNode(node: IntervalNode | null, interval: Interval, results: Array<{ low: number; high: number }>): void {
    if (!node) return;
    if (node.interval.low <= interval.high && interval.low <= node.interval.high) {
      results.push({ low: node.interval.low, high: node.interval.high });
    }
    if (node.left && node.left.max >= interval.low) {
      this.queryNode(node.left, interval, results);
    }
    if (node.right && node.interval.low <= interval.high) {
      this.queryNode(node.right, interval, results);
    }
  }

  contains(point: number): Array<{ low: number; high: number }> {
    return this.query(point, point);
  }

  get size(): number {
    return this.count;
  }

  toArray(): Array<{ low: number; high: number }> {
    const results: Array<{ low: number; high: number }> = [];
    this.inorder(this.root, results);
    return results;
  }

  private inorder(node: IntervalNode | null, results: Array<{ low: number; high: number }>): void {
    if (!node) return;
    this.inorder(node.left, results);
    results.push({ low: node.interval.low, high: node.interval.high });
    this.inorder(node.right, results);
  }
}
