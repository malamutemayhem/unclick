import { describe, it, expect } from "vitest";
import {
  inkAccess, spillResist, inkCapacity, aesthetics,
  wellCost, portable, grindsInk, wellMaterial,
  bestSetup, inkWells,
} from "../ink-well-calc.js";

describe("inkAccess", () => {
  it("reservoir auto feed best ink access", () => {
    expect(inkAccess("reservoir_auto_feed")).toBeGreaterThan(inkAccess("sumi_stone_grind"));
  });
});

describe("spillResist", () => {
  it("dinky dip travel best spill resist", () => {
    expect(spillResist("dinky_dip_travel")).toBeGreaterThan(spillResist("sumi_stone_grind"));
  });
});

describe("inkCapacity", () => {
  it("ceramic pot studio most ink capacity", () => {
    expect(inkCapacity("ceramic_pot_studio")).toBeGreaterThan(inkCapacity("dinky_dip_travel"));
  });
});

describe("aesthetics", () => {
  it("glass crystal desk best aesthetics", () => {
    expect(aesthetics("glass_crystal_desk")).toBeGreaterThan(aesthetics("dinky_dip_travel"));
  });
});

describe("wellCost", () => {
  it("glass crystal desk more expensive than dinky dip", () => {
    expect(wellCost("glass_crystal_desk")).toBeGreaterThan(wellCost("dinky_dip_travel"));
  });
});

describe("portable", () => {
  it("dinky dip travel is portable", () => {
    expect(portable("dinky_dip_travel")).toBe(true);
  });
  it("glass crystal desk is not portable", () => {
    expect(portable("glass_crystal_desk")).toBe(false);
  });
});

describe("grindsInk", () => {
  it("sumi stone grind grinds ink", () => {
    expect(grindsInk("sumi_stone_grind")).toBe(true);
  });
  it("glass crystal desk does not grind ink", () => {
    expect(grindsInk("glass_crystal_desk")).toBe(false);
  });
});

describe("wellMaterial", () => {
  it("sumi stone grind uses natural slate stone", () => {
    expect(wellMaterial("sumi_stone_grind")).toBe("natural_slate_stone");
  });
});

describe("bestSetup", () => {
  it("dinky dip travel best for plein air sketch", () => {
    expect(bestSetup("dinky_dip_travel")).toBe("plein_air_sketch");
  });
});

describe("inkWells", () => {
  it("returns 5 types", () => {
    expect(inkWells()).toHaveLength(5);
  });
});
