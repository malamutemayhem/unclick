import { describe, it, expect } from "vitest";
import {
  plateThicknessMm, etchTimeMinutes, acidType, lineQualityRating,
  toneRangeRating, editionsPerPlate, pressureBar, inkGPerPrint,
  costPerPlate, intaglioMethods,
} from "../copperplate-calc.js";

describe("plateThicknessMm", () => {
  it("mezzotint is thickest", () => {
    expect(plateThicknessMm("mezzotint")).toBeGreaterThan(
      plateThicknessMm("drypoint")
    );
  });
});

describe("etchTimeMinutes", () => {
  it("engraving has no etch time", () => {
    expect(etchTimeMinutes("engraving")).toBe(0);
  });
  it("etching takes longest", () => {
    expect(etchTimeMinutes("etching")).toBeGreaterThan(
      etchTimeMinutes("aquatint")
    );
  });
});

describe("acidType", () => {
  it("engraving uses no acid", () => {
    expect(acidType("engraving")).toBe("none");
  });
  it("etching uses ferric chloride", () => {
    expect(acidType("etching")).toBe("ferric_chloride");
  });
});

describe("lineQualityRating", () => {
  it("engraving has best line quality", () => {
    expect(lineQualityRating("engraving")).toBeGreaterThan(
      lineQualityRating("mezzotint")
    );
  });
});

describe("toneRangeRating", () => {
  it("mezzotint has best tonal range", () => {
    expect(toneRangeRating("mezzotint")).toBeGreaterThan(
      toneRangeRating("drypoint")
    );
  });
});

describe("editionsPerPlate", () => {
  it("engraving yields most editions", () => {
    expect(editionsPerPlate("engraving")).toBeGreaterThan(
      editionsPerPlate("drypoint")
    );
  });
});

describe("pressureBar", () => {
  it("returns 40", () => {
    expect(pressureBar()).toBe(40);
  });
});

describe("inkGPerPrint", () => {
  it("larger plate uses more ink", () => {
    expect(inkGPerPrint(500)).toBeGreaterThan(inkGPerPrint(100));
  });
});

describe("costPerPlate", () => {
  it("mezzotint is most expensive", () => {
    expect(costPerPlate("mezzotint")).toBeGreaterThan(
      costPerPlate("drypoint")
    );
  });
});

describe("intaglioMethods", () => {
  it("returns 5 methods", () => {
    expect(intaglioMethods()).toHaveLength(5);
  });
});
