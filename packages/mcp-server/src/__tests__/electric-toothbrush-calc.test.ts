import { describe, it, expect } from "vitest";
import {
  cleaningPower, gumGentle, batteryLife, travelFriendly,
  brushCost, pressureSensor, ecoFriendly, brushMotion,
  bestUser, electricToothbrushes,
} from "../electric-toothbrush-calc.js";

describe("cleaningPower", () => {
  it("ultrasonic wave most cleaning power", () => {
    expect(cleaningPower("ultrasonic_wave")).toBeGreaterThan(cleaningPower("bamboo_battery"));
  });
});

describe("gumGentle", () => {
  it("ultrasonic wave gentlest on gums", () => {
    expect(gumGentle("ultrasonic_wave")).toBeGreaterThan(gumGentle("oscillating_rotating"));
  });
});

describe("batteryLife", () => {
  it("sonic vibrating best battery life", () => {
    expect(batteryLife("sonic_vibrating")).toBeGreaterThan(batteryLife("water_flosser_combo"));
  });
});

describe("travelFriendly", () => {
  it("bamboo battery most travel friendly", () => {
    expect(travelFriendly("bamboo_battery")).toBeGreaterThan(travelFriendly("water_flosser_combo"));
  });
});

describe("brushCost", () => {
  it("ultrasonic wave most expensive", () => {
    expect(brushCost("ultrasonic_wave")).toBeGreaterThan(brushCost("bamboo_battery"));
  });
});

describe("pressureSensor", () => {
  it("sonic vibrating has pressure sensor", () => {
    expect(pressureSensor("sonic_vibrating")).toBe(true);
  });
  it("bamboo battery does not", () => {
    expect(pressureSensor("bamboo_battery")).toBe(false);
  });
});

describe("ecoFriendly", () => {
  it("bamboo battery is eco friendly", () => {
    expect(ecoFriendly("bamboo_battery")).toBe(true);
  });
  it("sonic vibrating is not", () => {
    expect(ecoFriendly("sonic_vibrating")).toBe(false);
  });
});

describe("brushMotion", () => {
  it("oscillating rotating uses circular oscillate pulse", () => {
    expect(brushMotion("oscillating_rotating")).toBe("circular_oscillate_pulse");
  });
});

describe("bestUser", () => {
  it("bamboo battery for eco conscious minimal", () => {
    expect(bestUser("bamboo_battery")).toBe("eco_conscious_minimal");
  });
});

describe("electricToothbrushes", () => {
  it("returns 5 types", () => {
    expect(electricToothbrushes()).toHaveLength(5);
  });
});
