import { describe, it, expect } from "vitest";
import {
  moistureOutput, roomCoverage, noiseLevel, maintenanceNeed,
  unitCost, filterRequired, heatsWater, mistMethod,
  bestUse, humidifiers,
} from "../humidifier-calc.js";

describe("moistureOutput", () => {
  it("whole house furnace highest output", () => {
    expect(moistureOutput("whole_house_furnace")).toBeGreaterThan(moistureOutput("personal_usb"));
  });
});

describe("roomCoverage", () => {
  it("whole house furnace widest coverage", () => {
    expect(roomCoverage("whole_house_furnace")).toBeGreaterThan(roomCoverage("cool_mist_ultrasonic"));
  });
});

describe("noiseLevel", () => {
  it("evaporative wick noisiest", () => {
    expect(noiseLevel("evaporative_wick")).toBeGreaterThan(noiseLevel("cool_mist_ultrasonic"));
  });
});

describe("maintenanceNeed", () => {
  it("evaporative wick most maintenance", () => {
    expect(maintenanceNeed("evaporative_wick")).toBeGreaterThan(maintenanceNeed("personal_usb"));
  });
});

describe("unitCost", () => {
  it("whole house furnace most expensive", () => {
    expect(unitCost("whole_house_furnace")).toBeGreaterThan(unitCost("personal_usb"));
  });
});

describe("filterRequired", () => {
  it("evaporative wick requires filter", () => {
    expect(filterRequired("evaporative_wick")).toBe(true);
  });
  it("cool mist ultrasonic does not", () => {
    expect(filterRequired("cool_mist_ultrasonic")).toBe(false);
  });
});

describe("heatsWater", () => {
  it("warm mist steam heats water", () => {
    expect(heatsWater("warm_mist_steam")).toBe(true);
  });
  it("cool mist ultrasonic does not", () => {
    expect(heatsWater("cool_mist_ultrasonic")).toBe(false);
  });
});

describe("mistMethod", () => {
  it("cool mist ultrasonic uses piezo vibration plate", () => {
    expect(mistMethod("cool_mist_ultrasonic")).toBe("piezo_vibration_plate");
  });
});

describe("bestUse", () => {
  it("whole house furnace for full home hvac system", () => {
    expect(bestUse("whole_house_furnace")).toBe("full_home_hvac_system");
  });
});

describe("humidifiers", () => {
  it("returns 5 types", () => {
    expect(humidifiers()).toHaveLength(5);
  });
});
