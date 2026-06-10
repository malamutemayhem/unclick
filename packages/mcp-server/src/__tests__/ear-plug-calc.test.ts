import { describe, it, expect } from "vitest";
import {
  noiseReduction, comfort, soundClarity, reusability,
  plugCost, waterproof, needsBattery, plugMaterial,
  bestUse, earPlugs,
} from "../ear-plug-calc.js";

describe("noiseReduction", () => {
  it("foam disposable roll best noise reduction", () => {
    expect(noiseReduction("foam_disposable_roll")).toBeGreaterThan(noiseReduction("flanged_musician_filter"));
  });
});

describe("comfort", () => {
  it("wax moldable custom most comfortable", () => {
    expect(comfort("wax_moldable_custom")).toBeGreaterThan(comfort("foam_disposable_roll"));
  });
});

describe("soundClarity", () => {
  it("flanged musician filter best sound clarity", () => {
    expect(soundClarity("flanged_musician_filter")).toBeGreaterThan(soundClarity("foam_disposable_roll"));
  });
});

describe("reusability", () => {
  it("electronic active cancel most reusable", () => {
    expect(reusability("electronic_active_cancel")).toBeGreaterThan(reusability("foam_disposable_roll"));
  });
});

describe("plugCost", () => {
  it("electronic active cancel most expensive", () => {
    expect(plugCost("electronic_active_cancel")).toBeGreaterThan(plugCost("foam_disposable_roll"));
  });
});

describe("waterproof", () => {
  it("silicone reusable tree is waterproof", () => {
    expect(waterproof("silicone_reusable_tree")).toBe(true);
  });
  it("foam disposable roll is not", () => {
    expect(waterproof("foam_disposable_roll")).toBe(false);
  });
});

describe("needsBattery", () => {
  it("electronic active cancel needs battery", () => {
    expect(needsBattery("electronic_active_cancel")).toBe(true);
  });
  it("flanged musician filter does not", () => {
    expect(needsBattery("flanged_musician_filter")).toBe(false);
  });
});

describe("plugMaterial", () => {
  it("wax moldable custom uses natural beeswax cotton", () => {
    expect(plugMaterial("wax_moldable_custom")).toBe("natural_beeswax_cotton");
  });
});

describe("bestUse", () => {
  it("flanged musician filter best for concert music even reduce", () => {
    expect(bestUse("flanged_musician_filter")).toBe("concert_music_even_reduce");
  });
});

describe("earPlugs", () => {
  it("returns 5 types", () => {
    expect(earPlugs()).toHaveLength(5);
  });
});
