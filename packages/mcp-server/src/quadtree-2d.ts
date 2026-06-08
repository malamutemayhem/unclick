export interface Point2D {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface QTNode<T extends Point2D> {
  bounds: Rect;
  points: T[];
  nw: QTNode<T> | null;
  ne: QTNode<T> | null;
  sw: QTNode<T> | null;
  se: QTNode<T> | null;
  divided: boolean;
}

export class Quadtree<T extends Point2D> {
  private root: QTNode<T>;
  private readonly capacity: number;
  private count = 0;

  constructor(bounds: Rect, capacity: number = 4) {
    this.capacity = capacity;
    this.root = this.createNode(bounds);
  }

  private createNode(bounds: Rect): QTNode<T> {
    return { bounds, points: [], nw: null, ne: null, sw: null, se: null, divided: false };
  }

  insert(point: T): boolean {
    return this.insertNode(this.root, point);
  }

  private insertNode(node: QTNode<T>, point: T): boolean {
    if (!this.containsPoint(node.bounds, point)) return false;
    if (node.points.length < this.capacity && !node.divided) {
      node.points.push(point);
      this.count++;
      return true;
    }
    if (!node.divided) this.subdivide(node);
    if (this.insertNode(node.nw!, point)) return true;
    if (this.insertNode(node.ne!, point)) return true;
    if (this.insertNode(node.sw!, point)) return true;
    if (this.insertNode(node.se!, point)) return true;
    return false;
  }

  private subdivide(node: QTNode<T>): void {
    const { x, y, width, height } = node.bounds;
    const hw = width / 2;
    const hh = height / 2;
    node.nw = this.createNode({ x, y, width: hw, height: hh });
    node.ne = this.createNode({ x: x + hw, y, width: hw, height: hh });
    node.sw = this.createNode({ x, y: y + hh, width: hw, height: hh });
    node.se = this.createNode({ x: x + hw, y: y + hh, width: hw, height: hh });
    node.divided = true;
    const points = node.points;
    node.points = [];
    this.count -= points.length;
    for (const p of points) this.insertNode(node, p);
  }

  query(range: Rect): T[] {
    const found: T[] = [];
    this.queryNode(this.root, range, found);
    return found;
  }

  private queryNode(node: QTNode<T>, range: Rect, found: T[]): void {
    if (!this.intersects(node.bounds, range)) return;
    for (const p of node.points) {
      if (this.containsPoint(range, p)) found.push(p);
    }
    if (node.divided) {
      this.queryNode(node.nw!, range, found);
      this.queryNode(node.ne!, range, found);
      this.queryNode(node.sw!, range, found);
      this.queryNode(node.se!, range, found);
    }
  }

  findNearest(target: Point2D): T | null {
    let best: T | null = null;
    let bestDist = Infinity;
    const search = (node: QTNode<T>): void => {
      for (const p of node.points) {
        const d = this.dist(target, p);
        if (d < bestDist) { bestDist = d; best = p; }
      }
      if (node.divided) {
        const children = [node.nw!, node.ne!, node.sw!, node.se!];
        children.sort((a, b) => this.distToRect(target, a.bounds) - this.distToRect(target, b.bounds));
        for (const child of children) {
          if (this.distToRect(target, child.bounds) < bestDist) search(child);
        }
      }
    };
    search(this.root);
    return best;
  }

  get size(): number {
    return this.count;
  }

  clear(): void {
    this.root = this.createNode(this.root.bounds);
    this.count = 0;
  }

  private containsPoint(rect: Rect, point: Point2D): boolean {
    return point.x >= rect.x && point.x < rect.x + rect.width &&
           point.y >= rect.y && point.y < rect.y + rect.height;
  }

  private intersects(a: Rect, b: Rect): boolean {
    return !(a.x + a.width <= b.x || b.x + b.width <= a.x ||
             a.y + a.height <= b.y || b.y + b.height <= a.y);
  }

  private dist(a: Point2D, b: Point2D): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  private distToRect(p: Point2D, r: Rect): number {
    const cx = Math.max(r.x, Math.min(p.x, r.x + r.width));
    const cy = Math.max(r.y, Math.min(p.y, r.y + r.height));
    return this.dist(p, { x: cx, y: cy });
  }
}
