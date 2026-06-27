import { describe, it, expect } from "vitest";
import {
  maxTemp, throughput, uniformity, gasControl,
  tfCost, multiZone, forCvd, furnaceConfig,
  bestUse, tubeFurnaceTypes,
} from "../tube-furnace-calc.js";

describe("maxTemp", () => {
  it("vertical tube best max temp", () => {
    expect(maxTemp("vertical_tube")).toBeGreaterThan(maxTemp("single_zone_tube"));
  });
});

describe("throughput", () => {
  it("rotary tube highest throughput", () => {
    expect(throughput("rotary_tube")).toBeGreaterThan(throughput("vertical_tube"));
  });
});

describe("uniformity", () => {
  it("multi zone best uniformity", () => {
    expect(uniformity("multi_zone_tube")).toBeGreaterThan(uniformity("single_zone_tube"));
  });
});

describe("gasControl", () => {
  it("multi zone best gas control", () => {
    expect(gasControl("multi_zone_tube")).toBeGreaterThan(gasControl("single_zone_tube"));
  });
});

describe("tfCost", () => {
  it("rotary tube most expensive", () => {
    expect(tfCost("rotary_tube")).toBeGreaterThan(tfCost("single_zone_tube"));
  });
});

describe("multiZone", () => {
  it("multi zone is multi zone", () => {
    expect(multiZone("multi_zone_tube")).toBe(true);
  });
  it("single zone not multi zone", () => {
    expect(multiZone("single_zone_tube")).toBe(false);
  });
});

describe("forCvd", () => {
  it("multi zone for cvd", () => {
    expect(forCvd("multi_zone_tube")).toBe(true);
  });
  it("rotary tube not for cvd", () => {
    expect(forCvd("rotary_tube")).toBe(false);
  });
});

describe("furnaceConfig", () => {
  it("rotary uses rotating tube powder calcine continuous", () => {
    expect(furnaceConfig("rotary_tube")).toBe("rotary_tube_furnace_rotating_tube_powder_calcine_continuous");
  });
});

describe("bestUse", () => {
  it("split hinge for quick load clamshell rapid access", () => {
    expect(bestUse("split_hinge_tube")).toBe("quick_load_split_hinge_tube_furnace_clamshell_rapid_access");
  });
});

describe("tubeFurnaceTypes", () => {
  it("returns 5 types", () => {
    expect(tubeFurnaceTypes()).toHaveLength(5);
  });
});
