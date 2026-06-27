export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface QTItem {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

function intersects(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}

function containsPoint(r: Rect, px: number, py: number): boolean {
  return px >= r.x && px < r.x + r.width && py >= r.y && py < r.y + r.height;
}

export class QuadTreeCollision {
  private bounds: Rect;
  private items: QTItem[] = [];
  private children: QuadTreeCollision[] | null = null;
  private maxItems: number;
  private maxDepth: number;
  private depth: number;

  constructor(bounds: Rect, maxItems = 4, maxDepth = 8, depth = 0) {
    this.bounds = bounds;
    this.maxItems = maxItems;
    this.maxDepth = maxDepth;
    this.depth = depth;
  }

  insert(item: QTItem): boolean {
    if (!intersects(this.bounds, item)) return false;

    if (this.children) {
      for (const child of this.children) child.insert(item);
      return true;
    }

    this.items.push(item);
    if (this.items.length > this.maxItems && this.depth < this.maxDepth) {
      this.subdivide();
    }
    return true;
  }

  private subdivide(): void {
    const hw = this.bounds.width / 2;
    const hh = this.bounds.height / 2;
    const x = this.bounds.x;
    const y = this.bounds.y;

    this.children = [
      new QuadTreeCollision({ x, y, width: hw, height: hh }, this.maxItems, this.maxDepth, this.depth + 1),
      new QuadTreeCollision({ x: x + hw, y, width: hw, height: hh }, this.maxItems, this.maxDepth, this.depth + 1),
      new QuadTreeCollision({ x, y: y + hh, width: hw, height: hh }, this.maxItems, this.maxDepth, this.depth + 1),
      new QuadTreeCollision({ x: x + hw, y: y + hh, width: hw, height: hh }, this.maxItems, this.maxDepth, this.depth + 1),
    ];

    for (const item of this.items) {
      for (const child of this.children) child.insert(item);
    }
    this.items = [];
  }

  query(range: Rect): QTItem[] {
    const found: QTItem[] = [];
    this.queryInto(range, found, new Set());
    return found;
  }

  private queryInto(range: Rect, found: QTItem[], seen: Set<number>): void {
    if (!intersects(this.bounds, range)) return;

    for (const item of this.items) {
      if (!seen.has(item.id) && intersects(range, item)) {
        seen.add(item.id);
        found.push(item);
      }
    }

    if (this.children) {
      for (const child of this.children) child.queryInto(range, found, seen);
    }
  }

  queryPoint(px: number, py: number): QTItem[] {
    const found: QTItem[] = [];
    this.queryPointInto(px, py, found, new Set());
    return found;
  }

  private queryPointInto(px: number, py: number, found: QTItem[], seen: Set<number>): void {
    if (!containsPoint(this.bounds, px, py)) return;

    for (const item of this.items) {
      if (!seen.has(item.id) && containsPoint(item, px, py)) {
        seen.add(item.id);
        found.push(item);
      }
    }

    if (this.children) {
      for (const child of this.children) child.queryPointInto(px, py, found, seen);
    }
  }

  findCollisions(): [QTItem, QTItem][] {
    const pairs: [QTItem, QTItem][] = [];
    const seen = new Set<string>();
    this.findCollisionsInternal(pairs, seen);
    return pairs;
  }

  private findCollisionsInternal(pairs: [QTItem, QTItem][], seen: Set<string>): void {
    for (let i = 0; i < this.items.length; i++) {
      for (let j = i + 1; j < this.items.length; j++) {
        const a = this.items[i];
        const b = this.items[j];
        const key = a.id < b.id ? `${a.id}:${b.id}` : `${b.id}:${a.id}`;
        if (!seen.has(key) && intersects(a, b)) {
          seen.add(key);
          pairs.push([a, b]);
        }
      }
    }

    if (this.children) {
      for (const child of this.children) child.findCollisionsInternal(pairs, seen);
    }
  }

  clear(): void {
    this.items = [];
    this.children = null;
  }

  get totalItems(): number {
    let count = this.items.length;
    if (this.children) {
      for (const child of this.children) count += child.totalItems;
    }
    return count;
  }

  get nodeCount(): number {
    let count = 1;
    if (this.children) {
      for (const child of this.children) count += child.nodeCount;
    }
    return count;
  }
}
