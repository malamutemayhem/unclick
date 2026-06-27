import { describe, it, expect } from "vitest";
import {
  quality, uniformity, throughput, energyUse,
  fzCost, continuous, forPharma, condenser,
  bestUse, freezeDryerTypes,
} from "../freeze-dryer-calc.js";

describe("quality", () => {
  it("shelf batch highest quality", () => {
    expect(quality("shelf_batch_pharma")).toBeGreaterThan(quality("rotary_freeze_bulk"));
  });
});

describe("uniformity", () => {
  it("shelf batch most uniform", () => {
    expect(uniformity("shelf_batch_pharma")).toBeGreaterThan(uniformity("manifold_lab_small"));
  });
});

describe("throughput", () => {
  it("continuous tunnel highest throughput", () => {
    expect(throughput("continuous_tunnel")).toBeGreaterThan(throughput("manifold_lab_small"));
  });
});

describe("energyUse", () => {
  it("continuous tunnel highest energy use", () => {
    expect(energyUse("continuous_tunnel")).toBeGreaterThan(energyUse("atmospheric_spray_freeze"));
  });
});

describe("fzCost", () => {
  it("continuous tunnel most expensive", () => {
    expect(fzCost("continuous_tunnel")).toBeGreaterThan(fzCost("manifold_lab_small"));
  });
});

describe("continuous", () => {
  it("continuous tunnel is continuous", () => {
    expect(continuous("continuous_tunnel")).toBe(true);
  });
  it("shelf batch not continuous", () => {
    expect(continuous("shelf_batch_pharma")).toBe(false);
  });
});

describe("forPharma", () => {
  it("shelf batch for pharma", () => {
    expect(forPharma("shelf_batch_pharma")).toBe(true);
  });
  it("rotary freeze not for pharma", () => {
    expect(forPharma("rotary_freeze_bulk")).toBe(false);
  });
});

describe("condenser", () => {
  it("manifold uses external flask", () => {
    expect(condenser("manifold_lab_small")).toBe("external_manifold_flask_lab_bench_top");
  });
});

describe("bestUse", () => {
  it("shelf batch for pharma vaccine", () => {
    expect(bestUse("shelf_batch_pharma")).toBe("pharma_vaccine_injectable_gmp_validated");
  });
});

describe("freezeDryerTypes", () => {
  it("returns 5 types", () => {
    expect(freezeDryerTypes()).toHaveLength(5);
  });
});
