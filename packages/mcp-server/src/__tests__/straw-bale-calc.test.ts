import { describe, it, expect } from "vitest";
import {
  baleSizeCm, densityKgPerM3, rValuePerCm, balesPerM2Wall,
  moistureMaxPercent, fireResistanceHours, pinSpacingCm,
  compressionPercent, costPerBale, baleTypes,
} from "../straw-bale-calc.js";

describe("baleSizeCm", () => {
  it("jumbo is largest", () => {
    expect(baleSizeCm("jumbo").l).toBeGreaterThan(
      baleSizeCm("two_string").l
    );
  });
});

describe("densityKgPerM3", () => {
  it("jumbo is densest", () => {
    expect(densityKgPerM3("jumbo")).toBeGreaterThan(
      densityKgPerM3("rice_straw")
    );
  });
});

describe("rValuePerCm", () => {
  it("rice straw insulates best", () => {
    expect(rValuePerCm("rice_straw")).toBeGreaterThan(
      rValuePerCm("jumbo")
    );
  });
});

describe("balesPerM2Wall", () => {
  it("jumbo needs fewest bales", () => {
    expect(balesPerM2Wall("jumbo")).toBeLessThan(
      balesPerM2Wall("two_string")
    );
  });
});

describe("moistureMaxPercent", () => {
  it("returns 20", () => {
    expect(moistureMaxPercent()).toBe(20);
  });
});

describe("fireResistanceHours", () => {
  it("returns 2", () => {
    expect(fireResistanceHours()).toBe(2);
  });
});

describe("pinSpacingCm", () => {
  it("returns 60", () => {
    expect(pinSpacingCm()).toBe(60);
  });
});

describe("compressionPercent", () => {
  it("rice straw compresses most", () => {
    expect(compressionPercent("rice_straw")).toBeGreaterThan(
      compressionPercent("jumbo")
    );
  });
});

describe("costPerBale", () => {
  it("jumbo is most expensive", () => {
    expect(costPerBale("jumbo")).toBeGreaterThan(
      costPerBale("rice_straw")
    );
  });
});

describe("baleTypes", () => {
  it("returns 5 types", () => {
    expect(baleTypes()).toHaveLength(5);
  });
});
