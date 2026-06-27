import { describe, it, expect } from "vitest";
import {
  separationAccuracy, throughput, recoveryRate, waterUsage,
  gsCost, continuous, forFinePart, separatorConfig,
  bestUse, gravitySeparatorTypes,
} from "../gravity-separator-calc.js";

describe("separationAccuracy", () => {
  it("shaking table best separation accuracy", () => {
    expect(separationAccuracy("shaking_table")).toBeGreaterThan(separationAccuracy("spiral_concentrator"));
  });
});

describe("throughput", () => {
  it("dense media highest throughput", () => {
    expect(throughput("dense_media")).toBeGreaterThan(throughput("shaking_table"));
  });
});

describe("recoveryRate", () => {
  it("centrifugal bowl best recovery rate", () => {
    expect(recoveryRate("centrifugal_bowl")).toBeGreaterThan(recoveryRate("spiral_concentrator"));
  });
});

describe("waterUsage", () => {
  it("jig separator more water than centrifugal bowl", () => {
    expect(waterUsage("jig_separator")).toBeGreaterThan(waterUsage("centrifugal_bowl"));
  });
});

describe("gsCost", () => {
  it("dense media most expensive", () => {
    expect(gsCost("dense_media")).toBeGreaterThan(gsCost("shaking_table"));
  });
});

describe("continuous", () => {
  it("spiral concentrator is continuous", () => {
    expect(continuous("spiral_concentrator")).toBe(true);
  });
  it("centrifugal bowl not continuous", () => {
    expect(continuous("centrifugal_bowl")).toBe(false);
  });
});

describe("forFinePart", () => {
  it("shaking table for fine particles", () => {
    expect(forFinePart("shaking_table")).toBe(true);
  });
  it("jig separator not for fine particles", () => {
    expect(forFinePart("jig_separator")).toBe(false);
  });
});

describe("separatorConfig", () => {
  it("dense media uses ferrosilicon slurry sink float split", () => {
    expect(separatorConfig("dense_media")).toBe("dense_media_separator_ferrosilicon_slurry_sink_float_split");
  });
});

describe("bestUse", () => {
  it("centrifugal bowl for fine gold recovery knelson falcon concentrate", () => {
    expect(bestUse("centrifugal_bowl")).toBe("fine_gold_recovery_centrifugal_bowl_knelson_falcon_concentrate");
  });
});

describe("gravitySeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(gravitySeparatorTypes()).toHaveLength(5);
  });
});
