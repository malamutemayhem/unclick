import { describe, it, expect } from "vitest";
import {
  Cell, createState, setCell, getCell, step, run,
  drawWire, drawHorizontalWire, drawVerticalWire,
  injectSignal, countCells, toAscii, fromAscii, createDiode,
} from "../wire-world.js";

describe("createState", () => {
  it("creates empty grid", () => {
    const s = createState(10, 8);
    expect(s.width).toBe(10);
    expect(s.height).toBe(8);
    expect(s.generation).toBe(0);
    expect(s.grid[0][0]).toBe(Cell.Empty);
  });
});

describe("setCell / getCell", () => {
  it("sets and gets cells", () => {
    const s = createState(5, 5);
    setCell(s, 2, 3, Cell.Conductor);
    expect(getCell(s, 2, 3)).toBe(Cell.Conductor);
  });

  it("returns empty for out of bounds", () => {
    const s = createState(5, 5);
    expect(getCell(s, -1, 0)).toBe(Cell.Empty);
    expect(getCell(s, 10, 10)).toBe(Cell.Empty);
  });
});

describe("step", () => {
  it("head becomes tail", () => {
    const s = createState(5, 5);
    setCell(s, 2, 2, Cell.Head);
    const next = step(s);
    expect(getCell(next, 2, 2)).toBe(Cell.Tail);
  });

  it("tail becomes conductor", () => {
    const s = createState(5, 5);
    setCell(s, 2, 2, Cell.Tail);
    const next = step(s);
    expect(getCell(next, 2, 2)).toBe(Cell.Conductor);
  });

  it("conductor with 1 head neighbor becomes head", () => {
    const s = createState(5, 5);
    setCell(s, 1, 2, Cell.Head);
    setCell(s, 2, 2, Cell.Conductor);
    const next = step(s);
    expect(getCell(next, 2, 2)).toBe(Cell.Head);
  });

  it("conductor with 0 head neighbors stays conductor", () => {
    const s = createState(5, 5);
    setCell(s, 2, 2, Cell.Conductor);
    const next = step(s);
    expect(getCell(next, 2, 2)).toBe(Cell.Conductor);
  });

  it("signal propagates along wire", () => {
    const s = createState(10, 3);
    drawHorizontalWire(s, 1, 0, 9);
    injectSignal(s, 0, 1);
    const s1 = step(s);
    expect(getCell(s1, 0, 1)).toBe(Cell.Tail);
    expect(getCell(s1, 1, 1)).toBe(Cell.Head);
  });
});

describe("run", () => {
  it("produces history", () => {
    const s = createState(5, 5);
    const history = run(s, 3);
    expect(history.length).toBe(4);
    expect(history[3].generation).toBe(3);
  });
});

describe("drawWire", () => {
  it("draws wire from point list", () => {
    const s = createState(5, 5);
    drawWire(s, [[0, 0], [1, 0], [2, 0]]);
    expect(getCell(s, 0, 0)).toBe(Cell.Conductor);
    expect(getCell(s, 1, 0)).toBe(Cell.Conductor);
    expect(getCell(s, 2, 0)).toBe(Cell.Conductor);
  });
});

describe("drawHorizontalWire / drawVerticalWire", () => {
  it("draws horizontal wire", () => {
    const s = createState(10, 5);
    drawHorizontalWire(s, 2, 1, 5);
    for (let x = 1; x <= 5; x++) {
      expect(getCell(s, x, 2)).toBe(Cell.Conductor);
    }
  });

  it("draws vertical wire", () => {
    const s = createState(5, 10);
    drawVerticalWire(s, 2, 1, 5);
    for (let y = 1; y <= 5; y++) {
      expect(getCell(s, 2, y)).toBe(Cell.Conductor);
    }
  });
});

describe("injectSignal", () => {
  it("converts conductor to head", () => {
    const s = createState(5, 5);
    setCell(s, 2, 2, Cell.Conductor);
    injectSignal(s, 2, 2);
    expect(getCell(s, 2, 2)).toBe(Cell.Head);
  });

  it("does nothing on empty", () => {
    const s = createState(5, 5);
    injectSignal(s, 2, 2);
    expect(getCell(s, 2, 2)).toBe(Cell.Empty);
  });
});

describe("countCells", () => {
  it("counts cell types", () => {
    const s = createState(3, 3);
    setCell(s, 0, 0, Cell.Head);
    setCell(s, 1, 0, Cell.Tail);
    setCell(s, 2, 0, Cell.Conductor);
    const counts = countCells(s);
    expect(counts.head).toBe(1);
    expect(counts.tail).toBe(1);
    expect(counts.conductor).toBe(1);
    expect(counts.empty).toBe(6);
  });
});

describe("toAscii / fromAscii", () => {
  it("round-trips through ascii", () => {
    const s = createState(5, 3);
    setCell(s, 0, 0, Cell.Head);
    setCell(s, 1, 0, Cell.Tail);
    setCell(s, 2, 0, Cell.Conductor);
    const ascii = toAscii(s);
    const restored = fromAscii(ascii);
    expect(getCell(restored, 0, 0)).toBe(Cell.Head);
    expect(getCell(restored, 1, 0)).toBe(Cell.Tail);
    expect(getCell(restored, 2, 0)).toBe(Cell.Conductor);
  });
});

describe("createDiode", () => {
  it("places diode cells", () => {
    const s = createState(10, 10);
    createDiode(s, 3, 5, "right");
    expect(getCell(s, 3, 5)).toBe(Cell.Conductor);
    expect(getCell(s, 4, 4)).toBe(Cell.Conductor);
    expect(getCell(s, 4, 6)).toBe(Cell.Conductor);
    expect(getCell(s, 5, 5)).toBe(Cell.Conductor);
  });
});
