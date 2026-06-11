import { describe, it, expect } from "vitest";
import {
  steamOutput, tempControl, portability, waterCapacity,
  steamBlockCost, handheld, forDelicate, steamMethod,
  bestUse, steamBlocks,
} from "../steam-block-calc.js";

describe("steamOutput", () => {
  it("steam generator pro highest steam output", () => {
    expect(steamOutput("steam_generator_pro")).toBeGreaterThan(steamOutput("travel_steamer_compact"));
  });
});

describe("tempControl", () => {
  it("steam generator pro best temp control", () => {
    expect(tempControl("steam_generator_pro")).toBeGreaterThan(tempControl("travel_steamer_compact"));
  });
});

describe("portability", () => {
  it("travel steamer compact most portable", () => {
    expect(portability("travel_steamer_compact")).toBeGreaterThan(portability("steam_generator_pro"));
  });
});

describe("waterCapacity", () => {
  it("steam generator pro highest water capacity", () => {
    expect(waterCapacity("steam_generator_pro")).toBeGreaterThan(waterCapacity("travel_steamer_compact"));
  });
});

describe("steamBlockCost", () => {
  it("steam generator pro most expensive", () => {
    expect(steamBlockCost("steam_generator_pro")).toBeGreaterThan(steamBlockCost("travel_steamer_compact"));
  });
});

describe("handheld", () => {
  it("garment steamer hand is handheld", () => {
    expect(handheld("garment_steamer_hand")).toBe(true);
  });
  it("steam generator pro not handheld", () => {
    expect(handheld("steam_generator_pro")).toBe(false);
  });
});

describe("forDelicate", () => {
  it("garment steamer hand is for delicate", () => {
    expect(forDelicate("garment_steamer_hand")).toBe(true);
  });
  it("steam iron press not for delicate", () => {
    expect(forDelicate("steam_iron_press")).toBe(false);
  });
});

describe("steamMethod", () => {
  it("vertical steamer hang uses upright pole steam", () => {
    expect(steamMethod("vertical_steamer_hang")).toBe("upright_pole_steam");
  });
});

describe("bestUse", () => {
  it("travel steamer compact best for travel touch up", () => {
    expect(bestUse("travel_steamer_compact")).toBe("travel_touch_up");
  });
});

describe("steamBlocks", () => {
  it("returns 5 types", () => {
    expect(steamBlocks()).toHaveLength(5);
  });
});
