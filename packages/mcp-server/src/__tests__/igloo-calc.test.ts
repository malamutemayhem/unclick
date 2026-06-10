import { describe, it, expect } from "vitest";
import {
  diameterMeters, blocksRequired, buildTimeHours,
  interiorTempCelsius, occupancyPersons, ventilationHoles,
  hasEntryTunnel, snowPackDensity, lifespanWeeks, iglooSizes,
} from "../igloo-calc.js";

describe("diameterMeters", () => {
  it("qaggiq is largest", () => {
    expect(diameterMeters("qaggiq")).toBeGreaterThan(
      diameterMeters("emergency")
    );
  });
});

describe("blocksRequired", () => {
  it("qaggiq needs most blocks", () => {
    expect(blocksRequired("qaggiq")).toBeGreaterThan(
      blocksRequired("emergency")
    );
  });
});

describe("buildTimeHours", () => {
  it("qaggiq takes longest", () => {
    expect(buildTimeHours("qaggiq")).toBeGreaterThan(
      buildTimeHours("emergency")
    );
  });
});

describe("interiorTempCelsius", () => {
  it("qaggiq is warmest inside", () => {
    expect(interiorTempCelsius("qaggiq")).toBeGreaterThan(
      interiorTempCelsius("emergency")
    );
  });
});

describe("occupancyPersons", () => {
  it("qaggiq holds most people", () => {
    expect(occupancyPersons("qaggiq")).toBeGreaterThan(
      occupancyPersons("single_family")
    );
  });
});

describe("ventilationHoles", () => {
  it("qaggiq has most ventilation", () => {
    expect(ventilationHoles("qaggiq")).toBeGreaterThan(
      ventilationHoles("emergency")
    );
  });
});

describe("hasEntryTunnel", () => {
  it("single family has entry tunnel", () => {
    expect(hasEntryTunnel("single_family")).toBe(true);
  });
  it("emergency does not", () => {
    expect(hasEntryTunnel("emergency")).toBe(false);
  });
});

describe("snowPackDensity", () => {
  it("qaggiq uses densest snow", () => {
    expect(snowPackDensity("qaggiq")).toBeGreaterThan(
      snowPackDensity("emergency")
    );
  });
});

describe("lifespanWeeks", () => {
  it("double lasts longest", () => {
    expect(lifespanWeeks("double")).toBeGreaterThan(
      lifespanWeeks("emergency")
    );
  });
});

describe("iglooSizes", () => {
  it("returns 5 sizes", () => {
    expect(iglooSizes()).toHaveLength(5);
  });
});
