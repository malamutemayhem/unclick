import { describe, it, expect } from "vitest";
import {
  flavorImpact, oxygenExposure, costPerUnit,
  tanninAddition, temperatureControl, impartsWoodFlavor,
  preservesFruitCharacter, flavorNotes, bestForWineType, wineAgingMethods,
} from "../wine-aging-calc.js";

describe("flavorImpact", () => {
  it("american oak most flavor impact", () => {
    expect(flavorImpact("american_oak")).toBeGreaterThan(
      flavorImpact("stainless_steel")
    );
  });
});

describe("oxygenExposure", () => {
  it("american oak most oxygen exposure", () => {
    expect(oxygenExposure("american_oak")).toBeGreaterThan(
      oxygenExposure("stainless_steel")
    );
  });
});

describe("costPerUnit", () => {
  it("french oak most expensive", () => {
    expect(costPerUnit("french_oak")).toBeGreaterThan(
      costPerUnit("stainless_steel")
    );
  });
});

describe("tanninAddition", () => {
  it("american oak adds most tannin", () => {
    expect(tanninAddition("american_oak")).toBeGreaterThan(
      tanninAddition("concrete_egg")
    );
  });
});

describe("temperatureControl", () => {
  it("stainless steel best temperature control", () => {
    expect(temperatureControl("stainless_steel")).toBeGreaterThan(
      temperatureControl("amphora")
    );
  });
});

describe("impartsWoodFlavor", () => {
  it("french oak imparts wood flavor", () => {
    expect(impartsWoodFlavor("french_oak")).toBe(true);
  });
  it("stainless steel does not", () => {
    expect(impartsWoodFlavor("stainless_steel")).toBe(false);
  });
});

describe("preservesFruitCharacter", () => {
  it("stainless steel preserves fruit", () => {
    expect(preservesFruitCharacter("stainless_steel")).toBe(true);
  });
  it("french oak does not", () => {
    expect(preservesFruitCharacter("french_oak")).toBe(false);
  });
});

describe("flavorNotes", () => {
  it("american oak is coconut dill bold", () => {
    expect(flavorNotes("american_oak")).toBe("coconut_dill_bold");
  });
});

describe("bestForWineType", () => {
  it("amphora for orange wine", () => {
    expect(bestForWineType("amphora")).toBe("orange_wine_experimental");
  });
});

describe("wineAgingMethods", () => {
  it("returns 5 methods", () => {
    expect(wineAgingMethods()).toHaveLength(5);
  });
});
