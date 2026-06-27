import { describe, it, expect } from "vitest";
import {
  iceClarity, productionSpeed, iceShape, storageCapacity,
  makerCost, selfCleaning, plumbingRequired, iceType,
  bestSetup, iceMakers,
} from "../ice-maker-calc.js";

describe("iceClarity", () => {
  it("undercounter clear clearest ice", () => {
    expect(iceClarity("undercounter_clear")).toBeGreaterThan(iceClarity("commercial_flake"));
  });
});

describe("productionSpeed", () => {
  it("commercial flake fastest production", () => {
    expect(productionSpeed("commercial_flake")).toBeGreaterThan(productionSpeed("freezer_tray_mold"));
  });
});

describe("iceShape", () => {
  it("freezer tray mold most shape variety", () => {
    expect(iceShape("freezer_tray_mold")).toBeGreaterThan(iceShape("commercial_flake"));
  });
});

describe("storageCapacity", () => {
  it("commercial flake largest storage", () => {
    expect(storageCapacity("commercial_flake")).toBeGreaterThan(storageCapacity("freezer_tray_mold"));
  });
});

describe("makerCost", () => {
  it("commercial flake most expensive", () => {
    expect(makerCost("commercial_flake")).toBeGreaterThan(makerCost("freezer_tray_mold"));
  });
});

describe("selfCleaning", () => {
  it("countertop bullet is self cleaning", () => {
    expect(selfCleaning("countertop_bullet")).toBe(true);
  });
  it("freezer tray mold is not", () => {
    expect(selfCleaning("freezer_tray_mold")).toBe(false);
  });
});

describe("plumbingRequired", () => {
  it("undercounter clear requires plumbing", () => {
    expect(plumbingRequired("undercounter_clear")).toBe(true);
  });
  it("countertop bullet does not", () => {
    expect(plumbingRequired("countertop_bullet")).toBe(false);
  });
});

describe("iceType", () => {
  it("portable nugget uses chewable sonic nugget", () => {
    expect(iceType("portable_nugget")).toBe("chewable_sonic_nugget");
  });
});

describe("bestSetup", () => {
  it("freezer tray mold for craft cocktail sphere", () => {
    expect(bestSetup("freezer_tray_mold")).toBe("craft_cocktail_sphere");
  });
});

describe("iceMakers", () => {
  it("returns 5 types", () => {
    expect(iceMakers()).toHaveLength(5);
  });
});
