import { describe, it, expect } from "vitest";
import {
  lineLengthMeters, hookCount, hookSpacingCm,
  checkIntervalHours, baitType, bottomSet,
  snoods, seasonalMonths, costEstimate, trotlineTargets,
} from "../trotline-calc.js";

describe("lineLengthMeters", () => {
  it("cod has longest line", () => {
    expect(lineLengthMeters("cod")).toBeGreaterThan(
      lineLengthMeters("catfish")
    );
  });
});

describe("hookCount", () => {
  it("cod has most hooks", () => {
    expect(hookCount("cod")).toBeGreaterThan(
      hookCount("catfish")
    );
  });
});

describe("hookSpacingCm", () => {
  it("cod has widest spacing", () => {
    expect(hookSpacingCm("cod")).toBeGreaterThan(
      hookSpacingCm("eel")
    );
  });
});

describe("checkIntervalHours", () => {
  it("crab has longest check interval", () => {
    expect(checkIntervalHours("crab")).toBeGreaterThan(
      checkIntervalHours("catfish")
    );
  });
});

describe("baitType", () => {
  it("catfish uses cut fish", () => {
    expect(baitType("catfish")).toBe("cut_fish");
  });
});

describe("bottomSet", () => {
  it("catfish is bottom set", () => {
    expect(bottomSet("catfish")).toBe(true);
  });
  it("cod is not", () => {
    expect(bottomSet("cod")).toBe(false);
  });
});

describe("snoods", () => {
  it("catfish has snoods", () => {
    expect(snoods("catfish")).toBe(true);
  });
  it("crab does not", () => {
    expect(snoods("crab")).toBe(false);
  });
});

describe("seasonalMonths", () => {
  it("cod has longest season", () => {
    expect(seasonalMonths("cod")).toBeGreaterThan(
      seasonalMonths("sturgeon")
    );
  });
});

describe("costEstimate", () => {
  it("cod is most expensive", () => {
    expect(costEstimate("cod")).toBeGreaterThan(
      costEstimate("eel")
    );
  });
});

describe("trotlineTargets", () => {
  it("returns 5 targets", () => {
    expect(trotlineTargets()).toHaveLength(5);
  });
});
