import { describe, it, expect } from "vitest";
import {
  efficiency, accuracy, climate, maintenance,
  ecCost, sensorBased, forHumid, control,
  bestUse, economizerTypes,
} from "../economizer-calc.js";

describe("efficiency", () => {
  it("differential most efficient", () => {
    expect(efficiency("differential_enthalpy")).toBeGreaterThan(efficiency("dry_bulb_temperature"));
  });
});

describe("accuracy", () => {
  it("dew point most accurate", () => {
    expect(accuracy("dew_point_control")).toBeGreaterThan(accuracy("dry_bulb_temperature"));
  });
});

describe("climate", () => {
  it("differential best climate range", () => {
    expect(climate("differential_enthalpy")).toBeGreaterThan(climate("dry_bulb_temperature"));
  });
});

describe("maintenance", () => {
  it("dry bulb lowest maintenance", () => {
    expect(maintenance("dry_bulb_temperature")).toBeGreaterThan(maintenance("differential_enthalpy"));
  });
});

describe("ecCost", () => {
  it("waterside more expensive", () => {
    expect(ecCost("integrated_waterside")).toBeGreaterThan(ecCost("dry_bulb_temperature"));
  });
});

describe("sensorBased", () => {
  it("enthalpy is sensor based", () => {
    expect(sensorBased("enthalpy_wet_bulb")).toBe(true);
  });
  it("waterside not sensor based", () => {
    expect(sensorBased("integrated_waterside")).toBe(false);
  });
});

describe("forHumid", () => {
  it("enthalpy for humid", () => {
    expect(forHumid("enthalpy_wet_bulb")).toBe(true);
  });
  it("dry bulb not for humid", () => {
    expect(forHumid("dry_bulb_temperature")).toBe(false);
  });
});

describe("control", () => {
  it("waterside uses cooling tower", () => {
    expect(control("integrated_waterside")).toBe("cooling_tower_free_cool_hx");
  });
});

describe("bestUse", () => {
  it("dew point for lab cleanroom", () => {
    expect(bestUse("dew_point_control")).toBe("lab_cleanroom_moisture_control");
  });
});

describe("economizerTypes", () => {
  it("returns 5 types", () => {
    expect(economizerTypes()).toHaveLength(5);
  });
});
