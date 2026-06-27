import { describe, it, expect } from "vitest";
import {
  uniformity, throughput, gentleness, fillLevel,
  rbCost, continuous, forPowder, agitator,
  bestUse, ribbonBlendTypes,
} from "../ribbon-blend-calc.js";

describe("uniformity", () => {
  it("double ribbon high uniformity", () => {
    expect(uniformity("double_ribbon_horizontal")).toBeGreaterThan(uniformity("single_ribbon_light"));
  });
});

describe("throughput", () => {
  it("continuous ribbon highest throughput", () => {
    expect(throughput("continuous_ribbon_flow")).toBeGreaterThan(throughput("vacuum_ribbon_degas"));
  });
});

describe("gentleness", () => {
  it("vacuum ribbon most gentle", () => {
    expect(gentleness("vacuum_ribbon_degas")).toBeGreaterThan(gentleness("paddle_ribbon_hybrid"));
  });
});

describe("fillLevel", () => {
  it("paddle ribbon hybrid best fill level", () => {
    expect(fillLevel("paddle_ribbon_hybrid")).toBeGreaterThan(fillLevel("continuous_ribbon_flow"));
  });
});

describe("rbCost", () => {
  it("vacuum ribbon most expensive", () => {
    expect(rbCost("vacuum_ribbon_degas")).toBeGreaterThan(rbCost("single_ribbon_light"));
  });
});

describe("continuous", () => {
  it("continuous ribbon is continuous", () => {
    expect(continuous("continuous_ribbon_flow")).toBe(true);
  });
  it("double ribbon not continuous", () => {
    expect(continuous("double_ribbon_horizontal")).toBe(false);
  });
});

describe("forPowder", () => {
  it("double ribbon for powder", () => {
    expect(forPowder("double_ribbon_horizontal")).toBe(true);
  });
  it("vacuum ribbon not for powder", () => {
    expect(forPowder("vacuum_ribbon_degas")).toBe(false);
  });
});

describe("agitator", () => {
  it("double ribbon uses inner outer counter spiral", () => {
    expect(agitator("double_ribbon_horizontal")).toBe("inner_outer_ribbon_counter_spiral");
  });
});

describe("bestUse", () => {
  it("vacuum ribbon for paste adhesive degas", () => {
    expect(bestUse("vacuum_ribbon_degas")).toBe("paste_adhesive_degas_solvent_recov");
  });
});

describe("ribbonBlendTypes", () => {
  it("returns 5 types", () => {
    expect(ribbonBlendTypes()).toHaveLength(5);
  });
});
