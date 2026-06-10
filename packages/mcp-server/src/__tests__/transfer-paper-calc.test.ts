import { describe, it, expect } from "vitest";
import {
  lineClarity, easeOfUse, cleanRemove, reusable,
  paperCost, waxFree, needsHeat, transferMed,
  bestUse, transferPapers,
} from "../transfer-paper-calc.js";

describe("lineClarity", () => {
  it("iron on laser clearest lines", () => {
    expect(lineClarity("iron_on_laser")).toBeGreaterThan(lineClarity("acetone_inkjet_print"));
  });
});

describe("easeOfUse", () => {
  it("graphite carbon sheet easiest to use", () => {
    expect(easeOfUse("graphite_carbon_sheet")).toBeGreaterThan(easeOfUse("iron_on_laser"));
  });
});

describe("cleanRemove", () => {
  it("wax free trace cleanest remove", () => {
    expect(cleanRemove("wax_free_trace")).toBeGreaterThan(cleanRemove("iron_on_laser"));
  });
});

describe("reusable", () => {
  it("saral color roll most reusable", () => {
    expect(reusable("saral_color_roll")).toBeGreaterThan(reusable("acetone_inkjet_print"));
  });
});

describe("paperCost", () => {
  it("iron on laser most expensive", () => {
    expect(paperCost("iron_on_laser")).toBeGreaterThan(paperCost("graphite_carbon_sheet"));
  });
});

describe("waxFree", () => {
  it("wax free trace is wax free", () => {
    expect(waxFree("wax_free_trace")).toBe(true);
  });
  it("graphite carbon sheet not wax free", () => {
    expect(waxFree("graphite_carbon_sheet")).toBe(false);
  });
});

describe("needsHeat", () => {
  it("iron on laser needs heat", () => {
    expect(needsHeat("iron_on_laser")).toBe(true);
  });
  it("graphite carbon sheet no heat needed", () => {
    expect(needsHeat("graphite_carbon_sheet")).toBe(false);
  });
});

describe("transferMed", () => {
  it("graphite carbon sheet uses graphite wax layer", () => {
    expect(transferMed("graphite_carbon_sheet")).toBe("graphite_wax_layer");
  });
});

describe("bestUse", () => {
  it("iron on laser best for photo detail transfer", () => {
    expect(bestUse("iron_on_laser")).toBe("photo_detail_transfer");
  });
});

describe("transferPapers", () => {
  it("returns 5 types", () => {
    expect(transferPapers()).toHaveLength(5);
  });
});
