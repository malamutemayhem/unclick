import { describe, it, expect } from "vitest";
import {
  hookStrength, hookSetEase, catchRelease, weedless,
  hookCost, barbless, multiPoint, wireGauge,
  bestTechnique, fishingHooks,
} from "../fishing-hook-calc.js";

describe("hookStrength", () => {
  it("worm hook offset strongest", () => {
    expect(hookStrength("worm_hook_offset")).toBeGreaterThan(hookStrength("treble_hook_lure"));
  });
});

describe("hookSetEase", () => {
  it("j hook standard easiest set", () => {
    expect(hookSetEase("j_hook_standard")).toBeGreaterThan(hookSetEase("circle_hook_release"));
  });
});

describe("catchRelease", () => {
  it("circle hook release best catch release", () => {
    expect(catchRelease("circle_hook_release")).toBeGreaterThan(catchRelease("treble_hook_lure"));
  });
});

describe("weedless", () => {
  it("worm hook offset most weedless", () => {
    expect(weedless("worm_hook_offset")).toBeGreaterThan(weedless("treble_hook_lure"));
  });
});

describe("hookCost", () => {
  it("treble hook lure most expensive", () => {
    expect(hookCost("treble_hook_lure")).toBeGreaterThan(hookCost("j_hook_standard"));
  });
});

describe("barbless", () => {
  it("j hook standard is not barbless", () => {
    expect(barbless("j_hook_standard")).toBe(false);
  });
  it("circle hook release is not barbless", () => {
    expect(barbless("circle_hook_release")).toBe(false);
  });
});

describe("multiPoint", () => {
  it("treble hook lure is multi point", () => {
    expect(multiPoint("treble_hook_lure")).toBe(true);
  });
  it("j hook standard is not", () => {
    expect(multiPoint("j_hook_standard")).toBe(false);
  });
});

describe("wireGauge", () => {
  it("worm hook offset uses heavy wire offset bend", () => {
    expect(wireGauge("worm_hook_offset")).toBe("heavy_wire_offset_bend");
  });
});

describe("bestTechnique", () => {
  it("circle hook release best for catch release saltwater", () => {
    expect(bestTechnique("circle_hook_release")).toBe("catch_release_saltwater");
  });
});

describe("fishingHooks", () => {
  it("returns 5 types", () => {
    expect(fishingHooks()).toHaveLength(5);
  });
});
