import { describe, it, expect } from "vitest";
import {
  density, thermal, electrical, flatness,
  subCost, embeddedPassive, forRf, dielectric,
  bestUse, substrateTypes,
} from "../substrate-type-calc.js";

describe("density", () => {
  it("silicon interposer highest density", () => {
    expect(density("silicon_interposer")).toBeGreaterThan(density("ceramic_htcc"));
  });
});

describe("thermal", () => {
  it("ceramic htcc best thermal", () => {
    expect(thermal("ceramic_htcc")).toBeGreaterThan(thermal("organic_buildup"));
  });
});

describe("electrical", () => {
  it("silicon interposer best electrical", () => {
    expect(electrical("silicon_interposer")).toBeGreaterThan(electrical("organic_buildup"));
  });
});

describe("flatness", () => {
  it("silicon interposer flattest", () => {
    expect(flatness("silicon_interposer")).toBeGreaterThan(flatness("organic_buildup"));
  });
});

describe("subCost", () => {
  it("silicon interposer most expensive", () => {
    expect(subCost("silicon_interposer")).toBeGreaterThan(subCost("organic_buildup"));
  });
});

describe("embeddedPassive", () => {
  it("ceramic ltcc has embedded passives", () => {
    expect(embeddedPassive("ceramic_ltcc")).toBe(true);
  });
  it("organic buildup no embedded passives", () => {
    expect(embeddedPassive("organic_buildup")).toBe(false);
  });
});

describe("forRf", () => {
  it("ceramic ltcc for rf", () => {
    expect(forRf("ceramic_ltcc")).toBe(true);
  });
  it("organic buildup not for rf", () => {
    expect(forRf("organic_buildup")).toBe(false);
  });
});

describe("dielectric", () => {
  it("glass core uses thin glass panel rdl", () => {
    expect(dielectric("glass_core")).toBe("thin_glass_panel_rdl");
  });
});

describe("bestUse", () => {
  it("silicon interposer best for hbm logic 2.5d stack", () => {
    expect(bestUse("silicon_interposer")).toBe("hbm_logic_2_5d_stack");
  });
});

describe("substrateTypes", () => {
  it("returns 5 types", () => {
    expect(substrateTypes()).toHaveLength(5);
  });
});
