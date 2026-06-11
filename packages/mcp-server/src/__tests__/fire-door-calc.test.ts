import { describe, it, expect } from "vitest";
import {
  rating, insulation, aesthetic, durability,
  fdCost, glazed, forEgress, core,
  bestUse, fireDoorTypes,
} from "../fire-door-calc.js";

describe("rating", () => {
  it("composite highest rating", () => {
    expect(rating("composite_mineral_core")).toBeGreaterThan(rating("glass_fire_rated_ceramic"));
  });
});

describe("insulation", () => {
  it("composite best insulation", () => {
    expect(insulation("composite_mineral_core")).toBeGreaterThan(insulation("glass_fire_rated_ceramic"));
  });
});

describe("aesthetic", () => {
  it("glass best aesthetic", () => {
    expect(aesthetic("glass_fire_rated_ceramic")).toBeGreaterThan(aesthetic("rolling_steel_shutter"));
  });
});

describe("durability", () => {
  it("steel most durable", () => {
    expect(durability("steel_hollow_metal_frame")).toBeGreaterThan(durability("glass_fire_rated_ceramic"));
  });
});

describe("fdCost", () => {
  it("glass most expensive", () => {
    expect(fdCost("glass_fire_rated_ceramic")).toBeGreaterThan(fdCost("solid_core_timber_flush"));
  });
});

describe("glazed", () => {
  it("glass is glazed", () => {
    expect(glazed("glass_fire_rated_ceramic")).toBe(true);
  });
  it("steel not glazed", () => {
    expect(glazed("steel_hollow_metal_frame")).toBe(false);
  });
});

describe("forEgress", () => {
  it("steel for egress", () => {
    expect(forEgress("steel_hollow_metal_frame")).toBe(true);
  });
  it("rolling shutter not for egress", () => {
    expect(forEgress("rolling_steel_shutter")).toBe(false);
  });
});

describe("core", () => {
  it("rolling uses interlocking steel slat", () => {
    expect(core("rolling_steel_shutter")).toBe("interlocking_steel_slat_coil_drum");
  });
});

describe("bestUse", () => {
  it("composite for shaft wall max rating", () => {
    expect(bestUse("composite_mineral_core")).toBe("shaft_wall_service_riser_max_rating");
  });
});

describe("fireDoorTypes", () => {
  it("returns 5 types", () => {
    expect(fireDoorTypes()).toHaveLength(5);
  });
});
