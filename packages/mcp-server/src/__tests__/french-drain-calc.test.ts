import { describe, it, expect } from "vitest";
import {
  drainage, longevity, installEase, depth,
  fdCost, fabricWrapped, forFoundation, pipe,
  bestUse, frenchDrainTypes,
} from "../french-drain-calc.js";

describe("drainage", () => {
  it("interior footing best drainage", () => {
    expect(drainage("interior_footing_drain")).toBeGreaterThan(drainage("ez_drain_no_gravel"));
  });
});

describe("longevity", () => {
  it("interior footing longest lasting", () => {
    expect(longevity("interior_footing_drain")).toBeGreaterThan(longevity("ez_drain_no_gravel"));
  });
});

describe("installEase", () => {
  it("ez drain easiest install", () => {
    expect(installEase("ez_drain_no_gravel")).toBeGreaterThan(installEase("interior_footing_drain"));
  });
});

describe("depth", () => {
  it("interior footing deepest", () => {
    expect(depth("interior_footing_drain")).toBeGreaterThan(depth("ez_drain_no_gravel"));
  });
});

describe("fdCost", () => {
  it("interior footing most expensive", () => {
    expect(fdCost("interior_footing_drain")).toBeGreaterThan(fdCost("traditional_gravel_trench"));
  });
});

describe("fabricWrapped", () => {
  it("traditional is fabric wrapped", () => {
    expect(fabricWrapped("traditional_gravel_trench")).toBe(true);
  });
  it("interior footing not fabric wrapped", () => {
    expect(fabricWrapped("interior_footing_drain")).toBe(false);
  });
});

describe("forFoundation", () => {
  it("perforated pipe for foundation", () => {
    expect(forFoundation("perforated_pipe_fabric")).toBe(true);
  });
  it("ez drain not for foundation", () => {
    expect(forFoundation("ez_drain_no_gravel")).toBe(false);
  });
});

describe("pipe", () => {
  it("ez drain uses styrofoam wrap", () => {
    expect(pipe("ez_drain_no_gravel")).toBe("styrofoam_aggregate_wrap_pipe");
  });
});

describe("bestUse", () => {
  it("curtain drain for hillside", () => {
    expect(bestUse("curtain_drain_hillside")).toBe("hillside_water_intercept_divert");
  });
});

describe("frenchDrainTypes", () => {
  it("returns 5 types", () => {
    expect(frenchDrainTypes()).toHaveLength(5);
  });
});
