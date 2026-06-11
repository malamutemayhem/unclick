import { describe, it, expect } from "vitest";
import {
  capacity, versatility, efficiency, speed,
  coCost, steamCapable, forHighVolume, heating,
  bestUse, commercialOvenTypes,
} from "../commercial-oven-calc.js";

describe("capacity", () => {
  it("conveyor highest capacity", () => {
    expect(capacity("conveyor_impingement")).toBeGreaterThan(capacity("deck_pizza_stone"));
  });
});

describe("versatility", () => {
  it("combi most versatile", () => {
    expect(versatility("combi_steam_convection")).toBeGreaterThan(versatility("conveyor_impingement"));
  });
});

describe("efficiency", () => {
  it("combi most efficient", () => {
    expect(efficiency("combi_steam_convection")).toBeGreaterThan(efficiency("deck_pizza_stone"));
  });
});

describe("speed", () => {
  it("conveyor fastest", () => {
    expect(speed("conveyor_impingement")).toBeGreaterThan(speed("deck_pizza_stone"));
  });
});

describe("coCost", () => {
  it("combi most expensive", () => {
    expect(coCost("combi_steam_convection")).toBeGreaterThan(coCost("convection_electric"));
  });
});

describe("steamCapable", () => {
  it("combi is steam capable", () => {
    expect(steamCapable("combi_steam_convection")).toBe(true);
  });
  it("convection not steam capable", () => {
    expect(steamCapable("convection_electric")).toBe(false);
  });
});

describe("forHighVolume", () => {
  it("conveyor for high volume", () => {
    expect(forHighVolume("conveyor_impingement")).toBe(true);
  });
  it("deck not high volume", () => {
    expect(forHighVolume("deck_pizza_stone")).toBe(false);
  });
});

describe("heating", () => {
  it("deck uses stone radiant", () => {
    expect(heating("deck_pizza_stone")).toBe("gas_stone_deck_radiant_heat");
  });
});

describe("bestUse", () => {
  it("combi for hotel hospital", () => {
    expect(bestUse("combi_steam_convection")).toBe("hotel_hospital_multi_method");
  });
});

describe("commercialOvenTypes", () => {
  it("returns 5 types", () => {
    expect(commercialOvenTypes()).toHaveLength(5);
  });
});
