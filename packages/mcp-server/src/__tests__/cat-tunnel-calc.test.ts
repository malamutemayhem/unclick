import { describe, it, expect } from "vitest";
import {
  playValue, durability, storageEase, catInterest,
  tunnelCost, hasCrinkle, multiEntrance, tunnelMaterial,
  bestCat, catTunnels,
} from "../cat-tunnel-calc.js";

describe("playValue", () => {
  it("s curve multi way most play value", () => {
    expect(playValue("s_curve_multi_way")).toBeGreaterThan(playValue("natural_felt_wool"));
  });
});

describe("durability", () => {
  it("outdoor agility tube most durable", () => {
    expect(durability("outdoor_agility_tube")).toBeGreaterThan(durability("natural_felt_wool"));
  });
});

describe("storageEase", () => {
  it("crinkle collapsible nylon easiest storage", () => {
    expect(storageEase("crinkle_collapsible_nylon")).toBeGreaterThan(storageEase("outdoor_agility_tube"));
  });
});

describe("catInterest", () => {
  it("s curve multi way highest cat interest", () => {
    expect(catInterest("s_curve_multi_way")).toBeGreaterThan(catInterest("outdoor_agility_tube"));
  });
});

describe("tunnelCost", () => {
  it("outdoor agility tube most expensive", () => {
    expect(tunnelCost("outdoor_agility_tube")).toBeGreaterThan(tunnelCost("crinkle_collapsible_nylon"));
  });
});

describe("hasCrinkle", () => {
  it("crinkle collapsible nylon has crinkle", () => {
    expect(hasCrinkle("crinkle_collapsible_nylon")).toBe(true);
  });
  it("natural felt wool has no crinkle", () => {
    expect(hasCrinkle("natural_felt_wool")).toBe(false);
  });
});

describe("multiEntrance", () => {
  it("s curve multi way has multi entrance", () => {
    expect(multiEntrance("s_curve_multi_way")).toBe(true);
  });
  it("crinkle collapsible nylon has no multi entrance", () => {
    expect(multiEntrance("crinkle_collapsible_nylon")).toBe(false);
  });
});

describe("tunnelMaterial", () => {
  it("outdoor agility tube uses pvc coated canvas", () => {
    expect(tunnelMaterial("outdoor_agility_tube")).toBe("pvc_coated_canvas");
  });
});

describe("bestCat", () => {
  it("s curve multi way best for multi cat household", () => {
    expect(bestCat("s_curve_multi_way")).toBe("multi_cat_household");
  });
});

describe("catTunnels", () => {
  it("returns 5 types", () => {
    expect(catTunnels()).toHaveLength(5);
  });
});
