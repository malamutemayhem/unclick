import { describe, it, expect } from "vitest";
import {
  arcStability, portability, dutyCycle, rodRange,
  swCost, inverter, forField, power,
  bestUse, stickWelderTypes,
} from "../stick-welder-calc.js";

describe("arcStability", () => {
  it("dc inverter most stable arc", () => {
    expect(arcStability("dc_inverter_portable")).toBeGreaterThan(arcStability("ac_transformer_basic"));
  });
});

describe("portability", () => {
  it("dc inverter most portable", () => {
    expect(portability("dc_inverter_portable")).toBeGreaterThan(portability("dc_rectifier_industrial"));
  });
});

describe("dutyCycle", () => {
  it("dc rectifier highest duty cycle", () => {
    expect(dutyCycle("dc_rectifier_industrial")).toBeGreaterThan(dutyCycle("dc_inverter_portable"));
  });
});

describe("rodRange", () => {
  it("multi process widest rod range", () => {
    expect(rodRange("multi_process_combo")).toBeGreaterThan(rodRange("ac_transformer_basic"));
  });
});

describe("swCost", () => {
  it("engine driven most expensive", () => {
    expect(swCost("engine_driven_field")).toBeGreaterThan(swCost("ac_transformer_basic"));
  });
});

describe("inverter", () => {
  it("dc inverter is inverter type", () => {
    expect(inverter("dc_inverter_portable")).toBe(true);
  });
  it("ac transformer not inverter", () => {
    expect(inverter("ac_transformer_basic")).toBe(false);
  });
});

describe("forField", () => {
  it("engine driven for field work", () => {
    expect(forField("engine_driven_field")).toBe(true);
  });
  it("dc rectifier not for field", () => {
    expect(forField("dc_rectifier_industrial")).toBe(false);
  });
});

describe("power", () => {
  it("engine driven uses diesel generator", () => {
    expect(power("engine_driven_field")).toBe("diesel_engine_generator_welder_combo");
  });
});

describe("bestUse", () => {
  it("dc inverter for maintenance repair", () => {
    expect(bestUse("dc_inverter_portable")).toBe("maintenance_repair_farm_home_portable");
  });
});

describe("stickWelderTypes", () => {
  it("returns 5 types", () => {
    expect(stickWelderTypes()).toHaveLength(5);
  });
});
