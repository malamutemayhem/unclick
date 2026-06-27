import { describe, it, expect } from "vitest";
import {
  accuracy, rangeSpan, responseTime, stability,
  tsCost, contactless, forHighTemp, element,
  bestUse, temperatureSensorTypes,
} from "../temperature-sensor-calc.js";

describe("accuracy", () => {
  it("rtd platinum 100 most accurate", () => {
    expect(accuracy("rtd_platinum_100")).toBeGreaterThan(accuracy("thermocouple_type_k"));
  });
});

describe("rangeSpan", () => {
  it("thermocouple type k widest range", () => {
    expect(rangeSpan("thermocouple_type_k")).toBeGreaterThan(rangeSpan("thermistor_ntc_bead"));
  });
});

describe("responseTime", () => {
  it("infrared pyrometer fastest response", () => {
    expect(responseTime("infrared_pyrometer")).toBeGreaterThan(responseTime("fiber_optic_distributed"));
  });
});

describe("stability", () => {
  it("rtd platinum 100 most stable", () => {
    expect(stability("rtd_platinum_100")).toBeGreaterThan(stability("thermistor_ntc_bead"));
  });
});

describe("tsCost", () => {
  it("fiber optic distributed most expensive", () => {
    expect(tsCost("fiber_optic_distributed")).toBeGreaterThan(tsCost("thermistor_ntc_bead"));
  });
});

describe("contactless", () => {
  it("infrared pyrometer is contactless", () => {
    expect(contactless("infrared_pyrometer")).toBe(true);
  });
  it("thermocouple not contactless", () => {
    expect(contactless("thermocouple_type_k")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("thermocouple for high temp", () => {
    expect(forHighTemp("thermocouple_type_k")).toBe(true);
  });
  it("thermistor not for high temp", () => {
    expect(forHighTemp("thermistor_ntc_bead")).toBe(false);
  });
});

describe("element", () => {
  it("rtd uses platinum wire", () => {
    expect(element("rtd_platinum_100")).toBe("platinum_wire_wound_or_thin_film_100_ohm_base");
  });
});

describe("bestUse", () => {
  it("thermistor for hvac medical device", () => {
    expect(bestUse("thermistor_ntc_bead")).toBe("hvac_medical_device_battery_management_narrow_range");
  });
});

describe("temperatureSensorTypes", () => {
  it("returns 5 types", () => {
    expect(temperatureSensorTypes()).toHaveLength(5);
  });
});
