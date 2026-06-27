import { describe, it, expect } from "vitest";
import {
  current, voltage, life, arcQuench,
  ctCost, sealed, forMotor, mechanism,
  bestUse, contactorTypes,
} from "../contactor-type-calc.js";

describe("current", () => {
  it("vacuum highest current", () => {
    expect(current("vacuum_medium_voltage")).toBeGreaterThan(current("definite_purpose_hvac"));
  });
});

describe("voltage", () => {
  it("vacuum highest voltage", () => {
    expect(voltage("vacuum_medium_voltage")).toBeGreaterThan(voltage("definite_purpose_hvac"));
  });
});

describe("life", () => {
  it("vacuum longest life", () => {
    expect(life("vacuum_medium_voltage")).toBeGreaterThan(life("definite_purpose_hvac"));
  });
});

describe("arcQuench", () => {
  it("vacuum best arc quench", () => {
    expect(arcQuench("vacuum_medium_voltage")).toBeGreaterThan(arcQuench("definite_purpose_hvac"));
  });
});

describe("ctCost", () => {
  it("vacuum most expensive", () => {
    expect(ctCost("vacuum_medium_voltage")).toBeGreaterThan(ctCost("definite_purpose_hvac"));
  });
});

describe("sealed", () => {
  it("vacuum is sealed", () => {
    expect(sealed("vacuum_medium_voltage")).toBe(true);
  });
  it("ac3 not sealed", () => {
    expect(sealed("ac3_motor_start")).toBe(false);
  });
});

describe("forMotor", () => {
  it("ac3 for motor", () => {
    expect(forMotor("ac3_motor_start")).toBe(true);
  });
  it("dc coil not for motor", () => {
    expect(forMotor("dc_coil_contactor")).toBe(false);
  });
});

describe("mechanism", () => {
  it("reversing pair uses mechanical interlock", () => {
    expect(mechanism("reversing_pair_interlock")).toBe("mechanical_interlock_pair");
  });
});

describe("bestUse", () => {
  it("dc coil best for battery disconnect", () => {
    expect(bestUse("dc_coil_contactor")).toBe("battery_disconnect_ev_charger");
  });
});

describe("contactorTypes", () => {
  it("returns 5 types", () => {
    expect(contactorTypes()).toHaveLength(5);
  });
});
