import { describe, it, expect } from "vitest";
import {
  durability, comfort, pullControl, visibility,
  collarCost, waterproof, hasTracking, closureType,
  bestDog, dogCollars,
} from "../dog-collar-calc.js";

describe("durability", () => {
  it("leather rolled most durable", () => {
    expect(durability("leather_rolled")).toBeGreaterThan(durability("breakaway_safety"));
  });
});

describe("comfort", () => {
  it("leather rolled most comfortable", () => {
    expect(comfort("leather_rolled")).toBeGreaterThan(comfort("gps_smart_track"));
  });
});

describe("pullControl", () => {
  it("martingale slip best pull control", () => {
    expect(pullControl("martingale_slip")).toBeGreaterThan(pullControl("flat_nylon_buckle"));
  });
});

describe("visibility", () => {
  it("gps smart track most visible", () => {
    expect(visibility("gps_smart_track")).toBeGreaterThan(visibility("leather_rolled"));
  });
});

describe("collarCost", () => {
  it("gps smart track most expensive", () => {
    expect(collarCost("gps_smart_track")).toBeGreaterThan(collarCost("flat_nylon_buckle"));
  });
});

describe("waterproof", () => {
  it("flat nylon buckle is waterproof", () => {
    expect(waterproof("flat_nylon_buckle")).toBe(true);
  });
  it("leather rolled is not", () => {
    expect(waterproof("leather_rolled")).toBe(false);
  });
});

describe("hasTracking", () => {
  it("gps smart track has tracking", () => {
    expect(hasTracking("gps_smart_track")).toBe(true);
  });
  it("flat nylon buckle does not", () => {
    expect(hasTracking("flat_nylon_buckle")).toBe(false);
  });
});

describe("closureType", () => {
  it("martingale slip uses limited slip loop", () => {
    expect(closureType("martingale_slip")).toBe("limited_slip_loop");
  });
});

describe("bestDog", () => {
  it("gps smart track best for escape artist roamer", () => {
    expect(bestDog("gps_smart_track")).toBe("escape_artist_roamer");
  });
});

describe("dogCollars", () => {
  it("returns 5 types", () => {
    expect(dogCollars()).toHaveLength(5);
  });
});
