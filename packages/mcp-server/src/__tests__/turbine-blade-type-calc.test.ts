import { describe, it, expect } from "vitest";
import {
  tempLimit, creepLife, weight, oxidation,
  tbCost, cooled, forFirstStage, material,
  bestUse, turbineBladeTypes,
} from "../turbine-blade-type-calc.js";

describe("tempLimit", () => {
  it("single crystal highest temp limit", () => {
    expect(tempLimit("single_crystal_nickel")).toBeGreaterThan(tempLimit("equiaxed_conventional_cast"));
  });
});

describe("creepLife", () => {
  it("single crystal best creep life", () => {
    expect(creepLife("single_crystal_nickel")).toBeGreaterThan(creepLife("equiaxed_conventional_cast"));
  });
});

describe("weight", () => {
  it("cmc lightest weight score highest", () => {
    expect(weight("ceramic_matrix_composite")).toBeGreaterThan(weight("single_crystal_nickel"));
  });
});

describe("oxidation", () => {
  it("cmc best oxidation resistance", () => {
    expect(oxidation("ceramic_matrix_composite")).toBeGreaterThan(oxidation("titanium_aluminide_light"));
  });
});

describe("tbCost", () => {
  it("single crystal most expensive", () => {
    expect(tbCost("single_crystal_nickel")).toBeGreaterThan(tbCost("equiaxed_conventional_cast"));
  });
});

describe("cooled", () => {
  it("single crystal is cooled", () => {
    expect(cooled("single_crystal_nickel")).toBe(true);
  });
  it("cmc not cooled", () => {
    expect(cooled("ceramic_matrix_composite")).toBe(false);
  });
});

describe("forFirstStage", () => {
  it("single crystal for first stage", () => {
    expect(forFirstStage("single_crystal_nickel")).toBe(true);
  });
  it("tial not for first stage", () => {
    expect(forFirstStage("titanium_aluminide_light")).toBe(false);
  });
});

describe("material", () => {
  it("cmc uses sic fiber reinforced", () => {
    expect(material("ceramic_matrix_composite")).toBe("sic_sic_fiber_reinforced_cmc");
  });
});

describe("bestUse", () => {
  it("equiaxed for lp turbine industrial", () => {
    expect(bestUse("equiaxed_conventional_cast")).toBe("lp_turbine_industrial_gas_turb");
  });
});

describe("turbineBladeTypes", () => {
  it("returns 5 types", () => {
    expect(turbineBladeTypes()).toHaveLength(5);
  });
});
