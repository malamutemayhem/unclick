import { describe, it, expect } from "vitest";
import {
  alphaAcidPercent, aromaIntensity, bitteringPower,
  oilContentMlPer100g, storageStabilityPercent, dualPurpose,
  primaryFlavor, bestBeerStyle, costPerKg, hopVarieties,
} from "../hop-variety-calc.js";

describe("alphaAcidPercent", () => {
  it("citra has highest alpha acid", () => {
    expect(alphaAcidPercent("citra")).toBeGreaterThan(
      alphaAcidPercent("saaz")
    );
  });
});

describe("aromaIntensity", () => {
  it("citra is most aromatic", () => {
    expect(aromaIntensity("citra")).toBeGreaterThan(
      aromaIntensity("fuggle")
    );
  });
});

describe("bitteringPower", () => {
  it("citra bitters most", () => {
    expect(bitteringPower("citra")).toBeGreaterThan(
      bitteringPower("hallertau")
    );
  });
});

describe("oilContentMlPer100g", () => {
  it("citra has most oil", () => {
    expect(oilContentMlPer100g("citra")).toBeGreaterThan(
      oilContentMlPer100g("saaz")
    );
  });
});

describe("storageStabilityPercent", () => {
  it("citra stores best", () => {
    expect(storageStabilityPercent("citra")).toBeGreaterThan(
      storageStabilityPercent("saaz")
    );
  });
});

describe("dualPurpose", () => {
  it("cascade is dual purpose", () => {
    expect(dualPurpose("cascade")).toBe(true);
  });
  it("saaz is not dual purpose", () => {
    expect(dualPurpose("saaz")).toBe(false);
  });
});

describe("primaryFlavor", () => {
  it("cascade is grapefruit", () => {
    expect(primaryFlavor("cascade")).toBe("grapefruit");
  });
});

describe("bestBeerStyle", () => {
  it("saaz best for pilsner", () => {
    expect(bestBeerStyle("saaz")).toBe("pilsner");
  });
});

describe("costPerKg", () => {
  it("citra costs most", () => {
    expect(costPerKg("citra")).toBeGreaterThan(
      costPerKg("fuggle")
    );
  });
});

describe("hopVarieties", () => {
  it("returns 5 varieties", () => {
    expect(hopVarieties()).toHaveLength(5);
  });
});
