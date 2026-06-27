import { describe, it, expect } from "vitest";
import {
  grindFineness, capacity, uniformity, mediaLife,
  rmCost, wetGrind, forCoarse, media,
  bestUse, rodMillTypes,
} from "../rod-mill-calc.js";

describe("grindFineness", () => {
  it("dry rod finest grind", () => {
    expect(grindFineness("dry_rod_air_swept")).toBeGreaterThan(grindFineness("autogenous_rod_sag"));
  });
});

describe("capacity", () => {
  it("autogenous sag highest capacity", () => {
    expect(capacity("autogenous_rod_sag")).toBeGreaterThan(capacity("dry_rod_air_swept"));
  });
});

describe("uniformity", () => {
  it("overflow rod best uniformity", () => {
    expect(uniformity("overflow_rod_wet")).toBeGreaterThan(uniformity("autogenous_rod_sag"));
  });
});

describe("mediaLife", () => {
  it("autogenous sag longest media life", () => {
    expect(mediaLife("autogenous_rod_sag")).toBeGreaterThan(mediaLife("dry_rod_air_swept"));
  });
});

describe("rmCost", () => {
  it("autogenous sag most expensive", () => {
    expect(rmCost("autogenous_rod_sag")).toBeGreaterThan(rmCost("overflow_rod_wet"));
  });
});

describe("wetGrind", () => {
  it("overflow rod is wet grind", () => {
    expect(wetGrind("overflow_rod_wet")).toBe(true);
  });
  it("dry rod not wet grind", () => {
    expect(wetGrind("dry_rod_air_swept")).toBe(false);
  });
});

describe("forCoarse", () => {
  it("overflow rod for coarse grind", () => {
    expect(forCoarse("overflow_rod_wet")).toBe(true);
  });
  it("end peripheral not for coarse", () => {
    expect(forCoarse("end_peripheral_discharge")).toBe(false);
  });
});

describe("media", () => {
  it("autogenous sag uses ore plus rod", () => {
    expect(media("autogenous_rod_sag")).toBe("ore_itself_plus_rod_semi_autogenous");
  });
});

describe("bestUse", () => {
  it("autogenous sag for large mine", () => {
    expect(bestUse("autogenous_rod_sag")).toBe("large_mine_primary_grind_sag_circuit");
  });
});

describe("rodMillTypes", () => {
  it("returns 5 types", () => {
    expect(rodMillTypes()).toHaveLength(5);
  });
});
