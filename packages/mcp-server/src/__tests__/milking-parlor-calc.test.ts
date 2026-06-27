import { describe, it, expect } from "vitest";
import {
  throughput, laborEfficiency, cowComfort, milkQuality,
  mpCost, automated, forLargeHerd, system,
  bestUse, milkingParlorTypes,
} from "../milking-parlor-calc.js";

describe("throughput", () => {
  it("rotary platform highest throughput", () => {
    expect(throughput("rotary_platform")).toBeGreaterThan(throughput("swing_over"));
  });
});

describe("laborEfficiency", () => {
  it("robotic ams most labor efficient", () => {
    expect(laborEfficiency("robotic_ams")).toBeGreaterThan(laborEfficiency("herringbone"));
  });
});

describe("cowComfort", () => {
  it("robotic ams best cow comfort", () => {
    expect(cowComfort("robotic_ams")).toBeGreaterThan(cowComfort("herringbone"));
  });
});

describe("milkQuality", () => {
  it("robotic ams highest milk quality", () => {
    expect(milkQuality("robotic_ams")).toBeGreaterThan(milkQuality("herringbone"));
  });
});

describe("mpCost", () => {
  it("robotic ams most expensive", () => {
    expect(mpCost("robotic_ams")).toBeGreaterThan(mpCost("swing_over"));
  });
});

describe("automated", () => {
  it("robotic ams is automated", () => {
    expect(automated("robotic_ams")).toBe(true);
  });
  it("herringbone not automated", () => {
    expect(automated("herringbone")).toBe(false);
  });
});

describe("forLargeHerd", () => {
  it("rotary platform for large herd", () => {
    expect(forLargeHerd("rotary_platform")).toBe(true);
  });
  it("swing over not for large herd", () => {
    expect(forLargeHerd("swing_over")).toBe(false);
  });
});

describe("system", () => {
  it("robotic ams uses robotic arm laser teat finder", () => {
    expect(system("robotic_ams")).toBe("robotic_arm_laser_teat_finder_voluntary_milking_24_7");
  });
});

describe("bestUse", () => {
  it("swing over for small dairy family farm", () => {
    expect(bestUse("swing_over")).toBe("small_dairy_under_100_cow_family_farm_low_capital_start");
  });
});

describe("milkingParlorTypes", () => {
  it("returns 5 types", () => {
    expect(milkingParlorTypes()).toHaveLength(5);
  });
});
