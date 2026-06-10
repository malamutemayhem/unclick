import { describe, it, expect } from "vitest";
import {
  coveragePercent, accuracyScore, easeOfUse,
  highlightProtection, subjectIsolation,
  sceneAnalysis, bestScenario, complexityLevel, meteringModes,
} from "../metering-mode-calc.js";

describe("coveragePercent", () => {
  it("matrix covers full frame", () => {
    expect(coveragePercent("matrix")).toBe(100);
  });
  it("spot covers smallest area", () => {
    expect(coveragePercent("spot")).toBeLessThan(
      coveragePercent("partial")
    );
  });
});

describe("accuracyScore", () => {
  it("spot is most accurate", () => {
    expect(accuracyScore("spot")).toBeGreaterThan(
      accuracyScore("matrix")
    );
  });
});

describe("easeOfUse", () => {
  it("matrix is easiest", () => {
    expect(easeOfUse("matrix")).toBeGreaterThan(
      easeOfUse("spot")
    );
  });
});

describe("highlightProtection", () => {
  it("highlight weighted protects best", () => {
    expect(highlightProtection("highlight_weighted")).toBeGreaterThan(
      highlightProtection("center_weighted")
    );
  });
});

describe("subjectIsolation", () => {
  it("spot isolates subject", () => {
    expect(subjectIsolation("spot")).toBe(true);
  });
  it("matrix does not", () => {
    expect(subjectIsolation("matrix")).toBe(false);
  });
});

describe("sceneAnalysis", () => {
  it("matrix analyses scene", () => {
    expect(sceneAnalysis("matrix")).toBe(true);
  });
  it("spot does not", () => {
    expect(sceneAnalysis("spot")).toBe(false);
  });
});

describe("bestScenario", () => {
  it("spot for stage performers", () => {
    expect(bestScenario("spot")).toBe("stage_performers");
  });
});

describe("complexityLevel", () => {
  it("matrix is most complex internally", () => {
    expect(complexityLevel("matrix")).toBeGreaterThan(
      complexityLevel("center_weighted")
    );
  });
});

describe("meteringModes", () => {
  it("returns 5 types", () => {
    expect(meteringModes()).toHaveLength(5);
  });
});
