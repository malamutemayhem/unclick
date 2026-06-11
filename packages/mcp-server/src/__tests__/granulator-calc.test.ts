import { describe, it, expect } from "vitest";
import {
  granuleQuality, throughput, densification, uniformity,
  grCost, wetProcess, forPharma, granConfig,
  bestUse, granulatorTypes,
} from "../granulator-calc.js";

describe("granuleQuality", () => {
  it("extrusion spheron best granule quality", () => {
    expect(granuleQuality("extrusion_spheron")).toBeGreaterThan(granuleQuality("roll_compactor"));
  });
});

describe("throughput", () => {
  it("roll compactor highest throughput", () => {
    expect(throughput("roll_compactor")).toBeGreaterThan(throughput("extrusion_spheron"));
  });
});

describe("densification", () => {
  it("roll compactor best densification", () => {
    expect(densification("roll_compactor")).toBeGreaterThan(densification("fluid_bed_gran"));
  });
});

describe("uniformity", () => {
  it("extrusion spheron best uniformity", () => {
    expect(uniformity("extrusion_spheron")).toBeGreaterThan(uniformity("roll_compactor"));
  });
});

describe("grCost", () => {
  it("fluid bed most expensive", () => {
    expect(grCost("fluid_bed_gran")).toBeGreaterThan(grCost("roll_compactor"));
  });
});

describe("wetProcess", () => {
  it("high shear is wet process", () => {
    expect(wetProcess("high_shear_gran")).toBe(true);
  });
  it("roll compactor not wet process", () => {
    expect(wetProcess("roll_compactor")).toBe(false);
  });
});

describe("forPharma", () => {
  it("fluid bed for pharma", () => {
    expect(forPharma("fluid_bed_gran")).toBe(true);
  });
  it("spray gran not for pharma", () => {
    expect(forPharma("spray_gran")).toBe(false);
  });
});

describe("granConfig", () => {
  it("roll compactor uses dry ribbon compress mill granule", () => {
    expect(granConfig("roll_compactor")).toBe("roll_compactor_granulator_dry_ribbon_compress_mill_granule");
  });
});

describe("bestUse", () => {
  it("extrusion spheron for multi particulate uniform pellet coat", () => {
    expect(bestUse("extrusion_spheron")).toBe("multi_particulate_extrusion_spheronizer_uniform_pellet_coat");
  });
});

describe("granulatorTypes", () => {
  it("returns 5 types", () => {
    expect(granulatorTypes()).toHaveLength(5);
  });
});
