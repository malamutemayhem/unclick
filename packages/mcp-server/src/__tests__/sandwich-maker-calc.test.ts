import { describe, it, expect } from "vitest";
import {
  sealQuality, fillingCapacity, versatility, compactSize,
  makerCost, swapPlates, autoShutoff, plateShape,
  bestUse, sandwichMakers,
} from "../sandwich-maker-calc.js";

describe("sealQuality", () => {
  it("triangle seal cut best seal", () => {
    expect(sealQuality("triangle_seal_cut")).toBeGreaterThan(sealQuality("flat_square_grill"));
  });
});

describe("fillingCapacity", () => {
  it("deep fill pocket most filling capacity", () => {
    expect(fillingCapacity("deep_fill_pocket")).toBeGreaterThan(fillingCapacity("triangle_seal_cut"));
  });
});

describe("versatility", () => {
  it("waffle plate combo most versatile", () => {
    expect(versatility("waffle_plate_combo")).toBeGreaterThan(versatility("triangle_seal_cut"));
  });
});

describe("compactSize", () => {
  it("triangle seal cut most compact", () => {
    expect(compactSize("triangle_seal_cut")).toBeGreaterThan(compactSize("commercial_conveyor_toast"));
  });
});

describe("makerCost", () => {
  it("commercial conveyor toast most expensive", () => {
    expect(makerCost("commercial_conveyor_toast")).toBeGreaterThan(makerCost("triangle_seal_cut"));
  });
});

describe("swapPlates", () => {
  it("waffle plate combo can swap plates", () => {
    expect(swapPlates("waffle_plate_combo")).toBe(true);
  });
  it("triangle seal cut cannot", () => {
    expect(swapPlates("triangle_seal_cut")).toBe(false);
  });
});

describe("autoShutoff", () => {
  it("deep fill pocket has auto shutoff", () => {
    expect(autoShutoff("deep_fill_pocket")).toBe(true);
  });
  it("triangle seal cut does not", () => {
    expect(autoShutoff("triangle_seal_cut")).toBe(false);
  });
});

describe("plateShape", () => {
  it("triangle seal cut uses diagonal triangle sealed", () => {
    expect(plateShape("triangle_seal_cut")).toBe("diagonal_triangle_sealed");
  });
});

describe("bestUse", () => {
  it("deep fill pocket best for loaded filling no leak", () => {
    expect(bestUse("deep_fill_pocket")).toBe("loaded_filling_no_leak");
  });
});

describe("sandwichMakers", () => {
  it("returns 5 types", () => {
    expect(sandwichMakers()).toHaveLength(5);
  });
});
