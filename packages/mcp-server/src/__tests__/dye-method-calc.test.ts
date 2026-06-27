import { describe, it, expect } from "vitest";
import {
  colorFastness, colorRange, environmentalImpact,
  processingCost, washFastness, requiresHeat,
  syntheticDye, bestFiber, famousExample, dyeMethods,
} from "../dye-method-calc.js";

describe("colorFastness", () => {
  it("vat most colorfast", () => {
    expect(colorFastness("vat")).toBeGreaterThan(
      colorFastness("natural")
    );
  });
});

describe("colorRange", () => {
  it("reactive widest color range", () => {
    expect(colorRange("reactive")).toBeGreaterThan(
      colorRange("natural")
    );
  });
});

describe("environmentalImpact", () => {
  it("disperse highest impact", () => {
    expect(environmentalImpact("disperse")).toBeGreaterThan(
      environmentalImpact("natural")
    );
  });
});

describe("processingCost", () => {
  it("natural most expensive to process", () => {
    expect(processingCost("natural")).toBeGreaterThan(
      processingCost("disperse")
    );
  });
});

describe("washFastness", () => {
  it("vat best wash fastness", () => {
    expect(washFastness("vat")).toBeGreaterThan(
      washFastness("natural")
    );
  });
});

describe("requiresHeat", () => {
  it("all dye methods require heat", () => {
    expect(requiresHeat("reactive")).toBe(true);
    expect(requiresHeat("natural")).toBe(true);
  });
});

describe("syntheticDye", () => {
  it("reactive is synthetic", () => {
    expect(syntheticDye("reactive")).toBe(true);
  });
  it("natural is not", () => {
    expect(syntheticDye("natural")).toBe(false);
  });
});

describe("bestFiber", () => {
  it("acid dye for protein fibers", () => {
    expect(bestFiber("acid")).toBe("protein_wool_silk");
  });
});

describe("famousExample", () => {
  it("natural includes indigo", () => {
    expect(famousExample("natural")).toBe("indigo_madder");
  });
});

describe("dyeMethods", () => {
  it("returns 5 methods", () => {
    expect(dyeMethods()).toHaveLength(5);
  });
});
