import { describe, it, expect } from "vitest";
import {
  blendUniformity, throughput, gentleness, cleanability,
  tbCost, freefall, forPharma, blenderConfig,
  bestUse, tumbleBlenderTypes,
} from "../tumble-blender-calc.js";

describe("blendUniformity", () => {
  it("slant cone best blend uniformity", () => {
    expect(blendUniformity("slant_cone")).toBeGreaterThan(blendUniformity("double_cone"));
  });
});

describe("throughput", () => {
  it("bin blender highest throughput", () => {
    expect(throughput("bin_blender")).toBeGreaterThan(throughput("slant_cone"));
  });
});

describe("gentleness", () => {
  it("double cone best gentleness", () => {
    expect(gentleness("double_cone")).toBeGreaterThan(gentleness("octagonal_blender"));
  });
});

describe("cleanability", () => {
  it("bin blender best cleanability", () => {
    expect(cleanability("bin_blender")).toBeGreaterThan(cleanability("v_shell"));
  });
});

describe("tbCost", () => {
  it("bin blender most expensive", () => {
    expect(tbCost("bin_blender")).toBeGreaterThan(tbCost("double_cone"));
  });
});

describe("freefall", () => {
  it("double cone is freefall", () => {
    expect(freefall("double_cone")).toBe(true);
  });
  it("all types are freefall", () => {
    expect(freefall("v_shell")).toBe(true);
  });
});

describe("forPharma", () => {
  it("double cone for pharma", () => {
    expect(forPharma("double_cone")).toBe(true);
  });
  it("slant cone not for pharma", () => {
    expect(forPharma("slant_cone")).toBe(false);
  });
});

describe("blenderConfig", () => {
  it("bin blender uses ibc tumble rotate contain transfer no clean between", () => {
    expect(blenderConfig("bin_blender")).toBe("bin_blender_ibc_tumble_rotate_contain_transfer_no_clean_between");
  });
});

describe("bestUse", () => {
  it("v shell for tablet premix split merge even distribute", () => {
    expect(bestUse("v_shell")).toBe("tablet_premix_v_shell_tumble_blender_split_merge_even_distribute");
  });
});

describe("tumbleBlenderTypes", () => {
  it("returns 5 types", () => {
    expect(tumbleBlenderTypes()).toHaveLength(5);
  });
});
