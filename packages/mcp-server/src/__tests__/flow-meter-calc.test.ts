import { describe, it, expect } from "vitest";
import {
  accuracy, rangeability, pressure_drop, maintenance,
  fmCost, noMovingParts, forGas, principle,
  bestUse, flowMeters,
} from "../flow-meter-calc.js";

describe("accuracy", () => {
  it("coriolis most accurate", () => {
    expect(accuracy("coriolis_mass_tube")).toBeGreaterThan(accuracy("differential_pressure_orifice"));
  });
});

describe("rangeability", () => {
  it("electromagnetic best rangeability", () => {
    expect(rangeability("electromagnetic_mag")).toBeGreaterThan(rangeability("differential_pressure_orifice"));
  });
});

describe("pressure_drop", () => {
  it("electromagnetic lowest pressure drop", () => {
    expect(pressure_drop("electromagnetic_mag")).toBeGreaterThan(pressure_drop("differential_pressure_orifice"));
  });
});

describe("maintenance", () => {
  it("electromagnetic lowest maintenance", () => {
    expect(maintenance("electromagnetic_mag")).toBeGreaterThan(maintenance("differential_pressure_orifice"));
  });
});

describe("fmCost", () => {
  it("coriolis most expensive", () => {
    expect(fmCost("coriolis_mass_tube")).toBeGreaterThan(fmCost("differential_pressure_orifice"));
  });
});

describe("noMovingParts", () => {
  it("all have no moving parts", () => {
    expect(noMovingParts("coriolis_mass_tube")).toBe(true);
    expect(noMovingParts("electromagnetic_mag")).toBe(true);
  });
});

describe("forGas", () => {
  it("coriolis for gas", () => {
    expect(forGas("coriolis_mass_tube")).toBe(true);
  });
  it("electromagnetic not for gas", () => {
    expect(forGas("electromagnetic_mag")).toBe(false);
  });
});

describe("principle", () => {
  it("vortex uses karman vortex street freq", () => {
    expect(principle("vortex_shedding_bluff")).toBe("karman_vortex_street_freq");
  });
});

describe("bestUse", () => {
  it("coriolis best for custody transfer", () => {
    expect(bestUse("coriolis_mass_tube")).toBe("custody_transfer_mass_billing");
  });
});

describe("flowMeters", () => {
  it("returns 5 types", () => {
    expect(flowMeters()).toHaveLength(5);
  });
});
