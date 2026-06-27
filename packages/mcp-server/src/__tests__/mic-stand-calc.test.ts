import { describe, it, expect } from "vitest";
import {
  stability, reachRange, portability, footprint,
  standCost, hasBoom, foldable, baseType,
  bestUse, micStands,
} from "../mic-stand-calc.js";

describe("stability", () => {
  it("round base straight most stable", () => {
    expect(stability("round_base_straight")).toBeGreaterThan(stability("overhead_studio_crane"));
  });
});

describe("reachRange", () => {
  it("overhead studio crane widest reach", () => {
    expect(reachRange("overhead_studio_crane")).toBeGreaterThan(reachRange("round_base_straight"));
  });
});

describe("portability", () => {
  it("desk clamp arm most portable", () => {
    expect(portability("desk_clamp_arm")).toBeGreaterThan(portability("overhead_studio_crane"));
  });
});

describe("footprint", () => {
  it("desk clamp arm smallest footprint", () => {
    expect(footprint("desk_clamp_arm")).toBeGreaterThan(footprint("overhead_studio_crane"));
  });
});

describe("standCost", () => {
  it("overhead studio crane most expensive", () => {
    expect(standCost("overhead_studio_crane")).toBeGreaterThan(standCost("round_base_straight"));
  });
});

describe("hasBoom", () => {
  it("tripod boom has boom", () => {
    expect(hasBoom("tripod_boom")).toBe(true);
  });
  it("round base straight does not", () => {
    expect(hasBoom("round_base_straight")).toBe(false);
  });
});

describe("foldable", () => {
  it("tripod boom is foldable", () => {
    expect(foldable("tripod_boom")).toBe(true);
  });
  it("round base straight is not", () => {
    expect(foldable("round_base_straight")).toBe(false);
  });
});

describe("baseType", () => {
  it("desk clamp arm uses c clamp spring arm", () => {
    expect(baseType("desk_clamp_arm")).toBe("c_clamp_spring_arm");
  });
});

describe("bestUse", () => {
  it("desk clamp arm best for podcast streaming desk", () => {
    expect(bestUse("desk_clamp_arm")).toBe("podcast_streaming_desk");
  });
});

describe("micStands", () => {
  it("returns 5 types", () => {
    expect(micStands()).toHaveLength(5);
  });
});
