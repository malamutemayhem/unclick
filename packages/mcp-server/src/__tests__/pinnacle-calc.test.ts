import { describe, it, expect } from "vitest";
import {
  heightM, baseArea, stoneVolume, weightTonnes,
  windForceKn, crocketCount, carvingHours,
  lightningRisk, restorationCost, pinnacleShapes,
} from "../pinnacle-calc.js";

describe("heightM", () => {
  it("finial tallest", () => {
    expect(heightM(1, "finial")).toBeGreaterThan(heightM(1, "pyramidal"));
  });
});

describe("baseArea", () => {
  it("positive area", () => {
    expect(baseArea(1, "conical")).toBeGreaterThan(0);
  });
  it("octagonal area", () => {
    expect(baseArea(1, "octagonal")).toBeGreaterThan(0);
  });
});

describe("stoneVolume", () => {
  it("positive m3", () => {
    expect(stoneVolume(1, 3)).toBeGreaterThan(0);
  });
});

describe("weightTonnes", () => {
  it("positive tonnes", () => {
    expect(weightTonnes(0.5, 2.7)).toBeGreaterThan(0);
  });
});

describe("windForceKn", () => {
  it("positive kN", () => {
    expect(windForceKn(3, 0.5, 20)).toBeGreaterThan(0);
  });
});

describe("crocketCount", () => {
  it("positive count", () => {
    expect(crocketCount(3, 30)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(crocketCount(3, 0)).toBe(0);
  });
});

describe("carvingHours", () => {
  it("crocketed takes longest", () => {
    expect(carvingHours("crocketed", 3)).toBeGreaterThan(carvingHours("conical", 3));
  });
});

describe("lightningRisk", () => {
  it("tall = high risk", () => {
    expect(lightningRisk(8)).toBe("high");
  });
  it("short = low risk", () => {
    expect(lightningRisk(1)).toBe("low");
  });
});

describe("restorationCost", () => {
  it("positive cost", () => {
    expect(restorationCost(3, 20)).toBeGreaterThan(0);
  });
});

describe("pinnacleShapes", () => {
  it("returns 5 shapes", () => {
    expect(pinnacleShapes()).toHaveLength(5);
  });
});
