import { describe, it, expect } from "vitest";
import {
  sapValueMg, latherQuality, hardness,
  conditioning, cleansing, maxPercentInRecipe,
  traceSpeed, sustainable, costPerKg, soapOils,
} from "../soap-oil-calc.js";

describe("sapValueMg", () => {
  it("coconut has highest sap value", () => {
    expect(sapValueMg("coconut")).toBeGreaterThan(
      sapValueMg("castor")
    );
  });
});

describe("latherQuality", () => {
  it("coconut lathers best", () => {
    expect(latherQuality("coconut")).toBeGreaterThan(
      latherQuality("shea")
    );
  });
});

describe("hardness", () => {
  it("palm makes hardest soap", () => {
    expect(hardness("palm")).toBeGreaterThan(
      hardness("castor")
    );
  });
});

describe("conditioning", () => {
  it("shea conditions best", () => {
    expect(conditioning("shea")).toBeGreaterThan(
      conditioning("coconut")
    );
  });
});

describe("cleansing", () => {
  it("coconut cleanses most", () => {
    expect(cleansing("coconut")).toBeGreaterThan(
      cleansing("shea")
    );
  });
});

describe("maxPercentInRecipe", () => {
  it("olive can be 100%", () => {
    expect(maxPercentInRecipe("olive")).toBeGreaterThan(
      maxPercentInRecipe("castor")
    );
  });
});

describe("traceSpeed", () => {
  it("coconut traces fastest", () => {
    expect(traceSpeed("coconut")).toBeGreaterThan(
      traceSpeed("olive")
    );
  });
});

describe("sustainable", () => {
  it("olive is sustainable", () => {
    expect(sustainable("olive")).toBe(true);
  });
  it("palm is not", () => {
    expect(sustainable("palm")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("castor costs most", () => {
    expect(costPerKg("castor")).toBeGreaterThan(
      costPerKg("palm")
    );
  });
});

describe("soapOils", () => {
  it("returns 5 oils", () => {
    expect(soapOils()).toHaveLength(5);
  });
});
