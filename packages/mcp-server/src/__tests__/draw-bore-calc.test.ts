import { describe, it, expect } from "vitest";
import {
  pullForce, jointTight, alignEase, durability,
  boreCost, reusable, forMarine, pinMaterial,
  bestUse, drawBores,
} from "../draw-bore-calc.js";

describe("pullForce", () => {
  it("offset drift pull strongest pull force", () => {
    expect(pullForce("offset_drift_pull")).toBeGreaterThan(pullForce("hardwood_peg_traditional"));
  });
});

describe("jointTight", () => {
  it("offset drift pull tightest joint", () => {
    expect(jointTight("offset_drift_pull")).toBeGreaterThan(jointTight("steel_dowel_modern"));
  });
});

describe("alignEase", () => {
  it("steel dowel modern easiest alignment", () => {
    expect(alignEase("steel_dowel_modern")).toBeGreaterThan(alignEase("hardwood_peg_traditional"));
  });
});

describe("durability", () => {
  it("steel dowel modern most durable", () => {
    expect(durability("steel_dowel_modern")).toBeGreaterThan(durability("hardwood_peg_traditional"));
  });
});

describe("boreCost", () => {
  it("bronze pin marine most expensive", () => {
    expect(boreCost("bronze_pin_marine")).toBeGreaterThan(boreCost("hardwood_peg_traditional"));
  });
});

describe("reusable", () => {
  it("offset drift pull is reusable", () => {
    expect(reusable("offset_drift_pull")).toBe(true);
  });
  it("tapered pin standard not reusable", () => {
    expect(reusable("tapered_pin_standard")).toBe(false);
  });
});

describe("forMarine", () => {
  it("bronze pin marine is for marine", () => {
    expect(forMarine("bronze_pin_marine")).toBe(true);
  });
  it("steel dowel modern not for marine", () => {
    expect(forMarine("steel_dowel_modern")).toBe(false);
  });
});

describe("pinMaterial", () => {
  it("bronze pin marine uses silicon bronze pin", () => {
    expect(pinMaterial("bronze_pin_marine")).toBe("silicon_bronze_pin");
  });
});

describe("bestUse", () => {
  it("offset drift pull best for heavy beam pull", () => {
    expect(bestUse("offset_drift_pull")).toBe("heavy_beam_pull");
  });
});

describe("drawBores", () => {
  it("returns 5 types", () => {
    expect(drawBores()).toHaveLength(5);
  });
});
