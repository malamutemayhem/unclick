import { describe, it, expect } from "vitest";
import {
  floorArea, vaultHeight, windowArea, choirStalls,
  altarSteps, roodScreenPanels, acousticReverbS,
  lightLevel, stoneworkM3, vaultTypes,
} from "../chancel-calc.js";

describe("floorArea", () => {
  it("positive area", () => {
    expect(floorArea(10, 6)).toBe(60);
  });
});

describe("vaultHeight", () => {
  it("fan tallest", () => {
    expect(vaultHeight(8, "fan")).toBeGreaterThan(vaultHeight(8, "barrel"));
  });
});

describe("windowArea", () => {
  it("positive area", () => {
    expect(windowArea(5, 3, 0.4)).toBeGreaterThan(0);
  });
});

describe("choirStalls", () => {
  it("positive count", () => {
    expect(choirStalls(10, 60)).toBeGreaterThan(0);
  });
  it("zero width = 0", () => {
    expect(choirStalls(10, 0)).toBe(0);
  });
});

describe("altarSteps", () => {
  it("positive steps", () => {
    expect(altarSteps(45, 15)).toBeGreaterThan(0);
  });
  it("zero riser = 0", () => {
    expect(altarSteps(45, 0)).toBe(0);
  });
});

describe("roodScreenPanels", () => {
  it("positive panels", () => {
    expect(roodScreenPanels(6, 50)).toBeGreaterThan(0);
  });
});

describe("acousticReverbS", () => {
  it("positive seconds", () => {
    expect(acousticReverbS(500, 50)).toBeGreaterThan(0);
  });
  it("zero absorption = 0", () => {
    expect(acousticReverbS(500, 0)).toBe(0);
  });
});

describe("lightLevel", () => {
  it("large windows = bright", () => {
    expect(lightLevel(20, 60)).toBe("bright");
  });
  it("small windows = dim", () => {
    expect(lightLevel(2, 60)).toBe("dim");
  });
});

describe("stoneworkM3", () => {
  it("positive volume", () => {
    expect(stoneworkM3(10, 6, 0.8, 8)).toBeGreaterThan(0);
  });
});

describe("vaultTypes", () => {
  it("returns 5 types", () => {
    expect(vaultTypes()).toHaveLength(5);
  });
});
