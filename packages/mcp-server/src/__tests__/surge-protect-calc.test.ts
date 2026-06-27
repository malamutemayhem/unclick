import { describe, it, expect } from "vitest";
import {
  clampVoltage, responseTime, surgeCapacity, standbyLeak,
  protectCost, resettable, forTelecom, clampMethod,
  bestUse, surgeProtects,
} from "../surge-protect-calc.js";

describe("clampVoltage", () => {
  it("tvs silicon diode best clamp voltage", () => {
    expect(clampVoltage("tvs_silicon_diode")).toBeGreaterThan(clampVoltage("spark_gap_air"));
  });
});

describe("responseTime", () => {
  it("tvs silicon diode fastest response", () => {
    expect(responseTime("tvs_silicon_diode")).toBeGreaterThan(responseTime("spark_gap_air"));
  });
});

describe("surgeCapacity", () => {
  it("gas discharge tube best surge capacity", () => {
    expect(surgeCapacity("gas_discharge_tube")).toBeGreaterThan(surgeCapacity("tvs_silicon_diode"));
  });
});

describe("standbyLeak", () => {
  it("gas discharge tube best standby leak", () => {
    expect(standbyLeak("gas_discharge_tube")).toBeGreaterThan(standbyLeak("mov_metal_oxide"));
  });
});

describe("protectCost", () => {
  it("thyristor crowbar most expensive", () => {
    expect(protectCost("thyristor_crowbar")).toBeGreaterThan(protectCost("spark_gap_air"));
  });
});

describe("resettable", () => {
  it("mov metal oxide is resettable", () => {
    expect(resettable("mov_metal_oxide")).toBe(true);
  });
  it("thyristor crowbar not resettable", () => {
    expect(resettable("thyristor_crowbar")).toBe(false);
  });
});

describe("forTelecom", () => {
  it("gas discharge tube is for telecom", () => {
    expect(forTelecom("gas_discharge_tube")).toBe(true);
  });
  it("mov metal oxide not for telecom", () => {
    expect(forTelecom("mov_metal_oxide")).toBe(false);
  });
});

describe("clampMethod", () => {
  it("tvs silicon diode uses avalanche diode clamp", () => {
    expect(clampMethod("tvs_silicon_diode")).toBe("avalanche_diode_clamp");
  });
});

describe("bestUse", () => {
  it("spark gap air best for coarse primary lightning", () => {
    expect(bestUse("spark_gap_air")).toBe("coarse_primary_lightning");
  });
});

describe("surgeProtects", () => {
  it("returns 5 types", () => {
    expect(surgeProtects()).toHaveLength(5);
  });
});
