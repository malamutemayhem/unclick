import { describe, it, expect } from "vitest";
import {
  potassiumPercent, calciumPercent, phLevel,
  lyeMakingSuitability, soilAmendmentValue, glazeIngredient,
  ashYieldPercent, primaryUse, costPerKg, woodAshSources,
} from "../wood-ash-calc.js";

describe("potassiumPercent", () => {
  it("seaweed has most potassium", () => {
    expect(potassiumPercent("seaweed")).toBeGreaterThan(
      potassiumPercent("softwood")
    );
  });
});

describe("calciumPercent", () => {
  it("bone ash has most calcium", () => {
    expect(calciumPercent("bone_ash")).toBeGreaterThan(
      calciumPercent("straw")
    );
  });
});

describe("phLevel", () => {
  it("hardwood has highest pH", () => {
    expect(phLevel("hardwood")).toBeGreaterThan(
      phLevel("bone_ash")
    );
  });
});

describe("lyeMakingSuitability", () => {
  it("hardwood is best for lye", () => {
    expect(lyeMakingSuitability("hardwood")).toBeGreaterThan(
      lyeMakingSuitability("bone_ash")
    );
  });
});

describe("soilAmendmentValue", () => {
  it("seaweed has best soil value", () => {
    expect(soilAmendmentValue("seaweed")).toBeGreaterThan(
      soilAmendmentValue("softwood")
    );
  });
});

describe("glazeIngredient", () => {
  it("hardwood works as glaze ingredient", () => {
    expect(glazeIngredient("hardwood")).toBe(true);
  });
  it("straw does not", () => {
    expect(glazeIngredient("straw")).toBe(false);
  });
});

describe("ashYieldPercent", () => {
  it("bone ash yields most", () => {
    expect(ashYieldPercent("bone_ash")).toBeGreaterThan(
      ashYieldPercent("softwood")
    );
  });
});

describe("primaryUse", () => {
  it("hardwood ash is for soap making", () => {
    expect(primaryUse("hardwood")).toBe("soap_making");
  });
});

describe("costPerKg", () => {
  it("bone ash costs most", () => {
    expect(costPerKg("bone_ash")).toBeGreaterThan(
      costPerKg("straw")
    );
  });
});

describe("woodAshSources", () => {
  it("returns 5 sources", () => {
    expect(woodAshSources()).toHaveLength(5);
  });
});
