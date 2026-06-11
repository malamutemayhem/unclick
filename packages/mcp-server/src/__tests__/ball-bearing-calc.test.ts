import { describe, it, expect } from "vitest";
import {
  loadCapacity, speedLimit, misalignment, precision,
  bbCost, sealable, forHighSpeed, config,
  bestUse, ballBearingTypes,
} from "../ball-bearing-calc.js";

describe("loadCapacity", () => {
  it("angular contact double highest load", () => {
    expect(loadCapacity("angular_contact_double")).toBeGreaterThan(loadCapacity("miniature_precision"));
  });
});

describe("speedLimit", () => {
  it("miniature precision highest speed", () => {
    expect(speedLimit("miniature_precision")).toBeGreaterThan(speedLimit("angular_contact_double"));
  });
});

describe("misalignment", () => {
  it("self aligning best misalignment tolerance", () => {
    expect(misalignment("self_aligning_ball")).toBeGreaterThan(misalignment("angular_contact_single"));
  });
});

describe("precision", () => {
  it("miniature precision highest precision", () => {
    expect(precision("miniature_precision")).toBeGreaterThan(precision("self_aligning_ball"));
  });
});

describe("bbCost", () => {
  it("miniature precision most expensive", () => {
    expect(bbCost("miniature_precision")).toBeGreaterThan(bbCost("deep_groove_standard"));
  });
});

describe("sealable", () => {
  it("deep groove is sealable", () => {
    expect(sealable("deep_groove_standard")).toBe(true);
  });
  it("angular contact single not sealable", () => {
    expect(sealable("angular_contact_single")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("deep groove for high speed", () => {
    expect(forHighSpeed("deep_groove_standard")).toBe(true);
  });
  it("self aligning not for high speed", () => {
    expect(forHighSpeed("self_aligning_ball")).toBe(false);
  });
});

describe("config", () => {
  it("self aligning uses spherical outer race", () => {
    expect(config("self_aligning_ball")).toBe("double_row_spherical_outer_race_self_align");
  });
});

describe("bestUse", () => {
  it("miniature for dental handpiece", () => {
    expect(bestUse("miniature_precision")).toBe("dental_handpiece_instrument_spindle_micro");
  });
});

describe("ballBearingTypes", () => {
  it("returns 5 types", () => {
    expect(ballBearingTypes()).toHaveLength(5);
  });
});
