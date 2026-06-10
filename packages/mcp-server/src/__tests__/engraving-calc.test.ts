import { describe, it, expect } from "vitest";
import {
  plateThicknessMm, burinAngleDeg, lineDepthMm, inkViscosity,
  wipingPassCount, pressureTonnes, dampPaperSoakMinutes,
  impressionsPerPlate, etchTimeMinutes, costPerPlate, plateTypes,
} from "../engraving-calc.js";

describe("plateThicknessMm", () => {
  it("copper is thickest", () => {
    expect(plateThicknessMm("copper")).toBeGreaterThan(plateThicknessMm("aluminum"));
  });
});

describe("burinAngleDeg", () => {
  it("stipple has widest angle", () => {
    expect(burinAngleDeg("stipple")).toBeGreaterThan(burinAngleDeg("mezzotint"));
  });
});

describe("lineDepthMm", () => {
  it("mezzotint is deepest", () => {
    expect(lineDepthMm("mezzotint")).toBeGreaterThan(lineDepthMm("stipple"));
  });
});

describe("inkViscosity", () => {
  it("steel has highest viscosity", () => {
    expect(inkViscosity("steel")).toBeGreaterThan(inkViscosity("aluminum"));
  });
});

describe("wipingPassCount", () => {
  it("mezzotint needs most wiping", () => {
    expect(wipingPassCount("mezzotint")).toBeGreaterThan(wipingPassCount("line"));
  });
});

describe("pressureTonnes", () => {
  it("larger plate = more pressure", () => {
    expect(pressureTonnes(500)).toBeGreaterThan(pressureTonnes(200));
  });
});

describe("dampPaperSoakMinutes", () => {
  it("heavy paper soaks longest", () => {
    expect(dampPaperSoakMinutes("heavy")).toBeGreaterThan(
      dampPaperSoakMinutes("light")
    );
  });
});

describe("impressionsPerPlate", () => {
  it("steel lasts longest", () => {
    expect(impressionsPerPlate("steel")).toBeGreaterThan(impressionsPerPlate("aluminum"));
  });
});

describe("etchTimeMinutes", () => {
  it("steel takes longest to etch", () => {
    expect(etchTimeMinutes("steel")).toBeGreaterThan(etchTimeMinutes("aluminum"));
  });
});

describe("costPerPlate", () => {
  it("steel most expensive", () => {
    expect(costPerPlate("steel", 10)).toBeGreaterThan(costPerPlate("aluminum", 10));
  });
});

describe("plateTypes", () => {
  it("returns 5 types", () => {
    expect(plateTypes()).toHaveLength(5);
  });
});
