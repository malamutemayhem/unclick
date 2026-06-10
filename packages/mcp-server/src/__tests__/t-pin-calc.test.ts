import { describe, it, expect } from "vitest";
import {
  holdStrength, sharpness, easeOfGrip, yarnSafe,
  pinCost, rustResist, forLace, pinMaterial,
  bestUse, tPins,
} from "../t-pin-calc.js";

describe("holdStrength", () => {
  it("long heavy duty strongest hold", () => {
    expect(holdStrength("long_heavy_duty")).toBeGreaterThan(holdStrength("fine_lace_thin"));
  });
});

describe("sharpness", () => {
  it("fine lace thin sharpest", () => {
    expect(sharpness("fine_lace_thin")).toBeGreaterThan(sharpness("ball_head_grip"));
  });
});

describe("easeOfGrip", () => {
  it("ball head grip easiest to grip", () => {
    expect(easeOfGrip("ball_head_grip")).toBeGreaterThan(easeOfGrip("fine_lace_thin"));
  });
});

describe("yarnSafe", () => {
  it("fine lace thin safest for yarn", () => {
    expect(yarnSafe("fine_lace_thin")).toBeGreaterThan(yarnSafe("steel_standard_sharp"));
  });
});

describe("pinCost", () => {
  it("brass rust free more expensive than steel standard", () => {
    expect(pinCost("brass_rust_free")).toBeGreaterThan(pinCost("steel_standard_sharp"));
  });
});

describe("rustResist", () => {
  it("brass rust free resists rust", () => {
    expect(rustResist("brass_rust_free")).toBe(true);
  });
  it("steel standard sharp does not resist rust", () => {
    expect(rustResist("steel_standard_sharp")).toBe(false);
  });
});

describe("forLace", () => {
  it("fine lace thin is for lace", () => {
    expect(forLace("fine_lace_thin")).toBe(true);
  });
  it("long heavy duty is not for lace", () => {
    expect(forLace("long_heavy_duty")).toBe(false);
  });
});

describe("pinMaterial", () => {
  it("brass rust free uses solid brass polished", () => {
    expect(pinMaterial("brass_rust_free")).toBe("solid_brass_polished");
  });
});

describe("bestUse", () => {
  it("brass rust free best for wet block soak safe", () => {
    expect(bestUse("brass_rust_free")).toBe("wet_block_soak_safe");
  });
});

describe("tPins", () => {
  it("returns 5 types", () => {
    expect(tPins()).toHaveLength(5);
  });
});
