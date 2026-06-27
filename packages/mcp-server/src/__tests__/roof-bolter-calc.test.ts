import { describe, it, expect } from "vitest";
import {
  boltSpeed, drillAccuracy, reachHeight, safetyRating,
  rbCost_, automated, forLonghole, bolterConfig,
  bestUse, roofBolterTypes,
} from "../roof-bolter-calc.js";

describe("boltSpeed", () => {
  it("continuous bolter fastest bolt speed", () => {
    expect(boltSpeed("continuous_bolter")).toBeGreaterThan(boltSpeed("cable_bolt_rig"));
  });
});

describe("drillAccuracy", () => {
  it("dual boom auto best drill accuracy", () => {
    expect(drillAccuracy("dual_boom_auto")).toBeGreaterThan(drillAccuracy("single_boom_manual"));
  });
});

describe("reachHeight", () => {
  it("cable bolt rig highest reach", () => {
    expect(reachHeight("cable_bolt_rig")).toBeGreaterThan(reachHeight("single_boom_manual"));
  });
});

describe("safetyRating", () => {
  it("continuous bolter best safety rating", () => {
    expect(safetyRating("continuous_bolter")).toBeGreaterThan(safetyRating("single_boom_manual"));
  });
});

describe("rbCost_", () => {
  it("continuous bolter most expensive", () => {
    expect(rbCost_("continuous_bolter")).toBeGreaterThan(rbCost_("single_boom_manual"));
  });
});

describe("automated", () => {
  it("dual boom auto is automated", () => {
    expect(automated("dual_boom_auto")).toBe(true);
  });
  it("single boom manual not automated", () => {
    expect(automated("single_boom_manual")).toBe(false);
  });
});

describe("forLonghole", () => {
  it("cable bolt rig for longhole", () => {
    expect(forLonghole("cable_bolt_rig")).toBe(true);
  });
  it("dual boom auto not for longhole", () => {
    expect(forLonghole("dual_boom_auto")).toBe(false);
  });
});

describe("bolterConfig", () => {
  it("resin cartridge uses spin to mix fast set", () => {
    expect(bolterConfig("resin_cartridge")).toBe("resin_cartridge_spin_to_mix_fast_set_full_column_anchor_bolt");
  });
});

describe("bestUse", () => {
  it("cable bolt rig for high stress ground", () => {
    expect(bestUse("cable_bolt_rig")).toBe("high_stress_ground_cable_bolt_deep_anchor_intersection_support");
  });
});

describe("roofBolterTypes", () => {
  it("returns 5 types", () => {
    expect(roofBolterTypes()).toHaveLength(5);
  });
});
