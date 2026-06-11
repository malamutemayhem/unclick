import { describe, it, expect } from "vitest";
import {
  pullForce, speed, reliability, weight,
  awCost, freefall, forDeepWater, drive,
  bestUse, anchorWinchTypes,
} from "../anchor-winch-calc.js";

describe("pullForce", () => {
  it("hydraulic highest pull force", () => {
    expect(pullForce("hydraulic_horizontal_windlass")).toBeGreaterThan(pullForce("manual_hand_crank"));
  });
});

describe("speed", () => {
  it("hydraulic fastest", () => {
    expect(speed("hydraulic_horizontal_windlass")).toBeGreaterThan(speed("manual_hand_crank"));
  });
});

describe("reliability", () => {
  it("manual most reliable", () => {
    expect(reliability("manual_hand_crank")).toBeGreaterThan(reliability("electric_horizontal_windlass"));
  });
});

describe("weight", () => {
  it("manual lightest", () => {
    expect(weight("manual_hand_crank")).toBeGreaterThan(weight("combined_anchor_mooring"));
  });
});

describe("awCost", () => {
  it("combined most expensive", () => {
    expect(awCost("combined_anchor_mooring")).toBeGreaterThan(awCost("manual_hand_crank"));
  });
});

describe("freefall", () => {
  it("hydraulic has freefall", () => {
    expect(freefall("hydraulic_horizontal_windlass")).toBe(true);
  });
  it("manual no freefall", () => {
    expect(freefall("manual_hand_crank")).toBe(false);
  });
});

describe("forDeepWater", () => {
  it("hydraulic for deep water", () => {
    expect(forDeepWater("hydraulic_horizontal_windlass")).toBe(true);
  });
  it("electric horizontal not deep water", () => {
    expect(forDeepWater("electric_horizontal_windlass")).toBe(false);
  });
});

describe("drive", () => {
  it("manual uses ratchet handle", () => {
    expect(drive("manual_hand_crank")).toBe("ratchet_handle_manual_geared");
  });
});

describe("bestUse", () => {
  it("combined for offshore", () => {
    expect(bestUse("combined_anchor_mooring")).toBe("offshore_vessel_dual_function");
  });
});

describe("anchorWinchTypes", () => {
  it("returns 5 types", () => {
    expect(anchorWinchTypes()).toHaveLength(5);
  });
});
