import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, noise, partLoad,
  rcCost, oilFree, forLargeChiller, mechanism,
  bestUse, refrigerantCompressorTypes,
} from "../refrigerant-compressor-calc.js";

describe("efficiency", () => {
  it("centrifugal most efficient", () => {
    expect(efficiency("centrifugal_turbo_impeller")).toBeGreaterThan(efficiency("reciprocating_piston"));
  });
});

describe("capacity", () => {
  it("centrifugal highest capacity", () => {
    expect(capacity("centrifugal_turbo_impeller")).toBeGreaterThan(capacity("linear_free_piston"));
  });
});

describe("noise", () => {
  it("linear free piston quietest", () => {
    expect(noise("linear_free_piston")).toBeGreaterThan(noise("reciprocating_piston"));
  });
});

describe("partLoad", () => {
  it("centrifugal best part load", () => {
    expect(partLoad("centrifugal_turbo_impeller")).toBeGreaterThan(partLoad("reciprocating_piston"));
  });
});

describe("rcCost", () => {
  it("centrifugal most expensive", () => {
    expect(rcCost("centrifugal_turbo_impeller")).toBeGreaterThan(rcCost("reciprocating_piston"));
  });
});

describe("oilFree", () => {
  it("centrifugal is oil free", () => {
    expect(oilFree("centrifugal_turbo_impeller")).toBe(true);
  });
  it("scroll not oil free", () => {
    expect(oilFree("scroll_orbital_pair")).toBe(false);
  });
});

describe("forLargeChiller", () => {
  it("screw for large chiller", () => {
    expect(forLargeChiller("screw_rotary_twin")).toBe(true);
  });
  it("scroll not for large chiller", () => {
    expect(forLargeChiller("scroll_orbital_pair")).toBe(false);
  });
});

describe("mechanism", () => {
  it("scroll uses orbital pair", () => {
    expect(mechanism("scroll_orbital_pair")).toBe("orbital_scroll_pair_hermetic");
  });
});

describe("bestUse", () => {
  it("centrifugal for district cooling", () => {
    expect(bestUse("centrifugal_turbo_impeller")).toBe("district_cooling_large_campus");
  });
});

describe("refrigerantCompressorTypes", () => {
  it("returns 5 types", () => {
    expect(refrigerantCompressorTypes()).toHaveLength(5);
  });
});
