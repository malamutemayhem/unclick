import { describe, it, expect } from "vitest";
import {
  captureEfficiency, airVolume, filterLife, pressureLoss,
  dcCost, selfCleaning, forExplosive, medium,
  bestUse, dustCollectorTypes,
} from "../dust-collector-calc.js";

describe("captureEfficiency", () => {
  it("baghouse and cartridge highest capture efficiency", () => {
    expect(captureEfficiency("baghouse_pulse_jet")).toBeGreaterThan(captureEfficiency("cyclone_mechanical"));
    expect(captureEfficiency("cartridge_nanofiber")).toBeGreaterThan(captureEfficiency("cyclone_mechanical"));
  });
});

describe("airVolume", () => {
  it("cyclone mechanical highest air volume", () => {
    expect(airVolume("cyclone_mechanical")).toBeGreaterThan(airVolume("cartridge_nanofiber"));
  });
});

describe("filterLife", () => {
  it("cyclone and wet scrubber longest filter life", () => {
    expect(filterLife("cyclone_mechanical")).toBeGreaterThan(filterLife("baghouse_pulse_jet"));
    expect(filterLife("wet_scrubber_venturi")).toBeGreaterThan(filterLife("baghouse_pulse_jet"));
  });
});

describe("pressureLoss", () => {
  it("electrostatic industrial best pressure loss", () => {
    expect(pressureLoss("electrostatic_industrial")).toBeGreaterThan(pressureLoss("wet_scrubber_venturi"));
  });
});

describe("dcCost", () => {
  it("electrostatic industrial most expensive", () => {
    expect(dcCost("electrostatic_industrial")).toBeGreaterThan(dcCost("cyclone_mechanical"));
  });
});

describe("selfCleaning", () => {
  it("all types are self cleaning", () => {
    expect(selfCleaning("baghouse_pulse_jet")).toBe(true);
    expect(selfCleaning("cyclone_mechanical")).toBe(true);
  });
});

describe("forExplosive", () => {
  it("cyclone and wet scrubber safe for explosive dust", () => {
    expect(forExplosive("cyclone_mechanical")).toBe(true);
    expect(forExplosive("wet_scrubber_venturi")).toBe(true);
  });
  it("baghouse not for explosive dust", () => {
    expect(forExplosive("baghouse_pulse_jet")).toBe(false);
  });
});

describe("medium", () => {
  it("cyclone uses centrifugal vortex", () => {
    expect(medium("cyclone_mechanical")).toBe("centrifugal_vortex_no_filter_media_gravity_hopper_collect");
  });
});

describe("bestUse", () => {
  it("wet scrubber for explosive dust and hot gas", () => {
    expect(bestUse("wet_scrubber_venturi")).toBe("explosive_dust_hot_gas_chemical_fume_metal_grinding_spark");
  });
});

describe("dustCollectorTypes", () => {
  it("returns 5 types", () => {
    expect(dustCollectorTypes()).toHaveLength(5);
  });
});
