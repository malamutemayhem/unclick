export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Bounds3D {
  cx: number;
  cy: number;
  cz: number;
  half: number;
}

function contains(bounds: Bounds3D, point: Point3D): boolean {
  return (
    point.x >= bounds.cx - bounds.half &&
    point.x <= bounds.cx + bounds.half &&
    point.y >= bounds.cy - bounds.half &&
    point.y <= bounds.cy + bounds.half &&
    point.z >= bounds.cz - bounds.half &&
    point.z <= bounds.cz + bounds.half
  );
}

function intersects(a: Bounds3D, b: Bounds3D): boolean {
  return (
    Math.abs(a.cx - b.cx) <= a.half + b.half &&
    Math.abs(a.cy - b.cy) <= a.half + b.half &&
    Math.abs(a.cz - b.cz) <= a.half + b.half
  );
}

function dist3D(a: Point3D, b: Point3D): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export class Octree<T extends Point3D = Point3D> {
  private points: T[] = [];
  private children: Octree<T>[] | null = null;
  private capacity: number;
  private bounds: Bounds3D;

  constructor(bounds: Bounds3D, capacity = 8) {
    this.bounds = bounds;
    this.capacity = capacity;
  }

  insert(point: T): boolean {
    if (!contains(this.bounds, point)) return false;

    if (this.children === null && this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (this.children === null) this.subdivide();

    for (const child of this.children!) {
      if (child.insert(point)) return true;
    }
    return false;
  }

  private subdivide(): void {
    const { cx, cy, cz, half } = this.bounds;
    const q = half / 2;
    this.children = [
      new Octree<T>({ cx: cx - q, cy: cy - q, cz: cz - q, half: q }, this.capacity),
      new Octree<T>({ cx: cx + q, cy: cy - q, cz: cz - q, half: q }, this.capacity),
      new Octree<T>({ cx: cx - q, cy: cy + q, cz: cz - q, half: q }, this.capacity),
      new Octree<T>({ cx: cx + q, cy: cy + q, cz: cz - q, half: q }, this.capacity),
      new Octree<T>({ cx: cx - q, cy: cy - q, cz: cz + q, half: q }, this.capacity),
      new Octree<T>({ cx: cx + q, cy: cy - q, cz: cz + q, half: q }, this.capacity),
      new Octree<T>({ cx: cx - q, cy: cy + q, cz: cz + q, half: q }, this.capacity),
      new Octree<T>({ cx: cx + q, cy: cy + q, cz: cz + q, half: q }, this.capacity),
    ];
    for (const p of this.points) {
      for (const child of this.children) {
        if (child.insert(p)) break;
      }
    }
    this.points = [];
  }

  query(range: Bounds3D): T[] {
    const found: T[] = [];
    if (!intersects(this.bounds, range)) return found;

    for (const p of this.points) {
      if (contains(range, p)) found.push(p);
    }

    if (this.children) {
      for (const child of this.children) {
        found.push(...child.query(range));
      }
    }

    return found;
  }

  nearest(target: Point3D): T | undefined {
    let best: T | undefined;
    let bestDist = Infinity;

    const search = (node: Octree<T>) => {
      for (const p of node.points) {
        const d = dist3D(target, p);
        if (d < bestDist) {
          bestDist = d;
          best = p;
        }
      }
      if (node.children) {
        const sorted = [...node.children].sort(
          (a, b) => dist3D(target, { x: a.bounds.cx, y: a.bounds.cy, z: a.bounds.cz }) -
            dist3D(target, { x: b.bounds.cx, y: b.bounds.cy, z: b.bounds.cz }),
        );
        for (const child of sorted) {
          const closest =
            Math.max(0, Math.abs(target.x - child.bounds.cx) - child.bounds.half) ** 2 +
            Math.max(0, Math.abs(target.y - child.bounds.cy) - child.bounds.half) ** 2 +
            Math.max(0, Math.abs(target.z - child.bounds.cz) - child.bounds.half) ** 2;
          if (Math.sqrt(closest) < bestDist) {
            search(child);
          }
        }
      }
    };

    search(this);
    return best;
  }

  size(): number {
    let count = this.points.length;
    if (this.children) {
      for (const child of this.children) {
        count += child.size();
      }
    }
    return count;
  }
}
