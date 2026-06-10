import { describe, it, expect } from "vitest";
import {
  impressionDepthMm, casingRequired, malletWeight, skillLevel,
  stampsNeeded, leatherThicknessMinMm, timePerCm2Seconds,
  repeatabilityRating, costPerStamp, stampCategories,
} from "../leather-stamping-calc.js";

describe("impressionDepthMm", () => {
  it("figure carving is deepest", () => {
    expect(impressionDepthMm("figure_carving")).toBeGreaterThan(
      impressionDepthMm("background")
    );
  });
});

describe("casingRequired", () => {
  it("always required", () => {
    expect(casingRequired("geometric")).toBe(true);
  });
});

describe("malletWeight", () => {
  it("figure carving needs heavy mallet", () => {
    expect(malletWeight("figure_carving")).toBe("heavy");
  });
});

describe("skillLevel", () => {
  it("figure carving needs most skill", () => {
    expect(skillLevel("figure_carving")).toBeGreaterThan(
      skillLevel("background")
    );
  });
});

describe("stampsNeeded", () => {
  it("figure carving needs most stamps", () => {
    expect(stampsNeeded("figure_carving")).toBeGreaterThan(
      stampsNeeded("background")
    );
  });
});

describe("leatherThicknessMinMm", () => {
  it("figure carving needs thickest leather", () => {
    expect(leatherThicknessMinMm("figure_carving")).toBeGreaterThan(
      leatherThicknessMinMm("border")
    );
  });
});

describe("timePerCm2Seconds", () => {
  it("figure carving takes longest", () => {
    expect(timePerCm2Seconds("figure_carving")).toBeGreaterThan(
      timePerCm2Seconds("background")
    );
  });
});

describe("repeatabilityRating", () => {
  it("background is most repeatable", () => {
    expect(repeatabilityRating("background")).toBeGreaterThan(
      repeatabilityRating("figure_carving")
    );
  });
});

describe("costPerStamp", () => {
  it("figure carving stamps are most expensive", () => {
    expect(costPerStamp("figure_carving")).toBeGreaterThan(
      costPerStamp("background")
    );
  });
});

describe("stampCategories", () => {
  it("returns 5 categories", () => {
    expect(stampCategories()).toHaveLength(5);
  });
});
