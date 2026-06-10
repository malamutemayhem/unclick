import { describe, it, expect } from "vitest";
import {
  loadCapacity, installEase, drainage, aesthetics,
  shelfCost, noDrilling, rustProof, mountMethod,
  bestShower, showerShelves,
} from "../shower-shelf-calc.js";

describe("loadCapacity", () => {
  it("recessed niche built in most load capacity", () => {
    expect(loadCapacity("recessed_niche_built_in")).toBeGreaterThan(loadCapacity("suction_cup_basket"));
  });
});

describe("installEase", () => {
  it("suction cup basket easiest install", () => {
    expect(installEase("suction_cup_basket")).toBeGreaterThan(installEase("recessed_niche_built_in"));
  });
});

describe("drainage", () => {
  it("suction cup basket best drainage", () => {
    expect(drainage("suction_cup_basket")).toBeGreaterThan(drainage("recessed_niche_built_in"));
  });
});

describe("aesthetics", () => {
  it("recessed niche built in best aesthetics", () => {
    expect(aesthetics("recessed_niche_built_in")).toBeGreaterThan(aesthetics("suction_cup_basket"));
  });
});

describe("shelfCost", () => {
  it("recessed niche built in most expensive", () => {
    expect(shelfCost("recessed_niche_built_in")).toBeGreaterThan(shelfCost("suction_cup_basket"));
  });
});

describe("noDrilling", () => {
  it("corner tension pole needs no drilling", () => {
    expect(noDrilling("corner_tension_pole")).toBe(true);
  });
  it("recessed niche built in needs drilling", () => {
    expect(noDrilling("recessed_niche_built_in")).toBe(false);
  });
});

describe("rustProof", () => {
  it("adhesive wall mount is rust proof", () => {
    expect(rustProof("adhesive_wall_mount")).toBe(true);
  });
  it("suction cup basket is not rust proof", () => {
    expect(rustProof("suction_cup_basket")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("corner tension pole uses spring tension floor ceiling", () => {
    expect(mountMethod("corner_tension_pole")).toBe("spring_tension_floor_ceiling");
  });
});

describe("bestShower", () => {
  it("recessed niche built in best for new build renovation", () => {
    expect(bestShower("recessed_niche_built_in")).toBe("new_build_renovation");
  });
});

describe("showerShelves", () => {
  it("returns 5 types", () => {
    expect(showerShelves()).toHaveLength(5);
  });
});
