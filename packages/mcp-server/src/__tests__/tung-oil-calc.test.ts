import { describe, it, expect } from "vitest";
import {
  penetration, waterResist, durability, drySpeed,
  oilCost, pure, tinted, cureMethod,
  bestUse, tungOils,
} from "../tung-oil-calc.js";

describe("penetration", () => {
  it("pure tung raw deepest penetration", () => {
    expect(penetration("pure_tung_raw")).toBeGreaterThan(penetration("tung_varnish_hard"));
  });
});

describe("waterResist", () => {
  it("tung varnish hard best water resist", () => {
    expect(waterResist("tung_varnish_hard")).toBeGreaterThan(waterResist("citrus_tung_blend"));
  });
});

describe("durability", () => {
  it("tung varnish hard most durable", () => {
    expect(durability("tung_varnish_hard")).toBeGreaterThan(durability("citrus_tung_blend"));
  });
});

describe("drySpeed", () => {
  it("polymerized tung fast fastest dry", () => {
    expect(drySpeed("polymerized_tung_fast")).toBeGreaterThan(drySpeed("pure_tung_raw"));
  });
});

describe("oilCost", () => {
  it("polymerized tung fast most expensive", () => {
    expect(oilCost("polymerized_tung_fast")).toBeGreaterThan(oilCost("citrus_tung_blend"));
  });
});

describe("pure", () => {
  it("pure tung raw is pure", () => {
    expect(pure("pure_tung_raw")).toBe(true);
  });
  it("polymerized tung fast not pure", () => {
    expect(pure("polymerized_tung_fast")).toBe(false);
  });
});

describe("tinted", () => {
  it("dark tung tinted is tinted", () => {
    expect(tinted("dark_tung_tinted")).toBe(true);
  });
  it("pure tung raw not tinted", () => {
    expect(tinted("pure_tung_raw")).toBe(false);
  });
});

describe("cureMethod", () => {
  it("citrus tung blend uses citrus solvent cure", () => {
    expect(cureMethod("citrus_tung_blend")).toBe("citrus_solvent_cure");
  });
});

describe("bestUse", () => {
  it("pure tung raw best for deep penetrate protect", () => {
    expect(bestUse("pure_tung_raw")).toBe("deep_penetrate_protect");
  });
});

describe("tungOils", () => {
  it("returns 5 types", () => {
    expect(tungOils()).toHaveLength(5);
  });
});
