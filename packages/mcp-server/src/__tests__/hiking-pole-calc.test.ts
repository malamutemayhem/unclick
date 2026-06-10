import { describe, it, expect } from "vitest";
import {
  weightSaving, durability, packability, gripComfort,
  poleCost, shockAbsorb, fitsInPack, shaftMaterial,
  bestTerrain, hikingPoles,
} from "../hiking-pole-calc.js";

describe("weightSaving", () => {
  it("carbon fiber ultra best weight saving", () => {
    expect(weightSaving("carbon_fiber_ultra")).toBeGreaterThan(weightSaving("ski_pole_dual_purpose"));
  });
});

describe("durability", () => {
  it("ski pole dual purpose most durable", () => {
    expect(durability("ski_pole_dual_purpose")).toBeGreaterThan(durability("folding_z_pole_compact"));
  });
});

describe("packability", () => {
  it("folding z pole compact most packable", () => {
    expect(packability("folding_z_pole_compact")).toBeGreaterThan(packability("ski_pole_dual_purpose"));
  });
});

describe("gripComfort", () => {
  it("cork grip shock absorb most comfortable grip", () => {
    expect(gripComfort("cork_grip_shock_absorb")).toBeGreaterThan(gripComfort("aluminum_telescopic_basic"));
  });
});

describe("poleCost", () => {
  it("carbon fiber ultra most expensive", () => {
    expect(poleCost("carbon_fiber_ultra")).toBeGreaterThan(poleCost("aluminum_telescopic_basic"));
  });
});

describe("shockAbsorb", () => {
  it("cork grip shock absorb has shock absorption", () => {
    expect(shockAbsorb("cork_grip_shock_absorb")).toBe(true);
  });
  it("carbon fiber ultra does not", () => {
    expect(shockAbsorb("carbon_fiber_ultra")).toBe(false);
  });
});

describe("fitsInPack", () => {
  it("folding z pole compact fits in pack", () => {
    expect(fitsInPack("folding_z_pole_compact")).toBe(true);
  });
  it("aluminum telescopic basic does not", () => {
    expect(fitsInPack("aluminum_telescopic_basic")).toBe(false);
  });
});

describe("shaftMaterial", () => {
  it("carbon fiber ultra uses carbon fiber three section", () => {
    expect(shaftMaterial("carbon_fiber_ultra")).toBe("carbon_fiber_three_section");
  });
});

describe("bestTerrain", () => {
  it("folding z pole compact best for travel flight fast pack", () => {
    expect(bestTerrain("folding_z_pole_compact")).toBe("travel_flight_fast_pack");
  });
});

describe("hikingPoles", () => {
  it("returns 5 types", () => {
    expect(hikingPoles()).toHaveLength(5);
  });
});
