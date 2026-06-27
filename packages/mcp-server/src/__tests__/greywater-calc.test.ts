import { describe, it, expect } from "vitest";
import {
  treatment, capacity, energy, footprint,
  gwCost, automated, forIrrigation, process,
  bestUse, greywaterTypes,
} from "../greywater-calc.js";

describe("treatment", () => {
  it("mbr best treatment", () => {
    expect(treatment("membrane_bioreactor")).toBeGreaterThan(treatment("gravity_drum_filter"));
  });
});

describe("capacity", () => {
  it("uv ozone highest capacity", () => {
    expect(capacity("uv_ozone_disinfect")).toBeGreaterThan(capacity("gravity_drum_filter"));
  });
});

describe("energy", () => {
  it("wetland best energy", () => {
    expect(energy("constructed_wetland")).toBeGreaterThan(energy("membrane_bioreactor"));
  });
});

describe("footprint", () => {
  it("uv ozone smallest footprint", () => {
    expect(footprint("uv_ozone_disinfect")).toBeGreaterThan(footprint("constructed_wetland"));
  });
});

describe("gwCost", () => {
  it("mbr most expensive", () => {
    expect(gwCost("membrane_bioreactor")).toBeGreaterThan(gwCost("gravity_drum_filter"));
  });
});

describe("automated", () => {
  it("mbr is automated", () => {
    expect(automated("membrane_bioreactor")).toBe(true);
  });
  it("gravity not automated", () => {
    expect(automated("gravity_drum_filter")).toBe(false);
  });
});

describe("forIrrigation", () => {
  it("gravity for irrigation", () => {
    expect(forIrrigation("gravity_drum_filter")).toBe(true);
  });
  it("mbr not irrigation", () => {
    expect(forIrrigation("membrane_bioreactor")).toBe(false);
  });
});

describe("process", () => {
  it("wetland uses subsurface flow", () => {
    expect(process("constructed_wetland")).toBe("subsurface_flow_wetland_cells");
  });
});

describe("bestUse", () => {
  it("mbr for commercial flush reuse", () => {
    expect(bestUse("membrane_bioreactor")).toBe("commercial_toilet_flush_reuse");
  });
});

describe("greywaterTypes", () => {
  it("returns 5 types", () => {
    expect(greywaterTypes()).toHaveLength(5);
  });
});
