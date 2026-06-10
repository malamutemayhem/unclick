import { describe, it, expect } from "vitest";
import {
  drawingPower, applicationMinutes, heatRetention,
  skinSensitivity, prepComplexity, reusable,
  heatingRequired, bestApplication, costPerUse, poulticeTypes,
} from "../poultice-type-calc.js";

describe("drawingPower", () => {
  it("charcoal has most drawing power", () => {
    expect(drawingPower("charcoal")).toBeGreaterThan(
      drawingPower("flaxseed")
    );
  });
});

describe("applicationMinutes", () => {
  it("charcoal applied longest", () => {
    expect(applicationMinutes("charcoal")).toBeGreaterThan(
      applicationMinutes("mustard")
    );
  });
});

describe("heatRetention", () => {
  it("flaxseed retains heat best", () => {
    expect(heatRetention("flaxseed")).toBeGreaterThan(
      heatRetention("herbal_fresh")
    );
  });
});

describe("skinSensitivity", () => {
  it("mustard is most skin sensitive", () => {
    expect(skinSensitivity("mustard")).toBeGreaterThan(
      skinSensitivity("charcoal")
    );
  });
});

describe("prepComplexity", () => {
  it("flaxseed is most complex to prep", () => {
    expect(prepComplexity("flaxseed")).toBeGreaterThan(
      prepComplexity("clay")
    );
  });
});

describe("reusable", () => {
  it("clay is reusable", () => {
    expect(reusable("clay")).toBe(true);
  });
  it("charcoal is not", () => {
    expect(reusable("charcoal")).toBe(false);
  });
});

describe("heatingRequired", () => {
  it("flaxseed requires heating", () => {
    expect(heatingRequired("flaxseed")).toBe(true);
  });
  it("clay does not", () => {
    expect(heatingRequired("clay")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("charcoal best for toxin drawing", () => {
    expect(bestApplication("charcoal")).toBe("toxin_drawing");
  });
});

describe("costPerUse", () => {
  it("charcoal costs most", () => {
    expect(costPerUse("charcoal")).toBeGreaterThan(
      costPerUse("mustard")
    );
  });
});

describe("poulticeTypes", () => {
  it("returns 5 types", () => {
    expect(poulticeTypes()).toHaveLength(5);
  });
});
