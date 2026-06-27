import { describe, it, expect } from "vitest";
import {
  cardProtection, gripSurface, durability, portability,
  matCost, customPrint, hasGrid, surfaceMaterial,
  bestGame, playmats,
} from "../playmat-calc.js";

describe("cardProtection", () => {
  it("neoprene stitched edge best card protection", () => {
    expect(cardProtection("neoprene_stitched_edge")).toBeGreaterThan(cardProtection("vinyl_rollup_budget"));
  });
});

describe("gripSurface", () => {
  it("neoprene stitched edge best grip", () => {
    expect(gripSurface("neoprene_stitched_edge")).toBeGreaterThan(gripSurface("vinyl_rollup_budget"));
  });
});

describe("durability", () => {
  it("neoprene stitched edge most durable", () => {
    expect(durability("neoprene_stitched_edge")).toBeGreaterThan(durability("vinyl_rollup_budget"));
  });
});

describe("portability", () => {
  it("vinyl rollup budget most portable", () => {
    expect(portability("vinyl_rollup_budget")).toBeGreaterThan(portability("leather_premium_desk"));
  });
});

describe("matCost", () => {
  it("leather premium desk most expensive", () => {
    expect(matCost("leather_premium_desk")).toBeGreaterThan(matCost("vinyl_rollup_budget"));
  });
});

describe("customPrint", () => {
  it("rubber base cloth top supports custom print", () => {
    expect(customPrint("rubber_base_cloth_top")).toBe(true);
  });
  it("vinyl rollup budget does not support custom print", () => {
    expect(customPrint("vinyl_rollup_budget")).toBe(false);
  });
});

describe("hasGrid", () => {
  it("xl battle map grid has grid", () => {
    expect(hasGrid("xl_battle_map_grid")).toBe(true);
  });
  it("neoprene stitched edge has no grid", () => {
    expect(hasGrid("neoprene_stitched_edge")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("neoprene stitched edge uses neoprene jersey stitch", () => {
    expect(surfaceMaterial("neoprene_stitched_edge")).toBe("neoprene_jersey_stitch");
  });
});

describe("bestGame", () => {
  it("xl battle map grid best for dnd wargame miniatures", () => {
    expect(bestGame("xl_battle_map_grid")).toBe("dnd_wargame_miniatures");
  });
});

describe("playmats", () => {
  it("returns 5 types", () => {
    expect(playmats()).toHaveLength(5);
  });
});
