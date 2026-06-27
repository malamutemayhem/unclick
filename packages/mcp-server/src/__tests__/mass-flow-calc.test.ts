import { describe, it, expect } from "vitest";
import {
  accuracy, throughput, rangeability, densityMeasure,
  mfCost, directMass, forGas, meterConfig,
  bestUse, massFlowTypes,
} from "../mass-flow-calc.js";

describe("accuracy", () => {
  it("coriolis best accuracy", () => {
    expect(accuracy("coriolis_mass")).toBeGreaterThan(accuracy("differential_pressure"));
  });
});

describe("throughput", () => {
  it("differential pressure highest throughput", () => {
    expect(throughput("differential_pressure")).toBeGreaterThan(throughput("optical_mass"));
  });
});

describe("rangeability", () => {
  it("coriolis best rangeability", () => {
    expect(rangeability("coriolis_mass")).toBeGreaterThan(rangeability("differential_pressure"));
  });
});

describe("densityMeasure", () => {
  it("coriolis best density measure", () => {
    expect(densityMeasure("coriolis_mass")).toBeGreaterThan(densityMeasure("thermal_mass"));
  });
});

describe("mfCost", () => {
  it("coriolis most expensive", () => {
    expect(mfCost("coriolis_mass")).toBeGreaterThan(mfCost("differential_pressure"));
  });
});

describe("directMass", () => {
  it("coriolis is direct mass", () => {
    expect(directMass("coriolis_mass")).toBe(true);
  });
  it("thermal mass not direct mass", () => {
    expect(directMass("thermal_mass")).toBe(false);
  });
});

describe("forGas", () => {
  it("thermal mass for gas", () => {
    expect(forGas("thermal_mass")).toBe(true);
  });
  it("coriolis not for gas", () => {
    expect(forGas("coriolis_mass")).toBe(false);
  });
});

describe("meterConfig", () => {
  it("multivariable uses pressure temp dp compensate calc", () => {
    expect(meterConfig("multivariable_mass")).toBe("multivariable_mass_flow_meter_pressure_temp_dp_compensate_calc");
  });
});

describe("bestUse", () => {
  it("coriolis for custody transfer direct mass density", () => {
    expect(bestUse("coriolis_mass")).toBe("custody_transfer_coriolis_mass_flow_meter_direct_mass_density");
  });
});

describe("massFlowTypes", () => {
  it("returns 5 types", () => {
    expect(massFlowTypes()).toHaveLength(5);
  });
});
