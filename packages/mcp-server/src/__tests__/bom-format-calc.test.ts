import { describe, it, expect } from "vitest";
import {
  readability, procureReady, traceability, altParts,
  formatCost, automated, forPurchase, structure,
  bestUse, bomFormats,
} from "../bom-format-calc.js";

describe("readability", () => {
  it("flat csv simple most readable", () => {
    expect(readability("flat_csv_simple")).toBeGreaterThan(readability("costed_approved"));
  });
});

describe("procureReady", () => {
  it("costed approved most procure ready", () => {
    expect(procureReady("costed_approved")).toBeGreaterThan(procureReady("flat_csv_simple"));
  });
});

describe("traceability", () => {
  it("manufacturer pn best traceability", () => {
    expect(traceability("manufacturer_pn")).toBeGreaterThan(traceability("flat_csv_simple"));
  });
});

describe("altParts", () => {
  it("manufacturer pn most alt parts", () => {
    expect(altParts("manufacturer_pn")).toBeGreaterThan(altParts("flat_csv_simple"));
  });
});

describe("formatCost", () => {
  it("costed approved most expensive format", () => {
    expect(formatCost("costed_approved")).toBeGreaterThan(formatCost("flat_csv_simple"));
  });
});

describe("automated", () => {
  it("flat csv simple is automated", () => {
    expect(automated("flat_csv_simple")).toBe(true);
  });
  it("costed approved not automated", () => {
    expect(automated("costed_approved")).toBe(false);
  });
});

describe("forPurchase", () => {
  it("costed approved is for purchase", () => {
    expect(forPurchase("costed_approved")).toBe(true);
  });
  it("flat csv simple not for purchase", () => {
    expect(forPurchase("flat_csv_simple")).toBe(false);
  });
});

describe("structure", () => {
  it("hierarchical multi uses block level nested", () => {
    expect(structure("hierarchical_multi")).toBe("block_level_nested");
  });
});

describe("bestUse", () => {
  it("manufacturer pn best for supply chain resilience", () => {
    expect(bestUse("manufacturer_pn")).toBe("supply_chain_resilience");
  });
});

describe("bomFormats", () => {
  it("returns 5 types", () => {
    expect(bomFormats()).toHaveLength(5);
  });
});
