import { describe, it, expect } from "vitest";
import {
  accuracyMeters, reliability, globalCoverage,
  equipmentCost, updateRate, requiresSatellite,
  selfContained, primaryUse, signalSource, navigationSystems,
} from "../navigation-system-calc.js";

describe("accuracyMeters", () => {
  it("ils most accurate", () => {
    expect(accuracyMeters("ils")).toBeLessThan(
      accuracyMeters("vor")
    );
  });
});

describe("reliability", () => {
  it("ins highly reliable", () => {
    expect(reliability("ins")).toBeGreaterThan(
      reliability("vor")
    );
  });
});

describe("globalCoverage", () => {
  it("gps best coverage", () => {
    expect(globalCoverage("gps")).toBeGreaterThan(
      globalCoverage("ils")
    );
  });
});

describe("equipmentCost", () => {
  it("ils most expensive", () => {
    expect(equipmentCost("ils")).toBeGreaterThan(
      equipmentCost("gps")
    );
  });
});

describe("updateRate", () => {
  it("ins fastest update", () => {
    expect(updateRate("ins")).toBeGreaterThan(
      updateRate("vor")
    );
  });
});

describe("requiresSatellite", () => {
  it("gps requires satellite", () => {
    expect(requiresSatellite("gps")).toBe(true);
  });
  it("ins does not", () => {
    expect(requiresSatellite("ins")).toBe(false);
  });
});

describe("selfContained", () => {
  it("ins is self contained", () => {
    expect(selfContained("ins")).toBe(true);
  });
  it("gps is not", () => {
    expect(selfContained("gps")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("ils for precision approach", () => {
    expect(primaryUse("ils")).toBe("precision_approach");
  });
});

describe("signalSource", () => {
  it("ins uses internal gyroscope", () => {
    expect(signalSource("ins")).toBe("internal_gyroscope");
  });
});

describe("navigationSystems", () => {
  it("returns 5 systems", () => {
    expect(navigationSystems()).toHaveLength(5);
  });
});
