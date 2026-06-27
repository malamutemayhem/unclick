import { describe, it, expect } from "vitest";
import {
  driveVoltage, life, maintenance, range,
  cpCost, passive, forPipeline, anode,
  bestUse, cathodicProtectTypes,
} from "../cathodic-protect-calc.js";

describe("driveVoltage", () => {
  it("impressed current highest voltage", () => {
    expect(driveVoltage("impressed_current_rectifier")).toBeGreaterThan(driveVoltage("sacrificial_zinc_anode"));
  });
});

describe("life", () => {
  it("impressed current longest life", () => {
    expect(life("impressed_current_rectifier")).toBeGreaterThan(life("sacrificial_magnesium_anode"));
  });
});

describe("maintenance", () => {
  it("sacrificial zinc lowest maintenance", () => {
    expect(maintenance("sacrificial_zinc_anode")).toBeGreaterThan(maintenance("impressed_current_rectifier"));
  });
});

describe("range", () => {
  it("impressed current widest range", () => {
    expect(range("impressed_current_rectifier")).toBeGreaterThan(range("sacrificial_zinc_anode"));
  });
});

describe("cpCost", () => {
  it("hybrid most expensive", () => {
    expect(cpCost("hybrid_combination_system")).toBeGreaterThan(cpCost("sacrificial_zinc_anode"));
  });
});

describe("passive", () => {
  it("sacrificial zinc is passive", () => {
    expect(passive("sacrificial_zinc_anode")).toBe(true);
  });
  it("impressed current not passive", () => {
    expect(passive("impressed_current_rectifier")).toBe(false);
  });
});

describe("forPipeline", () => {
  it("impressed current for pipeline", () => {
    expect(forPipeline("impressed_current_rectifier")).toBe(true);
  });
  it("sacrificial zinc not for pipeline", () => {
    expect(forPipeline("sacrificial_zinc_anode")).toBe(false);
  });
});

describe("anode", () => {
  it("impressed current uses MMO titanium", () => {
    expect(anode("impressed_current_rectifier")).toBe("mixed_metal_oxide_titanium_mmo");
  });
});

describe("bestUse", () => {
  it("aluminum anode for offshore platform", () => {
    expect(bestUse("sacrificial_aluminum_anode")).toBe("offshore_platform_brackish_salt");
  });
});

describe("cathodicProtectTypes", () => {
  it("returns 5 types", () => {
    expect(cathodicProtectTypes()).toHaveLength(5);
  });
});
