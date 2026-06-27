import { describe, it, expect } from "vitest";
import {
  moistureOutput, energyConsumption, mineralDustRisk, noiseLevel,
  maintenanceFrequency, selfSterilizing, wholeHouseCapable, mistType,
  bestApplication, humidifierTypes,
} from "../humidifier-type-calc.js";

describe("moistureOutput", () => {
  it("steam highest moisture output", () => {
    expect(moistureOutput("steam")).toBeGreaterThan(moistureOutput("impeller"));
  });
});

describe("energyConsumption", () => {
  it("steam most energy", () => {
    expect(energyConsumption("steam")).toBeGreaterThan(energyConsumption("evaporative"));
  });
});

describe("mineralDustRisk", () => {
  it("ultrasonic highest mineral dust risk", () => {
    expect(mineralDustRisk("ultrasonic")).toBeGreaterThan(mineralDustRisk("steam"));
  });
});

describe("noiseLevel", () => {
  it("impeller noisiest", () => {
    expect(noiseLevel("impeller")).toBeGreaterThan(noiseLevel("ultrasonic"));
  });
});

describe("maintenanceFrequency", () => {
  it("ultrasonic most maintenance", () => {
    expect(maintenanceFrequency("ultrasonic")).toBeGreaterThan(maintenanceFrequency("steam"));
  });
});

describe("selfSterilizing", () => {
  it("steam is self sterilizing", () => {
    expect(selfSterilizing("steam")).toBe(true);
  });
  it("ultrasonic is not", () => {
    expect(selfSterilizing("ultrasonic")).toBe(false);
  });
});

describe("wholeHouseCapable", () => {
  it("bypass flow is whole house capable", () => {
    expect(wholeHouseCapable("bypass_flow")).toBe(true);
  });
  it("ultrasonic is not", () => {
    expect(wholeHouseCapable("ultrasonic")).toBe(false);
  });
});

describe("mistType", () => {
  it("ultrasonic is cool visible mist", () => {
    expect(mistType("ultrasonic")).toBe("cool_visible_mist");
  });
});

describe("bestApplication", () => {
  it("ultrasonic for nursery quiet room", () => {
    expect(bestApplication("ultrasonic")).toBe("nursery_quiet_room");
  });
});

describe("humidifierTypes", () => {
  it("returns 5 types", () => {
    expect(humidifierTypes()).toHaveLength(5);
  });
});
