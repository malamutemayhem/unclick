export interface Point {
  x: number;
  y: number;
  data?: unknown;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class QuadTree {
  private boundary: Rect;
  private capacity: number;
  private points: Point[] = [];
  private divided = false;
  private nw: QuadTree | null = null;
  private ne: QuadTree | null = null;
  private sw: QuadTree | null = null;
  private se: QuadTree | null = null;
  private pointCount = 0;

  constructor(boundary: Rect, capacity = 4) {
    this.boundary = boundary;
    this.capacity = capacity;
  }

  insert(point: Point): boolean {
    if (!this.contains(this.boundary, point)) return false;

    if (this.points.length < this.capacity && !this.divided) {
      this.points.push(point);
      this.pointCount++;
      return true;
    }

    if (!this.divided) this.subdivide();

    if (this.nw!.insert(point) || this.ne!.insert(point) ||
        this.sw!.insert(point) || this.se!.insert(point)) {
      this.pointCount++;
      return true;
    }

    return false;
  }

  query(range: Rect): Point[] {
    const found: Point[] = [];
    if (!this.intersects(this.boundary, range)) return found;

    for (const p of this.points) {
      if (this.contains(range, p)) found.push(p);
    }

    if (this.divided) {
      found.push(...this.nw!.query(range));
      found.push(...this.ne!.query(range));
      found.push(...this.sw!.query(range));
      found.push(...this.se!.query(range));
    }

    return found;
  }

  queryRadius(cx: number, cy: number, radius: number): Point[] {
    const range: Rect = {
      x: cx - radius,
      y: cy - radius,
      width: radius * 2,
      height: radius * 2,
    };
    const candidates = this.query(range);
    const r2 = radius * radius;
    return candidates.filter((p) => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      return dx * dx + dy * dy <= r2;
    });
  }

  nearest(x: number, y: number): Point | null {
    let best: Point | null = null;
    let bestDist = Infinity;
    this.nearestHelper(x, y, (p, d) => {
      if (d < bestDist) {
        bestDist = d;
        best = p;
      }
    });
    return best;
  }

  private nearestHelper(x: number, y: number, callback: (p: Point, dist: number) => void): void {
    for (const p of this.points) {
      const dx = p.x - x;
      const dy = p.y - y;
      callback(p, Math.sqrt(dx * dx + dy * dy));
    }
    if (this.divided) {
      this.nw!.nearestHelper(x, y, callback);
      this.ne!.nearestHelper(x, y, callback);
      this.sw!.nearestHelper(x, y, callback);
      this.se!.nearestHelper(x, y, callback);
    }
  }

  size(): number {
    return this.pointCount;
  }

  depth(): number {
    if (!this.divided) return 1;
    return 1 + Math.max(
      this.nw!.depth(),
      this.ne!.depth(),
      this.sw!.depth(),
      this.se!.depth()
    );
  }

  allPoints(): Point[] {
    const result = [...this.points];
    if (this.divided) {
      result.push(...this.nw!.allPoints());
      result.push(...this.ne!.allPoints());
      result.push(...this.sw!.allPoints());
      result.push(...this.se!.allPoints());
    }
    return result;
  }

  clear(): void {
    this.points = [];
    this.pointCount = 0;
    this.divided = false;
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
  }

  private subdivide(): void {
    const { x, y, width, height } = this.boundary;
    const hw = width / 2;
    const hh = height / 2;
    this.nw = new QuadTree({ x, y, width: hw, height: hh }, this.capacity);
    this.ne = new QuadTree({ x: x + hw, y, width: hw, height: hh }, this.capacity);
    this.sw = new QuadTree({ x, y: y + hh, width: hw, height: hh }, this.capacity);
    this.se = new QuadTree({ x: x + hw, y: y + hh, width: hw, height: hh }, this.capacity);
    this.divided = true;

    const existing = [...this.points];
    this.points = [];
    for (const p of existing) {
      this.nw.insert(p) || this.ne.insert(p) || this.sw.insert(p) || this.se.insert(p);
    }
  }

  private contains(rect: Rect, point: Point): boolean {
    return point.x >= rect.x && point.x < rect.x + rect.width &&
           point.y >= rect.y && point.y < rect.y + rect.height;
  }

  private intersects(a: Rect, b: Rect): boolean {
    return !(a.x + a.width <= b.x || b.x + b.width <= a.x ||
             a.y + a.height <= b.y || b.y + b.height <= a.y);
  }
}
