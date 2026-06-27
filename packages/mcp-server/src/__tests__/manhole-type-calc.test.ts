import { describe, it, expect } from "vitest";
import {
  capacity, durability, weight, watertight,
  mhCost, corrosionResist, forSanitary, cover,
  bestUse, manholeTypeTypes,
} from "../manhole-type-calc.js";

describe("capacity", () => {
  it("precast concrete largest", () => {
    expect(capacity("precast_concrete_round")).toBeGreaterThan(capacity("fiberglass_frp_light"));
  });
});

describe("durability", () => {
  it("polymer concrete most durable", () => {
    expect(durability("polymer_concrete_corrosion")).toBeGreaterThan(durability("brick_masonry_traditional"));
  });
});

describe("weight", () => {
  it("fiberglass lightest (highest score)", () => {
    expect(weight("fiberglass_frp_light")).toBeGreaterThan(weight("precast_concrete_round"));
  });
});

describe("watertight", () => {
  it("hdpe most watertight", () => {
    expect(watertight("hdpe_watertight_sealed")).toBeGreaterThan(watertight("brick_masonry_traditional"));
  });
});

describe("mhCost", () => {
  it("polymer concrete most expensive", () => {
    expect(mhCost("polymer_concrete_corrosion")).toBeGreaterThan(mhCost("precast_concrete_round"));
  });
});

describe("corrosionResist", () => {
  it("polymer concrete corrosion resistant", () => {
    expect(corrosionResist("polymer_concrete_corrosion")).toBe(true);
  });
  it("precast concrete not corrosion resistant", () => {
    expect(corrosionResist("precast_concrete_round")).toBe(false);
  });
});

describe("forSanitary", () => {
  it("all types for sanitary", () => {
    expect(forSanitary("precast_concrete_round")).toBe(true);
  });
});

describe("cover", () => {
  it("fiberglass uses frp composite", () => {
    expect(cover("fiberglass_frp_light")).toBe("frp_composite_locking_lid");
  });
});

describe("bestUse", () => {
  it("hdpe for vacuum sewer", () => {
    expect(bestUse("hdpe_watertight_sealed")).toBe("vacuum_sewer_low_pressure");
  });
});

describe("manholeTypeTypes", () => {
  it("returns 5 types", () => {
    expect(manholeTypeTypes()).toHaveLength(5);
  });
});
