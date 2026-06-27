import { describe, it, expect } from "vitest";
import {
  fineness, throughput, energyEfficiency, flexibility,
  bmCost, wetGrind, forMining, media,
  bestUse, ballMillTypes,
} from "../ball-mill-calc.js";

describe("fineness", () => {
  it("planetary lab finest grind", () => {
    expect(fineness("planetary_lab_fine")).toBeGreaterThan(fineness("sag_semi_autogenous"));
  });
});

describe("throughput", () => {
  it("SAG highest throughput", () => {
    expect(throughput("sag_semi_autogenous")).toBeGreaterThan(throughput("planetary_lab_fine"));
  });
});

describe("energyEfficiency", () => {
  it("SAG most energy efficient", () => {
    expect(energyEfficiency("sag_semi_autogenous")).toBeGreaterThan(energyEfficiency("planetary_lab_fine"));
  });
});

describe("flexibility", () => {
  it("planetary lab most flexible", () => {
    expect(flexibility("planetary_lab_fine")).toBeGreaterThan(flexibility("cement_tube_long"));
  });
});

describe("bmCost", () => {
  it("SAG most expensive", () => {
    expect(bmCost("sag_semi_autogenous")).toBeGreaterThan(bmCost("planetary_lab_fine"));
  });
});

describe("wetGrind", () => {
  it("overflow wet grind is wet", () => {
    expect(wetGrind("overflow_wet_grind")).toBe(true);
  });
  it("cement tube is dry grind", () => {
    expect(wetGrind("cement_tube_long")).toBe(false);
  });
});

describe("forMining", () => {
  it("SAG for mining", () => {
    expect(forMining("sag_semi_autogenous")).toBe(true);
  });
  it("planetary lab not for mining", () => {
    expect(forMining("planetary_lab_fine")).toBe(false);
  });
});

describe("media", () => {
  it("planetary lab uses zirconia agate ball", () => {
    expect(media("planetary_lab_fine")).toBe("zirconia_agate_ball_planetary_jar");
  });
});

describe("bestUse", () => {
  it("cement tube for clinker raw meal", () => {
    expect(bestUse("cement_tube_long")).toBe("cement_clinker_raw_meal_dry_grind");
  });
});

describe("ballMillTypes", () => {
  it("returns 5 types", () => {
    expect(ballMillTypes()).toHaveLength(5);
  });
});
