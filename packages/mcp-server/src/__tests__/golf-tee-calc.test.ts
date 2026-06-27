import { describe, it, expect } from "vitest";
import {
  consistency, durability, frictionReduction, ecoFriendly,
  teeCost, heightAdjust, reusable, teeMaterial,
  bestGolfer, golfTees,
} from "../golf-tee-calc.js";

describe("consistency", () => {
  it("plastic castle step most consistent", () => {
    expect(consistency("plastic_castle_step")).toBeGreaterThan(consistency("wooden_standard"));
  });
});

describe("durability", () => {
  it("rubber flexible most durable", () => {
    expect(durability("rubber_flexible")).toBeGreaterThan(durability("wooden_standard"));
  });
});

describe("frictionReduction", () => {
  it("brush bristle top best friction reduction", () => {
    expect(frictionReduction("brush_bristle_top")).toBeGreaterThan(frictionReduction("wooden_standard"));
  });
});

describe("ecoFriendly", () => {
  it("biodegradable bamboo most eco friendly", () => {
    expect(ecoFriendly("biodegradable_bamboo")).toBeGreaterThan(ecoFriendly("plastic_castle_step"));
  });
});

describe("teeCost", () => {
  it("brush bristle top most expensive", () => {
    expect(teeCost("brush_bristle_top")).toBeGreaterThan(teeCost("wooden_standard"));
  });
});

describe("heightAdjust", () => {
  it("plastic castle step is height adjustable", () => {
    expect(heightAdjust("plastic_castle_step")).toBe(true);
  });
  it("wooden standard is not", () => {
    expect(heightAdjust("wooden_standard")).toBe(false);
  });
});

describe("reusable", () => {
  it("rubber flexible is reusable", () => {
    expect(reusable("rubber_flexible")).toBe(true);
  });
  it("wooden standard is not", () => {
    expect(reusable("wooden_standard")).toBe(false);
  });
});

describe("teeMaterial", () => {
  it("biodegradable bamboo uses moso bamboo natural finish", () => {
    expect(teeMaterial("biodegradable_bamboo")).toBe("moso_bamboo_natural_finish");
  });
});

describe("bestGolfer", () => {
  it("brush bristle top best for distance seeker low drag", () => {
    expect(bestGolfer("brush_bristle_top")).toBe("distance_seeker_low_drag");
  });
});

describe("golfTees", () => {
  it("returns 5 types", () => {
    expect(golfTees()).toHaveLength(5);
  });
});
