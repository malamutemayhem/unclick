import { describe, it, expect } from "vitest";
import {
  cordLength, cordCount, totalCord, cordWeight, dowelLength,
  knotsPerRow, rowsNeeded, fringeLength, beadCount, estimateTime,
  projectDimensions, cordCost, knotDensity, hangingWeight,
  cordTypes, knotTypes,
} from "../macrame-calc.js";

describe("cordLength", () => {
  it("square knot = 4x finished", () => {
    expect(cordLength(100, "square")).toBe(400);
  });

  it("berry knot needs most cord", () => {
    expect(cordLength(100, "berry")).toBeGreaterThan(cordLength(100, "square"));
  });
});

describe("cordCount", () => {
  it("dense pattern = more cords", () => {
    expect(cordCount(30, 3, "dense")).toBeGreaterThan(cordCount(30, 3, "sparse"));
  });
});

describe("totalCord", () => {
  it("returns meters", () => {
    expect(totalCord(400, 20)).toBe(80);
  });
});

describe("cordWeight", () => {
  it("positive grams", () => {
    expect(cordWeight(80, 3, "cotton")).toBeGreaterThan(0);
  });
});

describe("dowelLength", () => {
  it("adds overhang", () => {
    expect(dowelLength(30)).toBeGreaterThan(30);
  });
});

describe("knotsPerRow", () => {
  it("divides width", () => {
    expect(knotsPerRow(30, 3)).toBe(10);
  });
});

describe("rowsNeeded", () => {
  it("divides length", () => {
    expect(rowsNeeded(60, 3)).toBe(20);
  });
});

describe("fringeLength", () => {
  it("15% default", () => {
    expect(fringeLength(100)).toBe(15);
  });
});

describe("beadCount", () => {
  it("one per row by default", () => {
    expect(beadCount(20)).toBe(20);
  });
});

describe("estimateTime", () => {
  it("hours for knot count", () => {
    expect(estimateTime(120, 0.5)).toBe(1);
  });
});

describe("projectDimensions", () => {
  it("includes fringe in length", () => {
    const dims = projectDimensions(30, 60, 15);
    expect(dims.totalLength).toBe(75);
  });
});

describe("cordCost", () => {
  it("meters x price", () => {
    expect(cordCost(80, 0.5)).toBe(40);
  });
});

describe("knotDensity", () => {
  it("loose at low density", () => {
    expect(knotDensity(0.3)).toBe("loose");
  });

  it("tight at high density", () => {
    expect(knotDensity(2)).toBe("tight");
  });
});

describe("hangingWeight", () => {
  it("sums components", () => {
    expect(hangingWeight(500, 100, 50)).toBe(650);
  });
});

describe("cordTypes", () => {
  it("returns 5 types", () => {
    expect(cordTypes()).toHaveLength(5);
  });
});

describe("knotTypes", () => {
  it("returns 6 types", () => {
    expect(knotTypes()).toHaveLength(6);
  });
});
