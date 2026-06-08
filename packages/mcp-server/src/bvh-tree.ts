export interface AABB2D {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface BVHItem {
  id: number;
  bounds: AABB2D;
}

interface BVHNode {
  bounds: AABB2D;
  left: BVHNode | null;
  right: BVHNode | null;
  items: BVHItem[];
}

export class BVHTree {
  root: BVHNode | null = null;

  static combineBounds(a: AABB2D, b: AABB2D): AABB2D {
    return {
      minX: Math.min(a.minX, b.minX),
      minY: Math.min(a.minY, b.minY),
      maxX: Math.max(a.maxX, b.maxX),
      maxY: Math.max(a.maxY, b.maxY),
    };
  }

  static boundsOverlap(a: AABB2D, b: AABB2D): boolean {
    return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
  }

  static boundsArea(b: AABB2D): number {
    return (b.maxX - b.minX) * (b.maxY - b.minY);
  }

  static containsPoint(b: AABB2D, x: number, y: number): boolean {
    return x >= b.minX && x <= b.maxX && y >= b.minY && y <= b.maxY;
  }

  build(items: BVHItem[]): void {
    this.root = this.buildNode(items);
  }

  private buildNode(items: BVHItem[]): BVHNode {
    if (items.length <= 2) {
      let bounds = items[0].bounds;
      for (let i = 1; i < items.length; i++) {
        bounds = BVHTree.combineBounds(bounds, items[i].bounds);
      }
      return { bounds, left: null, right: null, items };
    }

    let totalBounds = items[0].bounds;
    for (let i = 1; i < items.length; i++) {
      totalBounds = BVHTree.combineBounds(totalBounds, items[i].bounds);
    }

    const xRange = totalBounds.maxX - totalBounds.minX;
    const yRange = totalBounds.maxY - totalBounds.minY;
    const axis = xRange >= yRange ? "x" : "y";

    const sorted = [...items].sort((a, b) => {
      const ca = axis === "x" ? (a.bounds.minX + a.bounds.maxX) / 2 : (a.bounds.minY + a.bounds.maxY) / 2;
      const cb = axis === "x" ? (b.bounds.minX + b.bounds.maxX) / 2 : (b.bounds.minY + b.bounds.maxY) / 2;
      return ca - cb;
    });

    const mid = Math.floor(sorted.length / 2);
    return {
      bounds: totalBounds,
      left: this.buildNode(sorted.slice(0, mid)),
      right: this.buildNode(sorted.slice(mid)),
      items: [],
    };
  }

  query(range: AABB2D): BVHItem[] {
    const results: BVHItem[] = [];
    if (this.root) this.queryNode(this.root, range, results);
    return results;
  }

  private queryNode(node: BVHNode, range: AABB2D, results: BVHItem[]): void {
    if (!BVHTree.boundsOverlap(node.bounds, range)) return;

    for (const item of node.items) {
      if (BVHTree.boundsOverlap(item.bounds, range)) {
        results.push(item);
      }
    }

    if (node.left) this.queryNode(node.left, range, results);
    if (node.right) this.queryNode(node.right, range, results);
  }

  queryPoint(x: number, y: number): BVHItem[] {
    const results: BVHItem[] = [];
    if (this.root) this.queryPointNode(this.root, x, y, results);
    return results;
  }

  private queryPointNode(node: BVHNode, x: number, y: number, results: BVHItem[]): void {
    if (!BVHTree.containsPoint(node.bounds, x, y)) return;

    for (const item of node.items) {
      if (BVHTree.containsPoint(item.bounds, x, y)) {
        results.push(item);
      }
    }

    if (node.left) this.queryPointNode(node.left, x, y, results);
    if (node.right) this.queryPointNode(node.right, x, y, results);
  }

  depth(): number {
    if (!this.root) return 0;
    return this.nodeDepth(this.root);
  }

  private nodeDepth(node: BVHNode): number {
    if (!node.left && !node.right) return 1;
    const ld = node.left ? this.nodeDepth(node.left) : 0;
    const rd = node.right ? this.nodeDepth(node.right) : 0;
    return 1 + Math.max(ld, rd);
  }
}
