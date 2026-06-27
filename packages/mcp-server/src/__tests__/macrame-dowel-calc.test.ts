import { describe, it, expect } from "vitest";
import {
  hangStrength, aesthetics, weightBear, cuttingEase,
  dowelCost, metallic, naturalShape, dowelMaterial,
  bestStyle, macrameDowels,
} from "../macrame-dowel-calc.js";

describe("hangStrength", () => {
  it("brass pipe modern strongest hang", () => {
    expect(hangStrength("brass_pipe_modern")).toBeGreaterThan(hangStrength("driftwood_branch_natural"));
  });
});

describe("aesthetics", () => {
  it("driftwood branch natural best aesthetics", () => {
    expect(aesthetics("driftwood_branch_natural")).toBeGreaterThan(aesthetics("wood_round_smooth"));
  });
});

describe("weightBear", () => {
  it("brass pipe modern best weight bearing", () => {
    expect(weightBear("brass_pipe_modern")).toBeGreaterThan(weightBear("driftwood_branch_natural"));
  });
});

describe("cuttingEase", () => {
  it("wood round smooth easiest to cut", () => {
    expect(cuttingEase("wood_round_smooth")).toBeGreaterThan(cuttingEase("driftwood_branch_natural"));
  });
});

describe("dowelCost", () => {
  it("brass pipe modern most expensive", () => {
    expect(dowelCost("brass_pipe_modern")).toBeGreaterThan(dowelCost("wood_round_smooth"));
  });
});

describe("metallic", () => {
  it("brass pipe modern is metallic", () => {
    expect(metallic("brass_pipe_modern")).toBe(true);
  });
  it("wood round smooth is not metallic", () => {
    expect(metallic("wood_round_smooth")).toBe(false);
  });
});

describe("naturalShape", () => {
  it("driftwood branch natural has natural shape", () => {
    expect(naturalShape("driftwood_branch_natural")).toBe(true);
  });
  it("brass pipe modern does not have natural shape", () => {
    expect(naturalShape("brass_pipe_modern")).toBe(false);
  });
});

describe("dowelMaterial", () => {
  it("driftwood branch natural uses weathered beach wood", () => {
    expect(dowelMaterial("driftwood_branch_natural")).toBe("weathered_beach_wood");
  });
});

describe("bestStyle", () => {
  it("brass pipe modern best for modern minimal hang", () => {
    expect(bestStyle("brass_pipe_modern")).toBe("modern_minimal_hang");
  });
});

describe("macrameDowels", () => {
  it("returns 5 types", () => {
    expect(macrameDowels()).toHaveLength(5);
  });
});
