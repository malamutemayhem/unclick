import { describe, it, expect } from "vitest";
import {
  colorDepth, washFast, levelAbility, lightFast,
  dyeCost, forProtein, needsHeat, dyeBase,
  bestFiber, acidDyes,
} from "../acid-dye-calc.js";

describe("colorDepth", () => {
  it("super milling intense deepest color", () => {
    expect(colorDepth("super_milling_intense")).toBeGreaterThan(colorDepth("leveling_even_wash"));
  });
});

describe("washFast", () => {
  it("pre metalized strong best wash fastness", () => {
    expect(washFast("pre_metalized_strong")).toBeGreaterThan(washFast("leveling_even_wash"));
  });
});

describe("levelAbility", () => {
  it("leveling even wash best leveling", () => {
    expect(levelAbility("leveling_even_wash")).toBeGreaterThan(levelAbility("super_milling_intense"));
  });
});

describe("lightFast", () => {
  it("metal complex light best light fastness", () => {
    expect(lightFast("metal_complex_light")).toBeGreaterThan(lightFast("leveling_even_wash"));
  });
});

describe("dyeCost", () => {
  it("pre metalized strong most expensive", () => {
    expect(dyeCost("pre_metalized_strong")).toBeGreaterThan(dyeCost("leveling_even_wash"));
  });
});

describe("forProtein", () => {
  it("leveling even wash is for protein", () => {
    expect(forProtein("leveling_even_wash")).toBe(true);
  });
  it("super milling intense is for protein", () => {
    expect(forProtein("super_milling_intense")).toBe(true);
  });
});

describe("needsHeat", () => {
  it("milling deep fast needs heat", () => {
    expect(needsHeat("milling_deep_fast")).toBe(true);
  });
  it("metal complex light does not need heat", () => {
    expect(needsHeat("metal_complex_light")).toBe(false);
  });
});

describe("dyeBase", () => {
  it("metal complex light uses chromium complex 1to1", () => {
    expect(dyeBase("metal_complex_light")).toBe("chromium_complex_1to1");
  });
});

describe("bestFiber", () => {
  it("leveling even wash best for wool silk even tone", () => {
    expect(bestFiber("leveling_even_wash")).toBe("wool_silk_even_tone");
  });
});

describe("acidDyes", () => {
  it("returns 5 types", () => {
    expect(acidDyes()).toHaveLength(5);
  });
});
