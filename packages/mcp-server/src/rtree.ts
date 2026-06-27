export interface Rect {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface RTreeEntry<T> {
  rect: Rect;
  data: T;
}

interface RNode<T> {
  rect: Rect;
  children: RNode<T>[];
  entries: RTreeEntry<T>[];
  isLeaf: boolean;
}

export class RTree<T> {
  private root: RNode<T>;
  private maxEntries: number;
  private _size = 0;

  constructor(maxEntries = 4) {
    this.maxEntries = maxEntries;
    this.root = { rect: this.emptyRect(), children: [], entries: [], isLeaf: true };
  }

  insert(rect: Rect, data: T): void {
    const entry: RTreeEntry<T> = { rect: { ...rect }, data };
    const split = this.insertEntry(this.root, entry);
    if (split) {
      const newRoot: RNode<T> = {
        rect: this.emptyRect(),
        children: [this.root, split],
        entries: [],
        isLeaf: false,
      };
      this.expandRect(newRoot.rect, this.root.rect);
      this.expandRect(newRoot.rect, split.rect);
      this.root = newRoot;
    }
    this._size++;
  }

  private insertEntry(node: RNode<T>, entry: RTreeEntry<T>): RNode<T> | null {
    if (node.isLeaf) {
      node.entries.push(entry);
      this.expandRect(node.rect, entry.rect);

      if (node.entries.length > this.maxEntries) {
        return this.splitLeaf(node);
      }
      return null;
    }

    let bestChild = node.children[0];
    let bestEnlargement = Infinity;
    for (const child of node.children) {
      const enl = this.enlargement(child.rect, entry.rect);
      if (enl < bestEnlargement) {
        bestEnlargement = enl;
        bestChild = child;
      }
    }

    const split = this.insertEntry(bestChild, entry);
    this.recalcRect(node);

    if (split) {
      node.children.push(split);
      if (node.children.length > this.maxEntries) {
        return this.splitInternal(node);
      }
    }
    return null;
  }

  search(query: Rect): RTreeEntry<T>[] {
    const results: RTreeEntry<T>[] = [];
    this.searchNode(this.root, query, results);
    return results;
  }

  private searchNode(node: RNode<T>, query: Rect, results: RTreeEntry<T>[]): void {
    if (!this.intersects(node.rect, query)) return;

    if (node.isLeaf) {
      for (const entry of node.entries) {
        if (this.intersects(entry.rect, query)) {
          results.push({ rect: { ...entry.rect }, data: entry.data });
        }
      }
    } else {
      for (const child of node.children) {
        this.searchNode(child, query, results);
      }
    }
  }

  contains(point: { x: number; y: number }): RTreeEntry<T>[] {
    return this.search({
      minX: point.x,
      minY: point.y,
      maxX: point.x,
      maxY: point.y,
    });
  }

  get size(): number {
    return this._size;
  }

  get bounds(): Rect {
    return { ...this.root.rect };
  }

  all(): RTreeEntry<T>[] {
    const entries: RTreeEntry<T>[] = [];
    this.collectAll(this.root, entries);
    return entries;
  }

  private collectAll(node: RNode<T>, entries: RTreeEntry<T>[]): void {
    if (node.isLeaf) {
      for (const e of node.entries) {
        entries.push({ rect: { ...e.rect }, data: e.data });
      }
    } else {
      for (const child of node.children) {
        this.collectAll(child, entries);
      }
    }
  }

  clear(): void {
    this.root = { rect: this.emptyRect(), children: [], entries: [], isLeaf: true };
    this._size = 0;
  }

  private intersects(a: Rect, b: Rect): boolean {
    return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
  }

  private expandRect(target: Rect, source: Rect): void {
    target.minX = Math.min(target.minX, source.minX);
    target.minY = Math.min(target.minY, source.minY);
    target.maxX = Math.max(target.maxX, source.maxX);
    target.maxY = Math.max(target.maxY, source.maxY);
  }

  private enlargement(base: Rect, added: Rect): number {
    const newArea =
      (Math.max(base.maxX, added.maxX) - Math.min(base.minX, added.minX)) *
      (Math.max(base.maxY, added.maxY) - Math.min(base.minY, added.minY));
    const oldArea = (base.maxX - base.minX) * (base.maxY - base.minY);
    return newArea - oldArea;
  }

  private recalcRect(node: RNode<T>): void {
    node.rect = this.emptyRect();
    for (const child of node.children) {
      this.expandRect(node.rect, child.rect);
    }
  }

  private splitLeaf(node: RNode<T>): RNode<T> {
    const mid = Math.ceil(node.entries.length / 2);
    node.entries.sort((a, b) => a.rect.minX - b.rect.minX);
    const newNode: RNode<T> = {
      rect: this.emptyRect(),
      children: [],
      entries: node.entries.splice(mid),
      isLeaf: true,
    };
    node.rect = this.emptyRect();
    for (const e of node.entries) this.expandRect(node.rect, e.rect);
    for (const e of newNode.entries) this.expandRect(newNode.rect, e.rect);
    return newNode;
  }

  private splitInternal(node: RNode<T>): RNode<T> {
    const mid = Math.ceil(node.children.length / 2);
    node.children.sort((a, b) => a.rect.minX - b.rect.minX);
    const newNode: RNode<T> = {
      rect: this.emptyRect(),
      children: node.children.splice(mid),
      entries: [],
      isLeaf: false,
    };
    this.recalcRect(node);
    this.recalcRect(newNode);
    return newNode;
  }

  private emptyRect(): Rect {
    return { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  }
}
