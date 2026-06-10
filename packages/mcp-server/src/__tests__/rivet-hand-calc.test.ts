import { describe, it, expect } from "vitest";
import {
  rivetDiameterMm, rivetLengthMm, holeClearanceMm, headDiameterMm,
  settingForceNewtons, shearStrengthNewtons, annealingRequired,
  spacingMm, costPer100, rivetMetals,
} from "../rivet-hand-calc.js";

describe("rivetDiameterMm", () => {
  it("thicker sheet = larger rivet", () => {
    expect(rivetDiameterMm(2)).toBeGreaterThan(rivetDiameterMm(1));
  });
});

describe("rivetLengthMm", () => {
  it("thicker stack = longer rivet", () => {
    expect(rivetLengthMm(4, 3)).toBeGreaterThan(rivetLengthMm(2, 3));
  });
});

describe("holeClearanceMm", () => {
  it("slightly larger than rivet", () => {
    expect(holeClearanceMm(3)).toBeGreaterThan(3);
  });
});

describe("headDiameterMm", () => {
  it("1.6x rivet diameter", () => {
    expect(headDiameterMm(5)).toBe(8);
  });
});

describe("settingForceNewtons", () => {
  it("steel needs most force", () => {
    expect(settingForceNewtons("steel", 3)).toBeGreaterThan(
      settingForceNewtons("aluminum", 3)
    );
  });
});

describe("shearStrengthNewtons", () => {
  it("steel is strongest", () => {
    expect(shearStrengthNewtons("steel", 3)).toBeGreaterThan(
      shearStrengthNewtons("copper", 3)
    );
  });
});

describe("annealingRequired", () => {
  it("copper needs annealing", () => {
    expect(annealingRequired("copper")).toBe(true);
  });
  it("steel does not need annealing", () => {
    expect(annealingRequired("steel")).toBe(false);
  });
});

describe("spacingMm", () => {
  it("3x rivet diameter", () => {
    expect(spacingMm(4)).toBe(12);
  });
});

describe("costPer100", () => {
  it("brass is most expensive", () => {
    expect(costPer100("brass")).toBeGreaterThan(costPer100("aluminum"));
  });
});

describe("rivetMetals", () => {
  it("returns 5 metals", () => {
    expect(rivetMetals()).toHaveLength(5);
  });
});
