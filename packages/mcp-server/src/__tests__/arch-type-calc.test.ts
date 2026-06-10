import { describe, it, expect } from "vitest";
import {
  loadCapacity, spanMeters, heightToSpanRatio,
  thrustDistribution, buildDifficulty, centering,
  decorative, bestEra, materialCost, archTypes,
} from "../arch-type-calc.js";

describe("loadCapacity", () => {
  it("pointed arch has highest load capacity", () => {
    expect(loadCapacity("pointed")).toBeGreaterThan(
      loadCapacity("flat")
    );
  });
});

describe("spanMeters", () => {
  it("pointed arch spans widest", () => {
    expect(spanMeters("pointed")).toBeGreaterThan(
      spanMeters("flat")
    );
  });
});

describe("heightToSpanRatio", () => {
  it("pointed has highest ratio", () => {
    expect(heightToSpanRatio("pointed")).toBeGreaterThan(
      heightToSpanRatio("flat")
    );
  });
});

describe("thrustDistribution", () => {
  it("pointed distributes thrust best", () => {
    expect(thrustDistribution("pointed")).toBeGreaterThan(
      thrustDistribution("flat")
    );
  });
});

describe("buildDifficulty", () => {
  it("ogee is hardest to build", () => {
    expect(buildDifficulty("ogee")).toBeGreaterThan(
      buildDifficulty("flat")
    );
  });
});

describe("centering", () => {
  it("semicircular needs centering", () => {
    expect(centering("semicircular")).toBe(true);
  });
  it("flat does not", () => {
    expect(centering("flat")).toBe(false);
  });
});

describe("decorative", () => {
  it("horseshoe is decorative", () => {
    expect(decorative("horseshoe")).toBe(true);
  });
  it("semicircular is not", () => {
    expect(decorative("semicircular")).toBe(false);
  });
});

describe("bestEra", () => {
  it("pointed best in gothic era", () => {
    expect(bestEra("pointed")).toBe("gothic");
  });
});

describe("materialCost", () => {
  it("ogee costs most", () => {
    expect(materialCost("ogee")).toBeGreaterThan(
      materialCost("flat")
    );
  });
});

describe("archTypes", () => {
  it("returns 5 types", () => {
    expect(archTypes()).toHaveLength(5);
  });
});
