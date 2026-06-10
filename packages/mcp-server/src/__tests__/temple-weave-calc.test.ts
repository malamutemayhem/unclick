import { describe, it, expect } from "vitest";
import {
  widthHold, fabricSafe, adjustRange, easeOfUse,
  templeCost, marksFabric, forWide, gripType,
  bestUse, templeWeaves,
} from "../temple-weave-calc.js";

describe("widthHold", () => {
  it("skeletal wide span best width hold", () => {
    expect(widthHold("skeletal_wide_span")).toBeGreaterThan(widthHold("clip_on_narrow"));
  });
});

describe("fabricSafe", () => {
  it("rubber grip roll most fabric safe", () => {
    expect(fabricSafe("rubber_grip_roll")).toBeGreaterThan(fabricSafe("steel_pin_expand"));
  });
});

describe("adjustRange", () => {
  it("skeletal wide span widest adjust range", () => {
    expect(adjustRange("skeletal_wide_span")).toBeGreaterThan(adjustRange("clip_on_narrow"));
  });
});

describe("easeOfUse", () => {
  it("clip on narrow easiest to use", () => {
    expect(easeOfUse("clip_on_narrow")).toBeGreaterThan(easeOfUse("skeletal_wide_span"));
  });
});

describe("templeCost", () => {
  it("skeletal wide span most expensive", () => {
    expect(templeCost("skeletal_wide_span")).toBeGreaterThan(templeCost("wood_peg_clamp"));
  });
});

describe("marksFabric", () => {
  it("steel pin expand marks fabric", () => {
    expect(marksFabric("steel_pin_expand")).toBe(true);
  });
  it("rubber grip roll does not mark fabric", () => {
    expect(marksFabric("rubber_grip_roll")).toBe(false);
  });
});

describe("forWide", () => {
  it("skeletal wide span is for wide", () => {
    expect(forWide("skeletal_wide_span")).toBe(true);
  });
  it("clip on narrow not for wide", () => {
    expect(forWide("clip_on_narrow")).toBe(false);
  });
});

describe("gripType", () => {
  it("rubber grip roll uses rubber coated roller", () => {
    expect(gripType("rubber_grip_roll")).toBe("rubber_coated_roller");
  });
});

describe("bestUse", () => {
  it("skeletal wide span best for wide rug weave", () => {
    expect(bestUse("skeletal_wide_span")).toBe("wide_rug_weave");
  });
});

describe("templeWeaves", () => {
  it("returns 5 types", () => {
    expect(templeWeaves()).toHaveLength(5);
  });
});
