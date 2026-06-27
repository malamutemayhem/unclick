import { describe, it, expect } from "vitest";
import {
  fretPositionMm, fretWidthMm, fretHeightMm, wearResistance, toneCharacter,
  installationTimeMinsPerFret, refretIntervalYears, totalFrets,
  costPerSet, fretMaterials,
} from "../fret-calc.js";

describe("fretPositionMm", () => {
  it("12th fret is at half scale length", () => {
    expect(fretPositionMm(648, 12)).toBeCloseTo(324, 0);
  });
  it("higher frets are further from nut", () => {
    expect(fretPositionMm(648, 5)).toBeGreaterThan(fretPositionMm(648, 3));
  });
});

describe("fretWidthMm", () => {
  it("stainless steel is widest", () => {
    expect(fretWidthMm("stainless_steel")).toBeGreaterThan(
      fretWidthMm("copper")
    );
  });
});

describe("fretHeightMm", () => {
  it("stainless steel is tallest", () => {
    expect(fretHeightMm("stainless_steel")).toBeGreaterThan(
      fretHeightMm("copper")
    );
  });
});

describe("wearResistance", () => {
  it("stainless steel has best wear resistance", () => {
    expect(wearResistance("stainless_steel")).toBeGreaterThan(
      wearResistance("copper")
    );
  });
});

describe("toneCharacter", () => {
  it("brass is warm", () => {
    expect(toneCharacter("brass")).toBe("warm");
  });
  it("stainless steel is crisp", () => {
    expect(toneCharacter("stainless_steel")).toBe("crisp");
  });
});

describe("installationTimeMinsPerFret", () => {
  it("stainless steel takes longest", () => {
    expect(installationTimeMinsPerFret("stainless_steel")).toBeGreaterThan(
      installationTimeMinsPerFret("brass")
    );
  });
});

describe("refretIntervalYears", () => {
  it("stainless steel lasts longest", () => {
    expect(refretIntervalYears("stainless_steel")).toBeGreaterThan(
      refretIntervalYears("copper")
    );
  });
});

describe("totalFrets", () => {
  it("returns 22", () => {
    expect(totalFrets()).toBe(22);
  });
});

describe("costPerSet", () => {
  it("stainless steel is most expensive", () => {
    expect(costPerSet("stainless_steel")).toBeGreaterThan(
      costPerSet("copper")
    );
  });
});

describe("fretMaterials", () => {
  it("returns 5 materials", () => {
    expect(fretMaterials()).toHaveLength(5);
  });
});
