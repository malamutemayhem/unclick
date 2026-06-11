import { describe, it, expect } from "vitest";
import {
  heatingCapacity, throughput, responseSpeed, airTempUniformity,
  dhCost, electric, forHighVelocity, heaterConfig,
  bestUse, ductHeaterTypes,
} from "../duct-heater-calc.js";

describe("heatingCapacity", () => {
  it("duct furnace best heating capacity", () => {
    expect(heatingCapacity("duct_furnace")).toBeGreaterThan(heatingCapacity("ceramic_element_duct"));
  });
});

describe("throughput", () => {
  it("duct furnace highest throughput", () => {
    expect(throughput("duct_furnace")).toBeGreaterThan(throughput("ceramic_element_duct"));
  });
});

describe("responseSpeed", () => {
  it("open coil best response speed", () => {
    expect(responseSpeed("open_coil_duct")).toBeGreaterThan(responseSpeed("duct_furnace"));
  });
});

describe("airTempUniformity", () => {
  it("ceramic element best air temp uniformity", () => {
    expect(airTempUniformity("ceramic_element_duct")).toBeGreaterThan(airTempUniformity("open_coil_duct"));
  });
});

describe("dhCost", () => {
  it("duct furnace most expensive", () => {
    expect(dhCost("duct_furnace")).toBeGreaterThan(dhCost("open_coil_duct"));
  });
});

describe("electric", () => {
  it("open coil is electric", () => {
    expect(electric("open_coil_duct")).toBe(true);
  });
  it("duct furnace not electric", () => {
    expect(electric("duct_furnace")).toBe(false);
  });
});

describe("forHighVelocity", () => {
  it("finned tubular for high velocity", () => {
    expect(forHighVelocity("finned_tubular_duct")).toBe(true);
  });
  it("open coil not for high velocity", () => {
    expect(forHighVelocity("open_coil_duct")).toBe(false);
  });
});

describe("heaterConfig", () => {
  it("ceramic element uses ptc self limiting temp safe no overheat", () => {
    expect(heaterConfig("ceramic_element_duct")).toBe("ceramic_element_duct_heater_ptc_self_limiting_temp_safe_no_overheat");
  });
});

describe("bestUse", () => {
  it("duct furnace for warehouse gas fired high capacity makeup air heat", () => {
    expect(bestUse("duct_furnace")).toBe("warehouse_duct_furnace_gas_fired_high_capacity_makeup_air_heat");
  });
});

describe("ductHeaterTypes", () => {
  it("returns 5 types", () => {
    expect(ductHeaterTypes()).toHaveLength(5);
  });
});
