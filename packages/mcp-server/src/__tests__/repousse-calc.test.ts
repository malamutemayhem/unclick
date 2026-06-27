import { describe, it, expect } from "vitest";
import {
  metalThicknessMm, pitchType, toolCountForProject, annealingCycles,
  hammerBlowsPerCm2, workingTimeHoursPerCm2, reliefDepthMm,
  pitchBowlDiameterCm, costPerHour, repousseTools,
} from "../repousse-calc.js";

describe("metalThicknessMm", () => {
  it("high complexity needs thicker metal", () => {
    expect(metalThicknessMm("high")).toBeGreaterThan(metalThicknessMm("low"));
  });
});

describe("pitchType", () => {
  it("warm uses burgundy pitch", () => {
    expect(pitchType("warm")).toBe("burgundy");
  });
});

describe("toolCountForProject", () => {
  it("high complexity needs most tools", () => {
    expect(toolCountForProject("high")).toBeGreaterThan(toolCountForProject("low"));
  });
});

describe("annealingCycles", () => {
  it("deeper relief needs more cycles", () => {
    expect(annealingCycles("deep")).toBeGreaterThan(annealingCycles("shallow"));
  });
});

describe("hammerBlowsPerCm2", () => {
  it("matting needs most blows", () => {
    expect(hammerBlowsPerCm2("matting")).toBeGreaterThan(hammerBlowsPerCm2("embossing"));
  });
});

describe("workingTimeHoursPerCm2", () => {
  it("liner takes longest", () => {
    expect(workingTimeHoursPerCm2("liner")).toBeGreaterThan(
      workingTimeHoursPerCm2("planishing")
    );
  });
});

describe("reliefDepthMm", () => {
  it("3x metal thickness", () => {
    expect(reliefDepthMm(1.5)).toBe(4.5);
  });
});

describe("pitchBowlDiameterCm", () => {
  it("10cm larger than project", () => {
    expect(pitchBowlDiameterCm(20)).toBe(30);
  });
});

describe("costPerHour", () => {
  it("returns 60", () => {
    expect(costPerHour()).toBe(60);
  });
});

describe("repousseTools", () => {
  it("returns 5 tools", () => {
    expect(repousseTools()).toHaveLength(5);
  });
});
