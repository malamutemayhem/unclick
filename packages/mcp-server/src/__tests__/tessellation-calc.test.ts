import { describe, it, expect } from "vitest";
import {
  interiorAngle, canTessellate, tilesAtVertex, tileArea,
  tilesNeeded, groutLength, symmetryOrder, penroseTileRatio,
  dualTessellation, colorMinimum, tessTypes,
} from "../tessellation-calc.js";

describe("interiorAngle", () => {
  it("triangle = 60", () => {
    expect(interiorAngle(3)).toBe(60);
  });
  it("square = 90", () => {
    expect(interiorAngle(4)).toBe(90);
  });
  it("hexagon = 120", () => {
    expect(interiorAngle(6)).toBe(120);
  });
});

describe("canTessellate", () => {
  it("triangle can", () => {
    expect(canTessellate(3)).toBe(true);
  });
  it("square can", () => {
    expect(canTessellate(4)).toBe(true);
  });
  it("hexagon can", () => {
    expect(canTessellate(6)).toBe(true);
  });
  it("pentagon cannot", () => {
    expect(canTessellate(5)).toBe(false);
  });
});

describe("tilesAtVertex", () => {
  it("square = 4", () => {
    expect(tilesAtVertex(4)).toBe(4);
  });
});

describe("tileArea", () => {
  it("positive area", () => {
    expect(tileArea(5, 4)).toBeGreaterThan(0);
  });
});

describe("tilesNeeded", () => {
  it("correct count", () => {
    expect(tilesNeeded(100, 25)).toBe(4);
  });
});

describe("groutLength", () => {
  it("positive length", () => {
    expect(groutLength(10, 20)).toBeGreaterThan(0);
  });
});

describe("symmetryOrder", () => {
  it("square = 4", () => {
    expect(symmetryOrder("square")).toBe(4);
  });
});

describe("penroseTileRatio", () => {
  it("golden ratio", () => {
    expect(penroseTileRatio()).toBeCloseTo(1.618, 2);
  });
});

describe("dualTessellation", () => {
  it("triangle dual = hexagon", () => {
    expect(dualTessellation("triangle")).toBe("hexagon");
  });
  it("square dual = square", () => {
    expect(dualTessellation("square")).toBe("square");
  });
});

describe("colorMinimum", () => {
  it("escher = 2", () => {
    expect(colorMinimum("escher")).toBe(2);
  });
});

describe("tessTypes", () => {
  it("returns 5 types", () => {
    expect(tessTypes()).toHaveLength(5);
  });
});
