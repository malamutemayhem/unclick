import { describe, it, expect } from "vitest";
import {
  soothingRelief, gripEase, durability, cleanEase,
  teetherCost, bpaFree, canFreeze, teetherMaterial,
  bestAge, teethers,
} from "../teether-calc.js";

describe("soothingRelief", () => {
  it("water filled cooling most soothing", () => {
    expect(soothingRelief("water_filled_cooling")).toBeGreaterThan(soothingRelief("amber_necklace_baltic"));
  });
});

describe("gripEase", () => {
  it("silicone ring textured easiest grip", () => {
    expect(gripEase("silicone_ring_textured")).toBeGreaterThan(gripEase("amber_necklace_baltic"));
  });
});

describe("durability", () => {
  it("silicone ring textured most durable", () => {
    expect(durability("silicone_ring_textured")).toBeGreaterThan(durability("water_filled_cooling"));
  });
});

describe("cleanEase", () => {
  it("silicone ring textured easiest to clean", () => {
    expect(cleanEase("silicone_ring_textured")).toBeGreaterThan(cleanEase("mesh_feeder_fruit"));
  });
});

describe("teetherCost", () => {
  it("amber necklace baltic most expensive", () => {
    expect(teetherCost("amber_necklace_baltic")).toBeGreaterThan(teetherCost("silicone_ring_textured"));
  });
});

describe("bpaFree", () => {
  it("all teethers are bpa free", () => {
    expect(bpaFree("silicone_ring_textured")).toBe(true);
  });
  it("wooden maple natural is bpa free", () => {
    expect(bpaFree("wooden_maple_natural")).toBe(true);
  });
});

describe("canFreeze", () => {
  it("water filled cooling can freeze", () => {
    expect(canFreeze("water_filled_cooling")).toBe(true);
  });
  it("wooden maple natural cannot", () => {
    expect(canFreeze("wooden_maple_natural")).toBe(false);
  });
});

describe("teetherMaterial", () => {
  it("wooden maple natural uses untreated maple hardwood", () => {
    expect(teetherMaterial("wooden_maple_natural")).toBe("untreated_maple_hardwood");
  });
});

describe("bestAge", () => {
  it("mesh feeder fruit best for six months solid intro", () => {
    expect(bestAge("mesh_feeder_fruit")).toBe("six_months_solid_intro");
  });
});

describe("teethers", () => {
  it("returns 5 types", () => {
    expect(teethers()).toHaveLength(5);
  });
});
