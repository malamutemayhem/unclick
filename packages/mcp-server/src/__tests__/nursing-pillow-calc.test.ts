import { describe, it, expect } from "vitest";
import {
  supportLevel, positionVersatility, firmness, packability,
  pillowCost, removableCover, backSupport, fillType,
  bestFeed, nursingPillows,
} from "../nursing-pillow-calc.js";

describe("supportLevel", () => {
  it("twin tandem best support", () => {
    expect(supportLevel("twin_tandem")).toBeGreaterThan(supportLevel("inflatable_travel"));
  });
});

describe("positionVersatility", () => {
  it("o shape wraparound most versatile", () => {
    expect(positionVersatility("o_shape_wraparound")).toBeGreaterThan(positionVersatility("inflatable_travel"));
  });
});

describe("firmness", () => {
  it("wedge incline firmest", () => {
    expect(firmness("wedge_incline")).toBeGreaterThan(firmness("inflatable_travel"));
  });
});

describe("packability", () => {
  it("inflatable travel most packable", () => {
    expect(packability("inflatable_travel")).toBeGreaterThan(packability("twin_tandem"));
  });
});

describe("pillowCost", () => {
  it("twin tandem most expensive", () => {
    expect(pillowCost("twin_tandem")).toBeGreaterThan(pillowCost("inflatable_travel"));
  });
});

describe("removableCover", () => {
  it("c shape classic has removable cover", () => {
    expect(removableCover("c_shape_classic")).toBe(true);
  });
  it("inflatable travel does not", () => {
    expect(removableCover("inflatable_travel")).toBe(false);
  });
});

describe("backSupport", () => {
  it("o shape wraparound has back support", () => {
    expect(backSupport("o_shape_wraparound")).toBe(true);
  });
  it("c shape classic does not", () => {
    expect(backSupport("c_shape_classic")).toBe(false);
  });
});

describe("fillType", () => {
  it("twin tandem uses dual chamber poly fill", () => {
    expect(fillType("twin_tandem")).toBe("dual_chamber_poly_fill");
  });
});

describe("bestFeed", () => {
  it("inflatable travel for airplane hotel compact", () => {
    expect(bestFeed("inflatable_travel")).toBe("airplane_hotel_compact");
  });
});

describe("nursingPillows", () => {
  it("returns 5 types", () => {
    expect(nursingPillows()).toHaveLength(5);
  });
});
