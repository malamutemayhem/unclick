import { describe, it, expect } from "vitest";
import {
  detectionRange, falseAlarmRate, responseSpeed, powerDraw,
  sensorCost, petImmune, throughWall, detectionMethod,
  bestInstall, motionSensors,
} from "../motion-sensor-calc.js";

describe("detectionRange", () => {
  it("microwave active longest range", () => {
    expect(detectionRange("microwave_active")).toBeGreaterThan(detectionRange("vibration_contact"));
  });
});

describe("falseAlarmRate", () => {
  it("dual tech lowest false alarm", () => {
    expect(falseAlarmRate("microwave_active")).toBeGreaterThan(falseAlarmRate("dual_tech"));
  });
});

describe("responseSpeed", () => {
  it("microwave active fastest response", () => {
    expect(responseSpeed("microwave_active")).toBeGreaterThan(responseSpeed("pir_passive"));
  });
});

describe("powerDraw", () => {
  it("microwave active highest power draw", () => {
    expect(powerDraw("microwave_active")).toBeGreaterThan(powerDraw("pir_passive"));
  });
});

describe("sensorCost", () => {
  it("dual tech most expensive", () => {
    expect(sensorCost("dual_tech")).toBeGreaterThan(sensorCost("pir_passive"));
  });
});

describe("petImmune", () => {
  it("pir passive is pet immune", () => {
    expect(petImmune("pir_passive")).toBe(true);
  });
  it("microwave active is not", () => {
    expect(petImmune("microwave_active")).toBe(false);
  });
});

describe("throughWall", () => {
  it("microwave active works through wall", () => {
    expect(throughWall("microwave_active")).toBe(true);
  });
  it("pir passive does not", () => {
    expect(throughWall("pir_passive")).toBe(false);
  });
});

describe("detectionMethod", () => {
  it("dual tech uses pir plus microwave confirm", () => {
    expect(detectionMethod("dual_tech")).toBe("pir_plus_microwave_confirm");
  });
});

describe("bestInstall", () => {
  it("vibration contact for window glass break", () => {
    expect(bestInstall("vibration_contact")).toBe("window_glass_break");
  });
});

describe("motionSensors", () => {
  it("returns 5 types", () => {
    expect(motionSensors()).toHaveLength(5);
  });
});
