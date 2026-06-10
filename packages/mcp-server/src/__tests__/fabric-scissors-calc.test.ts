import { describe, it, expect } from "vitest";
import {
  cutPrecision, bladeSharpness, handFatigue, layerCut,
  scissorCost, preventsRavel, needsMat, bladeDesign,
  bestFabric, fabricScissors,
} from "../fabric-scissors-calc.js";

describe("cutPrecision", () => {
  it("rotary cutter most precise cut", () => {
    expect(cutPrecision("rotary_cutter")).toBeGreaterThan(cutPrecision("electric_power"));
  });
});

describe("bladeSharpness", () => {
  it("rotary cutter sharpest blade", () => {
    expect(bladeSharpness("rotary_cutter")).toBeGreaterThan(bladeSharpness("spring_action"));
  });
});

describe("handFatigue", () => {
  it("electric power least hand fatigue", () => {
    expect(handFatigue("electric_power")).toBeLessThan(handFatigue("pinking_zigzag"));
  });
});

describe("layerCut", () => {
  it("rotary cutter best multi layer cut", () => {
    expect(layerCut("rotary_cutter")).toBeGreaterThan(layerCut("pinking_zigzag"));
  });
});

describe("scissorCost", () => {
  it("electric power most expensive", () => {
    expect(scissorCost("electric_power")).toBeGreaterThan(scissorCost("spring_action"));
  });
});

describe("preventsRavel", () => {
  it("pinking zigzag prevents ravel", () => {
    expect(preventsRavel("pinking_zigzag")).toBe(true);
  });
  it("dressmaker bent does not", () => {
    expect(preventsRavel("dressmaker_bent")).toBe(false);
  });
});

describe("needsMat", () => {
  it("rotary cutter needs mat", () => {
    expect(needsMat("rotary_cutter")).toBe(true);
  });
  it("dressmaker bent does not", () => {
    expect(needsMat("dressmaker_bent")).toBe(false);
  });
});

describe("bladeDesign", () => {
  it("pinking zigzag uses sawtooth edge zigzag", () => {
    expect(bladeDesign("pinking_zigzag")).toBe("sawtooth_edge_zigzag");
  });
});

describe("bestFabric", () => {
  it("rotary cutter for quilting multi layer", () => {
    expect(bestFabric("rotary_cutter")).toBe("quilting_multi_layer");
  });
});

describe("fabricScissors", () => {
  it("returns 5 types", () => {
    expect(fabricScissors()).toHaveLength(5);
  });
});
