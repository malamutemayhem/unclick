import { describe, it, expect } from "vitest";
import {
  cutDepth, controlFine, versatility, edgeHold,
  gougeCost, forRelief, bentShaft, steelType,
  bestUse, carvingGouges,
} from "../carving-gouge-calc.js";

describe("cutDepth", () => {
  it("sweep 11 deep deepest cut", () => {
    expect(cutDepth("sweep_11_deep")).toBeGreaterThan(cutDepth("sweep_3_flat"));
  });
});

describe("controlFine", () => {
  it("fishtail wide end finest control", () => {
    expect(controlFine("fishtail_wide_end")).toBeGreaterThan(controlFine("sweep_11_deep"));
  });
});

describe("versatility", () => {
  it("sweep 7 medium most versatile", () => {
    expect(versatility("sweep_7_medium")).toBeGreaterThan(versatility("spoon_bent_scoop"));
  });
});

describe("edgeHold", () => {
  it("spoon bent scoop best edge hold", () => {
    expect(edgeHold("spoon_bent_scoop")).toBeGreaterThan(edgeHold("sweep_11_deep"));
  });
});

describe("gougeCost", () => {
  it("spoon bent scoop most expensive", () => {
    expect(gougeCost("spoon_bent_scoop")).toBeGreaterThan(gougeCost("sweep_3_flat"));
  });
});

describe("forRelief", () => {
  it("sweep 3 flat is for relief", () => {
    expect(forRelief("sweep_3_flat")).toBe(true);
  });
  it("sweep 11 deep not for relief", () => {
    expect(forRelief("sweep_11_deep")).toBe(false);
  });
});

describe("bentShaft", () => {
  it("spoon bent scoop has bent shaft", () => {
    expect(bentShaft("spoon_bent_scoop")).toBe(true);
  });
  it("sweep 7 medium no bent shaft", () => {
    expect(bentShaft("sweep_7_medium")).toBe(false);
  });
});

describe("steelType", () => {
  it("fishtail wide end uses tool steel ground", () => {
    expect(steelType("fishtail_wide_end")).toBe("tool_steel_ground");
  });
});

describe("bestUse", () => {
  it("sweep 11 deep best for deep channel groove", () => {
    expect(bestUse("sweep_11_deep")).toBe("deep_channel_groove");
  });
});

describe("carvingGouges", () => {
  it("returns 5 types", () => {
    expect(carvingGouges()).toHaveLength(5);
  });
});
