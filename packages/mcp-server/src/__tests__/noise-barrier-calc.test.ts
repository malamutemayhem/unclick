import { describe, it, expect } from "vitest";
import {
  insertion, bandwidth, durability, aesthetic,
  nbCost, active, forOutdoor, material,
  bestUse, noiseBarrierTypes,
} from "../noise-barrier-calc.js";

describe("insertion", () => {
  it("active noise cancel best insertion loss", () => {
    expect(insertion("active_noise_cancel")).toBeGreaterThan(insertion("green_wall_vegetated"));
  });
});

describe("bandwidth", () => {
  it("active noise cancel widest bandwidth", () => {
    expect(bandwidth("active_noise_cancel")).toBeGreaterThan(bandwidth("green_wall_vegetated"));
  });
});

describe("durability", () => {
  it("perforated metal most durable", () => {
    expect(durability("perforated_metal_absorb")).toBeGreaterThan(durability("acoustic_foam_wedge"));
  });
});

describe("aesthetic", () => {
  it("green wall best aesthetic", () => {
    expect(aesthetic("green_wall_vegetated")).toBeGreaterThan(aesthetic("mass_loaded_vinyl"));
  });
});

describe("nbCost", () => {
  it("active noise cancel most expensive", () => {
    expect(nbCost("active_noise_cancel")).toBeGreaterThan(nbCost("acoustic_foam_wedge"));
  });
});

describe("active", () => {
  it("active noise cancel is active", () => {
    expect(active("active_noise_cancel")).toBe(true);
  });
  it("perforated metal not active", () => {
    expect(active("perforated_metal_absorb")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("perforated metal for outdoor", () => {
    expect(forOutdoor("perforated_metal_absorb")).toBe(true);
  });
  it("acoustic foam not for outdoor", () => {
    expect(forOutdoor("acoustic_foam_wedge")).toBe(false);
  });
});

describe("material", () => {
  it("green wall uses soil substrate vegetation", () => {
    expect(material("green_wall_vegetated")).toBe("soil_substrate_vegetation_frame");
  });
});

describe("bestUse", () => {
  it("active noise cancel for duct exhaust", () => {
    expect(bestUse("active_noise_cancel")).toBe("duct_exhaust_transformer_hum");
  });
});

describe("noiseBarrierTypes", () => {
  it("returns 5 types", () => {
    expect(noiseBarrierTypes()).toHaveLength(5);
  });
});
