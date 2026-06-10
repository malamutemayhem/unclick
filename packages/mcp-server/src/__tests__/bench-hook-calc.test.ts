import { describe, it, expect } from "vitest";
import {
  workholding, versatility, setupSpeed, accuracy,
  hookCost, diyBuild, needsBenchDog, mountStyle,
  bestTask, benchHooks,
} from "../bench-hook-calc.js";

describe("workholding", () => {
  it("planing stop metal best workholding", () => {
    expect(workholding("planing_stop_metal")).toBeGreaterThan(workholding("shooting_board_angle"));
  });
});

describe("versatility", () => {
  it("bench jack adjustable most versatile", () => {
    expect(versatility("bench_jack_adjustable")).toBeGreaterThan(versatility("planing_stop_metal"));
  });
});

describe("setupSpeed", () => {
  it("standard crosscut stop fastest setup", () => {
    expect(setupSpeed("standard_crosscut_stop")).toBeGreaterThan(setupSpeed("bench_jack_adjustable"));
  });
});

describe("accuracy", () => {
  it("shooting board angle most accurate", () => {
    expect(accuracy("shooting_board_angle")).toBeGreaterThan(accuracy("doe_foot_holdfast"));
  });
});

describe("hookCost", () => {
  it("bench jack adjustable most expensive", () => {
    expect(hookCost("bench_jack_adjustable")).toBeGreaterThan(hookCost("standard_crosscut_stop"));
  });
});

describe("diyBuild", () => {
  it("standard crosscut stop is diy build", () => {
    expect(diyBuild("standard_crosscut_stop")).toBe(true);
  });
  it("bench jack adjustable is not diy build", () => {
    expect(diyBuild("bench_jack_adjustable")).toBe(false);
  });
});

describe("needsBenchDog", () => {
  it("planing stop metal needs bench dog", () => {
    expect(needsBenchDog("planing_stop_metal")).toBe(true);
  });
  it("standard crosscut stop needs no bench dog", () => {
    expect(needsBenchDog("standard_crosscut_stop")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("standard crosscut stop uses hook over edge", () => {
    expect(mountStyle("standard_crosscut_stop")).toBe("hook_over_edge");
  });
});

describe("bestTask", () => {
  it("shooting board angle best for end grain trim square", () => {
    expect(bestTask("shooting_board_angle")).toBe("end_grain_trim_square");
  });
});

describe("benchHooks", () => {
  it("returns 5 types", () => {
    expect(benchHooks()).toHaveLength(5);
  });
});
