export interface SpatialItem {
  x: number;
  y: number;
}

export class SpatialHash<T extends SpatialItem> {
  private cells = new Map<string, T[]>();
  private _size = 0;

  constructor(private cellSize: number) {}

  get size(): number {
    return this._size;
  }

  insert(item: T): void {
    const key = this.key(item.x, item.y);
    let cell = this.cells.get(key);
    if (!cell) {
      cell = [];
      this.cells.set(key, cell);
    }
    cell.push(item);
    this._size++;
  }

  query(x: number, y: number, radius: number): T[] {
    const results: T[] = [];
    const r2 = radius * radius;
    const minCX = Math.floor((x - radius) / this.cellSize);
    const maxCX = Math.floor((x + radius) / this.cellSize);
    const minCY = Math.floor((y - radius) / this.cellSize);
    const maxCY = Math.floor((y + radius) / this.cellSize);

    for (let cx = minCX; cx <= maxCX; cx++) {
      for (let cy = minCY; cy <= maxCY; cy++) {
        const cell = this.cells.get(`${cx},${cy}`);
        if (!cell) continue;
        for (const item of cell) {
          const dx = item.x - x;
          const dy = item.y - y;
          if (dx * dx + dy * dy <= r2) {
            results.push(item);
          }
        }
      }
    }
    return results;
  }

  queryRect(x: number, y: number, width: number, height: number): T[] {
    const results: T[] = [];
    const minCX = Math.floor(x / this.cellSize);
    const maxCX = Math.floor((x + width) / this.cellSize);
    const minCY = Math.floor(y / this.cellSize);
    const maxCY = Math.floor((y + height) / this.cellSize);

    for (let cx = minCX; cx <= maxCX; cx++) {
      for (let cy = minCY; cy <= maxCY; cy++) {
        const cell = this.cells.get(`${cx},${cy}`);
        if (!cell) continue;
        for (const item of cell) {
          if (item.x >= x && item.x <= x + width && item.y >= y && item.y <= y + height) {
            results.push(item);
          }
        }
      }
    }
    return results;
  }

  clear(): void {
    this.cells.clear();
    this._size = 0;
  }

  private key(x: number, y: number): string {
    return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
  }
}
