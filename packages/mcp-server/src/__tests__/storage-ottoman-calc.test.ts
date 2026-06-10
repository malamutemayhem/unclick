import { describe, it, expect } from "vitest";
import {
  storageCapacity, seatingComfort, styleAppeal, versatility,
  ottomanCost, foldable, hasServingTray, upholstery,
  bestRoom, storageOttomans,
} from "../storage-ottoman-calc.js";

describe("storageCapacity", () => {
  it("bench long hinged largest storage", () => {
    expect(storageCapacity("bench_long_hinged")).toBeGreaterThan(storageCapacity("cube_foldable_fabric"));
  });
});

describe("seatingComfort", () => {
  it("round tufted leather most comfortable", () => {
    expect(seatingComfort("round_tufted_leather")).toBeGreaterThan(seatingComfort("woven_basket_natural"));
  });
});

describe("styleAppeal", () => {
  it("round tufted leather most stylish", () => {
    expect(styleAppeal("round_tufted_leather")).toBeGreaterThan(styleAppeal("cube_foldable_fabric"));
  });
});

describe("versatility", () => {
  it("tray top reversible most versatile", () => {
    expect(versatility("tray_top_reversible")).toBeGreaterThan(versatility("woven_basket_natural"));
  });
});

describe("ottomanCost", () => {
  it("round tufted leather most expensive", () => {
    expect(ottomanCost("round_tufted_leather")).toBeGreaterThan(ottomanCost("cube_foldable_fabric"));
  });
});

describe("foldable", () => {
  it("cube foldable fabric is foldable", () => {
    expect(foldable("cube_foldable_fabric")).toBe(true);
  });
  it("round tufted leather is not foldable", () => {
    expect(foldable("round_tufted_leather")).toBe(false);
  });
});

describe("hasServingTray", () => {
  it("tray top reversible has serving tray", () => {
    expect(hasServingTray("tray_top_reversible")).toBe(true);
  });
  it("bench long hinged has no serving tray", () => {
    expect(hasServingTray("bench_long_hinged")).toBe(false);
  });
});

describe("upholstery", () => {
  it("round tufted leather uses bonded leather tufted", () => {
    expect(upholstery("round_tufted_leather")).toBe("bonded_leather_tufted");
  });
});

describe("bestRoom", () => {
  it("tray top reversible best for coffee table alternate", () => {
    expect(bestRoom("tray_top_reversible")).toBe("coffee_table_alternate");
  });
});

describe("storageOttomans", () => {
  it("returns 5 types", () => {
    expect(storageOttomans()).toHaveLength(5);
  });
});
