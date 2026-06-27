export interface BBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface REntry<T> {
  bbox: BBox;
  data: T;
}

interface RNode<T> {
  bbox: BBox;
  children: RNode<T>[];
  entries: REntry<T>[];
  leaf: boolean;
}

export class RTreeSimple<T> {
  private root: RNode<T>;
  private readonly maxEntries: number;
  private count = 0;

  constructor(maxEntries: number = 4) {
    this.maxEntries = maxEntries;
    this.root = { bbox: { minX: 0, minY: 0, maxX: 0, maxY: 0 }, children: [], entries: [], leaf: true };
  }

  insert(bbox: BBox, data: T): void {
    const entry: REntry<T> = { bbox, data };
    this.insertEntry(this.root, entry);
    this.count++;
    this.updateBBox(this.root);
  }

  private insertEntry(node: RNode<T>, entry: REntry<T>): void {
    if (node.leaf) {
      node.entries.push(entry);
      if (node.entries.length > this.maxEntries) {
        this.splitLeaf(node);
      }
    } else {
      const best = this.chooseChild(node, entry.bbox);
      this.insertEntry(best, entry);
      this.updateBBox(node);
    }
  }

  private chooseChild(node: RNode<T>, bbox: BBox): RNode<T> {
    let bestChild = node.children[0];
    let bestEnlargement = Infinity;
    for (const child of node.children) {
      const enlarged = this.enlargement(child.bbox, bbox);
      if (enlarged < bestEnlargement) {
        bestEnlargement = enlarged;
        bestChild = child;
      }
    }
    return bestChild;
  }

  private splitLeaf(node: RNode<T>): void {
    if (node !== this.root) return;
    const entries = node.entries;
    const mid = Math.ceil(entries.length / 2);
    entries.sort((a, b) => a.bbox.minX - b.bbox.minX);
    const left: RNode<T> = { bbox: { minX: 0, minY: 0, maxX: 0, maxY: 0 }, children: [], entries: entries.slice(0, mid), leaf: true };
    const right: RNode<T> = { bbox: { minX: 0, minY: 0, maxX: 0, maxY: 0 }, children: [], entries: entries.slice(mid), leaf: true };
    this.updateBBox(left);
    this.updateBBox(right);
    node.entries = [];
    node.children = [left, right];
    node.leaf = false;
    this.updateBBox(node);
  }

  search(range: BBox): T[] {
    const results: T[] = [];
    this.searchNode(this.root, range, results);
    return results;
  }

  private searchNode(node: RNode<T>, range: BBox, results: T[]): void {
    if (!this.intersects(node.bbox, range)) return;
    if (node.leaf) {
      for (const entry of node.entries) {
        if (this.intersects(entry.bbox, range)) results.push(entry.data);
      }
    } else {
      for (const child of node.children) {
        this.searchNode(child, range, results);
      }
    }
  }

  all(): T[] {
    const results: T[] = [];
    const collect = (node: RNode<T>): void => {
      for (const e of node.entries) results.push(e.data);
      for (const c of node.children) collect(c);
    };
    collect(this.root);
    return results;
  }

  get size(): number {
    return this.count;
  }

  get bounds(): BBox {
    return { ...this.root.bbox };
  }

  private intersects(a: BBox, b: BBox): boolean {
    return a.minX <= b.maxX && a.maxX >= b.minX &&
           a.minY <= b.maxY && a.maxY >= b.minY;
  }

  private area(bbox: BBox): number {
    return (bbox.maxX - bbox.minX) * (bbox.maxY - bbox.minY);
  }

  private enlargement(a: BBox, b: BBox): number {
    const merged: BBox = {
      minX: Math.min(a.minX, b.minX),
      minY: Math.min(a.minY, b.minY),
      maxX: Math.max(a.maxX, b.maxX),
      maxY: Math.max(a.maxY, b.maxY),
    };
    return this.area(merged) - this.area(a);
  }

  private updateBBox(node: RNode<T>): void {
    const boxes: BBox[] = [];
    for (const e of node.entries) boxes.push(e.bbox);
    for (const c of node.children) boxes.push(c.bbox);
    if (boxes.length === 0) return;
    node.bbox = {
      minX: Math.min(...boxes.map((b) => b.minX)),
      minY: Math.min(...boxes.map((b) => b.minY)),
      maxX: Math.max(...boxes.map((b) => b.maxX)),
      maxY: Math.max(...boxes.map((b) => b.maxY)),
    };
  }
}
