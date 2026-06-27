import { describe, it, expect } from "vitest";
import {
  versatility, weightCapacity, padComfort, storability,
  benchCost, foldable, hasRack, frameType,
  bestExercise, gymBenches,
} from "../gym-bench-calc.js";

describe("versatility", () => {
  it("adjustable incline most versatile", () => {
    expect(versatility("adjustable_incline")).toBeGreaterThan(versatility("preacher_curl_pad"));
  });
});

describe("weightCapacity", () => {
  it("olympic wide pad highest weight capacity", () => {
    expect(weightCapacity("olympic_wide_pad")).toBeGreaterThan(weightCapacity("folding_compact"));
  });
});

describe("padComfort", () => {
  it("olympic wide pad most comfortable pad", () => {
    expect(padComfort("olympic_wide_pad")).toBeGreaterThan(padComfort("folding_compact"));
  });
});

describe("storability", () => {
  it("folding compact best storability", () => {
    expect(storability("folding_compact")).toBeGreaterThan(storability("olympic_wide_pad"));
  });
});

describe("benchCost", () => {
  it("olympic wide pad most expensive", () => {
    expect(benchCost("olympic_wide_pad")).toBeGreaterThan(benchCost("flat_utility"));
  });
});

describe("foldable", () => {
  it("folding compact is foldable", () => {
    expect(foldable("folding_compact")).toBe(true);
  });
  it("flat utility is not", () => {
    expect(foldable("flat_utility")).toBe(false);
  });
});

describe("hasRack", () => {
  it("olympic wide pad has rack", () => {
    expect(hasRack("olympic_wide_pad")).toBe(true);
  });
  it("flat utility does not", () => {
    expect(hasRack("flat_utility")).toBe(false);
  });
});

describe("frameType", () => {
  it("adjustable incline uses ladder lock multi angle", () => {
    expect(frameType("adjustable_incline")).toBe("ladder_lock_multi_angle");
  });
});

describe("bestExercise", () => {
  it("olympic wide pad best for barbell bench press", () => {
    expect(bestExercise("olympic_wide_pad")).toBe("barbell_bench_press");
  });
});

describe("gymBenches", () => {
  it("returns 5 types", () => {
    expect(gymBenches()).toHaveLength(5);
  });
});
