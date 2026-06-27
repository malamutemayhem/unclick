import { describe, it, expect } from "vitest";
import {
  muscleRelease, comfortLevel, durability, portability,
  rollerCost, waterResistant, hasVibration, surfaceType,
  bestUse, foamRollers,
} from "../foam-roller-calc.js";

describe("muscleRelease", () => {
  it("vibrating electric best muscle release", () => {
    expect(muscleRelease("vibrating_electric")).toBeGreaterThan(muscleRelease("smooth_epe"));
  });
});

describe("comfortLevel", () => {
  it("smooth epe most comfortable", () => {
    expect(comfortLevel("smooth_epe")).toBeGreaterThan(comfortLevel("firm_pvc_core"));
  });
});

describe("durability", () => {
  it("firm pvc core most durable", () => {
    expect(durability("firm_pvc_core")).toBeGreaterThan(durability("smooth_epe"));
  });
});

describe("portability", () => {
  it("travel collapsible most portable", () => {
    expect(portability("travel_collapsible")).toBeGreaterThan(portability("firm_pvc_core"));
  });
});

describe("rollerCost", () => {
  it("vibrating electric most expensive", () => {
    expect(rollerCost("vibrating_electric")).toBeGreaterThan(rollerCost("smooth_epe"));
  });
});

describe("waterResistant", () => {
  it("textured grid is water resistant", () => {
    expect(waterResistant("textured_grid")).toBe(true);
  });
  it("smooth epe is not", () => {
    expect(waterResistant("smooth_epe")).toBe(false);
  });
});

describe("hasVibration", () => {
  it("vibrating electric has vibration", () => {
    expect(hasVibration("vibrating_electric")).toBe(true);
  });
  it("textured grid does not", () => {
    expect(hasVibration("textured_grid")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("textured grid uses multi zone ridge grid", () => {
    expect(surfaceType("textured_grid")).toBe("multi_zone_ridge_grid");
  });
});

describe("bestUse", () => {
  it("smooth epe for beginner gentle recovery", () => {
    expect(bestUse("smooth_epe")).toBe("beginner_gentle_recovery");
  });
});

describe("foamRollers", () => {
  it("returns 5 types", () => {
    expect(foamRollers()).toHaveLength(5);
  });
});
