import { describe, it, expect } from "vitest";
import {
  coveragePower, toothTexture, dryTime, surfaceRange,
  gessoCost, sandable, transparent, baseComposition,
  bestMedium, gessos,
} from "../gesso-calc.js";

describe("coveragePower", () => {
  it("black opaque primer best coverage power", () => {
    expect(coveragePower("black_opaque_primer")).toBeGreaterThan(coveragePower("clear_transparent_coat"));
  });
});

describe("toothTexture", () => {
  it("absorbent watercolor ground best tooth texture", () => {
    expect(toothTexture("absorbent_watercolor_ground")).toBeGreaterThan(toothTexture("clear_transparent_coat"));
  });
});

describe("dryTime", () => {
  it("clear transparent coat fastest dry time", () => {
    expect(dryTime("clear_transparent_coat")).toBeGreaterThan(dryTime("absorbent_watercolor_ground"));
  });
});

describe("surfaceRange", () => {
  it("clear transparent coat widest surface range", () => {
    expect(surfaceRange("clear_transparent_coat")).toBeGreaterThan(surfaceRange("absorbent_watercolor_ground"));
  });
});

describe("gessoCost", () => {
  it("absorbent watercolor ground most expensive", () => {
    expect(gessoCost("absorbent_watercolor_ground")).toBeGreaterThan(gessoCost("white_acrylic_standard"));
  });
});

describe("sandable", () => {
  it("white acrylic standard is sandable", () => {
    expect(sandable("white_acrylic_standard")).toBe(true);
  });
  it("absorbent watercolor ground is not sandable", () => {
    expect(sandable("absorbent_watercolor_ground")).toBe(false);
  });
});

describe("transparent", () => {
  it("clear transparent coat is transparent", () => {
    expect(transparent("clear_transparent_coat")).toBe(true);
  });
  it("white acrylic standard is not transparent", () => {
    expect(transparent("white_acrylic_standard")).toBe(false);
  });
});

describe("baseComposition", () => {
  it("white acrylic standard uses calcium carbonate acrylic", () => {
    expect(baseComposition("white_acrylic_standard")).toBe("calcium_carbonate_acrylic");
  });
});

describe("bestMedium", () => {
  it("absorbent watercolor ground best for watercolor on canvas", () => {
    expect(bestMedium("absorbent_watercolor_ground")).toBe("watercolor_on_canvas");
  });
});

describe("gessos", () => {
  it("returns 5 types", () => {
    expect(gessos()).toHaveLength(5);
  });
});
