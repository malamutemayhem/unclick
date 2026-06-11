import { describe, it, expect } from "vitest";
import {
  supportFirm, comfortSoft, durability, recoverySpeed,
  foamCost, memory, rebond, cellStructure,
  bestUse, foamDensitys,
} from "../foam-density-calc.js";

describe("supportFirm", () => {
  it("high resilience firm firmest support", () => {
    expect(supportFirm("high_resilience_firm")).toBeGreaterThan(supportFirm("soft_cushion_comfort"));
  });
});

describe("comfortSoft", () => {
  it("soft cushion comfort softest comfort", () => {
    expect(comfortSoft("soft_cushion_comfort")).toBeGreaterThan(comfortSoft("high_resilience_firm"));
  });
});

describe("durability", () => {
  it("high resilience firm most durable", () => {
    expect(durability("high_resilience_firm")).toBeGreaterThan(durability("soft_cushion_comfort"));
  });
});

describe("recoverySpeed", () => {
  it("high resilience firm fastest recovery", () => {
    expect(recoverySpeed("high_resilience_firm")).toBeGreaterThan(recoverySpeed("memory_foam_contour"));
  });
});

describe("foamCost", () => {
  it("memory foam contour most expensive", () => {
    expect(foamCost("memory_foam_contour")).toBeGreaterThan(foamCost("rebond_pad_budget"));
  });
});

describe("memory", () => {
  it("memory foam contour is memory", () => {
    expect(memory("memory_foam_contour")).toBe(true);
  });
  it("high resilience firm not memory", () => {
    expect(memory("high_resilience_firm")).toBe(false);
  });
});

describe("rebond", () => {
  it("rebond pad budget is rebond", () => {
    expect(rebond("rebond_pad_budget")).toBe(true);
  });
  it("high resilience firm not rebond", () => {
    expect(rebond("high_resilience_firm")).toBe(false);
  });
});

describe("cellStructure", () => {
  it("memory foam contour uses viscoelastic cell", () => {
    expect(cellStructure("memory_foam_contour")).toBe("viscoelastic_cell");
  });
});

describe("bestUse", () => {
  it("medium density general best for general cushion fill", () => {
    expect(bestUse("medium_density_general")).toBe("general_cushion_fill");
  });
});

describe("foamDensitys", () => {
  it("returns 5 types", () => {
    expect(foamDensitys()).toHaveLength(5);
  });
});
