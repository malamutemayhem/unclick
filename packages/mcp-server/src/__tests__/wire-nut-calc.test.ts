import { describe, it, expect } from "vitest";
import {
  wireRange, twistEase, connectionSecurity, temperatureRating,
  nutCost, waterproof, listedUl, shellMaterial,
  bestCircuit, wireNuts,
} from "../wire-nut-calc.js";

describe("wireRange", () => {
  it("big red 10awg widest wire range", () => {
    expect(wireRange("big_red_10awg")).toBeGreaterThan(wireRange("small_gray_22awg"));
  });
});

describe("twistEase", () => {
  it("small gray 22awg easiest to twist", () => {
    expect(twistEase("small_gray_22awg")).toBeGreaterThan(twistEase("big_red_10awg"));
  });
});

describe("connectionSecurity", () => {
  it("waterproof gel filled most secure", () => {
    expect(connectionSecurity("waterproof_gel_filled")).toBeGreaterThan(connectionSecurity("small_gray_22awg"));
  });
});

describe("temperatureRating", () => {
  it("large yellow 12awg higher temp than small", () => {
    expect(temperatureRating("large_yellow_12awg")).toBeGreaterThan(temperatureRating("waterproof_gel_filled"));
  });
});

describe("nutCost", () => {
  it("waterproof gel filled most expensive", () => {
    expect(nutCost("waterproof_gel_filled")).toBeGreaterThan(nutCost("small_gray_22awg"));
  });
});

describe("waterproof", () => {
  it("waterproof gel filled is waterproof", () => {
    expect(waterproof("waterproof_gel_filled")).toBe(true);
  });
  it("small gray 22awg is not", () => {
    expect(waterproof("small_gray_22awg")).toBe(false);
  });
});

describe("listedUl", () => {
  it("all wire nuts are ul listed", () => {
    expect(listedUl("small_gray_22awg")).toBe(true);
  });
  it("waterproof gel filled also ul listed", () => {
    expect(listedUl("waterproof_gel_filled")).toBe(true);
  });
});

describe("shellMaterial", () => {
  it("waterproof gel filled uses silicone gel sealed", () => {
    expect(shellMaterial("waterproof_gel_filled")).toBe("silicone_gel_sealed");
  });
});

describe("bestCircuit", () => {
  it("medium orange 14awg best for lighting 15amp branch", () => {
    expect(bestCircuit("medium_orange_14awg")).toBe("lighting_15amp_branch");
  });
});

describe("wireNuts", () => {
  it("returns 5 types", () => {
    expect(wireNuts()).toHaveLength(5);
  });
});
