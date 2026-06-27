import { describe, it, expect } from "vitest";
import {
  accuracy, turndown, ruggedness, noMovingParts,
  tgCost, bidirectional, forDirty, element,
  bestUse, targetFlowTypes,
} from "../target-flow-calc.js";

describe("accuracy", () => {
  it("micro target most accurate", () => {
    expect(accuracy("micro_target_low_flow")).toBeGreaterThan(accuracy("high_temp_refractory"));
  });
});

describe("turndown", () => {
  it("micro target best turndown", () => {
    expect(turndown("micro_target_low_flow")).toBeGreaterThan(turndown("high_temp_refractory"));
  });
});

describe("ruggedness", () => {
  it("high temp refractory most rugged", () => {
    expect(ruggedness("high_temp_refractory")).toBeGreaterThan(ruggedness("micro_target_low_flow"));
  });
});

describe("noMovingParts", () => {
  it("all target flow meters have no moving parts", () => {
    expect(noMovingParts("drag_disc_standard")).toBe(9);
    expect(noMovingParts("high_temp_refractory")).toBe(9);
  });
});

describe("tgCost", () => {
  it("high temp refractory most expensive", () => {
    expect(tgCost("high_temp_refractory")).toBeGreaterThan(tgCost("drag_disc_standard"));
  });
});

describe("bidirectional", () => {
  it("annular ring is bidirectional", () => {
    expect(bidirectional("annular_ring_full_bore")).toBe(true);
  });
  it("drag disc not bidirectional", () => {
    expect(bidirectional("drag_disc_standard")).toBe(false);
  });
});

describe("forDirty", () => {
  it("drag disc for dirty fluids", () => {
    expect(forDirty("drag_disc_standard")).toBe(true);
  });
  it("micro target not for dirty", () => {
    expect(forDirty("micro_target_low_flow")).toBe(false);
  });
});

describe("element", () => {
  it("cryogenic uses stainless 316", () => {
    expect(element("cryogenic_target_cold")).toBe("cryogenic_rated_target_stainless_316");
  });
});

describe("bestUse", () => {
  it("high temp for molten salt hot oil", () => {
    expect(bestUse("high_temp_refractory")).toBe("molten_salt_hot_oil_thermal_fluid_flow");
  });
});

describe("targetFlowTypes", () => {
  it("returns 5 types", () => {
    expect(targetFlowTypes()).toHaveLength(5);
  });
});
