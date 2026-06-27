import { describe, it, expect } from "vitest";
import {
  wringing, cleanAbility, effortRequired, storageSize,
  mopCost, handsFree, reusablePad, headType,
  bestFloor, spinMops,
} from "../spin-mop-calc.js";

describe("wringing", () => {
  it("industrial wringer best wringing", () => {
    expect(wringing("industrial_wringer")).toBeGreaterThan(wringing("flat_mop_microfiber"));
  });
});

describe("cleanAbility", () => {
  it("electric spin spray best cleaning", () => {
    expect(cleanAbility("electric_spin_spray")).toBeGreaterThan(cleanAbility("self_wringing_twist"));
  });
});

describe("effortRequired", () => {
  it("industrial wringer most effort", () => {
    expect(effortRequired("industrial_wringer")).toBeGreaterThan(effortRequired("electric_spin_spray"));
  });
});

describe("storageSize", () => {
  it("flat mop microfiber smallest storage", () => {
    expect(storageSize("flat_mop_microfiber")).toBeGreaterThan(storageSize("industrial_wringer"));
  });
});

describe("mopCost", () => {
  it("electric spin spray most expensive", () => {
    expect(mopCost("electric_spin_spray")).toBeGreaterThan(mopCost("self_wringing_twist"));
  });
});

describe("handsFree", () => {
  it("pedal press bucket is hands free", () => {
    expect(handsFree("pedal_press_bucket")).toBe(true);
  });
  it("self wringing twist is not", () => {
    expect(handsFree("self_wringing_twist")).toBe(false);
  });
});

describe("reusablePad", () => {
  it("pedal press bucket has reusable pad", () => {
    expect(reusablePad("pedal_press_bucket")).toBe(true);
  });
  it("flat mop microfiber also has reusable pad", () => {
    expect(reusablePad("flat_mop_microfiber")).toBe(true);
  });
});

describe("headType", () => {
  it("electric spin spray uses dual pad motor spin", () => {
    expect(headType("electric_spin_spray")).toBe("dual_pad_motor_spin");
  });
});

describe("bestFloor", () => {
  it("industrial wringer for commercial warehouse", () => {
    expect(bestFloor("industrial_wringer")).toBe("commercial_warehouse");
  });
});

describe("spinMops", () => {
  it("returns 5 types", () => {
    expect(spinMops()).toHaveLength(5);
  });
});
