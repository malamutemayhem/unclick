import { describe, it, expect } from "vitest";
import {
  accuracy, tempRange, responseTime, linearity,
  sensorCost, contactless, forHighTemp, outputType,
  bestUse, tempSensors,
} from "../temp-sensor-calc.js";

describe("accuracy", () => {
  it("rtd pt100 wire best accuracy", () => {
    expect(accuracy("rtd_pt100_wire")).toBeGreaterThan(accuracy("thermocouple_k_type"));
  });
});

describe("tempRange", () => {
  it("thermocouple k type widest temp range", () => {
    expect(tempRange("thermocouple_k_type")).toBeGreaterThan(tempRange("ic_digital_i2c"));
  });
});

describe("responseTime", () => {
  it("infrared non contact fastest response", () => {
    expect(responseTime("infrared_non_contact")).toBeGreaterThan(responseTime("rtd_pt100_wire"));
  });
});

describe("linearity", () => {
  it("ic digital i2c best linearity", () => {
    expect(linearity("ic_digital_i2c")).toBeGreaterThan(linearity("thermistor_ntc"));
  });
});

describe("sensorCost", () => {
  it("infrared non contact most expensive", () => {
    expect(sensorCost("infrared_non_contact")).toBeGreaterThan(sensorCost("thermistor_ntc"));
  });
});

describe("contactless", () => {
  it("infrared non contact is contactless", () => {
    expect(contactless("infrared_non_contact")).toBe(true);
  });
  it("rtd pt100 wire not contactless", () => {
    expect(contactless("rtd_pt100_wire")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("thermocouple k type is for high temp", () => {
    expect(forHighTemp("thermocouple_k_type")).toBe(true);
  });
  it("thermistor ntc not for high temp", () => {
    expect(forHighTemp("thermistor_ntc")).toBe(false);
  });
});

describe("outputType", () => {
  it("ic digital i2c uses digital i2c spi", () => {
    expect(outputType("ic_digital_i2c")).toBe("digital_i2c_spi");
  });
});

describe("bestUse", () => {
  it("rtd pt100 wire best for precision lab measurement", () => {
    expect(bestUse("rtd_pt100_wire")).toBe("precision_lab_measurement");
  });
});

describe("tempSensors", () => {
  it("returns 5 types", () => {
    expect(tempSensors()).toHaveLength(5);
  });
});
