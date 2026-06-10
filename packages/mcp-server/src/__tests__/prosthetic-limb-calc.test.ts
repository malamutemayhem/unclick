import { describe, it, expect } from "vitest";
import {
  functionalRange, deviceCost, durability, weightScore,
  maintenanceNeed, requiresBattery, waterResistant, controlMethod,
  bestCandidate, prostheticLimbs,
} from "../prosthetic-limb-calc.js";

describe("functionalRange", () => {
  it("microprocessor best functional range", () => {
    expect(functionalRange("microprocessor")).toBeGreaterThan(functionalRange("passive"));
  });
});

describe("deviceCost", () => {
  it("microprocessor most expensive", () => {
    expect(deviceCost("microprocessor")).toBeGreaterThan(deviceCost("passive"));
  });
});

describe("durability", () => {
  it("passive most durable", () => {
    expect(durability("passive")).toBeGreaterThan(durability("myoelectric"));
  });
});

describe("weightScore", () => {
  it("passive lightest", () => {
    expect(weightScore("passive")).toBeGreaterThan(weightScore("microprocessor"));
  });
});

describe("maintenanceNeed", () => {
  it("microprocessor most maintenance", () => {
    expect(maintenanceNeed("microprocessor")).toBeGreaterThan(maintenanceNeed("passive"));
  });
});

describe("requiresBattery", () => {
  it("myoelectric requires battery", () => {
    expect(requiresBattery("myoelectric")).toBe(true);
  });
  it("body powered does not", () => {
    expect(requiresBattery("body_powered")).toBe(false);
  });
});

describe("waterResistant", () => {
  it("body powered is water resistant", () => {
    expect(waterResistant("body_powered")).toBe(true);
  });
  it("myoelectric is not", () => {
    expect(waterResistant("myoelectric")).toBe(false);
  });
});

describe("controlMethod", () => {
  it("myoelectric uses muscle signal sensor", () => {
    expect(controlMethod("myoelectric")).toBe("muscle_signal_sensor");
  });
});

describe("bestCandidate", () => {
  it("passive for cosmetic light duty", () => {
    expect(bestCandidate("passive")).toBe("cosmetic_light_duty");
  });
});

describe("prostheticLimbs", () => {
  it("returns 5 types", () => {
    expect(prostheticLimbs()).toHaveLength(5);
  });
});
