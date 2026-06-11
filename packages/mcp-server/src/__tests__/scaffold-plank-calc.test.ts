import { describe, it, expect } from "vitest";
import {
  loadCapacity, weight, durability, grip,
  spCost, nonConductive, forHeavy, material,
  bestUse, scaffoldPlankTypes,
} from "../scaffold-plank-calc.js";

describe("loadCapacity", () => {
  it("steel highest load", () => {
    expect(loadCapacity("steel_metal_deck_plank")).toBeGreaterThan(loadCapacity("timber_solid_sawn_plank"));
  });
});

describe("weight", () => {
  it("aluminum lightest", () => {
    expect(weight("aluminum_walk_board")).toBeGreaterThan(weight("steel_metal_deck_plank"));
  });
});

describe("durability", () => {
  it("steel most durable", () => {
    expect(durability("steel_metal_deck_plank")).toBeGreaterThan(durability("timber_solid_sawn_plank"));
  });
});

describe("grip", () => {
  it("fiberglass best grip", () => {
    expect(grip("fiberglass_frp_non_conduct")).toBeGreaterThan(grip("steel_metal_deck_plank"));
  });
});

describe("spCost", () => {
  it("fiberglass most expensive", () => {
    expect(spCost("fiberglass_frp_non_conduct")).toBeGreaterThan(spCost("timber_solid_sawn_plank"));
  });
});

describe("nonConductive", () => {
  it("fiberglass is non conductive", () => {
    expect(nonConductive("fiberglass_frp_non_conduct")).toBe(true);
  });
  it("aluminum is conductive", () => {
    expect(nonConductive("aluminum_walk_board")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("steel for heavy", () => {
    expect(forHeavy("steel_metal_deck_plank")).toBe(true);
  });
  it("timber not for heavy", () => {
    expect(forHeavy("timber_solid_sawn_plank")).toBe(false);
  });
});

describe("material", () => {
  it("lvl uses laminated veneer", () => {
    expect(material("laminated_veneer_lvl_engineered")).toBe("laminated_veneer_lumber_osha_stamp");
  });
});

describe("bestUse", () => {
  it("fiberglass for electrical work", () => {
    expect(bestUse("fiberglass_frp_non_conduct")).toBe("electrical_utility_substation_work");
  });
});

describe("scaffoldPlankTypes", () => {
  it("returns 5 types", () => {
    expect(scaffoldPlankTypes()).toHaveLength(5);
  });
});
