import { describe, it, expect } from "vitest";
import {
  clampVoltage, energyAbsorb, responseTime, lifetime,
  varistorCost, resettable, forMains, mechanism,
  bestUse, varistorTypes,
} from "../varistor-type-calc.js";

describe("clampVoltage", () => {
  it("tvs diode array best clamp voltage", () => {
    expect(clampVoltage("tvs_diode_array")).toBeGreaterThan(clampVoltage("spark_gap_air"));
  });
});

describe("energyAbsorb", () => {
  it("gas discharge tube best energy absorb", () => {
    expect(energyAbsorb("gas_discharge_tube")).toBeGreaterThan(energyAbsorb("tvs_diode_array"));
  });
});

describe("responseTime", () => {
  it("tvs diode array fastest response time", () => {
    expect(responseTime("tvs_diode_array")).toBeGreaterThan(responseTime("spark_gap_air"));
  });
});

describe("lifetime", () => {
  it("tvs diode array longest lifetime", () => {
    expect(lifetime("tvs_diode_array")).toBeGreaterThan(lifetime("spark_gap_air"));
  });
});

describe("varistorCost", () => {
  it("tvs diode array most expensive", () => {
    expect(varistorCost("tvs_diode_array")).toBeGreaterThan(varistorCost("spark_gap_air"));
  });
});

describe("resettable", () => {
  it("mov metal oxide is resettable", () => {
    expect(resettable("mov_metal_oxide")).toBe(true);
  });
  it("spark gap air not resettable", () => {
    expect(resettable("spark_gap_air")).toBe(false);
  });
});

describe("forMains", () => {
  it("mov metal oxide is for mains", () => {
    expect(forMains("mov_metal_oxide")).toBe(true);
  });
  it("tvs diode array not for mains", () => {
    expect(forMains("tvs_diode_array")).toBe(false);
  });
});

describe("mechanism", () => {
  it("gas discharge tube uses ionized gas arc", () => {
    expect(mechanism("gas_discharge_tube")).toBe("ionized_gas_arc");
  });
});

describe("bestUse", () => {
  it("tvs diode array best for data line esd protection", () => {
    expect(bestUse("tvs_diode_array")).toBe("data_line_esd_protection");
  });
});

describe("varistorTypes", () => {
  it("returns 5 types", () => {
    expect(varistorTypes()).toHaveLength(5);
  });
});
