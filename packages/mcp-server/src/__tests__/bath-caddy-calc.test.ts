import { describe, it, expect } from "vitest";
import {
  holdCapacity, waterResist, aesthetics, installEase,
  caddyCost, noDrilling, adjustable, frameMaterial,
  bestSetup, bathCaddies,
} from "../bath-caddy-calc.js";

describe("holdCapacity", () => {
  it("freestanding floor tower most capacity", () => {
    expect(holdCapacity("freestanding_floor_tower")).toBeGreaterThan(holdCapacity("corner_suction_basket"));
  });
});

describe("waterResist", () => {
  it("freestanding floor tower best water resistance", () => {
    expect(waterResist("freestanding_floor_tower")).toBeGreaterThan(waterResist("bamboo_bridge_tray"));
  });
});

describe("aesthetics", () => {
  it("bamboo bridge tray best aesthetics", () => {
    expect(aesthetics("bamboo_bridge_tray")).toBeGreaterThan(aesthetics("corner_suction_basket"));
  });
});

describe("installEase", () => {
  it("bamboo bridge tray easiest install", () => {
    expect(installEase("bamboo_bridge_tray")).toBeGreaterThan(installEase("corner_suction_basket"));
  });
});

describe("caddyCost", () => {
  it("freestanding floor tower most expensive", () => {
    expect(caddyCost("freestanding_floor_tower")).toBeGreaterThan(caddyCost("corner_suction_basket"));
  });
});

describe("noDrilling", () => {
  it("all types need no drilling", () => {
    expect(noDrilling("bamboo_bridge_tray")).toBe(true);
    expect(noDrilling("corner_suction_basket")).toBe(true);
  });
});

describe("adjustable", () => {
  it("expandable metal rack is adjustable", () => {
    expect(adjustable("expandable_metal_rack")).toBe(true);
  });
  it("corner suction basket is not", () => {
    expect(adjustable("corner_suction_basket")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("bamboo bridge tray uses treated bamboo slat", () => {
    expect(frameMaterial("bamboo_bridge_tray")).toBe("treated_bamboo_slat");
  });
});

describe("bestSetup", () => {
  it("bamboo bridge tray best for soaking tub relax read", () => {
    expect(bestSetup("bamboo_bridge_tray")).toBe("soaking_tub_relax_read");
  });
});

describe("bathCaddies", () => {
  it("returns 5 types", () => {
    expect(bathCaddies()).toHaveLength(5);
  });
});
