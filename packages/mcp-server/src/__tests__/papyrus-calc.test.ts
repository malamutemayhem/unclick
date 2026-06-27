import { describe, it, expect } from "vitest";
import {
  stripWidthMm, soakingTimeHours, pressingDays, pressureKgPerM2,
  sheetThicknessMm, writingSurface, durabilityRating, reusable,
  costPerSheet, papyrusGrades,
} from "../papyrus-calc.js";

describe("stripWidthMm", () => {
  it("coarse has widest strips", () => {
    expect(stripWidthMm("coarse")).toBeGreaterThan(stripWidthMm("fine"));
  });
});

describe("soakingTimeHours", () => {
  it("fine soaks longest", () => {
    expect(soakingTimeHours("fine")).toBeGreaterThan(
      soakingTimeHours("coarse")
    );
  });
});

describe("pressingDays", () => {
  it("fine takes longest to press", () => {
    expect(pressingDays("fine")).toBeGreaterThan(pressingDays("coarse"));
  });
});

describe("pressureKgPerM2", () => {
  it("fine needs most pressure", () => {
    expect(pressureKgPerM2("fine")).toBeGreaterThan(
      pressureKgPerM2("coarse")
    );
  });
});

describe("sheetThicknessMm", () => {
  it("double layer is thickest", () => {
    expect(sheetThicknessMm("double_layer")).toBeGreaterThan(
      sheetThicknessMm("fine")
    );
  });
});

describe("writingSurface", () => {
  it("fine has best writing surface", () => {
    expect(writingSurface("fine")).toBeGreaterThan(
      writingSurface("coarse")
    );
  });
});

describe("durabilityRating", () => {
  it("coarse is most durable", () => {
    expect(durabilityRating("coarse")).toBeGreaterThan(
      durabilityRating("fine")
    );
  });
});

describe("reusable", () => {
  it("palimpsest is reusable", () => {
    expect(reusable("palimpsest")).toBe(true);
  });
  it("standard is not reusable", () => {
    expect(reusable("standard")).toBe(false);
  });
});

describe("costPerSheet", () => {
  it("fine is most expensive", () => {
    expect(costPerSheet("fine")).toBeGreaterThan(costPerSheet("coarse"));
  });
});

describe("papyrusGrades", () => {
  it("returns 5 grades", () => {
    expect(papyrusGrades()).toHaveLength(5);
  });
});
