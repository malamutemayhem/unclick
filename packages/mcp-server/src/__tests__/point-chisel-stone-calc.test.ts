import { describe, it, expect } from "vitest";
import {
  breakForce, controlAim, tipLife, stoneRange,
  chiselCost, powered, forHard, tipShape,
  bestUse, pointChiselStones,
} from "../point-chisel-stone-calc.js";

describe("breakForce", () => {
  it("pneumatic point power most break force", () => {
    expect(breakForce("pneumatic_point_power")).toBeGreaterThan(breakForce("narrow_point_detail"));
  });
});

describe("controlAim", () => {
  it("narrow point detail best control aim", () => {
    expect(controlAim("narrow_point_detail")).toBeGreaterThan(controlAim("pneumatic_point_power"));
  });
});

describe("tipLife", () => {
  it("carbide tip hard longest tip life", () => {
    expect(tipLife("carbide_tip_hard")).toBeGreaterThan(tipLife("narrow_point_detail"));
  });
});

describe("stoneRange", () => {
  it("carbide tip hard best stone range", () => {
    expect(stoneRange("carbide_tip_hard")).toBeGreaterThan(stoneRange("narrow_point_detail"));
  });
});

describe("chiselCost", () => {
  it("pneumatic point power most expensive", () => {
    expect(chiselCost("pneumatic_point_power")).toBeGreaterThan(chiselCost("hand_point_standard"));
  });
});

describe("powered", () => {
  it("pneumatic point power is powered", () => {
    expect(powered("pneumatic_point_power")).toBe(true);
  });
  it("hand point standard not powered", () => {
    expect(powered("hand_point_standard")).toBe(false);
  });
});

describe("forHard", () => {
  it("carbide tip hard is for hard", () => {
    expect(forHard("carbide_tip_hard")).toBe(true);
  });
  it("hand point standard not for hard", () => {
    expect(forHard("hand_point_standard")).toBe(false);
  });
});

describe("tipShape", () => {
  it("carbide tip hard uses carbide insert", () => {
    expect(tipShape("carbide_tip_hard")).toBe("carbide_insert");
  });
});

describe("bestUse", () => {
  it("pneumatic point power best for fast heavy break", () => {
    expect(bestUse("pneumatic_point_power")).toBe("fast_heavy_break");
  });
});

describe("pointChiselStones", () => {
  it("returns 5 types", () => {
    expect(pointChiselStones()).toHaveLength(5);
  });
});
