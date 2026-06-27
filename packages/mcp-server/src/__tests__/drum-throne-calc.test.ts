import { describe, it, expect } from "vitest";
import {
  seatComfort, spineSupport, adjustability, stability,
  throneCost, hasBackrest, hydraulicLift, seatShape,
  bestPlayer, drumThrones,
} from "../drum-throne-calc.js";

describe("seatComfort", () => {
  it("backrest support tall most seat comfort", () => {
    expect(seatComfort("backrest_support_tall")).toBeGreaterThan(seatComfort("round_top_standard"));
  });
});

describe("spineSupport", () => {
  it("backrest support tall best spine support", () => {
    expect(spineSupport("backrest_support_tall")).toBeGreaterThan(spineSupport("round_top_standard"));
  });
});

describe("adjustability", () => {
  it("hydraulic lift adjust most adjustable", () => {
    expect(adjustability("hydraulic_lift_adjust")).toBeGreaterThan(adjustability("round_top_standard"));
  });
});

describe("stability", () => {
  it("backrest support tall most stable", () => {
    expect(stability("backrest_support_tall")).toBeGreaterThan(stability("round_top_standard"));
  });
});

describe("throneCost", () => {
  it("backrest support tall most expensive", () => {
    expect(throneCost("backrest_support_tall")).toBeGreaterThan(throneCost("round_top_standard"));
  });
});

describe("hasBackrest", () => {
  it("backrest support tall has backrest", () => {
    expect(hasBackrest("backrest_support_tall")).toBe(true);
  });
  it("round top standard has no backrest", () => {
    expect(hasBackrest("round_top_standard")).toBe(false);
  });
});

describe("hydraulicLift", () => {
  it("hydraulic lift adjust has hydraulic lift", () => {
    expect(hydraulicLift("hydraulic_lift_adjust")).toBe(true);
  });
  it("saddle seat ergonomic has no hydraulic lift", () => {
    expect(hydraulicLift("saddle_seat_ergonomic")).toBe(false);
  });
});

describe("seatShape", () => {
  it("saddle seat ergonomic uses contoured saddle dip", () => {
    expect(seatShape("saddle_seat_ergonomic")).toBe("contoured_saddle_dip");
  });
});

describe("bestPlayer", () => {
  it("backrest support tall best for back pain extended", () => {
    expect(bestPlayer("backrest_support_tall")).toBe("back_pain_extended");
  });
});

describe("drumThrones", () => {
  it("returns 5 types", () => {
    expect(drumThrones()).toHaveLength(5);
  });
});
