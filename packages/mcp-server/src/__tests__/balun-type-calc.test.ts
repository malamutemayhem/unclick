import { describe, it, expect } from "vitest";
import {
  bandwidth, insertionLoss, balance, powerHandling,
  balunCost, dcPass, forMmwave, construction,
  bestUse, balunTypes,
} from "../balun-type-calc.js";

describe("bandwidth", () => {
  it("marchand coupled widest bandwidth", () => {
    expect(bandwidth("marchand_coupled")).toBeGreaterThan(bandwidth("lattice_lumped"));
  });
});

describe("insertionLoss", () => {
  it("marchand coupled lowest insertion loss", () => {
    expect(insertionLoss("marchand_coupled")).toBeGreaterThan(insertionLoss("integrated_on_die"));
  });
});

describe("balance", () => {
  it("marchand coupled best balance", () => {
    expect(balance("marchand_coupled")).toBeGreaterThan(balance("lattice_lumped"));
  });
});

describe("powerHandling", () => {
  it("transformer wound highest power handling", () => {
    expect(powerHandling("transformer_wound")).toBeGreaterThan(powerHandling("integrated_on_die"));
  });
});

describe("balunCost", () => {
  it("marchand coupled most expensive", () => {
    expect(balunCost("marchand_coupled")).toBeGreaterThan(balunCost("integrated_on_die"));
  });
});

describe("dcPass", () => {
  it("transformer wound has dc pass", () => {
    expect(dcPass("transformer_wound")).toBe(true);
  });
  it("marchand coupled no dc pass", () => {
    expect(dcPass("marchand_coupled")).toBe(false);
  });
});

describe("forMmwave", () => {
  it("marchand coupled is for mmwave", () => {
    expect(forMmwave("marchand_coupled")).toBe(true);
  });
  it("lattice lumped not for mmwave", () => {
    expect(forMmwave("lattice_lumped")).toBe(false);
  });
});

describe("construction", () => {
  it("marchand coupled uses coupled line quarter", () => {
    expect(construction("marchand_coupled")).toBe("coupled_line_quarter");
  });
});

describe("bestUse", () => {
  it("transformer wound best for hf push pull amp", () => {
    expect(bestUse("transformer_wound")).toBe("hf_push_pull_amp");
  });
});

describe("balunTypes", () => {
  it("returns 5 types", () => {
    expect(balunTypes()).toHaveLength(5);
  });
});
