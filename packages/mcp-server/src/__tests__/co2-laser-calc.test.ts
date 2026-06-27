import { describe, it, expect } from "vitest";
import {
  beamQuality, throughput, powerRange, wallPlugEfficiency,
  clCost, sealed, forCutting, laserConfig,
  bestUse, co2LaserTypes,
} from "../co2-laser-calc.js";

describe("beamQuality", () => {
  it("slab co2 best beam quality", () => {
    expect(beamQuality("slab_co2")).toBeGreaterThan(beamQuality("tea_co2"));
  });
});

describe("throughput", () => {
  it("flowing gas highest throughput", () => {
    expect(throughput("flowing_gas_co2")).toBeGreaterThan(throughput("tea_co2"));
  });
});

describe("powerRange", () => {
  it("flowing gas best power range", () => {
    expect(powerRange("flowing_gas_co2")).toBeGreaterThan(powerRange("sealed_tube_co2"));
  });
});

describe("wallPlugEfficiency", () => {
  it("rf excited best wall plug efficiency", () => {
    expect(wallPlugEfficiency("rf_excited_co2")).toBeGreaterThan(wallPlugEfficiency("tea_co2"));
  });
});

describe("clCost", () => {
  it("tea co2 most expensive", () => {
    expect(clCost("tea_co2")).toBeGreaterThan(clCost("sealed_tube_co2"));
  });
});

describe("sealed", () => {
  it("sealed tube is sealed", () => {
    expect(sealed("sealed_tube_co2")).toBe(true);
  });
  it("flowing gas not sealed", () => {
    expect(sealed("flowing_gas_co2")).toBe(false);
  });
});

describe("forCutting", () => {
  it("flowing gas for cutting", () => {
    expect(forCutting("flowing_gas_co2")).toBe(true);
  });
  it("tea co2 not for cutting", () => {
    expect(forCutting("tea_co2")).toBe(false);
  });
});

describe("laserConfig", () => {
  it("slab uses diffusion cooled waveguide excellent mode compact", () => {
    expect(laserConfig("slab_co2")).toBe("slab_co2_laser_diffusion_cooled_waveguide_excellent_mode_compact");
  });
});

describe("bestUse", () => {
  it("rf excited for packaging marking perforate score clean cut", () => {
    expect(bestUse("rf_excited_co2")).toBe("packaging_rf_excited_co2_laser_marking_perforate_score_clean_cut");
  });
});

describe("co2LaserTypes", () => {
  it("returns 5 types", () => {
    expect(co2LaserTypes()).toHaveLength(5);
  });
});
