import { describe, it, expect } from "vitest";
import {
  wrapTight, speedServe, tensionControl, ropeRange,
  malletCost, ratchetLock, forSmallLine, barrelType,
  bestUse, servingMallets,
} from "../serving-mallet-calc.js";

describe("wrapTight", () => {
  it("metal ratchet lock tightest wrap", () => {
    expect(wrapTight("metal_ratchet_lock")).toBeGreaterThan(wrapTight("mini_whipping_hand"));
  });
});

describe("speedServe", () => {
  it("plastic light quick fastest serve", () => {
    expect(speedServe("plastic_light_quick")).toBeGreaterThan(speedServe("mini_whipping_hand"));
  });
});

describe("tensionControl", () => {
  it("adjustable tension set best tension control", () => {
    expect(tensionControl("adjustable_tension_set")).toBeGreaterThan(tensionControl("plastic_light_quick"));
  });
});

describe("ropeRange", () => {
  it("adjustable tension set widest rope range", () => {
    expect(ropeRange("adjustable_tension_set")).toBeGreaterThan(ropeRange("mini_whipping_hand"));
  });
});

describe("malletCost", () => {
  it("adjustable tension set most expensive", () => {
    expect(malletCost("adjustable_tension_set")).toBeGreaterThan(malletCost("plastic_light_quick"));
  });
});

describe("ratchetLock", () => {
  it("metal ratchet lock has ratchet", () => {
    expect(ratchetLock("metal_ratchet_lock")).toBe(true);
  });
  it("wood barrel classic no ratchet", () => {
    expect(ratchetLock("wood_barrel_classic")).toBe(false);
  });
});

describe("forSmallLine", () => {
  it("mini whipping hand is for small line", () => {
    expect(forSmallLine("mini_whipping_hand")).toBe(true);
  });
  it("wood barrel classic not for small line", () => {
    expect(forSmallLine("wood_barrel_classic")).toBe(false);
  });
});

describe("barrelType", () => {
  it("metal ratchet lock uses aluminum ratchet drum", () => {
    expect(barrelType("metal_ratchet_lock")).toBe("aluminum_ratchet_drum");
  });
});

describe("bestUse", () => {
  it("adjustable tension set best for variable rope size", () => {
    expect(bestUse("adjustable_tension_set")).toBe("variable_rope_size");
  });
});

describe("servingMallets", () => {
  it("returns 5 types", () => {
    expect(servingMallets()).toHaveLength(5);
  });
});
