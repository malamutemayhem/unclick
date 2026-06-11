import { describe, it, expect } from "vitest";
import {
  wallUniformity, throughput, diameterRange, surfaceFinish,
  peCost, multilayer, forPressure, extruderConfig,
  bestUse, pipeExtruderTypes,
} from "../pipe-extruder-calc.js";

describe("wallUniformity", () => {
  it("twin screw best wall uniformity", () => {
    expect(wallUniformity("twin_screw")).toBeGreaterThan(wallUniformity("corrugated_pipe"));
  });
});

describe("throughput", () => {
  it("corrugated pipe highest throughput", () => {
    expect(throughput("corrugated_pipe")).toBeGreaterThan(throughput("large_diameter"));
  });
});

describe("diameterRange", () => {
  it("large diameter widest range", () => {
    expect(diameterRange("large_diameter")).toBeGreaterThan(diameterRange("twin_screw"));
  });
});

describe("surfaceFinish", () => {
  it("twin screw best surface finish", () => {
    expect(surfaceFinish("twin_screw")).toBeGreaterThan(surfaceFinish("corrugated_pipe"));
  });
});

describe("peCost", () => {
  it("large diameter most expensive", () => {
    expect(peCost("large_diameter")).toBeGreaterThan(peCost("single_screw"));
  });
});

describe("multilayer", () => {
  it("multi layer pipe is multilayer", () => {
    expect(multilayer("multi_layer_pipe")).toBe(true);
  });
  it("single screw not multilayer", () => {
    expect(multilayer("single_screw")).toBe(false);
  });
});

describe("forPressure", () => {
  it("single screw for pressure pipe", () => {
    expect(forPressure("single_screw")).toBe(true);
  });
  it("corrugated pipe not for pressure", () => {
    expect(forPressure("corrugated_pipe")).toBe(false);
  });
});

describe("extruderConfig", () => {
  it("corrugated pipe uses moving mold block profile", () => {
    expect(extruderConfig("corrugated_pipe")).toBe("corrugated_pipe_extruder_moving_mold_block_profile_corrugation");
  });
});

describe("bestUse", () => {
  it("large diameter for infrastructure water main sewer", () => {
    expect(bestUse("large_diameter")).toBe("infrastructure_large_diameter_pipe_extruder_water_main_sewer");
  });
});

describe("pipeExtruderTypes", () => {
  it("returns 5 types", () => {
    expect(pipeExtruderTypes()).toHaveLength(5);
  });
});
