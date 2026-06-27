import { describe, it, expect } from "vitest";
import {
  burstDiameterM, launchHeight, safetyRadiusM, fuseDelay,
  starCount, burnTime, colorTemp, soundDelay, showDuration,
  costPerShell, showCost, windLimit, shellTypes,
} from "../fireworks-calc.js";

describe("burstDiameterM", () => {
  it("larger caliber = bigger burst", () => {
    expect(burstDiameterM(8)).toBeGreaterThan(burstDiameterM(3));
  });
});

describe("launchHeight", () => {
  it("larger caliber = higher", () => {
    expect(launchHeight(10)).toBeGreaterThan(launchHeight(4));
  });
});

describe("safetyRadiusM", () => {
  it("positive meters", () => {
    expect(safetyRadiusM(6)).toBeGreaterThan(0);
  });
});

describe("fuseDelay", () => {
  it("positive seconds", () => {
    expect(fuseDelay(100)).toBeGreaterThan(0);
  });
});

describe("starCount", () => {
  it("chrysanthemum has most stars", () => {
    expect(starCount(6, "chrysanthemum")).toBeGreaterThan(starCount(6, "palm"));
  });
});

describe("burnTime", () => {
  it("larger caliber = longer burn", () => {
    expect(burnTime(8)).toBeGreaterThan(burnTime(3));
  });
});

describe("colorTemp", () => {
  it("white is hottest", () => {
    expect(colorTemp("white")).toBeGreaterThan(colorTemp("red"));
  });
});

describe("soundDelay", () => {
  it("positive seconds", () => {
    expect(soundDelay(1000)).toBeGreaterThan(0);
  });
  it("~3 seconds per km", () => {
    expect(soundDelay(343)).toBeCloseTo(1, 1);
  });
});

describe("showDuration", () => {
  it("positive minutes", () => {
    expect(showDuration(100)).toBeGreaterThan(0);
  });
});

describe("costPerShell", () => {
  it("bigger = more expensive", () => {
    expect(costPerShell(12)).toBeGreaterThan(costPerShell(3));
  });
});

describe("showCost", () => {
  it("positive cost", () => {
    expect(showCost(50, 6)).toBeGreaterThan(0);
  });
});

describe("windLimit", () => {
  it("larger shells need calmer wind", () => {
    expect(windLimit(10)).toBeLessThan(windLimit(3));
  });
});

describe("shellTypes", () => {
  it("returns 6 types", () => {
    expect(shellTypes()).toHaveLength(6);
  });
});
