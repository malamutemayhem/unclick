import { describe, it, expect } from "vitest";
import {
  frameDiameter, skinArea, ribCount, buoyancyKg,
  displacement, paddleLength, hideWeight, tarCoats,
  stabilityRating, hullMaterials,
} from "../coracle-calc.js";

describe("frameDiameter", () => {
  it("larger for more paddlers", () => {
    expect(frameDiameter(2)).toBeGreaterThan(frameDiameter(1));
  });
});

describe("skinArea", () => {
  it("positive cm2", () => {
    expect(skinArea(100, 30)).toBeGreaterThan(0);
  });
});

describe("ribCount", () => {
  it("positive count", () => {
    expect(ribCount(100, 10)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(ribCount(100, 0)).toBe(0);
  });
});

describe("buoyancyKg", () => {
  it("1 kg per liter", () => {
    expect(buoyancyKg(100)).toBe(100);
  });
});

describe("displacement", () => {
  it("positive liters", () => {
    expect(displacement(100, 30)).toBeGreaterThan(0);
  });
});

describe("paddleLength", () => {
  it("70% of height", () => {
    expect(paddleLength(180)).toBe(126);
  });
});

describe("hideWeight", () => {
  it("positive grams", () => {
    expect(hideWeight(5000)).toBeGreaterThan(0);
  });
});

describe("tarCoats", () => {
  it("rough needs most", () => {
    expect(tarCoats("rough")).toBeGreaterThan(tarCoats("calm"));
  });
});

describe("stabilityRating", () => {
  it("wide = stable", () => {
    expect(stabilityRating(150, 30)).toBe("stable");
  });
  it("narrow = tippy", () => {
    expect(stabilityRating(60, 30)).toBe("tippy");
  });
});

describe("hullMaterials", () => {
  it("returns 4 materials", () => {
    expect(hullMaterials()).toHaveLength(4);
  });
});
