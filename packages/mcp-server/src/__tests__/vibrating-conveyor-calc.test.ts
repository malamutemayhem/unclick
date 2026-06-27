import { describe, it, expect } from "vitest";
import {
  capacity, control, energyUse, dustFree,
  vcCost, screenCapable, forHot, drive,
  bestUse, vibratingConveyorTypes,
} from "../vibrating-conveyor-calc.js";

describe("capacity", () => {
  it("brute force highest capacity", () => {
    expect(capacity("brute_force_unbalanced")).toBeGreaterThan(capacity("electromagnetic_drive"));
  });
});

describe("control", () => {
  it("electromagnetic best control", () => {
    expect(control("electromagnetic_drive")).toBeGreaterThan(control("brute_force_unbalanced"));
  });
});

describe("energyUse", () => {
  it("natural frequency most energy efficient", () => {
    expect(energyUse("natural_frequency_tuned")).toBeGreaterThan(energyUse("brute_force_unbalanced"));
  });
});

describe("dustFree", () => {
  it("linear resonant best dust free", () => {
    expect(dustFree("linear_resonant_spring")).toBeGreaterThan(dustFree("brute_force_unbalanced"));
  });
});

describe("vcCost", () => {
  it("natural frequency most expensive", () => {
    expect(vcCost("natural_frequency_tuned")).toBeGreaterThan(vcCost("brute_force_unbalanced"));
  });
});

describe("screenCapable", () => {
  it("electromagnetic is screen capable", () => {
    expect(screenCapable("electromagnetic_drive")).toBe(true);
  });
  it("brute force not screen capable", () => {
    expect(screenCapable("brute_force_unbalanced")).toBe(false);
  });
});

describe("forHot", () => {
  it("electromechanical for hot materials", () => {
    expect(forHot("electromechanical_eccentric")).toBe(true);
  });
  it("electromagnetic not for hot", () => {
    expect(forHot("electromagnetic_drive")).toBe(false);
  });
});

describe("drive", () => {
  it("linear resonant uses spring drive", () => {
    expect(drive("linear_resonant_spring")).toBe("linear_spring_drive_low_stroke_high_freq");
  });
});

describe("bestUse", () => {
  it("brute force for mining quarry", () => {
    expect(bestUse("brute_force_unbalanced")).toBe("rugged_mining_quarry_heavy_lump_rock");
  });
});

describe("vibratingConveyorTypes", () => {
  it("returns 5 types", () => {
    expect(vibratingConveyorTypes()).toHaveLength(5);
  });
});
