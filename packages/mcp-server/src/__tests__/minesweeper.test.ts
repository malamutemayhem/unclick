import { describe, it, expect } from "vitest";
import {
  createBoard, reveal, flag, boardToString,
  revealAll, countRevealed, countFlags, countHidden,
} from "../minesweeper.js";

describe("createBoard", () => {
  it("creates board with correct dimensions", () => {
    const b = createBoard(10, 10, 10);
    expect(b.width).toBe(10);
    expect(b.height).toBe(10);
    expect(b.mineCount).toBe(10);
  });

  it("places correct number of mines", () => {
    const b = createBoard(10, 10, 15);
    let mines = 0;
    for (const row of b.cells) {
      for (const cell of row) {
        if (cell.mine) mines++;
      }
    }
    expect(mines).toBe(15);
  });

  it("caps mines at total cells", () => {
    const b = createBoard(3, 3, 100);
    expect(b.mineCount).toBe(9);
  });

  it("computes adjacent mine counts", () => {
    const b = createBoard(10, 10, 5, 42);
    for (let r = 0; r < b.height; r++) {
      for (let c = 0; c < b.width; c++) {
        if (b.cells[r][c].mine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < b.height && nc >= 0 && nc < b.width) {
              if (b.cells[nr][nc].mine) count++;
            }
          }
        }
        expect(b.cells[r][c].adjacentMines).toBe(count);
      }
    }
  });

  it("starts not game over", () => {
    const b = createBoard(5, 5, 3);
    expect(b.gameOver).toBe(false);
    expect(b.won).toBe(false);
  });
});

describe("reveal", () => {
  it("reveals safe cell", () => {
    const b = createBoard(10, 10, 1, 42);
    let safeR = -1, safeC = -1;
    for (let r = 0; r < 10 && safeR < 0; r++) {
      for (let c = 0; c < 10; c++) {
        if (!b.cells[r][c].mine) { safeR = r; safeC = c; break; }
      }
    }
    const result = reveal(b, safeR, safeC);
    expect(result).toBe("safe");
    expect(b.cells[safeR][safeC].display).toBe("revealed");
  });

  it("ends game on mine", () => {
    const b = createBoard(10, 10, 5, 42);
    let mineR = -1, mineC = -1;
    for (let r = 0; r < 10 && mineR < 0; r++) {
      for (let c = 0; c < 10; c++) {
        if (b.cells[r][c].mine) { mineR = r; mineC = c; break; }
      }
    }
    const result = reveal(b, mineR, mineC);
    expect(result).toBe("mine");
    expect(b.gameOver).toBe(true);
  });

  it("returns already for revealed cell", () => {
    const b = createBoard(10, 10, 1, 42);
    let safeR = -1, safeC = -1;
    for (let r = 0; r < 10 && safeR < 0; r++) {
      for (let c = 0; c < 10; c++) {
        if (!b.cells[r][c].mine) { safeR = r; safeC = c; break; }
      }
    }
    reveal(b, safeR, safeC);
    expect(reveal(b, safeR, safeC)).toBe("already");
  });

  it("flood fills empty cells", () => {
    const b = createBoard(10, 10, 1, 42);
    let emptyR = -1, emptyC = -1;
    for (let r = 0; r < 10 && emptyR < 0; r++) {
      for (let c = 0; c < 10; c++) {
        if (!b.cells[r][c].mine && b.cells[r][c].adjacentMines === 0) {
          emptyR = r; emptyC = c; break;
        }
      }
    }
    if (emptyR >= 0) {
      reveal(b, emptyR, emptyC);
      expect(countRevealed(b)).toBeGreaterThan(1);
    }
  });
});

describe("flag", () => {
  it("toggles flag", () => {
    const b = createBoard(5, 5, 3);
    expect(flag(b, 0, 0)).toBe(true);
    expect(b.cells[0][0].display).toBe("flagged");
    expect(flag(b, 0, 0)).toBe(true);
    expect(b.cells[0][0].display).toBe("hidden");
  });

  it("cannot flag revealed cell", () => {
    const b = createBoard(10, 10, 1, 42);
    let safeR = -1, safeC = -1;
    for (let r = 0; r < 10 && safeR < 0; r++) {
      for (let c = 0; c < 10; c++) {
        if (!b.cells[r][c].mine) { safeR = r; safeC = c; break; }
      }
    }
    reveal(b, safeR, safeC);
    expect(flag(b, safeR, safeC)).toBe(false);
  });
});

describe("boardToString", () => {
  it("renders board", () => {
    const b = createBoard(5, 5, 3);
    const str = boardToString(b);
    expect(str).toContain("?");
  });

  it("shows flags", () => {
    const b = createBoard(5, 5, 3);
    flag(b, 0, 0);
    expect(boardToString(b)).toContain("F");
  });
});

describe("revealAll", () => {
  it("reveals entire board", () => {
    const b = createBoard(5, 5, 3);
    revealAll(b);
    expect(countRevealed(b)).toBe(25);
  });
});

describe("countHidden", () => {
  it("counts hidden cells", () => {
    const b = createBoard(5, 5, 3);
    expect(countHidden(b)).toBe(25);
  });
});

describe("countFlags", () => {
  it("counts flagged cells", () => {
    const b = createBoard(5, 5, 3);
    flag(b, 0, 0);
    flag(b, 1, 1);
    expect(countFlags(b)).toBe(2);
  });
});
