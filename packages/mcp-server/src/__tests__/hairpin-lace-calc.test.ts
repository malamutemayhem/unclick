import { describe, it, expect } from "vitest";
import {
  widthRange, loopConsist, speedWork, portability,
  laceCost, adjustable, forBeginner, loomFrame,
  bestUse, hairpinLaces,
} from "../hairpin-lace-calc.js";

describe("widthRange", () => {
  it("adjustable loom wide widest range", () => {
    expect(widthRange("adjustable_loom_wide")).toBeGreaterThan(widthRange("mini_loom_narrow"));
  });
});

describe("loopConsist", () => {
  it("fixed loom standard most consistent loops", () => {
    expect(loopConsist("fixed_loom_standard")).toBeGreaterThan(loopConsist("metal_fork_classic"));
  });
});

describe("speedWork", () => {
  it("mini loom narrow fastest work", () => {
    expect(speedWork("mini_loom_narrow")).toBeGreaterThan(speedWork("metal_fork_classic"));
  });
});

describe("portability", () => {
  it("mini loom narrow most portable", () => {
    expect(portability("mini_loom_narrow")).toBeGreaterThan(portability("adjustable_loom_wide"));
  });
});

describe("laceCost", () => {
  it("ergonomic loom comfort most expensive", () => {
    expect(laceCost("ergonomic_loom_comfort")).toBeGreaterThan(laceCost("metal_fork_classic"));
  });
});

describe("adjustable", () => {
  it("adjustable loom wide is adjustable", () => {
    expect(adjustable("adjustable_loom_wide")).toBe(true);
  });
  it("fixed loom standard not adjustable", () => {
    expect(adjustable("fixed_loom_standard")).toBe(false);
  });
});

describe("forBeginner", () => {
  it("fixed loom standard is for beginner", () => {
    expect(forBeginner("fixed_loom_standard")).toBe(true);
  });
  it("metal fork classic not for beginner", () => {
    expect(forBeginner("metal_fork_classic")).toBe(false);
  });
});

describe("loomFrame", () => {
  it("mini loom narrow uses compact prong frame", () => {
    expect(loomFrame("mini_loom_narrow")).toBe("compact_prong_frame");
  });
});

describe("bestUse", () => {
  it("fixed loom standard best for general hairpin strip", () => {
    expect(bestUse("fixed_loom_standard")).toBe("general_hairpin_strip");
  });
});

describe("hairpinLaces", () => {
  it("returns 5 types", () => {
    expect(hairpinLaces()).toHaveLength(5);
  });
});
