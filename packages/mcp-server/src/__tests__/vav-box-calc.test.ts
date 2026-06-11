import { describe, it, expect } from "vitest";
import {
  efficiency, comfort, noise, flexibility,
  vbCost, hasFan, forPerimeter, control,
  bestUse, vavBoxTypes,
} from "../vav-box-calc.js";

describe("efficiency", () => {
  it("single duct pressure most efficient", () => {
    expect(efficiency("single_duct_pressure")).toBeGreaterThan(efficiency("dual_duct_mixing"));
  });
});

describe("comfort", () => {
  it("reheat best comfort", () => {
    expect(comfort("single_duct_reheat")).toBeGreaterThan(comfort("single_duct_pressure"));
  });
});

describe("noise", () => {
  it("pressure independent quietest", () => {
    expect(noise("single_duct_pressure")).toBeGreaterThan(noise("fan_powered_series"));
  });
});

describe("flexibility", () => {
  it("reheat most flexible", () => {
    expect(flexibility("single_duct_reheat")).toBeGreaterThan(flexibility("single_duct_pressure"));
  });
});

describe("vbCost", () => {
  it("dual duct most expensive", () => {
    expect(vbCost("dual_duct_mixing")).toBeGreaterThan(vbCost("single_duct_pressure"));
  });
});

describe("hasFan", () => {
  it("fan powered parallel has fan", () => {
    expect(hasFan("fan_powered_parallel")).toBe(true);
  });
  it("single duct no fan", () => {
    expect(hasFan("single_duct_pressure")).toBe(false);
  });
});

describe("forPerimeter", () => {
  it("reheat for perimeter", () => {
    expect(forPerimeter("single_duct_reheat")).toBe(true);
  });
  it("pressure not perimeter", () => {
    expect(forPerimeter("single_duct_pressure")).toBe(false);
  });
});

describe("control", () => {
  it("dual duct uses mixing damper", () => {
    expect(control("dual_duct_mixing")).toBe("hot_cold_deck_mixing_damper");
  });
});

describe("bestUse", () => {
  it("fan parallel for perimeter office", () => {
    expect(bestUse("fan_powered_parallel")).toBe("perimeter_office_heating_mode");
  });
});

describe("vavBoxTypes", () => {
  it("returns 5 types", () => {
    expect(vavBoxTypes()).toHaveLength(5);
  });
});
