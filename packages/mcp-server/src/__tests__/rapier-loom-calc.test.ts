import { describe, it, expect } from "vitest";
import {
  weftRange, throughput, fabricWidth, yarnGentleness,
  rlCost, versatile, forTerry, loomConfig,
  bestUse, rapierLoomTypes,
} from "../rapier-loom-calc.js";

describe("weftRange", () => {
  it("double rapier best weft range", () => {
    expect(weftRange("double_rapier")).toBeGreaterThan(weftRange("single_rapier"));
  });
});

describe("throughput", () => {
  it("rigid rapier highest throughput", () => {
    expect(throughput("rigid_rapier")).toBeGreaterThan(throughput("single_rapier"));
  });
});

describe("fabricWidth", () => {
  it("flexible rapier widest fabric", () => {
    expect(fabricWidth("flexible_rapier")).toBeGreaterThan(fabricWidth("rigid_rapier"));
  });
});

describe("yarnGentleness", () => {
  it("double rapier most gentle on yarn", () => {
    expect(yarnGentleness("double_rapier")).toBeGreaterThan(yarnGentleness("rigid_rapier"));
  });
});

describe("rlCost", () => {
  it("telescopic rapier most expensive", () => {
    expect(rlCost("telescopic_rapier")).toBeGreaterThan(rlCost("single_rapier"));
  });
});

describe("versatile", () => {
  it("double rapier is versatile", () => {
    expect(versatile("double_rapier")).toBe(true);
  });
  it("rigid rapier not versatile", () => {
    expect(versatile("rigid_rapier")).toBe(false);
  });
});

describe("forTerry", () => {
  it("double rapier for terry", () => {
    expect(forTerry("double_rapier")).toBe(true);
  });
  it("single rapier not for terry", () => {
    expect(forTerry("single_rapier")).toBe(false);
  });
});

describe("loomConfig", () => {
  it("flexible rapier uses tape coil guide wheel", () => {
    expect(loomConfig("flexible_rapier")).toBe("flexible_rapier_loom_tape_coil_guide_wheel_wide_fabric_insert");
  });
});

describe("bestUse", () => {
  it("rigid rapier for high speed narrow commodity", () => {
    expect(bestUse("rigid_rapier")).toBe("high_speed_narrow_rigid_rapier_loom_fast_precise_commodity_fabric");
  });
});

describe("rapierLoomTypes", () => {
  it("returns 5 types", () => {
    expect(rapierLoomTypes()).toHaveLength(5);
  });
});
