import { describe, it, expect } from "vitest";
import {
  fiberSplit, cleanSeparate, speedHackle, fiberRange,
  hackleCost, powered, adjustable, pinDensity,
  bestUse, hempHackles,
} from "../hemp-hackle-calc.js";

describe("fiberSplit", () => {
  it("coarse pin rough best fiber split", () => {
    expect(fiberSplit("coarse_pin_rough")).toBeGreaterThan(fiberSplit("adjustable_pin_set"));
  });
});

describe("cleanSeparate", () => {
  it("fine pin standard cleanest separate", () => {
    expect(cleanSeparate("fine_pin_standard")).toBeGreaterThan(cleanSeparate("coarse_pin_rough"));
  });
});

describe("speedHackle", () => {
  it("powered hackle drum fastest hackle", () => {
    expect(speedHackle("powered_hackle_drum")).toBeGreaterThan(speedHackle("fine_pin_standard"));
  });
});

describe("fiberRange", () => {
  it("adjustable pin set best fiber range", () => {
    expect(fiberRange("adjustable_pin_set")).toBeGreaterThan(fiberRange("fine_pin_standard"));
  });
});

describe("hackleCost", () => {
  it("powered hackle drum most expensive", () => {
    expect(hackleCost("powered_hackle_drum")).toBeGreaterThan(hackleCost("coarse_pin_rough"));
  });
});

describe("powered", () => {
  it("powered hackle drum is powered", () => {
    expect(powered("powered_hackle_drum")).toBe(true);
  });
  it("fine pin standard not powered", () => {
    expect(powered("fine_pin_standard")).toBe(false);
  });
});

describe("adjustable", () => {
  it("adjustable pin set is adjustable", () => {
    expect(adjustable("adjustable_pin_set")).toBe(true);
  });
  it("fine pin standard not adjustable", () => {
    expect(adjustable("fine_pin_standard")).toBe(false);
  });
});

describe("pinDensity", () => {
  it("double row fast uses double row stagger", () => {
    expect(pinDensity("double_row_fast")).toBe("double_row_stagger");
  });
});

describe("bestUse", () => {
  it("fine pin standard best for fine fiber dress", () => {
    expect(bestUse("fine_pin_standard")).toBe("fine_fiber_dress");
  });
});

describe("hempHackles", () => {
  it("returns 5 types", () => {
    expect(hempHackles()).toHaveLength(5);
  });
});
