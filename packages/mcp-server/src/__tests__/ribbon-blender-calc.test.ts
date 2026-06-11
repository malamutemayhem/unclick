import { describe, it, expect } from "vitest";
import {
  mixQuality, batchSize, discharge, cleanability,
  rbCost, continuous, forPowder, ribbon,
  bestUse, ribbonBlenderTypes,
} from "../ribbon-blender-calc.js";

describe("mixQuality", () => {
  it("double ribbon best mix quality", () => {
    expect(mixQuality("double_ribbon_intensive")).toBeGreaterThan(mixQuality("continuous_ribbon_flow"));
  });
});

describe("batchSize", () => {
  it("continuous ribbon largest batch", () => {
    expect(batchSize("continuous_ribbon_flow")).toBeGreaterThan(batchSize("vacuum_ribbon_deaerate"));
  });
});

describe("discharge", () => {
  it("continuous ribbon fastest discharge", () => {
    expect(discharge("continuous_ribbon_flow")).toBeGreaterThan(discharge("vacuum_ribbon_deaerate"));
  });
});

describe("cleanability", () => {
  it("paddle ribbon hybrid easiest to clean", () => {
    expect(cleanability("paddle_ribbon_hybrid")).toBeGreaterThan(cleanability("continuous_ribbon_flow"));
  });
});

describe("rbCost", () => {
  it("vacuum ribbon most expensive", () => {
    expect(rbCost("vacuum_ribbon_deaerate")).toBeGreaterThan(rbCost("single_ribbon_standard"));
  });
});

describe("continuous", () => {
  it("continuous ribbon is continuous", () => {
    expect(continuous("continuous_ribbon_flow")).toBe(true);
  });
  it("single ribbon not continuous", () => {
    expect(continuous("single_ribbon_standard")).toBe(false);
  });
});

describe("forPowder", () => {
  it("all ribbon blenders for powder", () => {
    expect(forPowder("single_ribbon_standard")).toBe(true);
    expect(forPowder("double_ribbon_intensive")).toBe(true);
  });
});

describe("ribbon", () => {
  it("vacuum ribbon uses sealed vessel", () => {
    expect(ribbon("vacuum_ribbon_deaerate")).toBe("sealed_vessel_vacuum_deaerate_ribbon");
  });
});

describe("bestUse", () => {
  it("double ribbon for cohesive powder", () => {
    expect(bestUse("double_ribbon_intensive")).toBe("cohesive_powder_intensive_mix_uniform");
  });
});

describe("ribbonBlenderTypes", () => {
  it("returns 5 types", () => {
    expect(ribbonBlenderTypes()).toHaveLength(5);
  });
});
