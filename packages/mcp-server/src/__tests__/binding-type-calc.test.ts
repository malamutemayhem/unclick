import { describe, it, expect } from "vitest";
import {
  durabilityYears, layFlatAbility, pageCapacity,
  productionSpeed, costPerUnit, hardCover,
  handCrafted, bestApplication, spineVisible, bindingTypes,
} from "../binding-type-calc.js";

describe("durabilityYears", () => {
  it("case bound lasts longest", () => {
    expect(durabilityYears("case_bound")).toBeGreaterThan(
      durabilityYears("spiral")
    );
  });
});

describe("layFlatAbility", () => {
  it("spiral lays flattest", () => {
    expect(layFlatAbility("spiral")).toBeGreaterThan(
      layFlatAbility("perfect")
    );
  });
});

describe("pageCapacity", () => {
  it("case bound has most pages", () => {
    expect(pageCapacity("case_bound")).toBeGreaterThan(
      pageCapacity("saddle_stitch")
    );
  });
});

describe("productionSpeed", () => {
  it("saddle stitch is fastest", () => {
    expect(productionSpeed("saddle_stitch")).toBeGreaterThan(
      productionSpeed("coptic")
    );
  });
});

describe("costPerUnit", () => {
  it("case bound costs most", () => {
    expect(costPerUnit("case_bound")).toBeGreaterThan(
      costPerUnit("saddle_stitch")
    );
  });
});

describe("hardCover", () => {
  it("case bound has hard cover", () => {
    expect(hardCover("case_bound")).toBe(true);
  });
  it("perfect does not", () => {
    expect(hardCover("perfect")).toBe(false);
  });
});

describe("handCrafted", () => {
  it("coptic is hand crafted", () => {
    expect(handCrafted("coptic")).toBe(true);
  });
  it("perfect is not", () => {
    expect(handCrafted("perfect")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("spiral for notebook", () => {
    expect(bestApplication("spiral")).toBe("notebook");
  });
});

describe("spineVisible", () => {
  it("case bound spine is visible", () => {
    expect(spineVisible("case_bound")).toBe(true);
  });
  it("saddle stitch is not", () => {
    expect(spineVisible("saddle_stitch")).toBe(false);
  });
});

describe("bindingTypes", () => {
  it("returns 5 types", () => {
    expect(bindingTypes()).toHaveLength(5);
  });
});
