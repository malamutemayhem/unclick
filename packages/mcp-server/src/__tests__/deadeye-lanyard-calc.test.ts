import { describe, it, expect } from "vitest";
import {
  loadCapacity, frictionLow, weatherResist, adjustEase,
  deadeyeCost, wooden, forRacing, bodyMaterial,
  bestUse, deadeyeLanyards,
} from "../deadeye-lanyard-calc.js";

describe("loadCapacity", () => {
  it("stainless machined race highest load capacity", () => {
    expect(loadCapacity("stainless_machined_race")).toBeGreaterThan(loadCapacity("elm_heart_traditional"));
  });
});

describe("frictionLow", () => {
  it("stainless machined race lowest friction", () => {
    expect(frictionLow("stainless_machined_race")).toBeGreaterThan(frictionLow("elm_heart_traditional"));
  });
});

describe("weatherResist", () => {
  it("stainless machined race best weather resist", () => {
    expect(weatherResist("stainless_machined_race")).toBeGreaterThan(weatherResist("elm_heart_traditional"));
  });
});

describe("adjustEase", () => {
  it("synthetic block light easiest to adjust", () => {
    expect(adjustEase("synthetic_block_light")).toBeGreaterThan(adjustEase("lignum_vitae_round"));
  });
});

describe("deadeyeCost", () => {
  it("stainless machined race most expensive", () => {
    expect(deadeyeCost("stainless_machined_race")).toBeGreaterThan(deadeyeCost("elm_heart_traditional"));
  });
});

describe("wooden", () => {
  it("lignum vitae round is wooden", () => {
    expect(wooden("lignum_vitae_round")).toBe(true);
  });
  it("bronze cast modern not wooden", () => {
    expect(wooden("bronze_cast_modern")).toBe(false);
  });
});

describe("forRacing", () => {
  it("stainless machined race is for racing", () => {
    expect(forRacing("stainless_machined_race")).toBe(true);
  });
  it("lignum vitae round not for racing", () => {
    expect(forRacing("lignum_vitae_round")).toBe(false);
  });
});

describe("bodyMaterial", () => {
  it("bronze cast modern uses bronze cast alloy", () => {
    expect(bodyMaterial("bronze_cast_modern")).toBe("bronze_cast_alloy");
  });
});

describe("bestUse", () => {
  it("stainless machined race best for race yacht rig", () => {
    expect(bestUse("stainless_machined_race")).toBe("race_yacht_rig");
  });
});

describe("deadeyeLanyards", () => {
  it("returns 5 types", () => {
    expect(deadeyeLanyards()).toHaveLength(5);
  });
});
