import { describe, it, expect } from "vitest";
import {
  accuracy, response, diagnostics, reliability,
  vpCost, digital, forCritical, signal,
  bestUse, valvePositionerTypes,
} from "../valve-positioner-calc.js";

describe("accuracy", () => {
  it("digital most accurate", () => {
    expect(accuracy("digital_smart_fieldbus")).toBeGreaterThan(accuracy("pneumatic_force_balance"));
  });
});

describe("response", () => {
  it("digital fastest response", () => {
    expect(response("digital_smart_fieldbus")).toBeGreaterThan(response("electric_actuator_motor"));
  });
});

describe("diagnostics", () => {
  it("digital best diagnostics", () => {
    expect(diagnostics("digital_smart_fieldbus")).toBeGreaterThan(diagnostics("pneumatic_force_balance"));
  });
});

describe("reliability", () => {
  it("pneumatic most reliable", () => {
    expect(reliability("pneumatic_force_balance")).toBeGreaterThan(reliability("electric_actuator_motor"));
  });
});

describe("vpCost", () => {
  it("hydraulic most expensive", () => {
    expect(vpCost("hydraulic_high_force")).toBeGreaterThan(vpCost("pneumatic_force_balance"));
  });
});

describe("digital", () => {
  it("smart fieldbus is digital", () => {
    expect(digital("digital_smart_fieldbus")).toBe(true);
  });
  it("pneumatic not digital", () => {
    expect(digital("pneumatic_force_balance")).toBe(false);
  });
});

describe("forCritical", () => {
  it("smart fieldbus for critical", () => {
    expect(forCritical("digital_smart_fieldbus")).toBe(true);
  });
  it("pneumatic not critical", () => {
    expect(forCritical("pneumatic_force_balance")).toBe(false);
  });
});

describe("signal", () => {
  it("electric uses modbus", () => {
    expect(signal("electric_actuator_motor")).toBe("modbus_profibus_motor_drive");
  });
});

describe("bestUse", () => {
  it("digital for smart plant", () => {
    expect(bestUse("digital_smart_fieldbus")).toBe("smart_plant_predictive_maintenance");
  });
});

describe("valvePositionerTypes", () => {
  it("returns 5 types", () => {
    expect(valvePositionerTypes()).toHaveLength(5);
  });
});
