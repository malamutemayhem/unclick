import { describe, it, expect } from "vitest";
import {
  visibility, sensitivity, depthControl, castDistance,
  bobberCost, needsBattery, makesNoise, floatShape,
  bestScenario, bobbers,
} from "../bobber-calc.js";

describe("visibility", () => {
  it("lighted night glow most visible", () => {
    expect(visibility("lighted_night_glow")).toBeGreaterThan(visibility("waggler_pencil_thin"));
  });
});

describe("sensitivity", () => {
  it("waggler pencil thin most sensitive", () => {
    expect(sensitivity("waggler_pencil_thin")).toBeGreaterThan(sensitivity("round_clip_on_red"));
  });
});

describe("depthControl", () => {
  it("slip float sliding best depth control", () => {
    expect(depthControl("slip_float_sliding")).toBeGreaterThan(depthControl("round_clip_on_red"));
  });
});

describe("castDistance", () => {
  it("slip float sliding longest cast", () => {
    expect(castDistance("slip_float_sliding")).toBeGreaterThan(castDistance("round_clip_on_red"));
  });
});

describe("bobberCost", () => {
  it("lighted night glow most expensive", () => {
    expect(bobberCost("lighted_night_glow")).toBeGreaterThan(bobberCost("round_clip_on_red"));
  });
});

describe("needsBattery", () => {
  it("lighted night glow needs battery", () => {
    expect(needsBattery("lighted_night_glow")).toBe(true);
  });
  it("round clip on red does not", () => {
    expect(needsBattery("round_clip_on_red")).toBe(false);
  });
});

describe("makesNoise", () => {
  it("popping cork noise makes noise", () => {
    expect(makesNoise("popping_cork_noise")).toBe(true);
  });
  it("slip float sliding does not", () => {
    expect(makesNoise("slip_float_sliding")).toBe(false);
  });
});

describe("floatShape", () => {
  it("waggler pencil thin uses slim pencil stem", () => {
    expect(floatShape("waggler_pencil_thin")).toBe("slim_pencil_stem");
  });
});

describe("bestScenario", () => {
  it("lighted night glow best for night catfish dock", () => {
    expect(bestScenario("lighted_night_glow")).toBe("night_catfish_dock");
  });
});

describe("bobbers", () => {
  it("returns 5 types", () => {
    expect(bobbers()).toHaveLength(5);
  });
});
