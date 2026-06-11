import { describe, it, expect } from "vitest";
import {
  portCapacity, installEase, durability, appearance,
  plateCost, modular, forOutdoor, material,
  bestUse, wallPlates,
} from "../wall-plate-calc.js";

describe("portCapacity", () => {
  it("double gang multi highest port capacity", () => {
    expect(portCapacity("double_gang_multi")).toBeGreaterThan(portCapacity("weatherproof_outdoor"));
  });
});

describe("installEase", () => {
  it("decorator style snap easiest install", () => {
    expect(installEase("decorator_style_snap")).toBeGreaterThan(installEase("weatherproof_outdoor"));
  });
});

describe("durability", () => {
  it("stainless industrial most durable", () => {
    expect(durability("stainless_industrial")).toBeGreaterThan(durability("decorator_style_snap"));
  });
});

describe("appearance", () => {
  it("decorator style best appearance", () => {
    expect(appearance("decorator_style_snap")).toBeGreaterThan(appearance("weatherproof_outdoor"));
  });
});

describe("plateCost", () => {
  it("weatherproof outdoor most expensive", () => {
    expect(plateCost("weatherproof_outdoor")).toBeGreaterThan(plateCost("single_gang_keystone"));
  });
});

describe("modular", () => {
  it("single gang keystone is modular", () => {
    expect(modular("single_gang_keystone")).toBe(true);
  });
  it("decorator style not modular", () => {
    expect(modular("decorator_style_snap")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("weatherproof outdoor is for outdoor", () => {
    expect(forOutdoor("weatherproof_outdoor")).toBe(true);
  });
  it("single gang keystone not for outdoor", () => {
    expect(forOutdoor("single_gang_keystone")).toBe(false);
  });
});

describe("material", () => {
  it("stainless industrial uses stainless steel 304", () => {
    expect(material("stainless_industrial")).toBe("stainless_steel_304");
  });
});

describe("bestUse", () => {
  it("double gang multi best for office high density", () => {
    expect(bestUse("double_gang_multi")).toBe("office_high_density");
  });
});

describe("wallPlates", () => {
  it("returns 5 types", () => {
    expect(wallPlates()).toHaveLength(5);
  });
});
