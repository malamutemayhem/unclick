import { describe, it, expect } from "vitest";
import {
  hollowDepth, surfaceSmooth, controlPull, curveRange,
  scorpCost, doubleEdge, forDeep, sweepRadius,
  bestUse, scorpSpoons,
} from "../scorp-spoon-calc.js";

describe("hollowDepth", () => {
  it("tight curve small deepest hollow", () => {
    expect(hollowDepth("tight_curve_small")).toBeGreaterThan(hollowDepth("open_sweep_large"));
  });
});

describe("surfaceSmooth", () => {
  it("open sweep large smoothest surface", () => {
    expect(surfaceSmooth("open_sweep_large")).toBeGreaterThan(surfaceSmooth("tight_curve_small"));
  });
});

describe("controlPull", () => {
  it("right hand hook best control pull", () => {
    expect(controlPull("right_hand_hook")).toBeGreaterThan(controlPull("double_edge_tweezer"));
  });
});

describe("curveRange", () => {
  it("open sweep large best curve range", () => {
    expect(curveRange("open_sweep_large")).toBeGreaterThan(curveRange("tight_curve_small"));
  });
});

describe("scorpCost", () => {
  it("double edge tweezer most expensive", () => {
    expect(scorpCost("double_edge_tweezer")).toBeGreaterThan(scorpCost("tight_curve_small"));
  });
});

describe("doubleEdge", () => {
  it("double edge tweezer has double edge", () => {
    expect(doubleEdge("double_edge_tweezer")).toBe(true);
  });
  it("right hand hook no double edge", () => {
    expect(doubleEdge("right_hand_hook")).toBe(false);
  });
});

describe("forDeep", () => {
  it("tight curve small is for deep", () => {
    expect(forDeep("tight_curve_small")).toBe(true);
  });
  it("open sweep large not for deep", () => {
    expect(forDeep("open_sweep_large")).toBe(false);
  });
});

describe("sweepRadius", () => {
  it("open sweep large uses open 40mm", () => {
    expect(sweepRadius("open_sweep_large")).toBe("open_40mm");
  });
});

describe("bestUse", () => {
  it("tight curve small best for deep spoon bowl", () => {
    expect(bestUse("tight_curve_small")).toBe("deep_spoon_bowl");
  });
});

describe("scorpSpoons", () => {
  it("returns 5 types", () => {
    expect(scorpSpoons()).toHaveLength(5);
  });
});
