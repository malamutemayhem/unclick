import { describe, it, expect } from "vitest";
import {
  acoustic, fireRating, aesthetic, moisture,
  ctCost, washable, forOffice, edge,
  bestUse, ceilingTileTypes,
} from "../ceiling-tile-calc.js";

describe("acoustic", () => {
  it("fiberglass best acoustic", () => {
    expect(acoustic("fiberglass_sound_absorb")).toBeGreaterThan(acoustic("metal_pan_aluminum_steel"));
  });
});

describe("fireRating", () => {
  it("metal pan best fire rating", () => {
    expect(fireRating("metal_pan_aluminum_steel")).toBeGreaterThan(fireRating("wood_fiber_decorative_slat"));
  });
});

describe("aesthetic", () => {
  it("wood fiber best aesthetic", () => {
    expect(aesthetic("wood_fiber_decorative_slat")).toBeGreaterThan(aesthetic("fiberglass_sound_absorb"));
  });
});

describe("moisture", () => {
  it("metal pan best moisture resist", () => {
    expect(moisture("metal_pan_aluminum_steel")).toBeGreaterThan(moisture("wood_fiber_decorative_slat"));
  });
});

describe("ctCost", () => {
  it("wood fiber most expensive", () => {
    expect(ctCost("wood_fiber_decorative_slat")).toBeGreaterThan(ctCost("mineral_fiber_acoustic_lay"));
  });
});

describe("washable", () => {
  it("metal pan is washable", () => {
    expect(washable("metal_pan_aluminum_steel")).toBe(true);
  });
  it("mineral fiber not washable", () => {
    expect(washable("mineral_fiber_acoustic_lay")).toBe(false);
  });
});

describe("forOffice", () => {
  it("mineral fiber for office", () => {
    expect(forOffice("mineral_fiber_acoustic_lay")).toBe(true);
  });
  it("metal pan not for office", () => {
    expect(forOffice("metal_pan_aluminum_steel")).toBe(false);
  });
});

describe("edge", () => {
  it("metal pan uses snap in clip", () => {
    expect(edge("metal_pan_aluminum_steel")).toBe("snap_in_clip_concealed_grid");
  });
});

describe("bestUse", () => {
  it("fiberglass for recording studio", () => {
    expect(bestUse("fiberglass_sound_absorb")).toBe("recording_studio_theater_absorb");
  });
});

describe("ceilingTileTypes", () => {
  it("returns 5 types", () => {
    expect(ceilingTileTypes()).toHaveLength(5);
  });
});
