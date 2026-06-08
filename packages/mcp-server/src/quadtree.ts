export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function rectContains(rect: Rect, p: Point): boolean {
  return (
    p.x >= rect.x &&
    p.x < rect.x + rect.width &&
    p.y >= rect.y &&
    p.y < rect.y + rect.height
  );
}

function rectsIntersect(a: Rect, b: Rect): boolean {
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  );
}

export class QuadTree<T extends Point = Point> {
  private points: T[] = [];
  private divided = false;
  private nw?: QuadTree<T>;
  private ne?: QuadTree<T>;
  private sw?: QuadTree<T>;
  private se?: QuadTree<T>;

  constructor(
    private boundary: Rect,
    private capacity = 4
  ) {}

  get size(): number {
    let count = this.points.length;
    if (this.divided) {
      count += this.nw!.size + this.ne!.size + this.sw!.size + this.se!.size;
    }
    return count;
  }

  insert(point: T): boolean {
    if (!rectContains(this.boundary, point)) return false;
    if (this.points.length < this.capacity && !this.divided) {
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

  query(range: Rect): T[] {
    const found: T[] = [];
    this._query(range, found);
    return found;
  }

  all(): T[] {
    return this.query(this.boundary);
  }

  private _query(range: Rect, found: T[]): void {
    if (!rectsIntersect(this.boundary, range)) return;
    for (const p of this.points) {
      if (rectContains(range, p)) found.push(p);
    }
    if (this.divided) {
      this.nw!._query(range, found);
      this.ne!._query(range, found);
      this.sw!._query(range, found);
      this.se!._query(range, found);
    }
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

    const existing = this.points.splice(0);
    for (const p of existing) {
      this.nw.insert(p) || this.ne.insert(p) || this.sw.insert(p) || this.se.insert(p);
    }
  }
}
