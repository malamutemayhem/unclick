import { describe, it, expect } from "vitest";
import {
  strength, flexibility, smoothAction, sewEase,
  zipperCost, selfRepairing, separating, toothMaterial,
  bestGarment, zippers,
} from "../zipper-calc.js";

describe("strength", () => {
  it("metal tooth brass strongest", () => {
    expect(strength("metal_tooth_brass")).toBeGreaterThan(strength("invisible_concealed"));
  });
});

describe("flexibility", () => {
  it("coil nylon lightweight most flexible", () => {
    expect(flexibility("coil_nylon_lightweight")).toBeGreaterThan(flexibility("metal_tooth_brass"));
  });
});

describe("smoothAction", () => {
  it("coil nylon lightweight smoothest action", () => {
    expect(smoothAction("coil_nylon_lightweight")).toBeGreaterThan(smoothAction("waterproof_sealed_tape"));
  });
});

describe("sewEase", () => {
  it("coil nylon lightweight easiest to sew", () => {
    expect(sewEase("coil_nylon_lightweight")).toBeGreaterThan(sewEase("waterproof_sealed_tape"));
  });
});

describe("zipperCost", () => {
  it("waterproof sealed tape most expensive", () => {
    expect(zipperCost("waterproof_sealed_tape")).toBeGreaterThan(zipperCost("coil_nylon_lightweight"));
  });
});

describe("selfRepairing", () => {
  it("coil nylon lightweight is self repairing", () => {
    expect(selfRepairing("coil_nylon_lightweight")).toBe(true);
  });
  it("metal tooth brass is not", () => {
    expect(selfRepairing("metal_tooth_brass")).toBe(false);
  });
});

describe("separating", () => {
  it("metal tooth brass is separating", () => {
    expect(separating("metal_tooth_brass")).toBe(true);
  });
  it("invisible concealed is not", () => {
    expect(separating("invisible_concealed")).toBe(false);
  });
});

describe("toothMaterial", () => {
  it("metal tooth brass uses stamped brass nickel", () => {
    expect(toothMaterial("metal_tooth_brass")).toBe("stamped_brass_nickel");
  });
});

describe("bestGarment", () => {
  it("invisible concealed best for formal dress pillow", () => {
    expect(bestGarment("invisible_concealed")).toBe("formal_dress_pillow");
  });
});

describe("zippers", () => {
  it("returns 5 types", () => {
    expect(zippers()).toHaveLength(5);
  });
});
