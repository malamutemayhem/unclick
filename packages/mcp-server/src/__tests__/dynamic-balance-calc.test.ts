import { describe, it, expect } from "vitest";
import {
  precision, speed, capacity, automation,
  dbaCost, fieldUse, forRotor, sensor,
  bestUse, dynamicBalanceTypes,
} from "../dynamic-balance-calc.js";

describe("precision", () => {
  it("turbine vacuum most precise", () => {
    expect(precision("turbine_vacuum_spin")).toBeGreaterThan(precision("single_plane_static"));
  });
});

describe("speed", () => {
  it("field portable fastest", () => {
    expect(speed("field_portable_vibrate")).toBeGreaterThan(speed("turbine_vacuum_spin"));
  });
});

describe("capacity", () => {
  it("turbine vacuum highest capacity", () => {
    expect(capacity("turbine_vacuum_spin")).toBeGreaterThan(capacity("single_plane_static"));
  });
});

describe("automation", () => {
  it("turbine vacuum most automated", () => {
    expect(automation("turbine_vacuum_spin")).toBeGreaterThan(automation("field_portable_vibrate"));
  });
});

describe("dbaCost", () => {
  it("turbine vacuum most expensive", () => {
    expect(dbaCost("turbine_vacuum_spin")).toBeGreaterThan(dbaCost("single_plane_static"));
  });
});

describe("fieldUse", () => {
  it("field portable for field use", () => {
    expect(fieldUse("field_portable_vibrate")).toBe(true);
  });
  it("two plane not for field", () => {
    expect(fieldUse("two_plane_dynamic")).toBe(false);
  });
});

describe("forRotor", () => {
  it("two plane for rotor", () => {
    expect(forRotor("two_plane_dynamic")).toBe(true);
  });
  it("single plane not for rotor", () => {
    expect(forRotor("single_plane_static")).toBe(false);
  });
});

describe("sensor", () => {
  it("crankshaft uses force measurement v block", () => {
    expect(sensor("crankshaft_v_block")).toBe("force_measurement_v_block_bearing");
  });
});

describe("bestUse", () => {
  it("turbine vacuum for jet engine turbo", () => {
    expect(bestUse("turbine_vacuum_spin")).toBe("jet_engine_turbo_rotor_gyroscope");
  });
});

describe("dynamicBalanceTypes", () => {
  it("returns 5 types", () => {
    expect(dynamicBalanceTypes()).toHaveLength(5);
  });
});
