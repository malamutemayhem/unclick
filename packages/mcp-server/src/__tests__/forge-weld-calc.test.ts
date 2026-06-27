import { describe, it, expect } from "vitest";
import {
  weldTemperatureCelsius, overlapLengthMm, heatsRequired, fluxWeightG,
  hammerBlowsPerWeld, strengthRetentionPercent, timeAtWeldTempSeconds,
  soakTimeMinutes, scaleFormationPercent, weldTypes,
} from "../forge-weld-calc.js";

describe("weldTemperatureCelsius", () => {
  it("wrought iron needs hottest temp", () => {
    expect(weldTemperatureCelsius("wrought_iron")).toBeGreaterThan(
      weldTemperatureCelsius("high_carbon")
    );
  });
});

describe("overlapLengthMm", () => {
  it("chain needs longest overlap", () => {
    expect(overlapLengthMm(10, "chain")).toBeGreaterThan(overlapLengthMm(10, "scarf"));
  });
  it("jump weld has zero overlap", () => {
    expect(overlapLengthMm(10, "jump")).toBe(0);
  });
});

describe("heatsRequired", () => {
  it("jump weld needs most heats", () => {
    expect(heatsRequired("jump")).toBeGreaterThan(heatsRequired("scarf"));
  });
});

describe("fluxWeightG", () => {
  it("larger weld area = more flux", () => {
    expect(fluxWeightG(10)).toBeGreaterThan(fluxWeightG(5));
  });
});

describe("hammerBlowsPerWeld", () => {
  it("jump weld needs most blows", () => {
    expect(hammerBlowsPerWeld("jump")).toBeGreaterThan(hammerBlowsPerWeld("scarf"));
  });
});

describe("strengthRetentionPercent", () => {
  it("scarf retains most strength", () => {
    expect(strengthRetentionPercent("scarf")).toBeGreaterThan(
      strengthRetentionPercent("jump")
    );
  });
});

describe("timeAtWeldTempSeconds", () => {
  it("returns 3 seconds", () => {
    expect(timeAtWeldTempSeconds()).toBe(3);
  });
});

describe("soakTimeMinutes", () => {
  it("thicker stock = longer soak", () => {
    expect(soakTimeMinutes(20)).toBeGreaterThan(soakTimeMinutes(10));
  });
});

describe("scaleFormationPercent", () => {
  it("more heats = more scale", () => {
    expect(scaleFormationPercent(5)).toBeGreaterThan(scaleFormationPercent(2));
  });
});

describe("weldTypes", () => {
  it("returns 5 types", () => {
    expect(weldTypes()).toHaveLength(5);
  });
});
