import { describe, it, expect } from "vitest";
import {
  efficiency, torqueDensity, backlash, compactness,
  gbCost, selfLocking, forRobot, meshType,
  bestUse, gearboxTypes,
} from "../gearbox-type-calc.js";

describe("efficiency", () => {
  it("spur parallel highest efficiency", () => {
    expect(efficiency("spur_parallel")).toBeGreaterThan(efficiency("worm_right_angle"));
  });
});

describe("torqueDensity", () => {
  it("harmonic strain wave best torque density", () => {
    expect(torqueDensity("harmonic_strain_wave")).toBeGreaterThan(torqueDensity("spur_parallel"));
  });
});

describe("backlash", () => {
  it("harmonic strain wave lowest backlash", () => {
    expect(backlash("harmonic_strain_wave")).toBeGreaterThan(backlash("spur_parallel"));
  });
});

describe("compactness", () => {
  it("harmonic strain wave most compact", () => {
    expect(compactness("harmonic_strain_wave")).toBeGreaterThan(compactness("spur_parallel"));
  });
});

describe("gbCost", () => {
  it("harmonic strain wave most expensive", () => {
    expect(gbCost("harmonic_strain_wave")).toBeGreaterThan(gbCost("spur_parallel"));
  });
});

describe("selfLocking", () => {
  it("worm right angle is self locking", () => {
    expect(selfLocking("worm_right_angle")).toBe(true);
  });
  it("planetary epicyclic not self locking", () => {
    expect(selfLocking("planetary_epicyclic")).toBe(false);
  });
});

describe("forRobot", () => {
  it("harmonic strain wave for robot", () => {
    expect(forRobot("harmonic_strain_wave")).toBe(true);
  });
  it("spur parallel not for robot", () => {
    expect(forRobot("spur_parallel")).toBe(false);
  });
});

describe("meshType", () => {
  it("cycloidal eccentric uses eccentric roller pin", () => {
    expect(meshType("cycloidal_eccentric")).toBe("eccentric_roller_pin");
  });
});

describe("bestUse", () => {
  it("harmonic strain wave best for cobot precision joint", () => {
    expect(bestUse("harmonic_strain_wave")).toBe("cobot_precision_joint");
  });
});

describe("gearboxTypes", () => {
  it("returns 5 types", () => {
    expect(gearboxTypes()).toHaveLength(5);
  });
});
