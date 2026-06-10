import { describe, it, expect } from "vitest";
import {
  fermentationHours, fermentationTempCelsius, stringiness,
  nattokinaseActivity, vitaminK2Content, textureCoarseness,
  crunchFactor, refrigerationRequired, costPerPack, nattoVarieties,
} from "../natto-calc.js";

describe("fermentationHours", () => {
  it("ootsubu ferments longest", () => {
    expect(fermentationHours("ootsubu")).toBeGreaterThan(
      fermentationHours("hikiwari")
    );
  });
});

describe("fermentationTempCelsius", () => {
  it("hikiwari ferments warmest", () => {
    expect(fermentationTempCelsius("hikiwari")).toBeGreaterThan(
      fermentationTempCelsius("ootsubu")
    );
  });
});

describe("stringiness", () => {
  it("ootsubu is stringiest", () => {
    expect(stringiness("ootsubu")).toBeGreaterThan(
      stringiness("hikiwari")
    );
  });
});

describe("nattokinaseActivity", () => {
  it("hikiwari has highest activity", () => {
    expect(nattokinaseActivity("hikiwari")).toBeGreaterThan(
      nattokinaseActivity("dried_natto")
    );
  });
});

describe("vitaminK2Content", () => {
  it("hikiwari has most K2", () => {
    expect(vitaminK2Content("hikiwari")).toBeGreaterThan(
      vitaminK2Content("kuromame")
    );
  });
});

describe("textureCoarseness", () => {
  it("ootsubu is coarsest", () => {
    expect(textureCoarseness("ootsubu")).toBeGreaterThan(
      textureCoarseness("hikiwari")
    );
  });
});

describe("crunchFactor", () => {
  it("dried natto is crunchiest", () => {
    expect(crunchFactor("dried_natto")).toBeGreaterThan(
      crunchFactor("kotsubu")
    );
  });
});

describe("refrigerationRequired", () => {
  it("kotsubu needs refrigeration", () => {
    expect(refrigerationRequired("kotsubu")).toBe(true);
  });
  it("dried natto does not", () => {
    expect(refrigerationRequired("dried_natto")).toBe(false);
  });
});

describe("costPerPack", () => {
  it("dried natto is most expensive", () => {
    expect(costPerPack("dried_natto")).toBeGreaterThan(
      costPerPack("kotsubu")
    );
  });
});

describe("nattoVarieties", () => {
  it("returns 5 varieties", () => {
    expect(nattoVarieties()).toHaveLength(5);
  });
});
