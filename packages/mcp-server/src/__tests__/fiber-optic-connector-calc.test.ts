import { describe, it, expect } from "vitest";
import {
  insertionLoss, densityScore, durabilityRating, installEase,
  costPerUnit, pushPull, multipleFilaments, ferruleMaterial,
  primaryApplication, fiberOpticConnectors,
} from "../fiber-optic-connector-calc.js";

describe("insertionLoss", () => {
  it("mpo highest insertion loss", () => {
    expect(insertionLoss("mpo")).toBeGreaterThan(insertionLoss("lc"));
  });
});

describe("densityScore", () => {
  it("lc highest density", () => {
    expect(densityScore("lc")).toBeGreaterThan(densityScore("st"));
  });
});

describe("durabilityRating", () => {
  it("fc most durable", () => {
    expect(durabilityRating("fc")).toBeGreaterThan(durabilityRating("mpo"));
  });
});

describe("installEase", () => {
  it("sc easiest install", () => {
    expect(installEase("sc")).toBeGreaterThan(installEase("mpo"));
  });
});

describe("costPerUnit", () => {
  it("mpo most expensive", () => {
    expect(costPerUnit("mpo")).toBeGreaterThan(costPerUnit("st"));
  });
});

describe("pushPull", () => {
  it("sc is push pull", () => {
    expect(pushPull("sc")).toBe(true);
  });
  it("st is not", () => {
    expect(pushPull("st")).toBe(false);
  });
});

describe("multipleFilaments", () => {
  it("mpo has multiple filaments", () => {
    expect(multipleFilaments("mpo")).toBe(true);
  });
  it("lc does not", () => {
    expect(multipleFilaments("lc")).toBe(false);
  });
});

describe("ferruleMaterial", () => {
  it("mpo uses mt ferrule array", () => {
    expect(ferruleMaterial("mpo")).toBe("mt_ferrule_array");
  });
});

describe("primaryApplication", () => {
  it("lc for data center sfp", () => {
    expect(primaryApplication("lc")).toBe("data_center_sfp");
  });
});

describe("fiberOpticConnectors", () => {
  it("returns 5 connectors", () => {
    expect(fiberOpticConnectors()).toHaveLength(5);
  });
});
