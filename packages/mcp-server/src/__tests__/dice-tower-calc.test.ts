import { describe, it, expect } from "vitest";
import {
  rollRandomness, noiseLevel, portability, tablePresence,
  towerCost, diceContained, customizable, buildMaterial,
  bestGame, diceTowers,
} from "../dice-tower-calc.js";

describe("rollRandomness", () => {
  it("castle themed best randomness", () => {
    expect(rollRandomness("castle_themed")).toBeGreaterThan(rollRandomness("fold_flat_travel"));
  });
});

describe("noiseLevel", () => {
  it("acrylic clear noisiest", () => {
    expect(noiseLevel("acrylic_clear")).toBeGreaterThan(noiseLevel("fold_flat_travel"));
  });
});

describe("portability", () => {
  it("fold flat travel most portable", () => {
    expect(portability("fold_flat_travel")).toBeGreaterThan(portability("castle_themed"));
  });
});

describe("tablePresence", () => {
  it("castle themed best table presence", () => {
    expect(tablePresence("castle_themed")).toBeGreaterThan(tablePresence("fold_flat_travel"));
  });
});

describe("towerCost", () => {
  it("castle themed most expensive", () => {
    expect(towerCost("castle_themed")).toBeGreaterThan(towerCost("fold_flat_travel"));
  });
});

describe("diceContained", () => {
  it("wooden classic contains dice", () => {
    expect(diceContained("wooden_classic")).toBe(true);
  });
  it("fold flat travel also contains dice", () => {
    expect(diceContained("fold_flat_travel")).toBe(true);
  });
});

describe("customizable", () => {
  it("3d printed custom is customizable", () => {
    expect(customizable("3d_printed_custom")).toBe(true);
  });
  it("wooden classic is not", () => {
    expect(customizable("wooden_classic")).toBe(false);
  });
});

describe("buildMaterial", () => {
  it("castle themed uses resin sculpted painted", () => {
    expect(buildMaterial("castle_themed")).toBe("resin_sculpted_painted");
  });
});

describe("bestGame", () => {
  it("3d printed custom for dnd rpg campaign", () => {
    expect(bestGame("3d_printed_custom")).toBe("dnd_rpg_campaign");
  });
});

describe("diceTowers", () => {
  it("returns 5 types", () => {
    expect(diceTowers()).toHaveLength(5);
  });
});
