import { describe, it, expect } from "vitest";
import {
  spindleSpeedRpm, gougeWidthMm, sandingGrits, finishCoats,
  hardnessJanka, tearoutRisk, toolSharpeningIntervalMin, blankWeightKg,
  costPerBoardFoot, woodSpecies,
} from "../wood-turning-calc.js";

describe("spindleSpeedRpm", () => {
  it("smaller diameter = higher speed", () => {
    expect(spindleSpeedRpm(50)).toBeGreaterThan(spindleSpeedRpm(100));
  });
  it("zero diameter returns 0", () => {
    expect(spindleSpeedRpm(0)).toBe(0);
  });
});

describe("gougeWidthMm", () => {
  it("larger diameter = wider gouge", () => {
    expect(gougeWidthMm(150)).toBeGreaterThan(gougeWidthMm(50));
  });
  it("minimum 6mm", () => {
    expect(gougeWidthMm(10)).toBeGreaterThanOrEqual(6);
  });
});

describe("sandingGrits", () => {
  it("returns 5 grits in order", () => {
    const grits = sandingGrits();
    expect(grits).toHaveLength(5);
    expect(grits[0]).toBeLessThan(grits[4]);
  });
});

describe("finishCoats", () => {
  it("oak needs most coats", () => {
    expect(finishCoats("oak")).toBeGreaterThan(finishCoats("maple"));
  });
});

describe("hardnessJanka", () => {
  it("boxwood is hardest", () => {
    expect(hardnessJanka("boxwood")).toBeGreaterThan(hardnessJanka("cherry"));
  });
});

describe("tearoutRisk", () => {
  it("oak has highest tearout risk", () => {
    expect(tearoutRisk("oak")).toBeGreaterThan(tearoutRisk("boxwood"));
  });
});

describe("toolSharpeningIntervalMin", () => {
  it("boxwood dulls tools fastest", () => {
    expect(toolSharpeningIntervalMin("boxwood")).toBeLessThan(
      toolSharpeningIntervalMin("cherry")
    );
  });
});

describe("blankWeightKg", () => {
  it("larger blank is heavier", () => {
    expect(blankWeightKg(100, 200, "oak")).toBeGreaterThan(
      blankWeightKg(50, 100, "oak")
    );
  });
});

describe("costPerBoardFoot", () => {
  it("boxwood is most expensive", () => {
    expect(costPerBoardFoot("boxwood")).toBeGreaterThan(
      costPerBoardFoot("oak")
    );
  });
});

describe("woodSpecies", () => {
  it("returns 5 species", () => {
    expect(woodSpecies()).toHaveLength(5);
  });
});
