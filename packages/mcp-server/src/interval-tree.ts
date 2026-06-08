export interface Interval {
  start: number;
  end: number;
}

interface Node {
  center: number;
  left: Node | null;
  right: Node | null;
  intervals: Interval[];
}

export class IntervalTree {
  private root: Node | null = null;
  private count = 0;

  insert(interval: Interval): void {
    if (interval.start > interval.end) throw new Error("Invalid interval");
    this.root = this.insertNode(this.root, interval);
    this.count++;
  }

  query(point: number): Interval[] {
    return this.queryNode(this.root, point);
  }

  overlapping(interval: Interval): Interval[] {
    const results: Interval[] = [];
    this.overlapSearch(this.root, interval, results);
    return results;
  }

  get size(): number { return this.count; }

  all(): Interval[] {
    const result: Interval[] = [];
    this.collectAll(this.root, result);
    return result;
  }

  private insertNode(node: Node | null, interval: Interval): Node {
    if (!node) {
      return { center: (interval.start + interval.end) / 2, left: null, right: null, intervals: [interval] };
    }
    if (interval.end < node.center) {
      node.left = this.insertNode(node.left, interval);
    } else if (interval.start > node.center) {
      node.right = this.insertNode(node.right, interval);
    } else {
      node.intervals.push(interval);
    }
    return node;
  }

  private queryNode(node: Node | null, point: number): Interval[] {
    if (!node) return [];
    const results: Interval[] = [];
    for (const iv of node.intervals) {
      if (point >= iv.start && point <= iv.end) results.push(iv);
    }
    if (point < node.center) results.push(...this.queryNode(node.left, point));
    else if (point > node.center) results.push(...this.queryNode(node.right, point));
    else {
      results.push(...this.queryNode(node.left, point));
      results.push(...this.queryNode(node.right, point));
    }
    return results;
  }

  private overlapSearch(node: Node | null, interval: Interval, results: Interval[]): void {
    if (!node) return;
    for (const iv of node.intervals) {
      if (iv.start <= interval.end && interval.start <= iv.end) results.push(iv);
    }
    if (node.left && interval.start <= node.center) this.overlapSearch(node.left, interval, results);
    if (node.right && interval.end >= node.center) this.overlapSearch(node.right, interval, results);
  }

  private collectAll(node: Node | null, result: Interval[]): void {
    if (!node) return;
    result.push(...node.intervals);
    this.collectAll(node.left, result);
    this.collectAll(node.right, result);
  }
}
