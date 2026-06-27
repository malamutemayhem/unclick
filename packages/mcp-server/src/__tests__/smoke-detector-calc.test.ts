import { describe, it, expect } from "vitest";
import {
  flameSensitivity, smolderSensitivity, falseAlarmResist, batteryLife,
  detectorCost, interconnected, phoneAlert, sensorTech,
  bestRoom, smokeDetectors,
} from "../smoke-detector-calc.js";

describe("flameSensitivity", () => {
  it("ionization most flame sensitive", () => {
    expect(flameSensitivity("ionization")).toBeGreaterThan(flameSensitivity("heat_only"));
  });
});

describe("smolderSensitivity", () => {
  it("photoelectric best smolder detection", () => {
    expect(smolderSensitivity("photoelectric")).toBeGreaterThan(smolderSensitivity("ionization"));
  });
});

describe("falseAlarmResist", () => {
  it("heat only best false alarm resistance", () => {
    expect(falseAlarmResist("heat_only")).toBeGreaterThan(falseAlarmResist("ionization"));
  });
});

describe("batteryLife", () => {
  it("heat only longest battery", () => {
    expect(batteryLife("heat_only")).toBeGreaterThan(batteryLife("smart_wifi"));
  });
});

describe("detectorCost", () => {
  it("smart wifi most expensive", () => {
    expect(detectorCost("smart_wifi")).toBeGreaterThan(detectorCost("ionization"));
  });
});

describe("interconnected", () => {
  it("smart wifi is interconnected", () => {
    expect(interconnected("smart_wifi")).toBe(true);
  });
  it("ionization is not", () => {
    expect(interconnected("ionization")).toBe(false);
  });
});

describe("phoneAlert", () => {
  it("smart wifi has phone alert", () => {
    expect(phoneAlert("smart_wifi")).toBe(true);
  });
  it("dual sensor does not", () => {
    expect(phoneAlert("dual_sensor")).toBe(false);
  });
});

describe("sensorTech", () => {
  it("ionization uses americium 241 ion chamber", () => {
    expect(sensorTech("ionization")).toBe("americium_241_ion_chamber");
  });
});

describe("bestRoom", () => {
  it("heat only for kitchen garage dusty", () => {
    expect(bestRoom("heat_only")).toBe("kitchen_garage_dusty");
  });
});

describe("smokeDetectors", () => {
  it("returns 5 types", () => {
    expect(smokeDetectors()).toHaveLength(5);
  });
});
