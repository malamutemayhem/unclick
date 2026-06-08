interface DLXNode {
  left: DLXNode;
  right: DLXNode;
  up: DLXNode;
  down: DLXNode;
  column: DLXColumn;
  row: number;
}

interface DLXColumn extends DLXNode {
  size: number;
  id: number;
}

export class DancingLinks {
  private header: DLXColumn;
  private columns: DLXColumn[];
  private solutions: number[][] = [];

  constructor(numCols: number) {
    this.header = this.makeColumn(-1);
    this.columns = [];
    let prev: DLXColumn = this.header;
    for (let i = 0; i < numCols; i++) {
      const col = this.makeColumn(i);
      col.left = prev;
      prev.right = col;
      col.right = this.header;
      this.header.left = col;
      prev = col;
      this.columns.push(col);
    }
  }

  private makeColumn(id: number): DLXColumn {
    const col = { size: 0, id } as DLXColumn;
    col.left = col;
    col.right = col;
    col.up = col;
    col.down = col;
    col.column = col;
    col.row = -1;
    return col;
  }

  addRow(rowId: number, cols: number[]): void {
    let first: DLXNode | null = null;
    let prev: DLXNode | null = null;
    for (const c of cols) {
      const col = this.columns[c];
      const node: DLXNode = {
        column: col,
        row: rowId,
      } as DLXNode;
      node.up = col.up;
      node.down = col;
      col.up.down = node;
      col.up = node;
      col.size++;
      if (!first) {
        first = node;
        node.left = node;
        node.right = node;
      } else {
        node.left = prev!;
        node.right = first;
        prev!.right = node;
        first.left = node;
      }
      prev = node;
    }
  }

  solve(maxSolutions = 1): number[][] {
    this.solutions = [];
    this.search([], maxSolutions);
    return this.solutions;
  }

  private search(partial: number[], maxSolutions: number): void {
    if (this.solutions.length >= maxSolutions) return;
    if (this.header.right === this.header) {
      this.solutions.push([...partial]);
      return;
    }
    let best = this.header.right as DLXColumn;
    let node = best.right as DLXColumn;
    while (node !== this.header) {
      if (node.size < best.size) best = node;
      node = node.right as DLXColumn;
    }
    if (best.size === 0) return;

    this.cover(best);
    let r = best.down;
    while (r !== best) {
      partial.push(r.row);
      let j = r.right;
      while (j !== r) {
        this.cover(j.column);
        j = j.right;
      }
      this.search(partial, maxSolutions);
      partial.pop();
      j = r.left;
      while (j !== r) {
        this.uncover(j.column);
        j = j.left;
      }
      r = r.down;
    }
    this.uncover(best);
  }

  private cover(col: DLXColumn): void {
    col.right.left = col.left;
    col.left.right = col.right;
    let i = col.down;
    while (i !== col) {
      let j = i.right;
      while (j !== i) {
        j.down.up = j.up;
        j.up.down = j.down;
        j.column.size--;
        j = j.right;
      }
      i = i.down;
    }
  }

  private uncover(col: DLXColumn): void {
    let i = col.up;
    while (i !== col) {
      let j = i.left;
      while (j !== i) {
        j.column.size++;
        j.down.up = j;
        j.up.down = j;
        j = j.left;
      }
      i = i.up;
    }
    col.right.left = col;
    col.left.right = col;
  }
}
