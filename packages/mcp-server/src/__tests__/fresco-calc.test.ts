import { describe, it, expect } from "vitest";
import {
  wallAreaM2, giornataCm2, daysToComplete, plasterThicknessMm,
  limeKg, sandKg, pigmentGrams, dryingWindowHours,
  scaffoldPlatforms, restorationCost, plasterLayers,
} from "../fresco-calc.js";

describe("wallAreaM2", () => {
  it("positive area", () => {
    expect(wallAreaM2(5, 3)).toBe(15);
  });
});

describe("giornataCm2", () => {
  it("master covers most", () => {
    expect(giornataCm2("master")).toBeGreaterThan(giornataCm2("apprentice"));
  });
});

describe("daysToComplete", () => {
  it("positive days", () => {
    expect(daysToComplete(50000, 4000)).toBeGreaterThan(0);
  });
  it("zero giornata = 0", () => {
    expect(daysToComplete(50000, 0)).toBe(0);
  });
});

describe("plasterThicknessMm", () => {
  it("arriccio thickest", () => {
    expect(plasterThicknessMm("arriccio")).toBeGreaterThan(plasterThicknessMm("intonaco"));
  });
});

describe("limeKg", () => {
  it("positive kg", () => {
    expect(limeKg(50000, 5)).toBeGreaterThan(0);
  });
});

describe("sandKg", () => {
  it("proportional to lime", () => {
    expect(sandKg(10, 3)).toBe(30);
  });
});

describe("pigmentGrams", () => {
  it("opaque uses most", () => {
    expect(pigmentGrams(10000, "opaque")).toBeGreaterThan(pigmentGrams(10000, "light"));
  });
});

describe("dryingWindowHours", () => {
  it("positive hours", () => {
    expect(dryingWindowHours(50, 20)).toBeGreaterThan(0);
  });
});

describe("scaffoldPlatforms", () => {
  it("positive platforms", () => {
    expect(scaffoldPlatforms(8, 2)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(scaffoldPlatforms(8, 0)).toBe(0);
  });
});

describe("restorationCost", () => {
  it("more damage = higher cost", () => {
    expect(restorationCost(10000, 50)).toBeGreaterThan(restorationCost(10000, 10));
  });
});

describe("plasterLayers", () => {
  it("returns 3 layers", () => {
    expect(plasterLayers()).toHaveLength(3);
  });
});
