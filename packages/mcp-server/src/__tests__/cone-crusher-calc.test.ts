import { describe, it, expect } from "vitest";
import {
  capacity, productShape, reductionRatio, automation,
  ccCost, hydraulic, forFine, mantle,
  bestUse, coneCrusherTypes,
} from "../cone-crusher-calc.js";

describe("capacity", () => {
  it("hydraulic cone highest capacity", () => {
    expect(capacity("hydraulic_cone_auto")).toBeGreaterThan(capacity("gyradisc_fine_crush"));
  });
});

describe("productShape", () => {
  it("gyradisc best product shape", () => {
    expect(productShape("gyradisc_fine_crush")).toBeGreaterThan(productShape("spring_cone_legacy"));
  });
});

describe("reductionRatio", () => {
  it("gyradisc best reduction ratio", () => {
    expect(reductionRatio("gyradisc_fine_crush")).toBeGreaterThan(reductionRatio("spring_cone_legacy"));
  });
});

describe("automation", () => {
  it("hydraulic cone best automation", () => {
    expect(automation("hydraulic_cone_auto")).toBeGreaterThan(automation("spring_cone_legacy"));
  });
});

describe("ccCost", () => {
  it("hydraulic cone most expensive", () => {
    expect(ccCost("hydraulic_cone_auto")).toBeGreaterThan(ccCost("spring_cone_legacy"));
  });
});

describe("hydraulic", () => {
  it("hydraulic cone is hydraulic", () => {
    expect(hydraulic("hydraulic_cone_auto")).toBe(true);
  });
  it("spring cone not hydraulic", () => {
    expect(hydraulic("spring_cone_legacy")).toBe(false);
  });
});

describe("forFine", () => {
  it("short head for fine crushing", () => {
    expect(forFine("short_head_tertiary")).toBe(true);
  });
  it("standard head not for fine", () => {
    expect(forFine("standard_head_secondary")).toBe(false);
  });
});

describe("mantle", () => {
  it("spring cone uses mechanical release", () => {
    expect(mantle("spring_cone_legacy")).toBe("spring_loaded_mantle_mechanical_release");
  });
});

describe("bestUse", () => {
  it("hydraulic cone for large mine", () => {
    expect(bestUse("hydraulic_cone_auto")).toBe("high_capacity_auto_adjust_large_mine");
  });
});

describe("coneCrusherTypes", () => {
  it("returns 5 types", () => {
    expect(coneCrusherTypes()).toHaveLength(5);
  });
});
