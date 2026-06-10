import { describe, it, expect } from "vitest";
import {
  particleFilter, flowRate, easeOfClean, durability,
  sieveCost, powered, forGlaze, meshMaterial,
  bestUse, glazeSieves,
} from "../glaze-sieve-calc.js";

describe("particleFilter", () => {
  it("mesh 325 ultra finest particle filter", () => {
    expect(particleFilter("mesh_325_ultra")).toBeGreaterThan(particleFilter("mesh_80_coarse"));
  });
});

describe("flowRate", () => {
  it("mesh 80 coarse fastest flow rate", () => {
    expect(flowRate("mesh_80_coarse")).toBeGreaterThan(flowRate("mesh_325_ultra"));
  });
});

describe("easeOfClean", () => {
  it("mesh 80 coarse easiest to clean", () => {
    expect(easeOfClean("mesh_80_coarse")).toBeGreaterThan(easeOfClean("mesh_325_ultra"));
  });
});

describe("durability", () => {
  it("mesh 80 coarse most durable", () => {
    expect(durability("mesh_80_coarse")).toBeGreaterThan(durability("mesh_325_ultra"));
  });
});

describe("sieveCost", () => {
  it("vibro screen power most expensive", () => {
    expect(sieveCost("vibro_screen_power")).toBeGreaterThan(sieveCost("mesh_80_coarse"));
  });
});

describe("powered", () => {
  it("vibro screen power is powered", () => {
    expect(powered("vibro_screen_power")).toBe(true);
  });
  it("mesh 200 fine not powered", () => {
    expect(powered("mesh_200_fine")).toBe(false);
  });
});

describe("forGlaze", () => {
  it("mesh 200 fine is for glaze", () => {
    expect(forGlaze("mesh_200_fine")).toBe(true);
  });
  it("mesh 80 coarse not for glaze", () => {
    expect(forGlaze("mesh_80_coarse")).toBe(false);
  });
});

describe("meshMaterial", () => {
  it("mesh 80 coarse uses brass woven wire", () => {
    expect(meshMaterial("mesh_80_coarse")).toBe("brass_woven_wire");
  });
});

describe("bestUse", () => {
  it("mesh 325 ultra best for terra sigillata prep", () => {
    expect(bestUse("mesh_325_ultra")).toBe("terra_sigillata_prep");
  });
});

describe("glazeSieves", () => {
  it("returns 5 types", () => {
    expect(glazeSieves()).toHaveLength(5);
  });
});
