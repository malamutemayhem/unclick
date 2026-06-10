import { describe, it, expect } from "vitest";
import {
  fabricGatherRatio, elasticity, rowsPerCm,
  threadLength, decorativeRating, reversiblePattern,
  difficultyRating, bestForGarment, timePerRowMinutes, smockingStitches,
} from "../smocking-calc.js";

describe("fabricGatherRatio", () => {
  it("honeycomb gathers most", () => {
    expect(fabricGatherRatio("honeycomb")).toBeGreaterThan(
      fabricGatherRatio("cable")
    );
  });
});

describe("elasticity", () => {
  it("honeycomb is most elastic", () => {
    expect(elasticity("honeycomb")).toBeGreaterThan(
      elasticity("cable")
    );
  });
});

describe("rowsPerCm", () => {
  it("cable has most rows per cm", () => {
    expect(rowsPerCm("cable")).toBeGreaterThanOrEqual(
      rowsPerCm("wave")
    );
  });
});

describe("threadLength", () => {
  it("honeycomb uses most thread", () => {
    expect(threadLength("honeycomb")).toBeGreaterThan(
      threadLength("cable")
    );
  });
});

describe("decorativeRating", () => {
  it("diamond is most decorative", () => {
    expect(decorativeRating("diamond")).toBeGreaterThan(
      decorativeRating("cable")
    );
  });
});

describe("reversiblePattern", () => {
  it("honeycomb is reversible", () => {
    expect(reversiblePattern("honeycomb")).toBe(true);
  });
  it("cable is not", () => {
    expect(reversiblePattern("cable")).toBe(false);
  });
});

describe("difficultyRating", () => {
  it("diamond is hardest", () => {
    expect(difficultyRating("diamond")).toBeGreaterThan(
      difficultyRating("cable")
    );
  });
});

describe("bestForGarment", () => {
  it("cable is best for bodice", () => {
    expect(bestForGarment("cable")).toBe("bodice");
  });
});

describe("timePerRowMinutes", () => {
  it("diamond takes longest", () => {
    expect(timePerRowMinutes("diamond")).toBeGreaterThan(
      timePerRowMinutes("cable")
    );
  });
});

describe("smockingStitches", () => {
  it("returns 5 stitches", () => {
    expect(smockingStitches()).toHaveLength(5);
  });
});
