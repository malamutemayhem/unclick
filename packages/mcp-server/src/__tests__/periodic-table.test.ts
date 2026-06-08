import { describe, it, expect } from "vitest";
import { PeriodicTable } from "../periodic-table.js";

describe("PeriodicTable", () => {
  const pt = new PeriodicTable();

  it("finds element by atomic number", () => {
    const h = pt.getByNumber(1);
    expect(h!.name).toBe("Hydrogen");
    expect(h!.symbol).toBe("H");
  });

  it("finds element by symbol", () => {
    const o = pt.getBySymbol("O");
    expect(o!.name).toBe("Oxygen");
    expect(o!.mass).toBeCloseTo(15.999, 1);
  });

  it("finds element by name", () => {
    const gold = pt.getByName("Gold");
    expect(gold!.symbol).toBe("Au");
    expect(gold!.number).toBe(79);
  });

  it("case-insensitive name search", () => {
    expect(pt.getByName("carbon")!.symbol).toBe("C");
  });

  it("filters by category", () => {
    const nobles = pt.getByCategory("noble-gas");
    expect(nobles.length).toBeGreaterThanOrEqual(3);
    expect(nobles.every((e) => e.category === "noble-gas")).toBe(true);
  });

  it("filters by period", () => {
    const period2 = pt.getByPeriod(2);
    expect(period2.length).toBeGreaterThanOrEqual(4);
  });

  it("calculates molecular mass", () => {
    const waterMass = pt.molecularMass({ H: 2, O: 1 });
    expect(waterMass).toBeCloseTo(18.015, 0);
  });

  it("returns null for unknown element in formula", () => {
    expect(pt.molecularMass({ X: 1 })).toBeNull();
  });

  it("finds heaviest and lightest", () => {
    expect(pt.heaviest()!.symbol).toBe("Au");
    expect(pt.lightest()!.symbol).toBe("H");
  });

  it("searches elements", () => {
    const results = pt.search("iron");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].symbol).toBe("Fe");
  });

  it("lists categories", () => {
    const cats = pt.categories();
    expect(cats).toContain("nonmetal");
    expect(cats).toContain("noble-gas");
  });

  it("counts elements", () => {
    expect(pt.elementCount()).toBeGreaterThan(20);
  });
});
