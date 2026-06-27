import { describe, it, expect } from "vitest";
import {
  logLengthCm, logDiameterRangeCm, mortarThicknessCm, insulationCavityWidthCm,
  rValuePerCm, shrinkagePercent, seasoningMonths, logsPerM2Wall,
  costPerM2, logSpeciesList,
} from "../cordwood-calc.js";

describe("logLengthCm", () => {
  it("matches wall thickness", () => {
    expect(logLengthCm(40)).toBe(40);
  });
});

describe("logDiameterRangeCm", () => {
  it("returns min and max", () => {
    const range = logDiameterRangeCm();
    expect(range.min).toBeLessThan(range.max);
  });
});

describe("mortarThicknessCm", () => {
  it("returns 2.5", () => {
    expect(mortarThicknessCm()).toBe(2.5);
  });
});

describe("insulationCavityWidthCm", () => {
  it("thicker wall has wider cavity", () => {
    expect(insulationCavityWidthCm(50)).toBeGreaterThan(
      insulationCavityWidthCm(30)
    );
  });
});

describe("rValuePerCm", () => {
  it("cedar insulates best", () => {
    expect(rValuePerCm("cedar")).toBeGreaterThan(rValuePerCm("oak"));
  });
});

describe("shrinkagePercent", () => {
  it("oak shrinks most", () => {
    expect(shrinkagePercent("oak")).toBeGreaterThan(
      shrinkagePercent("cedar")
    );
  });
});

describe("seasoningMonths", () => {
  it("oak takes longest to season", () => {
    expect(seasoningMonths("oak")).toBeGreaterThan(
      seasoningMonths("cedar")
    );
  });
});

describe("logsPerM2Wall", () => {
  it("smaller diameter needs more logs", () => {
    expect(logsPerM2Wall(10)).toBeGreaterThan(logsPerM2Wall(20));
  });
  it("zero diameter returns 0", () => {
    expect(logsPerM2Wall(0)).toBe(0);
  });
});

describe("costPerM2", () => {
  it("oak is most expensive", () => {
    expect(costPerM2("oak")).toBeGreaterThan(costPerM2("poplar"));
  });
});

describe("logSpeciesList", () => {
  it("returns 5 species", () => {
    expect(logSpeciesList()).toHaveLength(5);
  });
});
