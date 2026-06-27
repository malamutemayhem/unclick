import { describe, it, expect } from "vitest";
import {
  stability, weightCapacity, heightAdjust, portability,
  bankerCost, adjustable, portable, frameType,
  bestUse, bankerMasons,
} from "../banker-mason-calc.js";

describe("stability", () => {
  it("steel frame heavy most stable", () => {
    expect(stability("steel_frame_heavy")).toBeGreaterThan(stability("portable_trestle_fold"));
  });
});

describe("weightCapacity", () => {
  it("steel frame heavy most weight capacity", () => {
    expect(weightCapacity("steel_frame_heavy")).toBeGreaterThan(weightCapacity("portable_trestle_fold"));
  });
});

describe("heightAdjust", () => {
  it("adjustable height lift best height adjust", () => {
    expect(heightAdjust("adjustable_height_lift")).toBeGreaterThan(heightAdjust("oak_frame_standard"));
  });
});

describe("portability", () => {
  it("portable trestle fold most portable", () => {
    expect(portability("portable_trestle_fold")).toBeGreaterThan(portability("steel_frame_heavy"));
  });
});

describe("bankerCost", () => {
  it("adjustable height lift most expensive", () => {
    expect(bankerCost("adjustable_height_lift")).toBeGreaterThan(bankerCost("portable_trestle_fold"));
  });
});

describe("adjustable", () => {
  it("adjustable height lift is adjustable", () => {
    expect(adjustable("adjustable_height_lift")).toBe(true);
  });
  it("oak frame standard not adjustable", () => {
    expect(adjustable("oak_frame_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("portable trestle fold is portable", () => {
    expect(portable("portable_trestle_fold")).toBe(true);
  });
  it("steel frame heavy not portable", () => {
    expect(portable("steel_frame_heavy")).toBe(false);
  });
});

describe("frameType", () => {
  it("rotating turntable spin uses turntable bearing", () => {
    expect(frameType("rotating_turntable_spin")).toBe("turntable_bearing");
  });
});

describe("bestUse", () => {
  it("rotating turntable spin best for sculpture all side", () => {
    expect(bestUse("rotating_turntable_spin")).toBe("sculpture_all_side");
  });
});

describe("bankerMasons", () => {
  it("returns 5 types", () => {
    expect(bankerMasons()).toHaveLength(5);
  });
});
