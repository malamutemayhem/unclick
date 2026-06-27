import { describe, it, expect } from "vitest";
import {
  sealLife, speedLimit, pressureLimit, frictionTorque,
  lsCost, dustExclusion, forHighSpeed, material,
  bestUse, lipSealTypes,
} from "../lip-seal-calc.js";

describe("sealLife", () => {
  it("ptfe lip longest seal life", () => {
    expect(sealLife("ptfe_lip_high_speed")).toBeGreaterThan(sealLife("single_lip_radial"));
  });
});

describe("speedLimit", () => {
  it("ptfe lip highest speed", () => {
    expect(speedLimit("ptfe_lip_high_speed")).toBeGreaterThan(speedLimit("double_lip_dust"));
  });
});

describe("pressureLimit", () => {
  it("spring loaded highest pressure", () => {
    expect(pressureLimit("spring_loaded_sc")).toBeGreaterThan(pressureLimit("single_lip_radial"));
  });
});

describe("frictionTorque", () => {
  it("ptfe lip lowest friction", () => {
    expect(frictionTorque("ptfe_lip_high_speed")).toBeGreaterThan(frictionTorque("double_lip_dust"));
  });
});

describe("lsCost", () => {
  it("ptfe lip most expensive", () => {
    expect(lsCost("ptfe_lip_high_speed")).toBeGreaterThan(lsCost("single_lip_radial"));
  });
});

describe("dustExclusion", () => {
  it("double lip has dust exclusion", () => {
    expect(dustExclusion("double_lip_dust")).toBe(true);
  });
  it("single lip no dust exclusion", () => {
    expect(dustExclusion("single_lip_radial")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("ptfe lip for high speed", () => {
    expect(forHighSpeed("ptfe_lip_high_speed")).toBe(true);
  });
  it("single lip not for high speed", () => {
    expect(forHighSpeed("single_lip_radial")).toBe(false);
  });
});

describe("material", () => {
  it("cassette seal uses pre-assembled unit", () => {
    expect(material("cassette_seal_unit")).toBe("pre_assembled_cassette_metal_rubber_labyrinth");
  });
});

describe("bestUse", () => {
  it("double lip for dusty environment", () => {
    expect(bestUse("double_lip_dust")).toBe("dusty_environment_agriculture_construction");
  });
});

describe("lipSealTypes", () => {
  it("returns 5 types", () => {
    expect(lipSealTypes()).toHaveLength(5);
  });
});
