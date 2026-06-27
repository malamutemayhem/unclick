import { describe, it, expect } from "vitest";
import {
  sealQuality, throughput, moistureBarrier, flexibility,
  bpCost, childResistant, forMoisture, packerConfig,
  bestUse, blisterPackerTypes,
} from "../blister-packer-calc.js";

describe("sealQuality", () => {
  it("cold form alu best seal quality", () => {
    expect(sealQuality("cold_form_alu")).toBeGreaterThan(sealQuality("thermoform_fill"));
  });
});

describe("throughput", () => {
  it("rotary blister highest throughput", () => {
    expect(throughput("rotary_blister")).toBeGreaterThan(throughput("flat_plate"));
  });
});

describe("moistureBarrier", () => {
  it("cold form alu best moisture barrier", () => {
    expect(moistureBarrier("cold_form_alu")).toBeGreaterThan(moistureBarrier("thermoform_fill"));
  });
});

describe("flexibility", () => {
  it("flat plate most flexible", () => {
    expect(flexibility("flat_plate")).toBeGreaterThan(flexibility("cold_form_alu"));
  });
});

describe("bpCost", () => {
  it("cold form alu most expensive", () => {
    expect(bpCost("cold_form_alu")).toBeGreaterThan(bpCost("flat_plate"));
  });
});

describe("childResistant", () => {
  it("strip pack is child resistant", () => {
    expect(childResistant("strip_pack")).toBe(true);
  });
  it("thermoform fill not child resistant", () => {
    expect(childResistant("thermoform_fill")).toBe(false);
  });
});

describe("forMoisture", () => {
  it("cold form alu for moisture sensitive", () => {
    expect(forMoisture("cold_form_alu")).toBe(true);
  });
  it("rotary blister not for moisture sensitive", () => {
    expect(forMoisture("rotary_blister")).toBe(false);
  });
});

describe("packerConfig", () => {
  it("strip pack uses foil foil heat seal unit dose tamper", () => {
    expect(packerConfig("strip_pack")).toBe("strip_pack_machine_foil_foil_heat_seal_unit_dose_tamper");
  });
});

describe("bestUse", () => {
  it("cold form alu for pharma sensitive moisture oxygen barrier", () => {
    expect(bestUse("cold_form_alu")).toBe("pharma_sensitive_cold_form_alu_alu_blister_moisture_oxygen_barrier");
  });
});

describe("blisterPackerTypes", () => {
  it("returns 5 types", () => {
    expect(blisterPackerTypes()).toHaveLength(5);
  });
});
