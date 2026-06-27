export class SpatialHash<T> {
  private cells = new Map<string, Set<T>>();
  private readonly cellSize: number;
  private itemCells = new Map<T, string[]>();

  constructor(cellSize: number) {
    this.cellSize = cellSize;
  }

  insert(item: T, x: number, y: number, width: number = 0, height: number = 0): void {
    this.remove(item);
    const keys = this.getCellKeys(x, y, width, height);
    this.itemCells.set(item, keys);
    for (const key of keys) {
      if (!this.cells.has(key)) this.cells.set(key, new Set());
      this.cells.get(key)!.add(item);
    }
  }

  remove(item: T): boolean {
    const keys = this.itemCells.get(item);
    if (!keys) return false;
    for (const key of keys) {
      const cell = this.cells.get(key);
      if (cell) {
        cell.delete(item);
        if (cell.size === 0) this.cells.delete(key);
      }
    }
    this.itemCells.delete(item);
    return true;
  }

  query(x: number, y: number, width: number = 0, height: number = 0): T[] {
    const result = new Set<T>();
    const keys = this.getCellKeys(x, y, width, height);
    for (const key of keys) {
      const cell = this.cells.get(key);
      if (cell) {
        for (const item of cell) result.add(item);
      }
    }
    return [...result];
  }

  get size(): number {
    return this.itemCells.size;
  }

  clear(): void {
    this.cells.clear();
    this.itemCells.clear();
  }

  private getCellKeys(x: number, y: number, width: number, height: number): string[] {
    const minCX = Math.floor(x / this.cellSize);
    const minCY = Math.floor(y / this.cellSize);
    const maxCX = Math.floor((x + width) / this.cellSize);
    const maxCY = Math.floor((y + height) / this.cellSize);
    const keys: string[] = [];
    for (let cx = minCX; cx <= maxCX; cx++) {
      for (let cy = minCY; cy <= maxCY; cy++) {
        keys.push(`${cx}:${cy}`);
      }
    }
    return keys;
  }
}
