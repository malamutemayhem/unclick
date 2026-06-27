import { describe, it, expect } from "vitest";
import {
  heightM, archRadiusCm, areaCm2, glazingPanelCount,
  leadCameLengthCm, sillHeightCm, lightTransmissionPercent,
  stoneFrameWeightKg, windLoadKpa, restorationCostPerWindow, lancetTraceryTypes,
} from "../lancet-calc.js";

describe("heightM", () => {
  it("3x width in meters", () => {
    expect(heightM(50)).toBe(1.5);
  });
});

describe("archRadiusCm", () => {
  it("75% of width", () => {
    expect(archRadiusCm(50)).toBe(37.5);
  });
});

describe("areaCm2", () => {
  it("positive area", () => {
    expect(areaCm2(50, 1.5)).toBeGreaterThan(0);
  });
});

describe("glazingPanelCount", () => {
  it("at least 1", () => {
    expect(glazingPanelCount(0.3)).toBe(1);
  });
  it("more panels for taller windows", () => {
    expect(glazingPanelCount(3)).toBeGreaterThan(glazingPanelCount(1));
  });
});

describe("leadCameLengthCm", () => {
  it("positive length", () => {
    expect(leadCameLengthCm(50, 3)).toBeGreaterThan(0);
  });
});

describe("sillHeightCm", () => {
  it("30% of wall height", () => {
    expect(sillHeightCm(4)).toBe(120);
  });
});

describe("lightTransmissionPercent", () => {
  it("plain highest", () => {
    expect(lightTransmissionPercent("plain")).toBeGreaterThan(lightTransmissionPercent("cinquefoiled"));
  });
});

describe("stoneFrameWeightKg", () => {
  it("positive weight", () => {
    expect(stoneFrameWeightKg(50, 1.5, 10)).toBeGreaterThan(0);
  });
});

describe("windLoadKpa", () => {
  it("positive load", () => {
    expect(windLoadKpa(1.5, 50, 80)).toBeGreaterThan(0);
  });
});

describe("restorationCostPerWindow", () => {
  it("cinquefoiled most expensive", () => {
    expect(restorationCostPerWindow("cinquefoiled", 1000)).toBeGreaterThan(
      restorationCostPerWindow("plain", 1000)
    );
  });
});

describe("lancetTraceryTypes", () => {
  it("returns 5 types", () => {
    expect(lancetTraceryTypes()).toHaveLength(5);
  });
});
