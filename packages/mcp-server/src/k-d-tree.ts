export interface KDPoint {
  coords: number[];
  data?: unknown;
}

interface KDNode {
  point: KDPoint;
  left: KDNode | null;
  right: KDNode | null;
  depth: number;
}

export class KDTree {
  private root: KDNode | null = null;
  private dimensions: number;
  private count = 0;

  constructor(dimensions = 2) {
    this.dimensions = dimensions;
  }

  insert(point: KDPoint): void {
    this.root = this.insertNode(this.root, point, 0);
    this.count++;
  }

  private insertNode(node: KDNode | null, point: KDPoint, depth: number): KDNode {
    if (!node) return { point, left: null, right: null, depth };
    const axis = depth % this.dimensions;
    if (point.coords[axis] < node.point.coords[axis]) {
      node.left = this.insertNode(node.left, point, depth + 1);
    } else {
      node.right = this.insertNode(node.right, point, depth + 1);
    }
    return node;
  }

  nearest(target: number[], k = 1): { point: KDPoint; distance: number }[] {
    const best: { point: KDPoint; distance: number }[] = [];
    this.nearestSearch(this.root, target, k, best);
    best.sort((a, b) => a.distance - b.distance);
    return best;
  }

  private nearestSearch(node: KDNode | null, target: number[], k: number, best: { point: KDPoint; distance: number }[]): void {
    if (!node) return;

    const dist = this.distance(node.point.coords, target);
    if (best.length < k) {
      best.push({ point: node.point, distance: dist });
      best.sort((a, b) => a.distance - b.distance);
    } else if (dist < best[best.length - 1].distance) {
      best[best.length - 1] = { point: node.point, distance: dist };
      best.sort((a, b) => a.distance - b.distance);
    }

    const axis = node.depth % this.dimensions;
    const diff = target[axis] - node.point.coords[axis];
    const nearSide = diff < 0 ? node.left : node.right;
    const farSide = diff < 0 ? node.right : node.left;

    this.nearestSearch(nearSide, target, k, best);

    if (best.length < k || Math.abs(diff) < best[best.length - 1].distance) {
      this.nearestSearch(farSide, target, k, best);
    }
  }

  rangeSearch(min: number[], max: number[]): KDPoint[] {
    const result: KDPoint[] = [];
    this.rangeSearchNode(this.root, min, max, result);
    return result;
  }

  private rangeSearchNode(node: KDNode | null, min: number[], max: number[], result: KDPoint[]): void {
    if (!node) return;

    let inside = true;
    for (let i = 0; i < this.dimensions; i++) {
      if (node.point.coords[i] < min[i] || node.point.coords[i] > max[i]) {
        inside = false;
        break;
      }
    }
    if (inside) result.push(node.point);

    const axis = node.depth % this.dimensions;
    if (min[axis] <= node.point.coords[axis]) {
      this.rangeSearchNode(node.left, min, max, result);
    }
    if (max[axis] >= node.point.coords[axis]) {
      this.rangeSearchNode(node.right, min, max, result);
    }
  }

  private distance(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < this.dimensions; i++) {
      const d = a[i] - b[i];
      sum += d * d;
    }
    return Math.sqrt(sum);
  }

  buildBalanced(points: KDPoint[]): void {
    this.count = points.length;
    this.root = this.buildBalancedNode([...points], 0);
  }

  private buildBalancedNode(points: KDPoint[], depth: number): KDNode | null {
    if (points.length === 0) return null;
    const axis = depth % this.dimensions;
    points.sort((a, b) => a.coords[axis] - b.coords[axis]);
    const mid = Math.floor(points.length / 2);
    return {
      point: points[mid],
      left: this.buildBalancedNode(points.slice(0, mid), depth + 1),
      right: this.buildBalancedNode(points.slice(mid + 1), depth + 1),
      depth,
    };
  }

  get size(): number { return this.count; }

  height(): number {
    return this.nodeHeight(this.root);
  }

  private nodeHeight(node: KDNode | null): number {
    if (!node) return 0;
    return 1 + Math.max(this.nodeHeight(node.left), this.nodeHeight(node.right));
  }
}
