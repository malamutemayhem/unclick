import { describe, it, expect } from "vitest";
import {
  powerOutput, soundWarmth, portability, dacQuality,
  ampCost, balancedOutput, tubeRollable, circuitType,
  bestSetup, headphoneAmps,
} from "../headphone-amp-calc.js";

describe("powerOutput", () => {
  it("solid state balanced most power output", () => {
    expect(powerOutput("solid_state_balanced")).toBeGreaterThan(powerOutput("portable_dac_dongle"));
  });
});

describe("soundWarmth", () => {
  it("desktop tube warmest sound", () => {
    expect(soundWarmth("desktop_tube")).toBeGreaterThan(soundWarmth("portable_dac_dongle"));
  });
});

describe("portability", () => {
  it("portable dac dongle most portable", () => {
    expect(portability("portable_dac_dongle")).toBeGreaterThan(portability("desktop_tube"));
  });
});

describe("dacQuality", () => {
  it("integrated dac amp best dac quality", () => {
    expect(dacQuality("integrated_dac_amp")).toBeGreaterThan(dacQuality("desktop_tube"));
  });
});

describe("ampCost", () => {
  it("solid state balanced most expensive", () => {
    expect(ampCost("solid_state_balanced")).toBeGreaterThan(ampCost("portable_dac_dongle"));
  });
});

describe("balancedOutput", () => {
  it("solid state balanced has balanced output", () => {
    expect(balancedOutput("solid_state_balanced")).toBe(true);
  });
  it("desktop tube does not", () => {
    expect(balancedOutput("desktop_tube")).toBe(false);
  });
});

describe("tubeRollable", () => {
  it("desktop tube is tube rollable", () => {
    expect(tubeRollable("desktop_tube")).toBe(true);
  });
  it("solid state balanced is not", () => {
    expect(tubeRollable("solid_state_balanced")).toBe(false);
  });
});

describe("circuitType", () => {
  it("desktop tube uses vacuum tube class a", () => {
    expect(circuitType("desktop_tube")).toBe("vacuum_tube_class_a");
  });
});

describe("bestSetup", () => {
  it("portable dac dongle for phone laptop on go", () => {
    expect(bestSetup("portable_dac_dongle")).toBe("phone_laptop_on_go");
  });
});

describe("headphoneAmps", () => {
  it("returns 5 types", () => {
    expect(headphoneAmps()).toHaveLength(5);
  });
});
