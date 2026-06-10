import { describe, it, expect } from "vitest";
import {
  cutPrecision, debrisCatch, easeOfUse, jarAccess,
  trimmerCost, trims, extinguishes, toolStyle,
  bestCandle, wickTrimmers,
} from "../wick-trimmer-calc.js";

describe("cutPrecision", () => {
  it("auto trim spring best cut precision", () => {
    expect(cutPrecision("auto_trim_spring")).toBeGreaterThan(cutPrecision("bell_snuffer_dome"));
  });
});

describe("debrisCatch", () => {
  it("auto trim spring best debris catch", () => {
    expect(debrisCatch("auto_trim_spring")).toBeGreaterThan(debrisCatch("wick_dipper_snuff"));
  });
});

describe("easeOfUse", () => {
  it("wick dipper snuff easiest to use", () => {
    expect(easeOfUse("wick_dipper_snuff")).toBeGreaterThan(easeOfUse("wick_hook_adjust"));
  });
});

describe("jarAccess", () => {
  it("wick dipper snuff best jar access", () => {
    expect(jarAccess("wick_dipper_snuff")).toBeGreaterThan(jarAccess("bell_snuffer_dome"));
  });
});

describe("trimmerCost", () => {
  it("bell snuffer dome more expensive than scissor angled", () => {
    expect(trimmerCost("bell_snuffer_dome")).toBeGreaterThan(trimmerCost("scissor_angled_classic"));
  });
});

describe("trims", () => {
  it("scissor angled classic trims", () => {
    expect(trims("scissor_angled_classic")).toBe(true);
  });
  it("bell snuffer dome does not trim", () => {
    expect(trims("bell_snuffer_dome")).toBe(false);
  });
});

describe("extinguishes", () => {
  it("bell snuffer dome extinguishes", () => {
    expect(extinguishes("bell_snuffer_dome")).toBe(true);
  });
  it("scissor angled classic does not extinguish", () => {
    expect(extinguishes("scissor_angled_classic")).toBe(false);
  });
});

describe("toolStyle", () => {
  it("wick dipper snuff uses bent rod dip coat", () => {
    expect(toolStyle("wick_dipper_snuff")).toBe("bent_rod_dip_coat");
  });
});

describe("bestCandle", () => {
  it("bell snuffer dome best for taper candle snuff", () => {
    expect(bestCandle("bell_snuffer_dome")).toBe("taper_candle_snuff");
  });
});

describe("wickTrimmers", () => {
  it("returns 5 types", () => {
    expect(wickTrimmers()).toHaveLength(5);
  });
});
