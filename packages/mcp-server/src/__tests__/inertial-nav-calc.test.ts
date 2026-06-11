import { describe, it, expect } from "vitest";
import {
  biasStability, arw, scaleFactor, surviveShock,
  navCost, gpsAided, forMilitary, gyroType,
  bestUse, inertialNavs,
} from "../inertial-nav-calc.js";

describe("biasStability", () => {
  it("strategic hemis best bias stability", () => {
    expect(biasStability("strategic_hemis")).toBeGreaterThan(biasStability("consumer_mems_6dof"));
  });
});

describe("arw", () => {
  it("strategic hemis best arw", () => {
    expect(arw("strategic_hemis")).toBeGreaterThan(arw("consumer_mems_6dof"));
  });
});

describe("scaleFactor", () => {
  it("strategic hemis best scale factor", () => {
    expect(scaleFactor("strategic_hemis")).toBeGreaterThan(scaleFactor("consumer_mems_6dof"));
  });
});

describe("surviveShock", () => {
  it("mems aided gnss best shock survival", () => {
    expect(surviveShock("mems_aided_gnss")).toBeGreaterThan(surviveShock("strategic_hemis"));
  });
});

describe("navCost", () => {
  it("strategic hemis most expensive", () => {
    expect(navCost("strategic_hemis")).toBeGreaterThan(navCost("consumer_mems_6dof"));
  });
});

describe("gpsAided", () => {
  it("mems aided gnss is gps aided", () => {
    expect(gpsAided("mems_aided_gnss")).toBe(true);
  });
  it("navigation rlg not gps aided", () => {
    expect(gpsAided("navigation_rlg")).toBe(false);
  });
});

describe("forMilitary", () => {
  it("tactical fog is for military", () => {
    expect(forMilitary("tactical_fog")).toBe(true);
  });
  it("consumer mems 6dof not for military", () => {
    expect(forMilitary("consumer_mems_6dof")).toBe(false);
  });
});

describe("gyroType", () => {
  it("strategic hemis uses hemispherical resonator", () => {
    expect(gyroType("strategic_hemis")).toBe("hemispherical_resonator");
  });
});

describe("bestUse", () => {
  it("strategic hemis best for submarine strategic nav", () => {
    expect(bestUse("strategic_hemis")).toBe("submarine_strategic_nav");
  });
});

describe("inertialNavs", () => {
  it("returns 5 types", () => {
    expect(inertialNavs()).toHaveLength(5);
  });
});
