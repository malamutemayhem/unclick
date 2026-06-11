import { describe, it, expect } from "vitest";
import {
  conversion, selectivity, heatTransfer, scaleUp,
  rvCost, continuous, forCatalytic, flow,
  bestUse, reactorVesselTypes,
} from "../reactor-vessel-calc.js";

describe("conversion", () => {
  it("membrane reactor highest conversion", () => {
    expect(conversion("membrane_reactor_selective")).toBeGreaterThan(conversion("batch_stirred_tank_cstr"));
  });
});

describe("selectivity", () => {
  it("membrane reactor best selectivity", () => {
    expect(selectivity("membrane_reactor_selective")).toBeGreaterThan(selectivity("batch_stirred_tank_cstr"));
  });
});

describe("heatTransfer", () => {
  it("fluidized bed best heat transfer", () => {
    expect(heatTransfer("fluidized_bed_suspended")).toBeGreaterThan(heatTransfer("packed_bed_catalytic"));
  });
});

describe("scaleUp", () => {
  it("batch easiest scale up", () => {
    expect(scaleUp("batch_stirred_tank_cstr")).toBeGreaterThan(scaleUp("membrane_reactor_selective"));
  });
});

describe("rvCost", () => {
  it("membrane most expensive", () => {
    expect(rvCost("membrane_reactor_selective")).toBeGreaterThan(rvCost("batch_stirred_tank_cstr"));
  });
});

describe("continuous", () => {
  it("pfr is continuous", () => {
    expect(continuous("plug_flow_tubular_pfr")).toBe(true);
  });
  it("batch not continuous", () => {
    expect(continuous("batch_stirred_tank_cstr")).toBe(false);
  });
});

describe("forCatalytic", () => {
  it("packed bed for catalytic", () => {
    expect(forCatalytic("packed_bed_catalytic")).toBe(true);
  });
  it("batch not for catalytic", () => {
    expect(forCatalytic("batch_stirred_tank_cstr")).toBe(false);
  });
});

describe("flow", () => {
  it("membrane uses selective permeation", () => {
    expect(flow("membrane_reactor_selective")).toBe("selective_permeation_shift_equil");
  });
});

describe("bestUse", () => {
  it("batch for pharma specialty", () => {
    expect(bestUse("batch_stirred_tank_cstr")).toBe("pharma_specialty_chem_batch");
  });
});

describe("reactorVesselTypes", () => {
  it("returns 5 types", () => {
    expect(reactorVesselTypes()).toHaveLength(5);
  });
});
