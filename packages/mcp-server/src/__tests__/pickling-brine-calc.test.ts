import { describe, it, expect } from "vitest";
import {
  processingTimeHours, acidityPh, saltPercentRequired,
  shelfLifeMonths, crunchRetention, probioticBenefit,
  heatRequired, flavorComplexity, costPerBatch, picklingMethods,
} from "../pickling-brine-calc.js";

describe("processingTimeHours", () => {
  it("salt brine takes longest", () => {
    expect(processingTimeHours("salt_brine")).toBeGreaterThan(
      processingTimeHours("quick_pickle")
    );
  });
});

describe("acidityPh", () => {
  it("vinegar is most acidic (lowest pH)", () => {
    expect(acidityPh("vinegar")).toBeLessThan(
      acidityPh("salt_brine")
    );
  });
});

describe("saltPercentRequired", () => {
  it("salt brine needs most salt", () => {
    expect(saltPercentRequired("salt_brine")).toBeGreaterThan(
      saltPercentRequired("quick_pickle")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("canning lasts longest", () => {
    expect(shelfLifeMonths("canning")).toBeGreaterThan(
      shelfLifeMonths("quick_pickle")
    );
  });
});

describe("crunchRetention", () => {
  it("quick pickle retains most crunch", () => {
    expect(crunchRetention("quick_pickle")).toBeGreaterThan(
      crunchRetention("canning")
    );
  });
});

describe("probioticBenefit", () => {
  it("lacto ferment has probiotics", () => {
    expect(probioticBenefit("lacto_ferment")).toBe(true);
  });
  it("vinegar does not", () => {
    expect(probioticBenefit("vinegar")).toBe(false);
  });
});

describe("heatRequired", () => {
  it("canning needs heat", () => {
    expect(heatRequired("canning")).toBe(true);
  });
  it("lacto ferment does not", () => {
    expect(heatRequired("lacto_ferment")).toBe(false);
  });
});

describe("flavorComplexity", () => {
  it("lacto ferment is most complex", () => {
    expect(flavorComplexity("lacto_ferment")).toBeGreaterThan(
      flavorComplexity("quick_pickle")
    );
  });
});

describe("costPerBatch", () => {
  it("canning is most expensive", () => {
    expect(costPerBatch("canning")).toBeGreaterThan(
      costPerBatch("lacto_ferment")
    );
  });
});

describe("picklingMethods", () => {
  it("returns 5 methods", () => {
    expect(picklingMethods()).toHaveLength(5);
  });
});
