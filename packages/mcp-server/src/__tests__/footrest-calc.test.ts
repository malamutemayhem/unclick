import { describe, it, expect } from "vitest";
import {
  ergonomicSupport, comfortLevel, movement, compactness,
  restCost, needsPower, nonSlipBase, surfaceType,
  bestDesk, footrests,
} from "../footrest-calc.js";

describe("ergonomicSupport", () => {
  it("adjustable height best ergonomic support", () => {
    expect(ergonomicSupport("adjustable_height")).toBeGreaterThan(ergonomicSupport("under_desk_hammock"));
  });
});

describe("comfortLevel", () => {
  it("heated massage most comfortable", () => {
    expect(comfortLevel("heated_massage")).toBeGreaterThan(comfortLevel("tilting_platform"));
  });
});

describe("movement", () => {
  it("rocking curved most movement", () => {
    expect(movement("rocking_curved")).toBeGreaterThan(movement("heated_massage"));
  });
});

describe("compactness", () => {
  it("under desk hammock most compact", () => {
    expect(compactness("under_desk_hammock")).toBeGreaterThan(compactness("heated_massage"));
  });
});

describe("restCost", () => {
  it("heated massage most expensive", () => {
    expect(restCost("heated_massage")).toBeGreaterThan(restCost("under_desk_hammock"));
  });
});

describe("needsPower", () => {
  it("heated massage needs power", () => {
    expect(needsPower("heated_massage")).toBe(true);
  });
  it("rocking curved does not", () => {
    expect(needsPower("rocking_curved")).toBe(false);
  });
});

describe("nonSlipBase", () => {
  it("tilting platform has non slip base", () => {
    expect(nonSlipBase("tilting_platform")).toBe(true);
  });
  it("under desk hammock does not", () => {
    expect(nonSlipBase("under_desk_hammock")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("rocking curved uses smooth wood curve", () => {
    expect(surfaceType("rocking_curved")).toBe("smooth_wood_curve");
  });
});

describe("bestDesk", () => {
  it("adjustable height for standing desk combo", () => {
    expect(bestDesk("adjustable_height")).toBe("standing_desk_combo");
  });
});

describe("footrests", () => {
  it("returns 5 types", () => {
    expect(footrests()).toHaveLength(5);
  });
});
