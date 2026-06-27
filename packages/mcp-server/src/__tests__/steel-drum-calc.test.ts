import { describe, it, expect } from "vitest";
import {
  noteCount, diameterCm, skirtLengthCm,
  rangeOctaves, tuningDifficulty, volumeLevel,
  panCount, melodicRole, costEstimate, steelDrumTypes,
} from "../steel-drum-calc.js";

describe("noteCount", () => {
  it("tenor pan has most notes", () => {
    expect(noteCount("tenor_pan")).toBeGreaterThan(
      noteCount("bass_pan")
    );
  });
});

describe("diameterCm", () => {
  it("all pans same diameter", () => {
    expect(diameterCm("tenor_pan")).toBe(diameterCm("bass_pan"));
  });
});

describe("skirtLengthCm", () => {
  it("bass pan has longest skirt", () => {
    expect(skirtLengthCm("bass_pan")).toBeGreaterThan(
      skirtLengthCm("tenor_pan")
    );
  });
});

describe("rangeOctaves", () => {
  it("tenor pan has widest range", () => {
    expect(rangeOctaves("tenor_pan")).toBeGreaterThan(
      rangeOctaves("bass_pan")
    );
  });
});

describe("tuningDifficulty", () => {
  it("tenor pan is hardest to tune", () => {
    expect(tuningDifficulty("tenor_pan")).toBeGreaterThan(
      tuningDifficulty("bass_pan")
    );
  });
});

describe("volumeLevel", () => {
  it("bass pan is loudest", () => {
    expect(volumeLevel("bass_pan")).toBeGreaterThan(
      volumeLevel("tenor_pan")
    );
  });
});

describe("panCount", () => {
  it("bass pan uses most pans", () => {
    expect(panCount("bass_pan")).toBeGreaterThan(
      panCount("tenor_pan")
    );
  });
});

describe("melodicRole", () => {
  it("tenor pan plays melody", () => {
    expect(melodicRole("tenor_pan")).toBe("melody");
  });
});

describe("costEstimate", () => {
  it("bass pan is most expensive", () => {
    expect(costEstimate("bass_pan")).toBeGreaterThan(
      costEstimate("tenor_pan")
    );
  });
});

describe("steelDrumTypes", () => {
  it("returns 5 types", () => {
    expect(steelDrumTypes()).toHaveLength(5);
  });
});
