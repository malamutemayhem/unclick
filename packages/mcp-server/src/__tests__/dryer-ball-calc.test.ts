import { describe, it, expect } from "vitest";
import {
  dryTimeReduction, staticReduction, fabricSoftness, noiseLevel,
  ballCost, ecoFriendly, addFragrance, ballMaterial,
  bestUse, dryerBalls,
} from "../dryer-ball-calc.js";

describe("dryTimeReduction", () => {
  it("wool felted best dry time reduction", () => {
    expect(dryTimeReduction("wool_felted")).toBeGreaterThan(dryTimeReduction("tennis_ball_hack"));
  });
});

describe("staticReduction", () => {
  it("wool felted best static reduction", () => {
    expect(staticReduction("wool_felted")).toBeGreaterThan(staticReduction("plastic_spike"));
  });
});

describe("fabricSoftness", () => {
  it("wool felted softest fabric result", () => {
    expect(fabricSoftness("wool_felted")).toBeGreaterThan(fabricSoftness("scented_ceramic"));
  });
});

describe("noiseLevel", () => {
  it("wool felted quietest", () => {
    expect(noiseLevel("wool_felted")).toBeGreaterThan(noiseLevel("tennis_ball_hack"));
  });
});

describe("ballCost", () => {
  it("scented ceramic most expensive", () => {
    expect(ballCost("scented_ceramic")).toBeGreaterThan(ballCost("tennis_ball_hack"));
  });
});

describe("ecoFriendly", () => {
  it("wool felted is eco friendly", () => {
    expect(ecoFriendly("wool_felted")).toBe(true);
  });
  it("plastic spike is not", () => {
    expect(ecoFriendly("plastic_spike")).toBe(false);
  });
});

describe("addFragrance", () => {
  it("wool felted can add fragrance", () => {
    expect(addFragrance("wool_felted")).toBe(true);
  });
  it("rubber nodule cannot", () => {
    expect(addFragrance("rubber_nodule")).toBe(false);
  });
});

describe("ballMaterial", () => {
  it("wool felted uses new zealand wool felt", () => {
    expect(ballMaterial("wool_felted")).toBe("new_zealand_wool_felt");
  });
});

describe("bestUse", () => {
  it("tennis ball hack best for budget quick fix", () => {
    expect(bestUse("tennis_ball_hack")).toBe("budget_quick_fix");
  });
});

describe("dryerBalls", () => {
  it("returns 5 types", () => {
    expect(dryerBalls()).toHaveLength(5);
  });
});
