import { describe, it, expect } from "vitest";
import {
  loadCapacity, durability, hygiene, unitWeight,
  unitCost, exportCompliant, recyclable, entryType,
  bestApplication, palletTypes,
} from "../pallet-type-calc.js";

describe("loadCapacity", () => {
  it("metal highest load capacity", () => {
    expect(loadCapacity("metal")).toBeGreaterThan(loadCapacity("presswood"));
  });
});

describe("durability", () => {
  it("metal most durable", () => {
    expect(durability("metal")).toBeGreaterThan(durability("wood_stringer"));
  });
});

describe("hygiene", () => {
  it("plastic most hygienic", () => {
    expect(hygiene("plastic")).toBeGreaterThan(hygiene("wood_stringer"));
  });
});

describe("unitWeight", () => {
  it("metal heaviest unit weight", () => {
    expect(unitWeight("metal")).toBeGreaterThan(unitWeight("presswood"));
  });
});

describe("unitCost", () => {
  it("metal most expensive", () => {
    expect(unitCost("metal")).toBeGreaterThan(unitCost("wood_stringer"));
  });
});

describe("exportCompliant", () => {
  it("plastic is export compliant", () => {
    expect(exportCompliant("plastic")).toBe(true);
  });
  it("wood stringer is not", () => {
    expect(exportCompliant("wood_stringer")).toBe(false);
  });
});

describe("recyclable", () => {
  it("all pallet types are recyclable", () => {
    expect(recyclable("wood_stringer")).toBe(true);
    expect(recyclable("plastic")).toBe(true);
  });
});

describe("entryType", () => {
  it("plastic uses four way molded entry", () => {
    expect(entryType("plastic")).toBe("four_way_molded_entry");
  });
});

describe("bestApplication", () => {
  it("plastic for food pharma cleanroom", () => {
    expect(bestApplication("plastic")).toBe("food_pharma_cleanroom");
  });
});

describe("palletTypes", () => {
  it("returns 5 types", () => {
    expect(palletTypes()).toHaveLength(5);
  });
});
