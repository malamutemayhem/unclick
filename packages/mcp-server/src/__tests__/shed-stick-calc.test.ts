import { describe, it, expect } from "vitest";
import {
  shedOpen, warpSafe, slideSmooth, durability,
  shedCost, flexible, forPickup, edgeProfile,
  bestUse, shedSticks,
} from "../shed-stick-calc.js";

describe("shedOpen", () => {
  it("beveled edge smooth widest shed open", () => {
    expect(shedOpen("beveled_edge_smooth")).toBeGreaterThan(shedOpen("bamboo_light_flex"));
  });
});

describe("warpSafe", () => {
  it("beveled edge smooth safest for warp", () => {
    expect(warpSafe("beveled_edge_smooth")).toBeGreaterThan(warpSafe("metal_thin_rigid"));
  });
});

describe("slideSmooth", () => {
  it("beveled edge smooth smoothest slide", () => {
    expect(slideSmooth("beveled_edge_smooth")).toBeGreaterThan(slideSmooth("flat_wood_standard"));
  });
});

describe("durability", () => {
  it("metal thin rigid most durable", () => {
    expect(durability("metal_thin_rigid")).toBeGreaterThan(durability("bamboo_light_flex"));
  });
});

describe("shedCost", () => {
  it("metal thin rigid most expensive", () => {
    expect(shedCost("metal_thin_rigid")).toBeGreaterThan(shedCost("bamboo_light_flex"));
  });
});

describe("flexible", () => {
  it("bamboo light flex is flexible", () => {
    expect(flexible("bamboo_light_flex")).toBe(true);
  });
  it("flat wood standard not flexible", () => {
    expect(flexible("flat_wood_standard")).toBe(false);
  });
});

describe("forPickup", () => {
  it("curved pick up is for pickup", () => {
    expect(forPickup("curved_pick_up")).toBe(true);
  });
  it("metal thin rigid not for pickup", () => {
    expect(forPickup("metal_thin_rigid")).toBe(false);
  });
});

describe("edgeProfile", () => {
  it("bamboo light flex uses bamboo round edge", () => {
    expect(edgeProfile("bamboo_light_flex")).toBe("bamboo_round_edge");
  });
});

describe("bestUse", () => {
  it("beveled edge smooth best for fine warp shed", () => {
    expect(bestUse("beveled_edge_smooth")).toBe("fine_warp_shed");
  });
});

describe("shedSticks", () => {
  it("returns 5 types", () => {
    expect(shedSticks()).toHaveLength(5);
  });
});
