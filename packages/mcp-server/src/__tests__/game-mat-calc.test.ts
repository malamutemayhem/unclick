import { describe, it, expect } from "vitest";
import {
  surfaceGrip, cushionThickness, portability, cleanability,
  matCost, printable, erasable, surfaceMaterial,
  bestUse, gameMats,
} from "../game-mat-calc.js";

describe("surfaceGrip", () => {
  it("neoprene playmat best surface grip", () => {
    expect(surfaceGrip("neoprene_playmat")).toBeGreaterThan(surfaceGrip("leather_roll_up"));
  });
});

describe("cushionThickness", () => {
  it("neoprene playmat thickest cushion", () => {
    expect(cushionThickness("neoprene_playmat")).toBeGreaterThan(cushionThickness("grid_battle_map"));
  });
});

describe("portability", () => {
  it("grid battle map most portable", () => {
    expect(portability("grid_battle_map")).toBeGreaterThan(portability("felt_card_table"));
  });
});

describe("cleanability", () => {
  it("rubber scroll easiest to clean", () => {
    expect(cleanability("rubber_scroll")).toBeGreaterThan(cleanability("felt_card_table"));
  });
});

describe("matCost", () => {
  it("leather roll up most expensive", () => {
    expect(matCost("leather_roll_up")).toBeGreaterThan(matCost("felt_card_table"));
  });
});

describe("printable", () => {
  it("neoprene playmat is printable", () => {
    expect(printable("neoprene_playmat")).toBe(true);
  });
  it("felt card table is not", () => {
    expect(printable("felt_card_table")).toBe(false);
  });
});

describe("erasable", () => {
  it("grid battle map is erasable", () => {
    expect(erasable("grid_battle_map")).toBe(true);
  });
  it("neoprene playmat is not", () => {
    expect(erasable("neoprene_playmat")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("leather roll up uses full grain leather stitched", () => {
    expect(surfaceMaterial("leather_roll_up")).toBe("full_grain_leather_stitched");
  });
});

describe("bestUse", () => {
  it("grid battle map for rpg dungeon map drawing", () => {
    expect(bestUse("grid_battle_map")).toBe("rpg_dungeon_map_drawing");
  });
});

describe("gameMats", () => {
  it("returns 5 types", () => {
    expect(gameMats()).toHaveLength(5);
  });
});
