import { describe, it, expect } from "vitest";
import {
  cutClean, cuttingPower, handFatigue, branchDiameter,
  shearCost, oneHanded, replaceBlade, bladeStyle,
  bestPlant, pruningShears,
} from "../pruning-shear-calc.js";

describe("cutClean", () => {
  it("bypass hand cleanest cut", () => {
    expect(cutClean("bypass_hand")).toBeGreaterThan(cutClean("anvil_hand"));
  });
});

describe("cuttingPower", () => {
  it("lopper long reach most cutting power", () => {
    expect(cuttingPower("lopper_long_reach")).toBeGreaterThan(cuttingPower("bypass_hand"));
  });
});

describe("handFatigue", () => {
  it("ratchet assist least fatigue", () => {
    expect(handFatigue("ratchet_assist")).toBeGreaterThan(handFatigue("pole_pruner"));
  });
});

describe("branchDiameter", () => {
  it("lopper long reach handles thickest branches", () => {
    expect(branchDiameter("lopper_long_reach")).toBeGreaterThan(branchDiameter("bypass_hand"));
  });
});

describe("shearCost", () => {
  it("pole pruner most expensive", () => {
    expect(shearCost("pole_pruner")).toBeGreaterThan(shearCost("anvil_hand"));
  });
});

describe("oneHanded", () => {
  it("bypass hand is one handed", () => {
    expect(oneHanded("bypass_hand")).toBe(true);
  });
  it("lopper long reach is not", () => {
    expect(oneHanded("lopper_long_reach")).toBe(false);
  });
});

describe("replaceBlade", () => {
  it("bypass hand has replaceable blade", () => {
    expect(replaceBlade("bypass_hand")).toBe(true);
  });
  it("pole pruner does not", () => {
    expect(replaceBlade("pole_pruner")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("ratchet assist uses compound ratchet mechanism", () => {
    expect(bladeStyle("ratchet_assist")).toBe("compound_ratchet_mechanism");
  });
});

describe("bestPlant", () => {
  it("bypass hand for rose herb green stem", () => {
    expect(bestPlant("bypass_hand")).toBe("rose_herb_green_stem");
  });
});

describe("pruningShears", () => {
  it("returns 5 types", () => {
    expect(pruningShears()).toHaveLength(5);
  });
});
