import { describe, it, expect } from "vitest";
import {
  strength, aesthetic, permeability, durability,
  pvCost, permeable, forVehicular, base,
  bestUse, paverTypeTypes,
} from "../paver-type-calc.js";

describe("strength", () => {
  it("concrete strongest", () => {
    expect(strength("concrete_interlocking")).toBeGreaterThan(strength("rubber_recycled_safety"));
  });
});

describe("aesthetic", () => {
  it("natural stone best aesthetic", () => {
    expect(aesthetic("natural_stone_flagstone")).toBeGreaterThan(aesthetic("rubber_recycled_safety"));
  });
});

describe("permeability", () => {
  it("permeable paver most permeable", () => {
    expect(permeability("permeable_open_joint")).toBeGreaterThan(permeability("concrete_interlocking"));
  });
});

describe("durability", () => {
  it("natural stone most durable", () => {
    expect(durability("natural_stone_flagstone")).toBeGreaterThan(durability("rubber_recycled_safety"));
  });
});

describe("pvCost", () => {
  it("natural stone most expensive", () => {
    expect(pvCost("natural_stone_flagstone")).toBeGreaterThan(pvCost("rubber_recycled_safety"));
  });
});

describe("permeable", () => {
  it("permeable paver is permeable", () => {
    expect(permeable("permeable_open_joint")).toBe(true);
  });
  it("concrete not permeable", () => {
    expect(permeable("concrete_interlocking")).toBe(false);
  });
});

describe("forVehicular", () => {
  it("concrete for vehicular", () => {
    expect(forVehicular("concrete_interlocking")).toBe(true);
  });
  it("clay brick not vehicular", () => {
    expect(forVehicular("clay_brick_traditional")).toBe(false);
  });
});

describe("base", () => {
  it("permeable uses open graded", () => {
    expect(base("permeable_open_joint")).toBe("open_graded_aggregate_no_fines");
  });
});

describe("bestUse", () => {
  it("rubber for playground", () => {
    expect(bestUse("rubber_recycled_safety")).toBe("playground_safety_surface");
  });
});

describe("paverTypeTypes", () => {
  it("returns 5 types", () => {
    expect(paverTypeTypes()).toHaveLength(5);
  });
});
