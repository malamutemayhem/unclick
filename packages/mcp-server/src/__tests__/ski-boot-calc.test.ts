import { describe, it, expect } from "vitest";
import {
  flexIndex, powerTransfer, comfortFit, walkability,
  bootCost, heatMoldable, walkMode, shellMaterial,
  bestSkier, skiBoots,
} from "../ski-boot-calc.js";

describe("flexIndex", () => {
  it("race stiff highest flex", () => {
    expect(flexIndex("race_stiff")).toBeGreaterThan(flexIndex("beginner_soft_flex"));
  });
});

describe("powerTransfer", () => {
  it("race stiff best power transfer", () => {
    expect(powerTransfer("race_stiff")).toBeGreaterThan(powerTransfer("beginner_soft_flex"));
  });
});

describe("comfortFit", () => {
  it("beginner soft flex most comfortable", () => {
    expect(comfortFit("beginner_soft_flex")).toBeGreaterThan(comfortFit("race_stiff"));
  });
});

describe("walkability", () => {
  it("touring walk best walkability", () => {
    expect(walkability("touring_walk")).toBeGreaterThan(walkability("race_stiff"));
  });
});

describe("bootCost", () => {
  it("race stiff most expensive", () => {
    expect(bootCost("race_stiff")).toBeGreaterThan(bootCost("beginner_soft_flex"));
  });
});

describe("heatMoldable", () => {
  it("all mountain medium is heat moldable", () => {
    expect(heatMoldable("all_mountain_medium")).toBe(true);
  });
  it("beginner soft flex is not", () => {
    expect(heatMoldable("beginner_soft_flex")).toBe(false);
  });
});

describe("walkMode", () => {
  it("touring walk has walk mode", () => {
    expect(walkMode("touring_walk")).toBe(true);
  });
  it("race stiff does not", () => {
    expect(walkMode("race_stiff")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("touring walk uses grilamid lightweight", () => {
    expect(shellMaterial("touring_walk")).toBe("grilamid_lightweight");
  });
});

describe("bestSkier", () => {
  it("park freestyle for terrain park jumps rails", () => {
    expect(bestSkier("park_freestyle")).toBe("terrain_park_jumps_rails");
  });
});

describe("skiBoots", () => {
  it("returns 5 types", () => {
    expect(skiBoots()).toHaveLength(5);
  });
});
