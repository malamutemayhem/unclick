import { describe, it, expect } from "vitest";
import {
  dryingTimeHours, colorVibrancy, blendability,
  archivalQuality, toxicity, waterSoluble,
  requiresHeat, bestSurface, famousArtist, paintMediums,
} from "../paint-medium-calc.js";

describe("dryingTimeHours", () => {
  it("oil dries slowest", () => {
    expect(dryingTimeHours("oil")).toBeGreaterThan(
      dryingTimeHours("acrylic")
    );
  });
});

describe("colorVibrancy", () => {
  it("oil most vibrant", () => {
    expect(colorVibrancy("oil")).toBeGreaterThan(
      colorVibrancy("watercolor")
    );
  });
});

describe("blendability", () => {
  it("oil most blendable", () => {
    expect(blendability("oil")).toBeGreaterThan(
      blendability("gouache")
    );
  });
});

describe("archivalQuality", () => {
  it("oil has top archival quality", () => {
    expect(archivalQuality("oil")).toBeGreaterThan(
      archivalQuality("gouache")
    );
  });
});

describe("toxicity", () => {
  it("oil most toxic", () => {
    expect(toxicity("oil")).toBeGreaterThan(
      toxicity("watercolor")
    );
  });
});

describe("waterSoluble", () => {
  it("watercolor is water soluble", () => {
    expect(waterSoluble("watercolor")).toBe(true);
  });
  it("oil is not", () => {
    expect(waterSoluble("oil")).toBe(false);
  });
});

describe("requiresHeat", () => {
  it("encaustic requires heat", () => {
    expect(requiresHeat("encaustic")).toBe(true);
  });
  it("acrylic does not", () => {
    expect(requiresHeat("acrylic")).toBe(false);
  });
});

describe("bestSurface", () => {
  it("watercolor on paper", () => {
    expect(bestSurface("watercolor")).toBe("paper");
  });
});

describe("famousArtist", () => {
  it("oil famous artist is rembrandt", () => {
    expect(famousArtist("oil")).toBe("rembrandt");
  });
});

describe("paintMediums", () => {
  it("returns 5 mediums", () => {
    expect(paintMediums()).toHaveLength(5);
  });
});
