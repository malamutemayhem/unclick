import { describe, it, expect } from "vitest";
import {
  durability, comfort, acoustic, maintenance,
  cpCost, modular, forCommercial, fiber,
  bestUse, carpetTypes,
} from "../carpet-type-calc.js";

describe("durability", () => {
  it("commercial most durable", () => {
    expect(durability("commercial_low_pile")).toBeGreaterThan(durability("plush_cut_pile"));
  });
});

describe("comfort", () => {
  it("plush most comfortable", () => {
    expect(comfort("plush_cut_pile")).toBeGreaterThan(comfort("commercial_low_pile"));
  });
});

describe("acoustic", () => {
  it("plush best acoustic", () => {
    expect(acoustic("plush_cut_pile")).toBeGreaterThan(acoustic("berber_loop_pile"));
  });
});

describe("maintenance", () => {
  it("carpet tile easiest maintenance", () => {
    expect(maintenance("carpet_tile_modular")).toBeGreaterThan(maintenance("plush_cut_pile"));
  });
});

describe("cpCost", () => {
  it("carpet tile more expensive than berber", () => {
    expect(cpCost("carpet_tile_modular")).toBeGreaterThan(cpCost("berber_loop_pile"));
  });
});

describe("modular", () => {
  it("carpet tile is modular", () => {
    expect(modular("carpet_tile_modular")).toBe(true);
  });
  it("broadloom not modular", () => {
    expect(modular("broadloom_roll_nylon")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("commercial for commercial", () => {
    expect(forCommercial("commercial_low_pile")).toBe(true);
  });
  it("plush not commercial", () => {
    expect(forCommercial("plush_cut_pile")).toBe(false);
  });
});

describe("fiber", () => {
  it("berber uses olefin", () => {
    expect(fiber("berber_loop_pile")).toBe("olefin_polypropylene_loop");
  });
});

describe("bestUse", () => {
  it("carpet tile for office", () => {
    expect(bestUse("carpet_tile_modular")).toBe("office_data_center_replace_tile");
  });
});

describe("carpetTypes", () => {
  it("returns 5 types", () => {
    expect(carpetTypes()).toHaveLength(5);
  });
});
