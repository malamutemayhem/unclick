import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, pressureDrop, wettability,
  pcCost, structured, forVacuum, packing,
  bestUse, packedColumnTypes,
} from "../packed-column-calc.js";

describe("efficiency", () => {
  it("gauze packing highest efficiency", () => {
    expect(efficiency("gauze_packing_vacuum")).toBeGreaterThan(efficiency("grid_packing_heavy"));
  });
});

describe("capacity", () => {
  it("grid packing highest capacity", () => {
    expect(capacity("grid_packing_heavy")).toBeGreaterThan(capacity("gauze_packing_vacuum"));
  });
});

describe("pressureDrop", () => {
  it("grid packing lowest pressure drop (highest score)", () => {
    expect(pressureDrop("grid_packing_heavy")).toBeGreaterThan(pressureDrop("random_packing_raschig"));
  });
});

describe("wettability", () => {
  it("gauze packing best wettability", () => {
    expect(wettability("gauze_packing_vacuum")).toBeGreaterThan(wettability("grid_packing_heavy"));
  });
});

describe("pcCost", () => {
  it("gauze packing most expensive", () => {
    expect(pcCost("gauze_packing_vacuum")).toBeGreaterThan(pcCost("random_packing_raschig"));
  });
});

describe("structured", () => {
  it("structured packing sheet is structured", () => {
    expect(structured("structured_packing_sheet")).toBe(true);
  });
  it("random packing not structured", () => {
    expect(structured("random_packing_raschig")).toBe(false);
  });
});

describe("forVacuum", () => {
  it("gauze packing for vacuum", () => {
    expect(forVacuum("gauze_packing_vacuum")).toBe(true);
  });
  it("random packing not for vacuum", () => {
    expect(forVacuum("random_packing_raschig")).toBe(false);
  });
});

describe("packing", () => {
  it("ceramic saddle uses intalox saddle", () => {
    expect(packing("ceramic_saddle_corrosive")).toBe("ceramic_intalox_saddle_acid_alkali");
  });
});

describe("bestUse", () => {
  it("gauze packing for pharma deep vacuum", () => {
    expect(bestUse("gauze_packing_vacuum")).toBe("fine_chem_pharma_deep_vacuum_distill");
  });
});

describe("packedColumnTypes", () => {
  it("returns 5 types", () => {
    expect(packedColumnTypes()).toHaveLength(5);
  });
});
