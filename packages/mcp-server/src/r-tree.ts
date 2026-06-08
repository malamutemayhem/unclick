export interface RTreeRect {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface RTreeEntry<T> {
  rect: RTreeRect;
  data: T;
}

interface RTreeNode<T> {
  rect: RTreeRect;
  children: RTreeNode<T>[];
  entries: RTreeEntry<T>[];
  leaf: boolean;
}

export class RTree<T> {
  private root: RTreeNode<T>;
  private maxEntries: number;
  private _size: number = 0;

  constructor(maxEntries: number = 9) {
    this.maxEntries = maxEntries;
    this.root = this.createLeaf();
  }

  private createLeaf(): RTreeNode<T> {
    return { rect: { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }, children: [], entries: [], leaf: true };
  }

  insert(rect: RTreeRect, data: T): void {
    const split = this.insertEntry(this.root, { rect, data });
    if (split) {
      const newRoot: RTreeNode<T> = {
        rect: this.combinedRect(this.root.rect, split.rect),
        children: [this.root, split],
        entries: [],
        leaf: false,
      };
      this.root = newRoot;
    }
    this._size++;
  }

  private insertEntry(node: RTreeNode<T>, entry: RTreeEntry<T>): RTreeNode<T> | null {
    this.expandRect(node.rect, entry.rect);
    if (node.leaf) {
      node.entries.push(entry);
      if (node.entries.length > this.maxEntries) {
        return this.splitLeaf(node);
      }
      return null;
    }
    let best = node.children[0];
    let bestCost = Infinity;
    for (const child of node.children) {
      const cost = this.enlargement(child.rect, entry.rect);
      if (cost < bestCost) {
        bestCost = cost;
        best = child;
      }
    }
    const split = this.insertEntry(best, entry);
    if (split) {
      node.children.push(split);
      this.expandRect(node.rect, split.rect);
      if (node.children.length > this.maxEntries) {
        return this.splitInternal(node);
      }
    }
    return null;
  }

  private splitLeaf(node: RTreeNode<T>): RTreeNode<T> {
    node.entries.sort((a, b) => a.rect.minX - b.rect.minX);
    const half = Math.ceil(node.entries.length / 2);
    const moved = node.entries.splice(half);
    node.rect = this.computeRect(node.entries.map((e) => e.rect));
    const sibling: RTreeNode<T> = {
      rect: this.computeRect(moved.map((e) => e.rect)),
      children: [],
      entries: moved,
      leaf: true,
    };
    return sibling;
  }

  private splitInternal(node: RTreeNode<T>): RTreeNode<T> {
    node.children.sort((a, b) => a.rect.minX - b.rect.minX);
    const half = Math.ceil(node.children.length / 2);
    const moved = node.children.splice(half);
    node.rect = this.computeRect(node.children.map((c) => c.rect));
    const sibling: RTreeNode<T> = {
      rect: this.computeRect(moved.map((c) => c.rect)),
      children: moved,
      entries: [],
      leaf: false,
    };
    return sibling;
  }

  private enlargement(r: RTreeRect, addition: RTreeRect): number {
    const expanded = this.combinedRect(r, addition);
    return this.area(expanded) - this.area(r);
  }

  private area(r: RTreeRect): number {
    return (r.maxX - r.minX) * (r.maxY - r.minY);
  }

  private combinedRect(a: RTreeRect, b: RTreeRect): RTreeRect {
    return {
      minX: Math.min(a.minX, b.minX),
      minY: Math.min(a.minY, b.minY),
      maxX: Math.max(a.maxX, b.maxX),
      maxY: Math.max(a.maxY, b.maxY),
    };
  }

  private expandRect(target: RTreeRect, source: RTreeRect): void {
    target.minX = Math.min(target.minX, source.minX);
    target.minY = Math.min(target.minY, source.minY);
    target.maxX = Math.max(target.maxX, source.maxX);
    target.maxY = Math.max(target.maxY, source.maxY);
  }

  private computeRect(rects: RTreeRect[]): RTreeRect {
    const r: RTreeRect = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    for (const rect of rects) this.expandRect(r, rect);
    return r;
  }

  search(rect: RTreeRect): RTreeEntry<T>[] {
    const results: RTreeEntry<T>[] = [];
    this._search(this.root, rect, results);
    return results;
  }

  private _search(node: RTreeNode<T>, rect: RTreeRect, results: RTreeEntry<T>[]): void {
    if (!this.intersects(node.rect, rect)) return;
    if (node.leaf) {
      for (const entry of node.entries) {
        if (this.intersects(entry.rect, rect)) {
          results.push(entry);
        }
      }
    } else {
      for (const child of node.children) {
        this._search(child, rect, results);
      }
    }
  }

  private intersects(a: RTreeRect, b: RTreeRect): boolean {
    return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
  }

  size(): number {
    return this._size;
  }

  all(): RTreeEntry<T>[] {
    const results: RTreeEntry<T>[] = [];
    this._all(this.root, results);
    return results;
  }

  private _all(node: RTreeNode<T>, results: RTreeEntry<T>[]): void {
    if (node.leaf) {
      results.push(...node.entries);
    } else {
      for (const child of node.children) this._all(child, results);
    }
  }

  bounds(): RTreeRect {
    return { ...this.root.rect };
  }
}
