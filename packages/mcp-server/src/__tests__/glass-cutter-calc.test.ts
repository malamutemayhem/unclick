import { describe, it, expect } from "vitest";
import {
  cutPrecision, wheelLife, pressureControl, versatility,
  cutterCost, oilFed, guidedCut, wheelMaterial,
  bestCut, glassCutters,
} from "../glass-cutter-calc.js";

describe("cutPrecision", () => {
  it("strip cutter guide best cut precision", () => {
    expect(cutPrecision("strip_cutter_guide")).toBeGreaterThan(cutPrecision("steel_wheel_standard"));
  });
});

describe("wheelLife", () => {
  it("carbide wheel sharp longest wheel life", () => {
    expect(wheelLife("carbide_wheel_sharp")).toBeGreaterThan(wheelLife("steel_wheel_standard"));
  });
});

describe("pressureControl", () => {
  it("oil fed pistol best pressure control", () => {
    expect(pressureControl("oil_fed_pistol")).toBeGreaterThan(pressureControl("steel_wheel_standard"));
  });
});

describe("versatility", () => {
  it("carbide wheel sharp most versatile", () => {
    expect(versatility("carbide_wheel_sharp")).toBeGreaterThan(versatility("circle_cutter_compass"));
  });
});

describe("cutterCost", () => {
  it("oil fed pistol more expensive than steel wheel", () => {
    expect(cutterCost("oil_fed_pistol")).toBeGreaterThan(cutterCost("steel_wheel_standard"));
  });
});

describe("oilFed", () => {
  it("oil fed pistol is oil fed", () => {
    expect(oilFed("oil_fed_pistol")).toBe(true);
  });
  it("steel wheel standard is not oil fed", () => {
    expect(oilFed("steel_wheel_standard")).toBe(false);
  });
});

describe("guidedCut", () => {
  it("circle cutter compass has guided cut", () => {
    expect(guidedCut("circle_cutter_compass")).toBe(true);
  });
  it("carbide wheel sharp does not have guided cut", () => {
    expect(guidedCut("carbide_wheel_sharp")).toBe(false);
  });
});

describe("wheelMaterial", () => {
  it("carbide wheel sharp uses tungsten carbide wheel", () => {
    expect(wheelMaterial("carbide_wheel_sharp")).toBe("tungsten_carbide_wheel");
  });
});

describe("bestCut", () => {
  it("circle cutter compass best for perfect circle disc", () => {
    expect(bestCut("circle_cutter_compass")).toBe("perfect_circle_disc");
  });
});

describe("glassCutters", () => {
  it("returns 5 types", () => {
    expect(glassCutters()).toHaveLength(5);
  });
});
