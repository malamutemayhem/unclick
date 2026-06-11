import { describe, it, expect } from "vitest";
import {
  penetrate, loopForm, speedTuft, depthReach,
  needleCost, powered, forButton, pointStyle,
  bestUse, tuftingNeedles,
} from "../tufting-needle-calc.js";

describe("penetrate", () => {
  it("pneumatic tuft power best penetrate", () => {
    expect(penetrate("pneumatic_tuft_power")).toBeGreaterThan(penetrate("button_loop_attach"));
  });
});

describe("loopForm", () => {
  it("button loop attach best loop form", () => {
    expect(loopForm("button_loop_attach")).toBeGreaterThan(loopForm("pneumatic_tuft_power"));
  });
});

describe("speedTuft", () => {
  it("pneumatic tuft power fastest tuft", () => {
    expect(speedTuft("pneumatic_tuft_power")).toBeGreaterThan(speedTuft("curved_point_deep"));
  });
});

describe("depthReach", () => {
  it("curved point deep best depth reach", () => {
    expect(depthReach("curved_point_deep")).toBeGreaterThan(depthReach("double_point_fast"));
  });
});

describe("needleCost", () => {
  it("pneumatic tuft power most expensive", () => {
    expect(needleCost("pneumatic_tuft_power")).toBeGreaterThan(needleCost("straight_point_standard"));
  });
});

describe("powered", () => {
  it("pneumatic tuft power is powered", () => {
    expect(powered("pneumatic_tuft_power")).toBe(true);
  });
  it("straight point standard not powered", () => {
    expect(powered("straight_point_standard")).toBe(false);
  });
});

describe("forButton", () => {
  it("button loop attach is for button", () => {
    expect(forButton("button_loop_attach")).toBe(true);
  });
  it("straight point standard not for button", () => {
    expect(forButton("straight_point_standard")).toBe(false);
  });
});

describe("pointStyle", () => {
  it("curved point deep uses curved reach point", () => {
    expect(pointStyle("curved_point_deep")).toBe("curved_reach_point");
  });
});

describe("bestUse", () => {
  it("straight point standard best for general diamond tuft", () => {
    expect(bestUse("straight_point_standard")).toBe("general_diamond_tuft");
  });
});

describe("tuftingNeedles", () => {
  it("returns 5 types", () => {
    expect(tuftingNeedles()).toHaveLength(5);
  });
});
