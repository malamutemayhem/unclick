import { describe, it, expect } from "vitest";
import {
  holdStrength, flexibility, heatTolerance, reusability,
  wireCost, pickleSafe, selfAnnealing, wireAlloy,
  bestUse, bindingWires,
} from "../binding-wire-calc.js";

describe("holdStrength", () => {
  it("steel spring hold strongest hold", () => {
    expect(holdStrength("steel_spring_hold")).toBeGreaterThan(holdStrength("copper_tack_solder"));
  });
});

describe("flexibility", () => {
  it("iron soft anneal most flexible", () => {
    expect(flexibility("iron_soft_anneal")).toBeGreaterThan(flexibility("steel_spring_hold"));
  });
});

describe("heatTolerance", () => {
  it("nichrome heat resist best heat tolerance", () => {
    expect(heatTolerance("nichrome_heat_resist")).toBeGreaterThan(heatTolerance("copper_tack_solder"));
  });
});

describe("reusability", () => {
  it("nichrome heat resist most reusable", () => {
    expect(reusability("nichrome_heat_resist")).toBeGreaterThan(reusability("copper_tack_solder"));
  });
});

describe("wireCost", () => {
  it("nichrome heat resist more expensive", () => {
    expect(wireCost("nichrome_heat_resist")).toBeGreaterThan(wireCost("iron_soft_anneal"));
  });
});

describe("pickleSafe", () => {
  it("stainless pickle safe is pickle safe", () => {
    expect(pickleSafe("stainless_pickle_safe")).toBe(true);
  });
  it("iron soft anneal not pickle safe", () => {
    expect(pickleSafe("iron_soft_anneal")).toBe(false);
  });
});

describe("selfAnnealing", () => {
  it("iron soft anneal is self annealing", () => {
    expect(selfAnnealing("iron_soft_anneal")).toBe(true);
  });
  it("steel spring hold not self annealing", () => {
    expect(selfAnnealing("steel_spring_hold")).toBe(false);
  });
});

describe("wireAlloy", () => {
  it("iron soft anneal uses dead soft iron", () => {
    expect(wireAlloy("iron_soft_anneal")).toBe("dead_soft_iron");
  });
});

describe("bestUse", () => {
  it("nichrome heat resist best for kiln fire support", () => {
    expect(bestUse("nichrome_heat_resist")).toBe("kiln_fire_support");
  });
});

describe("bindingWires", () => {
  it("returns 5 types", () => {
    expect(bindingWires()).toHaveLength(5);
  });
});
