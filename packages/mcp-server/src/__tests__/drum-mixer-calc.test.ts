import { describe, it, expect } from "vitest";
import {
  blendUniformity, gentleness, scaleUp, cleanability,
  dmCost, continuous, forPowder, geometry,
  bestUse, drumMixerTypes,
} from "../drum-mixer-calc.js";

describe("blendUniformity", () => {
  it("v blender most uniform", () => {
    expect(blendUniformity("v_blender_tumble")).toBeGreaterThan(blendUniformity("continuous_drum_flow"));
  });
});

describe("gentleness", () => {
  it("double cone most gentle", () => {
    expect(gentleness("double_cone_blend")).toBeGreaterThanOrEqual(gentleness("bin_blender_ibc"));
  });
});

describe("scaleUp", () => {
  it("bin blender best scale up", () => {
    expect(scaleUp("bin_blender_ibc")).toBeGreaterThan(scaleUp("v_blender_tumble"));
  });
});

describe("cleanability", () => {
  it("bin blender best cleanability", () => {
    expect(cleanability("bin_blender_ibc")).toBeGreaterThan(cleanability("continuous_drum_flow"));
  });
});

describe("dmCost", () => {
  it("bin blender most expensive", () => {
    expect(dmCost("bin_blender_ibc")).toBeGreaterThan(dmCost("rotating_drum_batch"));
  });
});

describe("continuous", () => {
  it("continuous drum is continuous", () => {
    expect(continuous("continuous_drum_flow")).toBe(true);
  });
  it("double cone is not continuous", () => {
    expect(continuous("double_cone_blend")).toBe(false);
  });
});

describe("forPowder", () => {
  it("v blender for powder", () => {
    expect(forPowder("v_blender_tumble")).toBe(true);
  });
  it("continuous drum not for powder", () => {
    expect(forPowder("continuous_drum_flow")).toBe(false);
  });
});

describe("geometry", () => {
  it("v blender uses v shape shell", () => {
    expect(geometry("v_blender_tumble")).toBe("v_shape_shell_split_recombine_tumble_blend");
  });
});

describe("bestUse", () => {
  it("bin blender for gmp pharma", () => {
    expect(bestUse("bin_blender_ibc")).toBe("gmp_pharma_contained_blend_no_cross_contam");
  });
});

describe("drumMixerTypes", () => {
  it("returns 5 types", () => {
    expect(drumMixerTypes()).toHaveLength(5);
  });
});
