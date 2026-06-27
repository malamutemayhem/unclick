import { describe, it, expect } from "vitest";
import {
  grindFine, batchConsist, speedGrind, materialRange,
  glazeCost, powered, forWet, grindAction,
  bestUse, glazeMills,
} from "../glaze-mill-calc.js";

describe("grindFine", () => {
  it("ball mill jar finest grind", () => {
    expect(grindFine("ball_mill_jar")).toBeGreaterThan(grindFine("vibrating_sieve_screen"));
  });
});

describe("batchConsist", () => {
  it("ball mill jar most consistent batch", () => {
    expect(batchConsist("ball_mill_jar")).toBeGreaterThan(batchConsist("mortar_pestle_hand"));
  });
});

describe("speedGrind", () => {
  it("vibrating sieve screen fastest grind", () => {
    expect(speedGrind("vibrating_sieve_screen")).toBeGreaterThan(speedGrind("mortar_pestle_hand"));
  });
});

describe("materialRange", () => {
  it("ball mill jar widest material range", () => {
    expect(materialRange("ball_mill_jar")).toBeGreaterThan(materialRange("vibrating_sieve_screen"));
  });
});

describe("glazeCost", () => {
  it("plate mill flat most expensive", () => {
    expect(glazeCost("plate_mill_flat")).toBeGreaterThan(glazeCost("mortar_pestle_hand"));
  });
});

describe("powered", () => {
  it("ball mill jar is powered", () => {
    expect(powered("ball_mill_jar")).toBe(true);
  });
  it("mortar pestle hand not powered", () => {
    expect(powered("mortar_pestle_hand")).toBe(false);
  });
});

describe("forWet", () => {
  it("ball mill jar is for wet", () => {
    expect(forWet("ball_mill_jar")).toBe(true);
  });
  it("mortar pestle hand not for wet", () => {
    expect(forWet("mortar_pestle_hand")).toBe(false);
  });
});

describe("grindAction", () => {
  it("wet grinder stone uses stone wet rotate", () => {
    expect(grindAction("wet_grinder_stone")).toBe("stone_wet_rotate");
  });
});

describe("bestUse", () => {
  it("vibrating sieve screen best for glaze sieve uniform", () => {
    expect(bestUse("vibrating_sieve_screen")).toBe("glaze_sieve_uniform");
  });
});

describe("glazeMills", () => {
  it("returns 5 types", () => {
    expect(glazeMills()).toHaveLength(5);
  });
});
