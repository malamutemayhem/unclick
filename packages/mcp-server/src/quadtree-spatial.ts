export interface QTPoint {
  x: number;
  y: number;
}

export interface QTBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class QuadtreeSpatial {
  bounds: QTBounds;
  capacity: number;
  points: QTPoint[];
  divided: boolean;
  nw: QuadtreeSpatial | null = null;
  ne: QuadtreeSpatial | null = null;
  sw: QuadtreeSpatial | null = null;
  se: QuadtreeSpatial | null = null;

  constructor(bounds: QTBounds, capacity = 4) {
    this.bounds = bounds;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  contains(point: QTPoint): boolean {
    return (
      point.x >= this.bounds.x &&
      point.x < this.bounds.x + this.bounds.width &&
      point.y >= this.bounds.y &&
      point.y < this.bounds.y + this.bounds.height
    );
  }

  intersects(range: QTBounds): boolean {
    return !(
      range.x > this.bounds.x + this.bounds.width ||
      range.x + range.width < this.bounds.x ||
      range.y > this.bounds.y + this.bounds.height ||
      range.y + range.height < this.bounds.y
    );
  }

  subdivide(): void {
    const { x, y, width, height } = this.bounds;
    const hw = width / 2;
    const hh = height / 2;
    this.nw = new QuadtreeSpatial({ x, y, width: hw, height: hh }, this.capacity);
    this.ne = new QuadtreeSpatial({ x: x + hw, y, width: hw, height: hh }, this.capacity);
    this.sw = new QuadtreeSpatial({ x, y: y + hh, width: hw, height: hh }, this.capacity);
    this.se = new QuadtreeSpatial({ x: x + hw, y: y + hh, width: hw, height: hh }, this.capacity);
    this.divided = true;
  }

  insert(point: QTPoint): boolean {
    if (!this.contains(point)) return false;

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) this.subdivide();

    return (
      this.nw!.insert(point) ||
      this.ne!.insert(point) ||
      this.sw!.insert(point) ||
      this.se!.insert(point)
    );
  }

  query(range: QTBounds): QTPoint[] {
    const found: QTPoint[] = [];
    if (!this.intersects(range)) return found;

    for (const p of this.points) {
      if (
        p.x >= range.x && p.x < range.x + range.width &&
        p.y >= range.y && p.y < range.y + range.height
      ) {
        found.push(p);
      }
    }

    if (this.divided) {
      found.push(...this.nw!.query(range));
      found.push(...this.ne!.query(range));
      found.push(...this.sw!.query(range));
      found.push(...this.se!.query(range));
    }

    return found;
  }

  queryRadius(cx: number, cy: number, radius: number): QTPoint[] {
    const range: QTBounds = {
      x: cx - radius,
      y: cy - radius,
      width: radius * 2,
      height: radius * 2,
    };
    const candidates = this.query(range);
    const r2 = radius * radius;
    return candidates.filter(p => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      return dx * dx + dy * dy <= r2;
    });
  }

  count(): number {
    let total = this.points.length;
    if (this.divided) {
      total += this.nw!.count() + this.ne!.count() + this.sw!.count() + this.se!.count();
    }
    return total;
  }

  depth(): number {
    if (!this.divided) return 1;
    return 1 + Math.max(
      this.nw!.depth(), this.ne!.depth(), this.sw!.depth(), this.se!.depth()
    );
  }

  all(): QTPoint[] {
    const result = [...this.points];
    if (this.divided) {
      result.push(...this.nw!.all(), ...this.ne!.all(), ...this.sw!.all(), ...this.se!.all());
    }
    return result;
  }
}
