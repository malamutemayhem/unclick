import { describe, it, expect } from "vitest";
import {
  resolution, coverageArea, penetrationDepth, dataRate,
  equipmentCost, requiresTowfish, realTimeDisplay, frequencyBand,
  bestApplication, sonarTypes,
} from "../sonar-type-calc.js";

describe("resolution", () => {
  it("side scan highest resolution", () => {
    expect(resolution("side_scan")).toBeGreaterThan(resolution("single_beam"));
  });
});

describe("coverageArea", () => {
  it("multibeam widest coverage", () => {
    expect(coverageArea("multibeam")).toBeGreaterThan(coverageArea("single_beam"));
  });
});

describe("penetrationDepth", () => {
  it("sub bottom profiler deepest penetration", () => {
    expect(penetrationDepth("sub_bottom_profiler")).toBeGreaterThan(penetrationDepth("multibeam"));
  });
});

describe("dataRate", () => {
  it("multibeam highest data rate", () => {
    expect(dataRate("multibeam")).toBeGreaterThan(dataRate("single_beam"));
  });
});

describe("equipmentCost", () => {
  it("multibeam most expensive", () => {
    expect(equipmentCost("multibeam")).toBeGreaterThan(equipmentCost("single_beam"));
  });
});

describe("requiresTowfish", () => {
  it("side scan requires towfish", () => {
    expect(requiresTowfish("side_scan")).toBe(true);
  });
  it("multibeam does not", () => {
    expect(requiresTowfish("multibeam")).toBe(false);
  });
});

describe("realTimeDisplay", () => {
  it("all sonar types have real time display", () => {
    expect(realTimeDisplay("side_scan")).toBe(true);
    expect(realTimeDisplay("single_beam")).toBe(true);
  });
});

describe("frequencyBand", () => {
  it("sub bottom profiler uses low freq", () => {
    expect(frequencyBand("sub_bottom_profiler")).toBe("low_freq_2_16khz");
  });
});

describe("bestApplication", () => {
  it("multibeam for bathymetric mapping", () => {
    expect(bestApplication("multibeam")).toBe("bathymetric_mapping");
  });
});

describe("sonarTypes", () => {
  it("returns 5 types", () => {
    expect(sonarTypes()).toHaveLength(5);
  });
});
