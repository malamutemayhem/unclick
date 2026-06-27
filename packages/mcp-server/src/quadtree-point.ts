interface QTPoint {
  x: number;
  y: number;
}

interface QTBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

export class PointQuadtree<T extends QTPoint> {
  private points: T[] = [];
  private children: PointQuadtree<T>[] | null = null;
  private bounds: QTBounds;
  private capacity: number;

  constructor(bounds: QTBounds, capacity = 4) {
    this.bounds = bounds;
    this.capacity = capacity;
  }

  insert(point: T): boolean {
    if (!this.contains(point)) return false;
    if (!this.children && this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    if (!this.children) this.subdivide();
    for (const child of this.children!) {
      if (child.insert(point)) return true;
    }
    return false;
  }

  private subdivide(): void {
    const { x, y, w, h } = this.bounds;
    const hw = w / 2;
    const hh = h / 2;
    this.children = [
      new PointQuadtree<T>({ x, y, w: hw, h: hh }, this.capacity),
      new PointQuadtree<T>({ x: x + hw, y, w: hw, h: hh }, this.capacity),
      new PointQuadtree<T>({ x, y: y + hh, w: hw, h: hh }, this.capacity),
      new PointQuadtree<T>({ x: x + hw, y: y + hh, w: hw, h: hh }, this.capacity),
    ];
    for (const p of this.points) {
      for (const child of this.children) {
        if (child.insert(p)) break;
      }
    }
    this.points = [];
  }

  query(range: QTBounds): T[] {
    const result: T[] = [];
    if (!this.intersects(range)) return result;
    for (const p of this.points) {
      if (p.x >= range.x && p.x < range.x + range.w &&
          p.y >= range.y && p.y < range.y + range.h) {
        result.push(p);
      }
    }
    if (this.children) {
      for (const child of this.children) {
        result.push(...child.query(range));
      }
    }
    return result;
  }

  all(): T[] {
    const result = [...this.points];
    if (this.children) {
      for (const child of this.children) {
        result.push(...child.all());
      }
    }
    return result;
  }

  size(): number {
    let count = this.points.length;
    if (this.children) {
      for (const child of this.children) count += child.size();
    }
    return count;
  }

  private contains(point: QTPoint): boolean {
    return point.x >= this.bounds.x && point.x < this.bounds.x + this.bounds.w &&
           point.y >= this.bounds.y && point.y < this.bounds.y + this.bounds.h;
  }

  private intersects(range: QTBounds): boolean {
    return !(range.x >= this.bounds.x + this.bounds.w ||
             range.x + range.w <= this.bounds.x ||
             range.y >= this.bounds.y + this.bounds.h ||
             range.y + range.h <= this.bounds.y);
  }
}
