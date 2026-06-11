import { describe, it, expect } from "vitest";
import {
  accuracy, gases, response, maintenance,
  emCost, multigas, forCompliance, detection,
  bestUse, emissionMonitorTypes,
} from "../emission-monitor-calc.js";

describe("accuracy", () => {
  it("ftir most accurate", () => {
    expect(accuracy("ftir_multigas_analyzer")).toBeGreaterThan(accuracy("opacity_transmissometer"));
  });
});

describe("gases", () => {
  it("ftir detects most gases", () => {
    expect(gases("ftir_multigas_analyzer")).toBeGreaterThan(gases("ndir_single_gas_ir"));
  });
});

describe("response", () => {
  it("opacity fastest response", () => {
    expect(response("opacity_transmissometer")).toBeGreaterThan(response("ftir_multigas_analyzer"));
  });
});

describe("maintenance", () => {
  it("ndir lowest maintenance", () => {
    expect(maintenance("ndir_single_gas_ir")).toBeGreaterThan(maintenance("ftir_multigas_analyzer"));
  });
});

describe("emCost", () => {
  it("ftir most expensive", () => {
    expect(emCost("ftir_multigas_analyzer")).toBeGreaterThan(emCost("ndir_single_gas_ir"));
  });
});

describe("multigas", () => {
  it("ftir is multigas", () => {
    expect(multigas("ftir_multigas_analyzer")).toBe(true);
  });
  it("ndir not multigas", () => {
    expect(multigas("ndir_single_gas_ir")).toBe(false);
  });
});

describe("forCompliance", () => {
  it("cems extractive for compliance", () => {
    expect(forCompliance("cems_extractive_heated")).toBe(true);
  });
  it("ndir not for compliance", () => {
    expect(forCompliance("ndir_single_gas_ir")).toBe(false);
  });
});

describe("detection", () => {
  it("insitu uses cross duct laser", () => {
    expect(detection("cems_insitu_cross_stack")).toBe("cross_duct_laser_tdlas");
  });
});

describe("bestUse", () => {
  it("opacity best for particulate epa method", () => {
    expect(bestUse("opacity_transmissometer")).toBe("particulate_opacity_epa_method9");
  });
});

describe("emissionMonitorTypes", () => {
  it("returns 5 types", () => {
    expect(emissionMonitorTypes()).toHaveLength(5);
  });
});
