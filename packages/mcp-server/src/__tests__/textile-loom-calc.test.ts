import { describe, it, expect } from "vitest";
import {
  speed, fabricRange, yarnGentle, noiseLevel,
  tlCost, shuttleless, forHeavyFabric, insertion,
  bestUse, textileLoomTypes,
} from "../textile-loom-calc.js";

describe("speed", () => {
  it("air jet fastest", () => {
    expect(speed("air_jet")).toBeGreaterThan(speed("rapier"));
  });
});

describe("fabricRange", () => {
  it("rapier widest fabric range", () => {
    expect(fabricRange("rapier")).toBeGreaterThan(fabricRange("multiphase"));
  });
});

describe("yarnGentle", () => {
  it("rapier most gentle on yarn", () => {
    expect(yarnGentle("rapier")).toBeGreaterThan(yarnGentle("multiphase"));
  });
});

describe("noiseLevel", () => {
  it("water jet lowest noise", () => {
    expect(noiseLevel("water_jet")).toBeGreaterThan(noiseLevel("air_jet"));
  });
});

describe("tlCost", () => {
  it("multiphase most expensive", () => {
    expect(tlCost("multiphase")).toBeGreaterThan(tlCost("water_jet"));
  });
});

describe("shuttleless", () => {
  it("all modern looms are shuttleless", () => {
    expect(shuttleless("air_jet")).toBe(true);
    expect(shuttleless("rapier")).toBe(true);
  });
});

describe("forHeavyFabric", () => {
  it("rapier for heavy fabric", () => {
    expect(forHeavyFabric("rapier")).toBe(true);
  });
  it("air jet not for heavy fabric", () => {
    expect(forHeavyFabric("air_jet")).toBe(false);
  });
});

describe("insertion", () => {
  it("water jet uses fine water stream", () => {
    expect(insertion("water_jet")).toBe("fine_water_jet_stream_weft_carry_hydrophobic_yarn_only");
  });
});

describe("bestUse", () => {
  it("rapier for fancy yarn jacquard", () => {
    expect(bestUse("rapier")).toBe("fancy_yarn_jacquard_upholstery_technical_wide_width_fabric");
  });
});

describe("textileLoomTypes", () => {
  it("returns 5 types", () => {
    expect(textileLoomTypes()).toHaveLength(5);
  });
});
