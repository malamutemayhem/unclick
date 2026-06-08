interface KDNode {
  point: number[];
  left: KDNode | null;
  right: KDNode | null;
  splitDim: number;
}

export class KDTreeNN {
  private root: KDNode | null = null;
  private dims: number;
  private _size = 0;

  constructor(dims: number, points?: number[][]) {
    this.dims = dims;
    if (points && points.length > 0) {
      this.root = this.buildTree(points, 0);
      this._size = points.length;
    }
  }

  private buildTree(points: number[][], depth: number): KDNode | null {
    if (points.length === 0) return null;
    const dim = depth % this.dims;
    points.sort((a, b) => a[dim] - b[dim]);
    const mid = Math.floor(points.length / 2);
    return {
      point: points[mid],
      left: this.buildTree(points.slice(0, mid), depth + 1),
      right: this.buildTree(points.slice(mid + 1), depth + 1),
      splitDim: dim,
    };
  }

  insert(point: number[]): void {
    this.root = this.insertNode(this.root, point, 0);
    this._size++;
  }

  private insertNode(node: KDNode | null, point: number[], depth: number): KDNode {
    if (!node) {
      return { point, left: null, right: null, splitDim: depth % this.dims };
    }
    const dim = node.splitDim;
    if (point[dim] < node.point[dim]) {
      node.left = this.insertNode(node.left, point, depth + 1);
    } else {
      node.right = this.insertNode(node.right, point, depth + 1);
    }
    return node;
  }

  nearest(target: number[]): number[] | undefined {
    if (!this.root) return undefined;
    let best = this.root.point;
    let bestDist = this.dist(target, best);

    const search = (node: KDNode | null): void => {
      if (!node) return;
      const d = this.dist(target, node.point);
      if (d < bestDist) {
        bestDist = d;
        best = node.point;
      }
      const dim = node.splitDim;
      const diff = target[dim] - node.point[dim];
      const first = diff < 0 ? node.left : node.right;
      const second = diff < 0 ? node.right : node.left;
      search(first);
      if (diff * diff < bestDist) {
        search(second);
      }
    };

    search(this.root);
    return best;
  }

  kNearest(target: number[], k: number): number[][] {
    const results: { point: number[]; dist: number }[] = [];

    const search = (node: KDNode | null): void => {
      if (!node) return;
      const d = this.dist(target, node.point);
      if (results.length < k) {
        results.push({ point: node.point, dist: d });
        results.sort((a, b) => b.dist - a.dist);
      } else if (d < results[0].dist) {
        results[0] = { point: node.point, dist: d };
        results.sort((a, b) => b.dist - a.dist);
      }
      const dim = node.splitDim;
      const diff = target[dim] - node.point[dim];
      const first = diff < 0 ? node.left : node.right;
      const second = diff < 0 ? node.right : node.left;
      search(first);
      const worstDist = results.length < k ? Infinity : results[0].dist;
      if (diff * diff < worstDist) {
        search(second);
      }
    };

    search(this.root);
    return results.sort((a, b) => a.dist - b.dist).map((r) => r.point);
  }

  private dist(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < this.dims; i++) {
      const d = a[i] - b[i];
      sum += d * d;
    }
    return sum;
  }

  size(): number {
    return this._size;
  }
}
