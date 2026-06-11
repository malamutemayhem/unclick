import { describe, it, expect } from "vitest";
import {
  comfort, support, durability, recovery,
  fillCost, natural, hypoallergenic, fillDensity,
  bestUse, cushionFills,
} from "../cushion-fill-calc.js";

describe("comfort", () => {
  it("down feather luxury most comfortable", () => {
    expect(comfort("down_feather_luxury")).toBeGreaterThan(comfort("polyester_fiber_budget"));
  });
});

describe("support", () => {
  it("latex foam firm best support", () => {
    expect(support("latex_foam_firm")).toBeGreaterThan(support("down_feather_luxury"));
  });
});

describe("durability", () => {
  it("latex foam firm most durable", () => {
    expect(durability("latex_foam_firm")).toBeGreaterThan(durability("down_feather_luxury"));
  });
});

describe("recovery", () => {
  it("latex foam firm best recovery", () => {
    expect(recovery("latex_foam_firm")).toBeGreaterThan(recovery("polyester_fiber_budget"));
  });
});

describe("fillCost", () => {
  it("down feather luxury most expensive", () => {
    expect(fillCost("down_feather_luxury")).toBeGreaterThan(fillCost("polyester_fiber_budget"));
  });
});

describe("natural", () => {
  it("down feather luxury is natural", () => {
    expect(natural("down_feather_luxury")).toBe(true);
  });
  it("foam block standard not natural", () => {
    expect(natural("foam_block_standard")).toBe(false);
  });
});

describe("hypoallergenic", () => {
  it("foam block standard is hypoallergenic", () => {
    expect(hypoallergenic("foam_block_standard")).toBe(true);
  });
  it("down feather luxury not hypoallergenic", () => {
    expect(hypoallergenic("down_feather_luxury")).toBe(false);
  });
});

describe("fillDensity", () => {
  it("spring down combo uses spring core down wrap", () => {
    expect(fillDensity("spring_down_combo")).toBe("spring_core_down_wrap");
  });
});

describe("bestUse", () => {
  it("foam block standard best for general seat cushion", () => {
    expect(bestUse("foam_block_standard")).toBe("general_seat_cushion");
  });
});

describe("cushionFills", () => {
  it("returns 5 types", () => {
    expect(cushionFills()).toHaveLength(5);
  });
});
