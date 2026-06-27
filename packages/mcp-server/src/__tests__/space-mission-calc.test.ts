import { describe, it, expect } from "vitest";
import {
  missionComplexity, scienceReturn, costBillionUsd,
  missionDurationYears, riskLevel, touchesSurface,
  returnsMaterial, exampleMission, primaryInstrument, missionTypes,
} from "../space-mission-calc.js";

describe("missionComplexity", () => {
  it("sample return most complex", () => {
    expect(missionComplexity("sample_return")).toBeGreaterThan(
      missionComplexity("flyby")
    );
  });
});

describe("scienceReturn", () => {
  it("sample return best science", () => {
    expect(scienceReturn("sample_return")).toBeGreaterThan(
      scienceReturn("flyby")
    );
  });
});

describe("costBillionUsd", () => {
  it("sample return costs most", () => {
    expect(costBillionUsd("sample_return")).toBeGreaterThan(
      costBillionUsd("flyby")
    );
  });
});

describe("missionDurationYears", () => {
  it("rover lasts longest", () => {
    expect(missionDurationYears("rover")).toBeGreaterThan(
      missionDurationYears("lander")
    );
  });
});

describe("riskLevel", () => {
  it("sample return highest risk", () => {
    expect(riskLevel("sample_return")).toBeGreaterThan(
      riskLevel("flyby")
    );
  });
});

describe("touchesSurface", () => {
  it("lander touches surface", () => {
    expect(touchesSurface("lander")).toBe(true);
  });
  it("orbiter does not", () => {
    expect(touchesSurface("orbiter")).toBe(false);
  });
});

describe("returnsMaterial", () => {
  it("sample return returns material", () => {
    expect(returnsMaterial("sample_return")).toBe(true);
  });
  it("rover does not", () => {
    expect(returnsMaterial("rover")).toBe(false);
  });
});

describe("exampleMission", () => {
  it("rover example is curiosity", () => {
    expect(exampleMission("rover")).toBe("curiosity");
  });
});

describe("primaryInstrument", () => {
  it("lander uses seismometer", () => {
    expect(primaryInstrument("lander")).toBe("seismometer");
  });
});

describe("missionTypes", () => {
  it("returns 5 types", () => {
    expect(missionTypes()).toHaveLength(5);
  });
});
