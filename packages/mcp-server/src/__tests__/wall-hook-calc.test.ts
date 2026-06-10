import { describe, it, expect } from "vitest";
import {
  holdWeight, installEase, removeClean, durability,
  hookCost, noDrilling, reusable, mountMethod,
  bestSurface, wallHooks,
} from "../wall-hook-calc.js";

describe("holdWeight", () => {
  it("toggle bolt heavy holds most weight", () => {
    expect(holdWeight("toggle_bolt_heavy")).toBeGreaterThan(holdWeight("suction_cup_glass"));
  });
});

describe("installEase", () => {
  it("adhesive strip plastic easiest install", () => {
    expect(installEase("adhesive_strip_plastic")).toBeGreaterThan(installEase("toggle_bolt_heavy"));
  });
});

describe("removeClean", () => {
  it("over door hanger cleanest removal", () => {
    expect(removeClean("over_door_hanger")).toBeGreaterThan(removeClean("toggle_bolt_heavy"));
  });
});

describe("durability", () => {
  it("toggle bolt heavy most durable", () => {
    expect(durability("toggle_bolt_heavy")).toBeGreaterThan(durability("suction_cup_glass"));
  });
});

describe("hookCost", () => {
  it("toggle bolt heavy most expensive", () => {
    expect(hookCost("toggle_bolt_heavy")).toBeGreaterThan(hookCost("adhesive_strip_plastic"));
  });
});

describe("noDrilling", () => {
  it("adhesive strip plastic needs no drilling", () => {
    expect(noDrilling("adhesive_strip_plastic")).toBe(true);
  });
  it("screw in metal does", () => {
    expect(noDrilling("screw_in_metal")).toBe(false);
  });
});

describe("reusable", () => {
  it("screw in metal is reusable", () => {
    expect(reusable("screw_in_metal")).toBe(true);
  });
  it("adhesive strip plastic is not", () => {
    expect(reusable("adhesive_strip_plastic")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("suction cup glass uses vacuum seal smooth surface", () => {
    expect(mountMethod("suction_cup_glass")).toBe("vacuum_seal_smooth_surface");
  });
});

describe("bestSurface", () => {
  it("toggle bolt heavy best for hollow drywall no stud", () => {
    expect(bestSurface("toggle_bolt_heavy")).toBe("hollow_drywall_no_stud");
  });
});

describe("wallHooks", () => {
  it("returns 5 types", () => {
    expect(wallHooks()).toHaveLength(5);
  });
});
