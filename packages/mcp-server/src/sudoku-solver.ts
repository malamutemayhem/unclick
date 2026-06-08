export class SudokuSolver {
  static solve(board: number[][]): number[][] | null {
    const grid = board.map((r) => [...r]);
    return this.backtrack(grid) ? grid : null;
  }

  private static backtrack(grid: number[][]): boolean {
    const empty = this.findEmpty(grid);
    if (!empty) return true;
    const [row, col] = empty;

    for (let num = 1; num <= 9; num++) {
      if (this.isValid(grid, row, col, num)) {
        grid[row][col] = num;
        if (this.backtrack(grid)) return true;
        grid[row][col] = 0;
      }
    }

    return false;
  }

  private static findEmpty(grid: number[][]): [number, number] | null {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] === 0) return [r, c];
      }
    }
    return null;
  }

  static isValid(grid: number[][], row: number, col: number, num: number): boolean {
    for (let c = 0; c < 9; c++) {
      if (grid[row][c] === num) return false;
    }
    for (let r = 0; r < 9; r++) {
      if (grid[r][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (grid[r][c] === num) return false;
      }
    }
    return true;
  }

  static isComplete(grid: number[][]): boolean {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] === 0) return false;
      }
    }
    return true;
  }

  static isValidBoard(grid: number[][]): boolean {
    for (let r = 0; r < 9; r++) {
      const row = new Set<number>();
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] !== 0) {
          if (row.has(grid[r][c])) return false;
          row.add(grid[r][c]);
        }
      }
    }
    for (let c = 0; c < 9; c++) {
      const col = new Set<number>();
      for (let r = 0; r < 9; r++) {
        if (grid[r][c] !== 0) {
          if (col.has(grid[r][c])) return false;
          col.add(grid[r][c]);
        }
      }
    }
    for (let br = 0; br < 3; br++) {
      for (let bc = 0; bc < 3; bc++) {
        const box = new Set<number>();
        for (let r = br * 3; r < br * 3 + 3; r++) {
          for (let c = bc * 3; c < bc * 3 + 3; c++) {
            if (grid[r][c] !== 0) {
              if (box.has(grid[r][c])) return false;
              box.add(grid[r][c]);
            }
          }
        }
      }
    }
    return true;
  }
}
