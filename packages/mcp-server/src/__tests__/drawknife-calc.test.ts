import { describe, it, expect } from "vitest";
import {
  bladeAngle, bladeBevel, shavingThickness, handleLength,
  materialRemovalRate, sharpeningInterval, grindstoneGrit,
  pullForceN, wastePercent, woodHardnessLevels,
} from "../drawknife-calc.js";

describe("bladeAngle", () => {
  it("steeper for hard wood", () => {
    expect(bladeAngle("hard")).toBeGreaterThan(bladeAngle("soft"));
  });
});

describe("bladeBevel", () => {
  it("half of primary", () => {
    expect(bladeBevel(30)).toBe(15);
  });
});

describe("shavingThickness", () => {
  it("positive mm", () => {
    expect(shavingThickness(25, 10)).toBeGreaterThan(0);
  });
  it("zero angle = 0", () => {
    expect(shavingThickness(0, 10)).toBe(0);
  });
});

describe("handleLength", () => {
  it("positive cm", () => {
    expect(handleLength(20)).toBeGreaterThan(0);
  });
});

describe("materialRemovalRate", () => {
  it("positive rate", () => {
    expect(materialRemovalRate(2, 15, 30)).toBeGreaterThan(0);
  });
});

describe("sharpeningInterval", () => {
  it("needs sharpening after max hours", () => {
    expect(sharpeningInterval("soft", 5)).toBe(true);
  });
  it("no sharpening when fresh", () => {
    expect(sharpeningInterval("soft", 1)).toBe(false);
  });
});

describe("grindstoneGrit", () => {
  it("finer for later stages", () => {
    expect(grindstoneGrit("strop")).toBeGreaterThan(grindstoneGrit("reshape"));
  });
});

describe("pullForceN", () => {
  it("more force for hard wood", () => {
    expect(pullForceN("hard", 20)).toBeGreaterThan(pullForceN("soft", 20));
  });
});

describe("wastePercent", () => {
  it("roughing highest", () => {
    expect(wastePercent("roughing")).toBeGreaterThan(wastePercent("finishing"));
  });
});

describe("woodHardnessLevels", () => {
  it("returns 4 levels", () => {
    expect(woodHardnessLevels()).toHaveLength(4);
  });
});
