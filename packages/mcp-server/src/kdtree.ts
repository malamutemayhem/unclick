export type Point = number[];

interface KDNode {
  point: Point;
  data: unknown;
  left: KDNode | null;
  right: KDNode | null;
  axis: number;
}

export class KDTree {
  private root: KDNode | null = null;
  private dimensions: number;
  private _size = 0;

  constructor(dimensions: number) {
    this.dimensions = dimensions;
  }

  get size(): number {
    return this._size;
  }

  insert(point: Point, data?: unknown): void {
    this.root = this.insertNode(this.root, point, data, 0);
    this._size++;
  }

  nearest(target: Point, k = 1): { point: Point; distance: number; data: unknown }[] {
    const best: { point: Point; distance: number; data: unknown }[] = [];

    const search = (node: KDNode | null): void => {
      if (!node) return;

      const dist = this.squaredDistance(target, node.point);

      if (best.length < k) {
        best.push({ point: node.point, distance: dist, data: node.data });
        best.sort((a, b) => b.distance - a.distance);
      } else if (dist < best[0].distance) {
        best[0] = { point: node.point, distance: dist, data: node.data };
        best.sort((a, b) => b.distance - a.distance);
      }

      const axis = node.axis;
      const diff = target[axis] - node.point[axis];
      const near = diff <= 0 ? node.left : node.right;
      const far = diff <= 0 ? node.right : node.left;

      search(near);
      if (best.length < k || diff * diff < best[0].distance) {
        search(far);
      }
    };

    search(this.root);
    return best.reverse().map((b) => ({
      ...b,
      distance: Math.sqrt(b.distance),
    }));
  }

  rangeSearch(min: Point, max: Point): { point: Point; data: unknown }[] {
    const results: { point: Point; data: unknown }[] = [];

    const search = (node: KDNode | null): void => {
      if (!node) return;

      let inside = true;
      for (let d = 0; d < this.dimensions; d++) {
        if (node.point[d] < min[d] || node.point[d] > max[d]) {
          inside = false;
          break;
        }
      }
      if (inside) results.push({ point: node.point, data: node.data });

      const axis = node.axis;
      if (min[axis] <= node.point[axis]) search(node.left);
      if (max[axis] >= node.point[axis]) search(node.right);
    };

    search(this.root);
    return results;
  }

  static fromPoints(points: Point[], dimensions: number): KDTree {
    const tree = new KDTree(dimensions);
    for (const p of points) tree.insert(p);
    return tree;
  }

  private insertNode(node: KDNode | null, point: Point, data: unknown, depth: number): KDNode {
    if (!node) {
      return {
        point,
        data,
        left: null,
        right: null,
        axis: depth % this.dimensions,
      };
    }

    const axis = node.axis;
    if (point[axis] <= node.point[axis]) {
      node.left = this.insertNode(node.left, point, data, depth + 1);
    } else {
      node.right = this.insertNode(node.right, point, data, depth + 1);
    }
    return node;
  }

  private squaredDistance(a: Point, b: Point): number {
    let sum = 0;
    for (let i = 0; i < this.dimensions; i++) {
      const d = a[i] - b[i];
      sum += d * d;
    }
    return sum;
  }
}
