import { describe, it, expect } from "vitest";
import {
  rangeMax, accuracy, beamAngle, durability,
  sensorCost, waterproof, uartOutput, interfaceType,
  bestUse, ultrasonicSensors,
} from "../ultrasonic-sensor-calc.js";

describe("rangeMax", () => {
  it("maxbotix analog pro longest range", () => {
    expect(rangeMax("maxbotix_analog_pro")).toBeGreaterThan(rangeMax("hcsr04_basic_trig"));
  });
});

describe("accuracy", () => {
  it("maxbotix analog pro most accurate", () => {
    expect(accuracy("maxbotix_analog_pro")).toBeGreaterThan(accuracy("hcsr04_basic_trig"));
  });
});

describe("beamAngle", () => {
  it("maxbotix analog pro widest beam angle", () => {
    expect(beamAngle("maxbotix_analog_pro")).toBeGreaterThan(beamAngle("hcsr04_basic_trig"));
  });
});

describe("durability", () => {
  it("a02yyuw sealed uart most durable", () => {
    expect(durability("a02yyuw_sealed_uart")).toBeGreaterThan(durability("hcsr04_basic_trig"));
  });
});

describe("sensorCost", () => {
  it("maxbotix analog pro most expensive", () => {
    expect(sensorCost("maxbotix_analog_pro")).toBeGreaterThan(sensorCost("hcsr04_basic_trig"));
  });
});

describe("waterproof", () => {
  it("jsn sr04t waterproof is waterproof", () => {
    expect(waterproof("jsn_sr04t_waterproof")).toBe(true);
  });
  it("hcsr04 basic trig not waterproof", () => {
    expect(waterproof("hcsr04_basic_trig")).toBe(false);
  });
});

describe("uartOutput", () => {
  it("us 100 uart mode has uart output", () => {
    expect(uartOutput("us_100_uart_mode")).toBe(true);
  });
  it("hcsr04 basic trig no uart output", () => {
    expect(uartOutput("hcsr04_basic_trig")).toBe(false);
  });
});

describe("interfaceType", () => {
  it("a02yyuw sealed uart uses uart sealed probe", () => {
    expect(interfaceType("a02yyuw_sealed_uart")).toBe("uart_sealed_probe");
  });
});

describe("bestUse", () => {
  it("jsn sr04t waterproof best for outdoor liquid level", () => {
    expect(bestUse("jsn_sr04t_waterproof")).toBe("outdoor_liquid_level");
  });
});

describe("ultrasonicSensors", () => {
  it("returns 5 types", () => {
    expect(ultrasonicSensors()).toHaveLength(5);
  });
});
