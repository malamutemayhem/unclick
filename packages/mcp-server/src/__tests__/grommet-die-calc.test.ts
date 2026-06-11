import { describe, it, expect } from "vitest";
import {
  setClean, holdStrength, speedSet, sizeRange,
  dieCost, selfPiercing, benchPress, dieStyle,
  bestUse, grommetDies,
} from "../grommet-die-calc.js";

describe("setClean", () => {
  it("rolled rim smooth cleanest set", () => {
    expect(setClean("rolled_rim_smooth")).toBeGreaterThan(setClean("self_piercing_quick"));
  });
});

describe("holdStrength", () => {
  it("spur grommet grip strongest hold", () => {
    expect(holdStrength("spur_grommet_grip")).toBeGreaterThan(holdStrength("self_piercing_quick"));
  });
});

describe("speedSet", () => {
  it("self piercing quick fastest set", () => {
    expect(speedSet("self_piercing_quick")).toBeGreaterThan(speedSet("rolled_rim_smooth"));
  });
});

describe("sizeRange", () => {
  it("bench press heavy widest size range", () => {
    expect(sizeRange("bench_press_heavy")).toBeGreaterThan(sizeRange("self_piercing_quick"));
  });
});

describe("dieCost", () => {
  it("bench press heavy most expensive", () => {
    expect(dieCost("bench_press_heavy")).toBeGreaterThan(dieCost("hand_punch_standard"));
  });
});

describe("selfPiercing", () => {
  it("self piercing quick is self piercing", () => {
    expect(selfPiercing("self_piercing_quick")).toBe(true);
  });
  it("hand punch standard not self piercing", () => {
    expect(selfPiercing("hand_punch_standard")).toBe(false);
  });
});

describe("benchPress", () => {
  it("bench press heavy has bench press", () => {
    expect(benchPress("bench_press_heavy")).toBe(true);
  });
  it("hand punch standard no bench press", () => {
    expect(benchPress("hand_punch_standard")).toBe(false);
  });
});

describe("dieStyle", () => {
  it("spur grommet grip uses toothed washer die", () => {
    expect(dieStyle("spur_grommet_grip")).toBe("toothed_washer_die");
  });
});

describe("bestUse", () => {
  it("hand punch standard best for general grommet set", () => {
    expect(bestUse("hand_punch_standard")).toBe("general_grommet_set");
  });
});

describe("grommetDies", () => {
  it("returns 5 types", () => {
    expect(grommetDies()).toHaveLength(5);
  });
});
