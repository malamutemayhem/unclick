import { describe, it, expect } from "vitest";
import {
  pressureRating, tempRange, sealReliability, reusability,
  pgCost, metallic, forHighPress, material,
  bestUse, pipeGasketTypes,
} from "../pipe-gasket-calc.js";

describe("pressureRating", () => {
  it("ring joint highest pressure", () => {
    expect(pressureRating("ring_joint_metal")).toBeGreaterThan(pressureRating("ptfe_envelope"));
  });
});

describe("tempRange", () => {
  it("ring joint widest temp range", () => {
    expect(tempRange("ring_joint_metal")).toBeGreaterThan(tempRange("compressed_fiber_sheet"));
  });
});

describe("sealReliability", () => {
  it("kammprofile most reliable seal", () => {
    expect(sealReliability("kammprofile_grooved")).toBeGreaterThanOrEqual(sealReliability("ring_joint_metal"));
  });
});

describe("reusability", () => {
  it("kammprofile most reusable", () => {
    expect(reusability("kammprofile_grooved")).toBeGreaterThan(reusability("ring_joint_metal"));
  });
});

describe("pgCost", () => {
  it("ring joint most expensive", () => {
    expect(pgCost("ring_joint_metal")).toBeGreaterThan(pgCost("compressed_fiber_sheet"));
  });
});

describe("metallic", () => {
  it("spiral wound is metallic", () => {
    expect(metallic("spiral_wound_ss")).toBe(true);
  });
  it("ptfe envelope not metallic", () => {
    expect(metallic("ptfe_envelope")).toBe(false);
  });
});

describe("forHighPress", () => {
  it("ring joint for high pressure", () => {
    expect(forHighPress("ring_joint_metal")).toBe(true);
  });
  it("compressed fiber not for high pressure", () => {
    expect(forHighPress("compressed_fiber_sheet")).toBe(false);
  });
});

describe("material", () => {
  it("ptfe envelope uses chemical inert", () => {
    expect(material("ptfe_envelope")).toBe("ptfe_envelope_over_filler_chemical_inert");
  });
});

describe("bestUse", () => {
  it("ring joint for wellhead", () => {
    expect(bestUse("ring_joint_metal")).toBe("wellhead_christmas_tree_extreme_pressure");
  });
});

describe("pipeGasketTypes", () => {
  it("returns 5 types", () => {
    expect(pipeGasketTypes()).toHaveLength(5);
  });
});
