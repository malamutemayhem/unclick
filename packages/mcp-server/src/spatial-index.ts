export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpatialEntry<T> {
  bounds: Rect;
  data: T;
}

function intersects(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function containsPoint(r: Rect, x: number, y: number): boolean {
  return x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height;
}

function expand(a: Rect, b: Rect): Rect {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x,
    y,
    width: Math.max(a.x + a.width, b.x + b.width) - x,
    height: Math.max(a.y + a.height, b.y + b.height) - y,
  };
}

function area(r: Rect): number {
  return r.width * r.height;
}

export class SpatialIndex<T> {
  private entries: SpatialEntry<T>[] = [];

  insert(bounds: Rect, data: T): void {
    this.entries.push({ bounds, data });
  }

  query(region: Rect): T[] {
    return this.entries
      .filter((e) => intersects(e.bounds, region))
      .map((e) => e.data);
  }

  queryPoint(x: number, y: number): T[] {
    return this.entries
      .filter((e) => containsPoint(e.bounds, x, y))
      .map((e) => e.data);
  }

  remove(data: T): boolean {
    const idx = this.entries.findIndex((e) => e.data === data);
    if (idx === -1) return false;
    this.entries.splice(idx, 1);
    return true;
  }

  nearest(x: number, y: number): T | undefined {
    let best: SpatialEntry<T> | undefined;
    let bestDist = Infinity;
    for (const entry of this.entries) {
      const cx = entry.bounds.x + entry.bounds.width / 2;
      const cy = entry.bounds.y + entry.bounds.height / 2;
      const d = Math.sqrt((cx - x) ** 2 + (cy - y) ** 2);
      if (d < bestDist) {
        bestDist = d;
        best = entry;
      }
    }
    return best?.data;
  }

  all(): SpatialEntry<T>[] {
    return [...this.entries];
  }

  size(): number {
    return this.entries.length;
  }

  clear(): void {
    this.entries = [];
  }

  bounds(): Rect | null {
    if (this.entries.length === 0) return null;
    let result = this.entries[0].bounds;
    for (let i = 1; i < this.entries.length; i++) {
      result = expand(result, this.entries[i].bounds);
    }
    return result;
  }

  kNearest(x: number, y: number, k: number): T[] {
    const withDist = this.entries.map((e) => {
      const cx = e.bounds.x + e.bounds.width / 2;
      const cy = e.bounds.y + e.bounds.height / 2;
      return { data: e.data, dist: Math.sqrt((cx - x) ** 2 + (cy - y) ** 2) };
    });
    withDist.sort((a, b) => a.dist - b.dist);
    return withDist.slice(0, k).map((e) => e.data);
  }
}

export { area as rectArea, expand as rectExpand, intersects as rectIntersects, containsPoint as rectContainsPoint };
