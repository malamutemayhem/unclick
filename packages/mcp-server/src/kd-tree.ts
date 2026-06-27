export interface KDPoint {
  coords: number[];
}

interface KDNode<T extends KDPoint> {
  point: T;
  left: KDNode<T> | null;
  right: KDNode<T> | null;
  depth: number;
}

export class KDTree<T extends KDPoint> {
  private root: KDNode<T> | null = null;
  private k: number;

  constructor(points: T[], dimensions: number) {
    this.k = dimensions;
    if (points.length > 0) {
      this.root = this.buildTree([...points], 0);
    }
  }

  private buildTree(points: T[], depth: number): KDNode<T> | null {
    if (points.length === 0) return null;
    const axis = depth % this.k;
    points.sort((a, b) => a.coords[axis] - b.coords[axis]);
    const mid = Math.floor(points.length / 2);
    return {
      point: points[mid],
      left: this.buildTree(points.slice(0, mid), depth + 1),
      right: this.buildTree(points.slice(mid + 1), depth + 1),
      depth,
    };
  }

  nearest(target: number[]): T | null {
    if (!this.root) return null;
    let best: { point: T; dist: number } = { point: this.root.point, dist: Infinity };
    this.searchNearest(this.root, target, best);
    return best.point;
  }

  private searchNearest(node: KDNode<T> | null, target: number[], best: { point: T; dist: number }): void {
    if (!node) return;
    const dist = this.distance(node.point.coords, target);
    if (dist < best.dist) {
      best.point = node.point;
      best.dist = dist;
    }
    const axis = node.depth % this.k;
    const diff = target[axis] - node.point.coords[axis];
    const near = diff <= 0 ? node.left : node.right;
    const far = diff <= 0 ? node.right : node.left;

    this.searchNearest(near, target, best);
    if (diff * diff < best.dist) {
      this.searchNearest(far, target, best);
    }
  }

  kNearest(target: number[], k: number): T[] {
    const results: { point: T; dist: number }[] = [];
    this.searchKNearest(this.root, target, k, results);
    results.sort((a, b) => a.dist - b.dist);
    return results.map((r) => r.point);
  }

  private searchKNearest(
    node: KDNode<T> | null,
    target: number[],
    k: number,
    results: { point: T; dist: number }[]
  ): void {
    if (!node) return;
    const dist = this.distance(node.point.coords, target);
    if (results.length < k || dist < results[results.length - 1].dist) {
      results.push({ point: node.point, dist });
      results.sort((a, b) => a.dist - b.dist);
      if (results.length > k) results.pop();
    }
    const axis = node.depth % this.k;
    const diff = target[axis] - node.point.coords[axis];
    const near = diff <= 0 ? node.left : node.right;
    const far = diff <= 0 ? node.right : node.left;

    this.searchKNearest(near, target, k, results);
    const worstDist = results.length < k ? Infinity : results[results.length - 1].dist;
    if (diff * diff < worstDist) {
      this.searchKNearest(far, target, k, results);
    }
  }

  rangeSearch(min: number[], max: number[]): T[] {
    const results: T[] = [];
    this.searchRange(this.root, min, max, results);
    return results;
  }

  private searchRange(node: KDNode<T> | null, min: number[], max: number[], results: T[]): void {
    if (!node) return;
    let inside = true;
    for (let i = 0; i < this.k; i++) {
      if (node.point.coords[i] < min[i] || node.point.coords[i] > max[i]) {
        inside = false;
        break;
      }
    }
    if (inside) results.push(node.point);

    const axis = node.depth % this.k;
    if (min[axis] <= node.point.coords[axis]) {
      this.searchRange(node.left, min, max, results);
    }
    if (max[axis] >= node.point.coords[axis]) {
      this.searchRange(node.right, min, max, results);
    }
  }

  private distance(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < this.k; i++) {
      const d = a[i] - b[i];
      sum += d * d;
    }
    return sum;
  }

  get dimensions(): number {
    return this.k;
  }
}
