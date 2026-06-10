import { describe, it, expect } from "vitest";
import {
  morningAlertness, eveningProductivity, sleepQuality, socialJetLag,
  populationPercent, naturalEarlyRiser, insomniaRisk, idealWakeTime,
  peakFocusWindow, chronotypes,
} from "../chronotype-calc.js";

describe("morningAlertness", () => {
  it("lion most alert in morning", () => {
    expect(morningAlertness("lion")).toBeGreaterThan(morningAlertness("wolf"));
  });
});

describe("eveningProductivity", () => {
  it("wolf most productive at night", () => {
    expect(eveningProductivity("wolf")).toBeGreaterThan(eveningProductivity("lion"));
  });
});

describe("sleepQuality", () => {
  it("lion best sleep quality", () => {
    expect(sleepQuality("lion")).toBeGreaterThan(sleepQuality("dolphin"));
  });
});

describe("socialJetLag", () => {
  it("wolf most social jet lag", () => {
    expect(socialJetLag("wolf")).toBeGreaterThan(socialJetLag("bear"));
  });
});

describe("populationPercent", () => {
  it("bear most common", () => {
    expect(populationPercent("bear")).toBeGreaterThan(populationPercent("dolphin"));
  });
});

describe("naturalEarlyRiser", () => {
  it("lion is a natural early riser", () => {
    expect(naturalEarlyRiser("lion")).toBe(true);
  });
  it("wolf is not", () => {
    expect(naturalEarlyRiser("wolf")).toBe(false);
  });
});

describe("insomniaRisk", () => {
  it("dolphin has insomnia risk", () => {
    expect(insomniaRisk("dolphin")).toBe(true);
  });
  it("bear does not", () => {
    expect(insomniaRisk("bear")).toBe(false);
  });
});

describe("idealWakeTime", () => {
  it("lion wakes at 5:30am", () => {
    expect(idealWakeTime("lion")).toBe("5_30_am");
  });
});

describe("peakFocusWindow", () => {
  it("wolf peaks 5pm to 9pm", () => {
    expect(peakFocusWindow("wolf")).toBe("5pm_to_9pm");
  });
});

describe("chronotypes", () => {
  it("returns 5 chronotypes", () => {
    expect(chronotypes()).toHaveLength(5);
  });
});
