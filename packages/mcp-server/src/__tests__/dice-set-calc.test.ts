import { describe, it, expect } from "vitest";
import {
  rollFairness, durability, aestheticScore, readability,
  diceCost, tableSafe, inkFilled, craftMethod,
  bestGame, diceSets,
} from "../dice-set-calc.js";

describe("rollFairness", () => {
  it("metal heavy most fair roll", () => {
    expect(rollFairness("metal_heavy")).toBeGreaterThan(rollFairness("wooden_engraved"));
  });
});

describe("durability", () => {
  it("metal heavy most durable", () => {
    expect(durability("metal_heavy")).toBeGreaterThan(durability("gemstone_natural"));
  });
});

describe("aestheticScore", () => {
  it("gemstone natural best aesthetic", () => {
    expect(aestheticScore("gemstone_natural")).toBeGreaterThan(aestheticScore("acrylic_standard"));
  });
});

describe("readability", () => {
  it("acrylic standard most readable", () => {
    expect(readability("acrylic_standard")).toBeGreaterThan(readability("gemstone_natural"));
  });
});

describe("diceCost", () => {
  it("gemstone natural most expensive", () => {
    expect(diceCost("gemstone_natural")).toBeGreaterThan(diceCost("acrylic_standard"));
  });
});

describe("tableSafe", () => {
  it("acrylic standard is table safe", () => {
    expect(tableSafe("acrylic_standard")).toBe(true);
  });
  it("metal heavy is not", () => {
    expect(tableSafe("metal_heavy")).toBe(false);
  });
});

describe("inkFilled", () => {
  it("metal heavy is ink filled", () => {
    expect(inkFilled("metal_heavy")).toBe(true);
  });
  it("wooden engraved is not", () => {
    expect(inkFilled("wooden_engraved")).toBe(false);
  });
});

describe("craftMethod", () => {
  it("gemstone natural uses hand carved polished stone", () => {
    expect(craftMethod("gemstone_natural")).toBe("hand_carved_polished_stone");
  });
});

describe("bestGame", () => {
  it("acrylic standard for general rpg board game", () => {
    expect(bestGame("acrylic_standard")).toBe("general_rpg_board_game");
  });
});

describe("diceSets", () => {
  it("returns 5 types", () => {
    expect(diceSets()).toHaveLength(5);
  });
});
