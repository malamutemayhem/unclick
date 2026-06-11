import { describe, it, expect } from "vitest";
import {
  dryingUniformity, throughput, productQuality, energyEfficiency,
  lyCost, continuous, forInjectable, lyophConfig,
  bestUse, lyophilizerTypes,
} from "../lyophilizer-calc.js";

describe("dryingUniformity", () => {
  it("shelf batch best drying uniformity", () => {
    expect(dryingUniformity("shelf_batch")).toBeGreaterThan(dryingUniformity("manifold_flask"));
  });
});

describe("throughput", () => {
  it("continuous belt highest throughput", () => {
    expect(throughput("continuous_belt")).toBeGreaterThan(throughput("rotary_freeze"));
  });
});

describe("productQuality", () => {
  it("shelf batch best product quality", () => {
    expect(productQuality("shelf_batch")).toBeGreaterThanOrEqual(productQuality("spray_freeze"));
  });
});

describe("energyEfficiency", () => {
  it("continuous belt best energy efficiency", () => {
    expect(energyEfficiency("continuous_belt")).toBeGreaterThan(energyEfficiency("manifold_flask"));
  });
});

describe("lyCost", () => {
  it("continuous belt most expensive", () => {
    expect(lyCost("continuous_belt")).toBeGreaterThan(lyCost("manifold_flask"));
  });
});

describe("continuous", () => {
  it("spray freeze is continuous", () => {
    expect(continuous("spray_freeze")).toBe(true);
  });
  it("shelf batch not continuous", () => {
    expect(continuous("shelf_batch")).toBe(false);
  });
});

describe("forInjectable", () => {
  it("shelf batch for injectable", () => {
    expect(forInjectable("shelf_batch")).toBe(true);
  });
  it("manifold flask not for injectable", () => {
    expect(forInjectable("manifold_flask")).toBe(false);
  });
});

describe("lyophConfig", () => {
  it("rotary freeze uses rotating flask shell freeze sublime", () => {
    expect(lyophConfig("rotary_freeze")).toBe("rotary_freeze_lyophilizer_rotating_flask_shell_freeze_sublime");
  });
});

describe("bestUse", () => {
  it("continuous belt for food industry high volume fruit meal", () => {
    expect(bestUse("continuous_belt")).toBe("food_industry_continuous_belt_lyophilizer_high_volume_fruit_meal");
  });
});

describe("lyophilizerTypes", () => {
  it("returns 5 types", () => {
    expect(lyophilizerTypes()).toHaveLength(5);
  });
});
