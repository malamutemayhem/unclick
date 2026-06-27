import { describe, it, expect } from "vitest";
import {
  wheelDiameterCm, crankRpm, stringTensionN, keyCount,
  droneStrings, tangentHeight, wheelPressure, rosinInterval,
  soundVolumeDba, tuningPegs, wheelMaterials,
} from "../hurdy-gurdy.js";

describe("wheelDiameterCm", () => {
  it("positive cm", () => {
    expect(wheelDiameterCm(40)).toBeGreaterThan(8);
  });
});

describe("crankRpm", () => {
  it("fast highest rpm", () => {
    expect(crankRpm("fast")).toBeGreaterThan(crankRpm("slow"));
  });
});

describe("stringTensionN", () => {
  it("positive N", () => {
    expect(stringTensionN(440, 35, 0.01)).toBeGreaterThan(0);
  });
});

describe("keyCount", () => {
  it("chromatic more keys", () => {
    expect(keyCount(true, 2)).toBeGreaterThan(keyCount(false, 2));
  });
});

describe("droneStrings", () => {
  it("hungarian most drones", () => {
    expect(droneStrings("hungarian")).toBeGreaterThan(droneStrings("german"));
  });
});

describe("tangentHeight", () => {
  it("60% of key travel", () => {
    expect(tangentHeight(10)).toBe(6);
  });
});

describe("wheelPressure", () => {
  it("positive pressure", () => {
    expect(wheelPressure(5, 2)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(wheelPressure(5, 0)).toBe(0);
  });
});

describe("rosinInterval", () => {
  it("synthetic lasts longest", () => {
    expect(rosinInterval(10, "synthetic")).toBeLessThan(rosinInterval(10, "cotton"));
  });
});

describe("soundVolumeDba", () => {
  it("positive dB", () => {
    expect(soundVolumeDba(70, 4)).toBeGreaterThan(50);
  });
});

describe("tuningPegs", () => {
  it("sum of all strings", () => {
    expect(tuningPegs(2, 2, 4)).toBe(8);
  });
});

describe("wheelMaterials", () => {
  it("returns 4 materials", () => {
    expect(wheelMaterials()).toHaveLength(4);
  });
});
