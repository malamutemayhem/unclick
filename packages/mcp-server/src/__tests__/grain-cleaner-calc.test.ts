import { describe, it, expect } from "vitest";
import {
  cleaningAccuracy, throughput, foreignRemoval, grainLoss,
  gcCost, automated, forWheat, cleanerConfig,
  bestUse, grainCleanerTypes,
} from "../grain-cleaner-calc.js";

describe("cleaningAccuracy", () => {
  it("color sorter best cleaning accuracy", () => {
    expect(cleaningAccuracy("color_sorter")).toBeGreaterThan(cleaningAccuracy("magnetic_separator"));
  });
});

describe("throughput", () => {
  it("magnetic separator highest throughput", () => {
    expect(throughput("magnetic_separator")).toBeGreaterThan(throughput("disc_separator"));
  });
});

describe("foreignRemoval", () => {
  it("destoner gravity best foreign removal", () => {
    expect(foreignRemoval("destoner_gravity")).toBeGreaterThan(foreignRemoval("magnetic_separator"));
  });
});

describe("grainLoss", () => {
  it("color sorter least grain loss", () => {
    expect(grainLoss("color_sorter")).toBeGreaterThan(grainLoss("air_screen"));
  });
});

describe("gcCost", () => {
  it("color sorter most expensive", () => {
    expect(gcCost("color_sorter")).toBeGreaterThan(gcCost("magnetic_separator"));
  });
});

describe("automated", () => {
  it("air screen is automated", () => {
    expect(automated("air_screen")).toBe(true);
  });
});

describe("forWheat", () => {
  it("air screen for wheat", () => {
    expect(forWheat("air_screen")).toBe(true);
  });
  it("color sorter not for wheat", () => {
    expect(forWheat("color_sorter")).toBe(false);
  });
});

describe("cleanerConfig", () => {
  it("disc separator uses indent pocket sort by length", () => {
    expect(cleanerConfig("disc_separator")).toBe("disc_separator_grain_cleaner_indent_pocket_sort_by_length");
  });
});

describe("bestUse", () => {
  it("magnetic separator for ferrous metal removal", () => {
    expect(bestUse("magnetic_separator")).toBe("grain_intake_magnetic_separator_remove_ferrous_metal_contaminant");
  });
});

describe("grainCleanerTypes", () => {
  it("returns 5 types", () => {
    expect(grainCleanerTypes()).toHaveLength(5);
  });
});
