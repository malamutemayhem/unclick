import { describe, it, expect } from "vitest";
import {
  rangeMeters, accuracyScore, costPerUnit,
  powerConsumptionMw, responseTimeMs, contactRequired,
  weatherAffected, measuredQuantity, commonUseCase, sensorTypes,
} from "../sensor-type-calc.js";

describe("rangeMeters", () => {
  it("lidar longest range", () => {
    expect(rangeMeters("lidar")).toBeGreaterThan(
      rangeMeters("ultrasonic")
    );
  });
});

describe("accuracyScore", () => {
  it("lidar most accurate", () => {
    expect(accuracyScore("lidar")).toBeGreaterThan(
      accuracyScore("ultrasonic")
    );
  });
});

describe("costPerUnit", () => {
  it("lidar most expensive", () => {
    expect(costPerUnit("lidar")).toBeGreaterThan(
      costPerUnit("ultrasonic")
    );
  });
});

describe("powerConsumptionMw", () => {
  it("lidar uses most power", () => {
    expect(powerConsumptionMw("lidar")).toBeGreaterThan(
      powerConsumptionMw("pressure")
    );
  });
});

describe("responseTimeMs", () => {
  it("ultrasonic slowest response", () => {
    expect(responseTimeMs("ultrasonic")).toBeGreaterThan(
      responseTimeMs("accelerometer")
    );
  });
});

describe("contactRequired", () => {
  it("pressure requires contact", () => {
    expect(contactRequired("pressure")).toBe(true);
  });
  it("lidar does not", () => {
    expect(contactRequired("lidar")).toBe(false);
  });
});

describe("weatherAffected", () => {
  it("lidar is weather affected", () => {
    expect(weatherAffected("lidar")).toBe(true);
  });
  it("accelerometer is not", () => {
    expect(weatherAffected("accelerometer")).toBe(false);
  });
});

describe("measuredQuantity", () => {
  it("accelerometer measures acceleration", () => {
    expect(measuredQuantity("accelerometer")).toBe("acceleration");
  });
});

describe("commonUseCase", () => {
  it("lidar for autonomous vehicles", () => {
    expect(commonUseCase("lidar")).toBe("autonomous_vehicles");
  });
});

describe("sensorTypes", () => {
  it("returns 5 types", () => {
    expect(sensorTypes()).toHaveLength(5);
  });
});
