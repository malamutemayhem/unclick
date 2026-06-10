import { describe, it, expect } from "vitest";
import {
  extractionDays, potency, shelfLifeYears,
  tasteAcceptability, bioavailability, alcoholFree,
  childSafe, bestHerb, costPerBottle, tinctureMethods,
} from "../tincture-method-calc.js";

describe("extractionDays", () => {
  it("double extraction takes longest", () => {
    expect(extractionDays("double_extraction")).toBeGreaterThan(
      extractionDays("percolation")
    );
  });
});

describe("potency", () => {
  it("double extraction is most potent", () => {
    expect(potency("double_extraction")).toBeGreaterThan(
      potency("vinegar")
    );
  });
});

describe("shelfLifeYears", () => {
  it("alcohol maceration lasts longest", () => {
    expect(shelfLifeYears("alcohol_maceration")).toBeGreaterThan(
      shelfLifeYears("vinegar")
    );
  });
});

describe("tasteAcceptability", () => {
  it("glycerin tastes best", () => {
    expect(tasteAcceptability("glycerin")).toBeGreaterThan(
      tasteAcceptability("double_extraction")
    );
  });
});

describe("bioavailability", () => {
  it("double extraction has best bioavailability", () => {
    expect(bioavailability("double_extraction")).toBeGreaterThan(
      bioavailability("vinegar")
    );
  });
});

describe("alcoholFree", () => {
  it("glycerin is alcohol free", () => {
    expect(alcoholFree("glycerin")).toBe(true);
  });
  it("alcohol maceration is not", () => {
    expect(alcoholFree("alcohol_maceration")).toBe(false);
  });
});

describe("childSafe", () => {
  it("glycerin is child safe", () => {
    expect(childSafe("glycerin")).toBe(true);
  });
  it("percolation is not", () => {
    expect(childSafe("percolation")).toBe(false);
  });
});

describe("bestHerb", () => {
  it("double extraction best for reishi mushroom", () => {
    expect(bestHerb("double_extraction")).toBe("reishi_mushroom");
  });
});

describe("costPerBottle", () => {
  it("double extraction costs most", () => {
    expect(costPerBottle("double_extraction")).toBeGreaterThan(
      costPerBottle("vinegar")
    );
  });
});

describe("tinctureMethods", () => {
  it("returns 5 methods", () => {
    expect(tinctureMethods()).toHaveLength(5);
  });
});
