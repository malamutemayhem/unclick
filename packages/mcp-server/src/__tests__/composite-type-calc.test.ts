import { describe, it, expect } from "vitest";
import {
  strengthToWeight, stiffness, impactResistance,
  costPerKg, fatigueLife, lightweight,
  conductiveHeat, primaryApplication, matrixMaterial, compositeTypes,
} from "../composite-type-calc.js";

describe("strengthToWeight", () => {
  it("carbon fiber best ratio", () => {
    expect(strengthToWeight("carbon_fiber")).toBeGreaterThan(
      strengthToWeight("concrete")
    );
  });
});

describe("stiffness", () => {
  it("carbon fiber stiffest", () => {
    expect(stiffness("carbon_fiber")).toBeGreaterThan(
      stiffness("wood_laminate")
    );
  });
});

describe("impactResistance", () => {
  it("kevlar most impact resistant", () => {
    expect(impactResistance("kevlar_composite")).toBeGreaterThan(
      impactResistance("concrete")
    );
  });
});

describe("costPerKg", () => {
  it("carbon fiber most expensive", () => {
    expect(costPerKg("carbon_fiber")).toBeGreaterThan(
      costPerKg("concrete")
    );
  });
});

describe("fatigueLife", () => {
  it("carbon fiber longest fatigue life", () => {
    expect(fatigueLife("carbon_fiber")).toBeGreaterThan(
      fatigueLife("wood_laminate")
    );
  });
});

describe("lightweight", () => {
  it("carbon fiber is lightweight", () => {
    expect(lightweight("carbon_fiber")).toBe(true);
  });
  it("concrete is not", () => {
    expect(lightweight("concrete")).toBe(false);
  });
});

describe("conductiveHeat", () => {
  it("carbon fiber conducts heat", () => {
    expect(conductiveHeat("carbon_fiber")).toBe(true);
  });
  it("fiberglass does not", () => {
    expect(conductiveHeat("fiberglass")).toBe(false);
  });
});

describe("primaryApplication", () => {
  it("kevlar for body armor", () => {
    expect(primaryApplication("kevlar_composite")).toBe("body_armor");
  });
});

describe("matrixMaterial", () => {
  it("concrete uses cement paste", () => {
    expect(matrixMaterial("concrete")).toBe("cement_paste");
  });
});

describe("compositeTypes", () => {
  it("returns 5 types", () => {
    expect(compositeTypes()).toHaveLength(5);
  });
});
