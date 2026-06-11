import { describe, it, expect } from "vitest";
import {
  efficiency, powerRecovery, temperatureRange, reliability,
  etCost, generatorCoupled, forCryogenic, design,
  bestUse, expanderTurbineTypes,
} from "../expander-turbine-calc.js";

describe("efficiency", () => {
  it("radial inflow most efficient", () => {
    expect(efficiency("radial_inflow_cryo")).toBeGreaterThan(efficiency("organic_rankine_orc"));
  });
});

describe("powerRecovery", () => {
  it("turboexpander gen best power recovery", () => {
    expect(powerRecovery("turboexpander_gen")).toBeGreaterThan(powerRecovery("organic_rankine_orc"));
  });
});

describe("temperatureRange", () => {
  it("radial inflow widest temperature range", () => {
    expect(temperatureRange("radial_inflow_cryo")).toBeGreaterThan(temperatureRange("organic_rankine_orc"));
  });
});

describe("reliability", () => {
  it("radial inflow most reliable", () => {
    expect(reliability("radial_inflow_cryo")).toBeGreaterThan(reliability("wet_gas_expander"));
  });
});

describe("etCost", () => {
  it("axial flow multistage most expensive", () => {
    expect(etCost("axial_flow_multistage")).toBeGreaterThan(etCost("organic_rankine_orc"));
  });
});

describe("generatorCoupled", () => {
  it("turboexpander gen is generator coupled", () => {
    expect(generatorCoupled("turboexpander_gen")).toBe(true);
  });
  it("radial inflow cryo not generator coupled", () => {
    expect(generatorCoupled("radial_inflow_cryo")).toBe(false);
  });
});

describe("forCryogenic", () => {
  it("radial inflow for cryogenic", () => {
    expect(forCryogenic("radial_inflow_cryo")).toBe(true);
  });
  it("organic rankine not for cryogenic", () => {
    expect(forCryogenic("organic_rankine_orc")).toBe(false);
  });
});

describe("design", () => {
  it("organic rankine uses organic fluid", () => {
    expect(design("organic_rankine_orc")).toBe("organic_fluid_low_temp_heat_scroll_or_radial");
  });
});

describe("bestUse", () => {
  it("turboexpander gen for gas pressure let down", () => {
    expect(bestUse("turboexpander_gen")).toBe("natural_gas_pressure_let_down_power_recovery");
  });
});

describe("expanderTurbineTypes", () => {
  it("returns 5 types", () => {
    expect(expanderTurbineTypes()).toHaveLength(5);
  });
});
