import { describe, it, expect } from "vitest";
import {
  separation, gentleness, throughput, vacuumDepth,
  spCost, continuous, forThermLab, condenser,
  bestUse, shortPathTypes,
} from "../short-path-calc.js";

describe("separation", () => {
  it("centrifugal molecular best separation", () => {
    expect(separation("centrifugal_molecular")).toBeGreaterThan(separation("thin_film_degasser"));
  });
});

describe("gentleness", () => {
  it("centrifugal molecular gentlest", () => {
    expect(gentleness("centrifugal_molecular")).toBeGreaterThan(gentleness("falling_film_molecular"));
  });
});

describe("throughput", () => {
  it("falling film highest throughput", () => {
    expect(throughput("falling_film_molecular")).toBeGreaterThan(throughput("centrifugal_molecular"));
  });
});

describe("vacuumDepth", () => {
  it("centrifugal molecular deepest vacuum", () => {
    expect(vacuumDepth("centrifugal_molecular")).toBeGreaterThan(vacuumDepth("thin_film_degasser"));
  });
});

describe("spCost", () => {
  it("centrifugal molecular most expensive", () => {
    expect(spCost("centrifugal_molecular")).toBeGreaterThan(spCost("thin_film_degasser"));
  });
});

describe("continuous", () => {
  it("all short path types are continuous", () => {
    expect(continuous("wiped_film_evaporator")).toBe(true);
    expect(continuous("centrifugal_molecular")).toBe(true);
  });
});

describe("forThermLab", () => {
  it("wiped film for thermally labile", () => {
    expect(forThermLab("wiped_film_evaporator")).toBe(true);
  });
  it("falling film not for thermally labile", () => {
    expect(forThermLab("falling_film_molecular")).toBe(false);
  });
});

describe("condenser", () => {
  it("hybrid multi stage uses cascade", () => {
    expect(condenser("hybrid_multi_stage")).toBe("cascade_stage_internal_external_trap");
  });
});

describe("bestUse", () => {
  it("centrifugal molecular for ultra pure high mw", () => {
    expect(bestUse("centrifugal_molecular")).toBe("monomer_dimmer_ultra_pure_high_mw");
  });
});

describe("shortPathTypes", () => {
  it("returns 5 types", () => {
    expect(shortPathTypes()).toHaveLength(5);
  });
});
