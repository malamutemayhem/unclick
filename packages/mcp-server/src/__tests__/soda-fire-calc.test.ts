import { describe, it, expect } from "vitest";
import {
  glazeDepth, colorFlash, surfaceTexture, controlEven,
  sodaCost, sprayed, blended, sodaSource,
  bestUse, sodaFires,
} from "../soda-fire-calc.js";

describe("glazeDepth", () => {
  it("borax soda flux deepest glaze", () => {
    expect(glazeDepth("borax_soda_flux")).toBeGreaterThan(glazeDepth("baking_soda_mild"));
  });
});

describe("colorFlash", () => {
  it("salt soda blend brightest color flash", () => {
    expect(colorFlash("salt_soda_blend")).toBeGreaterThan(colorFlash("baking_soda_mild"));
  });
});

describe("surfaceTexture", () => {
  it("salt soda blend richest surface texture", () => {
    expect(surfaceTexture("salt_soda_blend")).toBeGreaterThan(surfaceTexture("soda_spray_even"));
  });
});

describe("controlEven", () => {
  it("soda spray even most even control", () => {
    expect(controlEven("soda_spray_even")).toBeGreaterThan(controlEven("salt_soda_blend"));
  });
});

describe("sodaCost", () => {
  it("soda spray even most expensive", () => {
    expect(sodaCost("soda_spray_even")).toBeGreaterThan(sodaCost("baking_soda_mild"));
  });
});

describe("sprayed", () => {
  it("soda spray even is sprayed", () => {
    expect(sprayed("soda_spray_even")).toBe(true);
  });
  it("soda ash standard not sprayed", () => {
    expect(sprayed("soda_ash_standard")).toBe(false);
  });
});

describe("blended", () => {
  it("salt soda blend is blended", () => {
    expect(blended("salt_soda_blend")).toBe(true);
  });
  it("soda ash standard not blended", () => {
    expect(blended("soda_ash_standard")).toBe(false);
  });
});

describe("sodaSource", () => {
  it("borax soda flux uses borax soda powder", () => {
    expect(sodaSource("borax_soda_flux")).toBe("borax_soda_powder");
  });
});

describe("bestUse", () => {
  it("soda ash standard best for general soda fire", () => {
    expect(bestUse("soda_ash_standard")).toBe("general_soda_fire");
  });
});

describe("sodaFires", () => {
  it("returns 5 types", () => {
    expect(sodaFires()).toHaveLength(5);
  });
});
