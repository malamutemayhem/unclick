import { describe, it, expect } from "vitest";
import {
  thermalLoad, signalLoss, bandwidth, flexibility,
  cbCost, superconducting, forRf, material,
  bestUse, cryoCables,
} from "../cryo-cable-calc.js";

describe("thermalLoad", () => {
  it("niobium supercon lowest thermal load", () => {
    expect(thermalLoad("coax_niobium_supercon")).toBeGreaterThan(thermalLoad("flex_ribbon_kapton"));
  });
});

describe("signalLoss", () => {
  it("niobium supercon lowest signal loss", () => {
    expect(signalLoss("coax_niobium_supercon")).toBeGreaterThan(signalLoss("dc_loom_manganin"));
  });
});

describe("bandwidth", () => {
  it("niobium supercon highest bandwidth", () => {
    expect(bandwidth("coax_niobium_supercon")).toBeGreaterThan(bandwidth("dc_loom_phosphor_bronze"));
  });
});

describe("flexibility", () => {
  it("flex ribbon most flexible", () => {
    expect(flexibility("flex_ribbon_kapton")).toBeGreaterThan(flexibility("coax_niobium_supercon"));
  });
});

describe("cbCost", () => {
  it("niobium supercon most expensive", () => {
    expect(cbCost("coax_niobium_supercon")).toBeGreaterThan(cbCost("dc_loom_phosphor_bronze"));
  });
});

describe("superconducting", () => {
  it("niobium is superconducting", () => {
    expect(superconducting("coax_niobium_supercon")).toBe(true);
  });
  it("stainless steel not superconducting", () => {
    expect(superconducting("coax_stainless_steel")).toBe(false);
  });
});

describe("forRf", () => {
  it("stainless steel for rf", () => {
    expect(forRf("coax_stainless_steel")).toBe(true);
  });
  it("phosphor bronze not for rf", () => {
    expect(forRf("dc_loom_phosphor_bronze")).toBe(false);
  });
});

describe("material", () => {
  it("manganin uses manganin alloy", () => {
    expect(material("dc_loom_manganin")).toBe("manganin_alloy_low_thermal");
  });
});

describe("bestUse", () => {
  it("niobium best for base stage low loss rf", () => {
    expect(bestUse("coax_niobium_supercon")).toBe("base_stage_low_loss_rf");
  });
});

describe("cryoCables", () => {
  it("returns 5 types", () => {
    expect(cryoCables()).toHaveLength(5);
  });
});
