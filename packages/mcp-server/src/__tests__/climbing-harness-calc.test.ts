import { describe, it, expect } from "vitest";
import {
  comfortRating, weightGrams, gearLoops, fallProtection,
  adjustability, suitableForChildren, hasLegLoops, tieInSystem,
  bestActivity, climbingHarnesses,
} from "../climbing-harness-calc.js";

describe("comfortRating", () => {
  it("big wall most comfortable", () => {
    expect(comfortRating("big_wall")).toBeGreaterThan(comfortRating("chest"));
  });
});

describe("weightGrams", () => {
  it("big wall heaviest", () => {
    expect(weightGrams("big_wall")).toBeGreaterThan(weightGrams("alpine"));
  });
});

describe("gearLoops", () => {
  it("big wall most gear loops", () => {
    expect(gearLoops("big_wall")).toBeGreaterThan(gearLoops("chest"));
  });
});

describe("fallProtection", () => {
  it("full body best fall protection", () => {
    expect(fallProtection("full_body")).toBeGreaterThan(fallProtection("chest"));
  });
});

describe("adjustability", () => {
  it("full body most adjustable", () => {
    expect(adjustability("full_body")).toBeGreaterThan(adjustability("chest"));
  });
});

describe("suitableForChildren", () => {
  it("full body suitable for children", () => {
    expect(suitableForChildren("full_body")).toBe(true);
  });
  it("sit is not", () => {
    expect(suitableForChildren("sit")).toBe(false);
  });
});

describe("hasLegLoops", () => {
  it("sit has leg loops", () => {
    expect(hasLegLoops("sit")).toBe(true);
  });
  it("chest does not", () => {
    expect(hasLegLoops("chest")).toBe(false);
  });
});

describe("tieInSystem", () => {
  it("big wall has haul loop belay seat", () => {
    expect(tieInSystem("big_wall")).toBe("haul_loop_belay_seat");
  });
});

describe("bestActivity", () => {
  it("alpine for mountaineering ski", () => {
    expect(bestActivity("alpine")).toBe("mountaineering_ski");
  });
});

describe("climbingHarnesses", () => {
  it("returns 5 harnesses", () => {
    expect(climbingHarnesses()).toHaveLength(5);
  });
});
